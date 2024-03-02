import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails }) {
  return (
    <section className="email-list">
        {emails.map((email) => {
          return <EmailPreview key={email.id} email={email}/>
        })}
    </section>
  );
}
