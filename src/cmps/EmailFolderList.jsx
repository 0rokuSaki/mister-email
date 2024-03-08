import { Link } from "react-router-dom";
import { utilService } from "../services/util.service.js";

export function EmailFolderList() {
  const folders = ["inbox", "starred", "sent", "draft", "trash"];

  return (
    <aside className="email-folder-list">
      {folders.map((folder) => (
        <Link key={folder} to={`/email/${folder}`}>
          <button>
            <span>{utilService.capitalizeString(folder)}</span>
          </button>
        </Link>
      ))}
    </aside>
  );
}
