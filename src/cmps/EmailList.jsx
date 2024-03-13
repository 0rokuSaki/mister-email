import { EmailPreview } from "./EmailPreview";
import { Link, useParams } from "react-router-dom";

export function EmailList({ emails }) {
  const {folder} = useParams();

  return (
    <section className="email-list">
      {emails.map((email) => (
        <Link key={email.id} to={`/email/${folder}/${email.id}`}>
          <EmailPreview email={email} />
        </Link>
      ))}
    </section>
  );
}
