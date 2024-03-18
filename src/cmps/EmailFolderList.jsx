import { utilService } from "../services/util.service.js";
import { eventBusService } from "../services/event-bus.service.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailService } from "../services/email.service.js";

export function EmailFolderList({ onSetFilter, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [unreadCount, setUnreadCount] = useState();
  const navigate = useNavigate();

  const folders = ["inbox", "starred", "sent", "draft", "trash"];

  useEffect(() => {
    emailService.getUnreadCount()
    .then((value) => {
      if (value) {
        setUnreadCount(value);
      }
    })
  })

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
          <span className="folder-btn-text">{utilService.capitalizeString(folder)}</span>
          {folder === "inbox" && ` ${unreadCount}`}
        </button>
      ))}
    </aside>
  );
}
