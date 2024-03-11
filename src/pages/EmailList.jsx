import { EmailPreview } from "../cmps/EmailPreview";
import { EmailFilterSorter } from "../cmps/EmailFilterSorter";
import { useOutletContext, useParams } from "react-router";
import { Link } from "react-router-dom";

export function EmailList() {
  const { emails } = useOutletContext();
  const { folder } = useParams();

  return (
    <section className="email-list">
      <EmailFilterSorter />
      {emails.map((email) => (
        <Link key={email.id} to={`/email/${folder}/${email.id}`}>
          <EmailPreview email={email} />
        </Link>
      ))}
    </section>
  );
}
