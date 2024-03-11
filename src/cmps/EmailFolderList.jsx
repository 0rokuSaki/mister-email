import { Link } from "react-router-dom";
import { utilService } from "../services/util.service.js";
import { eventBusService } from "../services/event-bus.service.js";

export function EmailFolderList({ setFilterBy }) {
  const folders = ["inbox", "starred", "sent", "draft", "trash"];

  function onFolderBtnClick(folder) {
    eventBusService.emit("setSearchText", "");
    setFilterBy((prevFilter) => {
      return { ...prevFilter, txt: "", folder };
    });
  }

  return (
    <aside className="email-folder-list">
      {folders.map((folder) => (
        <Link key={folder} to={`/email/${folder}`}>
          <button
            className="folder-btn"
            onClick={() => onFolderBtnClick(folder)}
          >
            <span>{utilService.capitalizeString(folder)}</span>
          </button>
        </Link>
      ))}
    </aside>
  );
}
