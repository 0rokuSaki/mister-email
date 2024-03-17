import { utilService } from "../services/util.service";
import { eventBusService } from "../services/event-bus.service";

export function EmailPreview({ email, folder }) {
  function onButtonClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    switch (ev.target.className) {
      case "delete-btn":
        eventBusService.emit("onRemoveEmail", email);
        break;
      case "star-toggle-btn":
        eventBusService.emit("onUpdateEmail", {
          ...email,
          isStarred: !email.isStarred,
        });
        break;
      case "read-status-toggle-btn":
        eventBusService.emit("onUpdateEmail", {
          ...email,
          isRead: !email.isRead,
        });
        break;
    }
  }

  const dynClass = (email.isRead || folder === "draft") ? "" : "unread";
  const starBtnTxt = email.isStarred ? "Unstar" : "Star";
  const markBtnTxt = email.isRead ? "Mark As Unread" : "Mark As Read";
  return (
    <article className={`email-preview ${dynClass}`}>
      <input type="checkbox" name="" id="" />
      {!email.removedAt && <button className="star-toggle-btn" onClick={onButtonClick}>
        {starBtnTxt}
      </button>}
      <span className="from-wrapper">
        {utilService.capitalizeString(email.from.split("@")[0])}
      </span>
      <span className="subject-wrapper">{email.subject}</span>
      <span className="date-wrapper">
        {folder !== "draft" && utilService.formatTimestamp(email.sentAt)}
        {folder === "draft" && utilService.formatTimestamp(email.savedAt)}
      </span>
      <span className="action-buttons-wrapper">
        <button className="delete-btn" onClick={onButtonClick}>
          Delete
        </button>
        {folder !== "draft" && <button className="read-status-toggle-btn" onClick={onButtonClick}>
          {markBtnTxt}
        </button>}
      </span>
    </article>
  );
}
