import { useState, useEffect } from "react";

import { EmailSorter } from "./EmailSorter";
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails }) {
  const [orderBy, setOrderBy] = useState("date");
  const [order, setOrder] = useState("desc");

  function onSortButtonClick(btnType) {
    setOrderBy(btnType);
    order === "asc" ? setOrder("desc") : setOrder("asc");
  }

  function sortEmails() {
    let sortedEmails = [...emails].sort((a, b) => {
      if (orderBy === "date") {
        return a.sentAt - b.sentAt;
      } else if (orderBy === "subject") {
        return a.subject.toLowerCase().localeCompare(b.subject.toLowerCase());
      } else if (orderBy == "name") {
        return a.from.toLowerCase().localeCompare(b.from.toLowerCase());
      }
      return 0;
    });
    if (order === "desc") {
      sortedEmails = sortedEmails.reverse();
    }
    return sortedEmails;
  }

  const sortedEmails = sortEmails();
  return (
    <section className="email-list">
      <EmailSorter onSortButtonClick={onSortButtonClick} orderBy={orderBy} order={order}/>
      {sortedEmails.map((email) => {
        return <EmailPreview key={email.id} email={email} />;
      })}
    </section>
  );
}
