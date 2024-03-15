import { utilService } from "../services/util.service.js";
import { eventBusService } from "../services/event-bus.service.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function EmailFolderList({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const navigate = useNavigate();

  const folders = ["inbox", "starred", "sent", "draft", "trash"];

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function onButtonClick(folder) {
    eventBusService.emit("setSearchText", "");
    setFilterByToEdit((prevFilter) => {
      return { ...prevFilter, folder };
    });
    navigate("/email");
  }

  return (
    <aside className="email-folder-list">
      <Link to="/email/compose"><button>Compose</button></Link>
      {folders.map((folder) => (
        <button
          key={folder}
          className="folder-btn"
          onClick={() => onButtonClick(folder)}
        >
          <span>{utilService.capitalizeString(folder)}</span>
        </button>
      ))}
    </aside>
  );
}
