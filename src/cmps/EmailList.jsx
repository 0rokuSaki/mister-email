import { EmailPreview } from "./EmailPreview";
import { Link } from "react-router-dom";

export function EmailList({ emails }) {
  return (
    <section className="email-list">
      {emails.map((email) => (
        <Link key={email.id} to={`/email/${email.id}`}>
          <EmailPreview email={email} />
        </Link>
      ))}
    </section>
  );
}
