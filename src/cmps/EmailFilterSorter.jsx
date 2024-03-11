import { useState } from "react";

export function EmailFilterSorter() {
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("date");

  function onButtonClick(ev) {
    const { className } = ev.target;
    setSortBy(className === "date-btn" ? "date" : "subject");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  const orderSymbol = sortOrder === "asc" ? "▲" : "▼";

  return (
    <section className="email-filter-sorter">
      <button className="date-btn" onClick={onButtonClick}>
        Date {sortBy === "date" && orderSymbol}
      </button>
      <button className="subject-btn" onClick={onButtonClick}>
        Subject {sortBy === "subject" && orderSymbol}
      </button>
      <select name="status" id="">
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </section>
  );
}
