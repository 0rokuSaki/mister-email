import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { Outlet } from "react-router";
import { eventBusService } from "../services/event-bus.service";
import { useParams, useSearchParams } from "react-router-dom";
import { EmailList } from "../cmps/EmailList";
import { EmailFilterSorter } from "../cmps/EmailFilterSorter";

export function EmailIndex({ setHeaderFilterBy }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams));
  const { emailId } = useParams();

  const { folder, txt, isRead, sortBy, sortOrder } = filterBy;

  useEffect(() => {
    setHeaderFilterBy({ txt });

    const unsubscribe1 = eventBusService.on("onUpdateEmail", onUpdateEmail);
    const unsubscribe2 = eventBusService.on("onRemoveEmail", onRemoveEmail);
    const unsubscribe3 = eventBusService.on("onSetFilter", onSetFilter);

    return () => {
      unsubscribe1();
      unsubscribe2();
      unsubscribe3();
    };
  }, []);

  // Reset filter when switching folders
  useEffect(() => {
    setFilterBy({...emailService.getDefaultFilter(), folder});
  }, [folder]);

  // When filter changes, set search params and re-load emails
  useEffect(() => {
    // Sanitize filter object
    let params = {}
    for (const field in filterBy) {
      if (filterBy[field] != "") {
        params[field] = filterBy[field]
      }
    }
    setSearchParams(params);
    loadEmails();
  }, [filterBy]);

  function onSetFilter(fieldsToUpdate) {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...fieldsToUpdate }));
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);
      setEmails(emails);
    } catch (err) {
      console.log("Error in loadEmails", err);
    }
  }

  async function onRemoveEmail(email) {
    // Remove from DB if email is in trash
    if (email.removedAt) {
      try {
        await emailService.remove(email.id);
        setEmails((prevEmails) => {
          return prevEmails.filter((currEmail) => currEmail.id !== email.id);
        });
      } catch (err) {
        console.log("Error in onRemoveEmail", err);
      }
    } else {
      // Move to trash
      try {
        await emailService.save({ ...email, removedAt: Date.now() });
        setEmails((prevEmails) =>
          prevEmails.filter((currEmail) => currEmail.id !== email.id)
        );
      } catch (err) {
        console.log("Error in onMoveToTrash", err);
      }
    }
  }

  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email);
      setEmails((prevEmails) =>
        prevEmails.map((currEmail) =>
          currEmail.id === updatedEmail.id ? updatedEmail : currEmail
        )
      );
    } catch (err) {
      console.log("Error in onUpdateEmail", err);
    }
  }

  if (!emails) return <div>Loading...</div>;
  return (
    <section className="email-index">
      <EmailFolderList onSetFilter={onSetFilter} filterBy={{ folder }} />
      {!emailId && (
        <EmailFilterSorter
          onSetFilter={onSetFilter}
          filterBy={{ isRead, sortBy, sortOrder }}
        />
      )}
      {!emailId && <EmailList emails={emails} />}
      {emailId && (
        <Outlet context={{ emailId, onUpdateEmail, onRemoveEmail }} />
      )}
    </section>
  );
}
