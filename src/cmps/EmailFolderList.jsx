import { utilService } from "../services/util.service.js";

export function EmailFolderList() {
  const folders = ['inbox', 'starred', 'sent', 'draft', 'trash'];

  return (
    <aside className="email-folder-list">
      {folders.map((folder) => {
        return (
          <button key={folder}>
            <span>{utilService.capitalizeString(folder)}</span>
          </button>
        );
      })}
    </aside>
  );
}
