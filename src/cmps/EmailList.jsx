import { useState } from "react";

import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails }) {
  return (
    <section className="email-list">
      {emails.map((email) => (
        <EmailPreview key={email.id} email={email} />
      ))}
    </section>
  );
}
