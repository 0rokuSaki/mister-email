import { utilService } from "../services/util.service.js";
import { eventBusService } from "../services/event-bus.service.js";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function EmailFolderList({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  const folders = ["inbox", "starred", "sent", "draft", "trash"];

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function onButtonClick(folder) {
    eventBusService.emit("setSearchText", "");
    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, folder };
    });
  }

  return (
    <aside className="email-folder-list">
      {folders.map((folder) => (
        <NavLink key={folder} to={`/email/${folder}`}>
          <button
            className="folder-btn"
            onClick={() => onButtonClick(folder)}
          >
            <span>{utilService.capitalizeString(folder)}</span>
          </button>
        </NavLink>
      ))}
    </aside>
  );
}
