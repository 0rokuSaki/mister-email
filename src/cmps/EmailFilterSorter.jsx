import { useEffect, useState } from "react";
import { eventBusService } from "../services/event-bus.service";

export function EmailFilterSorter({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const orderSymbol = filterByToEdit.sortOrder === "asc" ? "▲" : "▼";

  useEffect(() => {
    const unsubscribe = eventBusService.on("onEmailFilterSorterReset", onReset);
    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function onReset() {
    setFilterByToEdit({sortBy: "date", sortOrder: "desc", isRead: null});
  }

  function onButtonClick(ev) {
    const { className } = ev.target;
    const sortBy = className === "date-btn" ? "date" : "subject";

    // Sort order changes when the same button is pressed
    let sortOrder = filterByToEdit.sortOrder;
    if (filterByToEdit.sortBy === sortBy) {
      sortOrder = filterByToEdit.sortOrder === "asc" ? "desc" : "asc";
    }

    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, sortBy, sortOrder };
    });
  }

  function onSelectChange(ev) {
    const { value } = ev.target;
    let isRead = null;
    isRead = value === "true" ? true : isRead;
    isRead = value === "false" ? false : isRead;
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
      <select name="status" id="" onChange={onSelectChange} value={`${filterByToEdit.isRead}`}>
        <option value="null">All</option>
        <option value="true">Read</option>
        <option value="false">Unread</option>
      </select>
    </section>
  );
}
