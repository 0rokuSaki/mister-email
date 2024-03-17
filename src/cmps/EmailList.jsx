import { EmailPreview } from "./EmailPreview";
import { Link } from "react-router-dom";

export function EmailList({ emails, folder }) {
  return (
    <section className="email-list">
      {emails.map((email) => {
        const to = folder === "draft" ? `/email/compose/${email.id}` : `/email/${email.id}`;
        return (
          <Link key={email.id} to={to}>
            <EmailPreview email={email} folder={folder} />
          </Link>
        );
      })}
    </section>
  );
}
