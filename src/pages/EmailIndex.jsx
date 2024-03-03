import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { EmailHeader } from "../cmps/EmailHeader";
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

  if (!emails) return <div>Loading...</div>;
  return (
    <section className="email-index">
      <EmailHeader />
      <EmailFolderList />
      <EmailList emails={emails} />
    </section>
  );
}
