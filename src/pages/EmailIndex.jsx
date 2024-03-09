import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { Outlet } from "react-router";
import { eventBusService } from "../services/event-bus.service";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  useEffect(() => {
    eventBusService.on("onUpdateEmail", onUpdateEmail);
    eventBusService.on("onRemoveEmail", onRemoveEmail);

    return () => {
      eventBusService.off("onUpdateEmail", onUpdateEmail);
      eventBusService.off("onRemoveEmail", onRemoveEmail);
    };
  }, []);

  useEffect(() => {
    loadEmails();
  }, [filterBy]);

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);
      emails.sort((a, b) => b.sentAt - a.sentAt);
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
    } else { // Move to trash
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
      <EmailFolderList setFilterBy={setFilterBy} />
      <Outlet context={{ emails, onUpdateEmail }} />
    </section>
  );
}
