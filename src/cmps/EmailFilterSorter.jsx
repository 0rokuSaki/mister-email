import { useEffect, useState } from "react";

export function EmailFilterSorter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const orderSymbol = filterByToEdit.sortOrder === "asc" ? "▲" : "▼";

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function onButtonClick(ev) {
    const { className } = ev.target;
    const sortBy = className === "date-btn" ? "date" : "subject";

    // Sort order changes when the same button is pressed
    let sortOrder = filterByToEdit.sortOrder;
    if (filterByToEdit.sortBy === sortBy)
    {
      sortOrder = filterByToEdit.sortOrder === "asc" ? "desc" : "asc";
    }

    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, sortBy, sortOrder };
    });
  }

  function onSelectChange(ev) {
    const { value } = ev.target;
    const isRead = { all: null, read: true, unread: false }[value];

    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, isRead };
    });
  }

  return (
    <section className="email-filter-sorter">
      <button className="date-btn" onClick={onButtonClick}>
        Date {filterByToEdit.sortBy === "date" && orderSymbol}
      </button>
      <button className="subject-btn" onClick={onButtonClick}>
        Subject {filterByToEdit.sortBy === "subject" && orderSymbol}
      </button>
      <select name="status" id="" onChange={onSelectChange}>
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
    </section>
  );
}
