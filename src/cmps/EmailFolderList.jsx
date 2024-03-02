import pencilImageUrl from "../assets/imgs/pencil.png";
import inboxImageUrl from "../assets/imgs/inbox.png";
import starImageUrl from "../assets/imgs/star.png";
import sentImageUrl from "../assets/imgs/sent.png";
import draftImageUrl from "../assets/imgs/draft.png";
import trashImageUrl from "../assets/imgs/trash.png";

import { utilService } from "../services/util.service.js";

export function EmailFolderList() {
  const folders = [
    { name: "inbox", img: inboxImageUrl },
    { name: "starred", img: starImageUrl },
    { name: "sent", img: sentImageUrl },
    { name: "draft", img: draftImageUrl },
    { name: "trash", img: trashImageUrl },
  ];

  return (
    <aside className="email-folder-list">
      {folders.map((folder) => {
        return (
          <button key={folder.name}>
            <img src={folder.img} alt={`${folder.name}`} />
            <span>{utilService.capitalizeString(folder.name)}</span>
          </button>
        );
      })}
    </aside>
  );
}
