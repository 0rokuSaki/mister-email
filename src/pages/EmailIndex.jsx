import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { EmailList } from "../cmps/EmailList";

export function EmailIndex() {
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter());

  useEffect(() => {
    loadEmails();
  }, [filterBy]);

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy);
      setEmails(emails);
    } catch (err) {
      console.log("Error in loadEmails", err);
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      await emailService.remove(emailId);
      setEmails(prevEmailss => {
        return prevEmailss.filter(email => email.id !== emailId);
      });
    } catch (err) {
      console.log("Error in onRemoveEmail", err);
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
      console.log("Error in onRemoveUpdate", err);
    }
  }

  if (!emails) return <div>Loading...</div>;
  return (
    <section className="email-index">
      <EmailFolderList />
      <EmailList emails={emails}/>
    </section>
  );
}
