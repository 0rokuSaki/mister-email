import { utilService } from "../services/util.service";
import { eventBusService } from "../services/event-bus.service";

export function EmailPreview({ email }) {
  function onDeleteClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    if (email.removedAt) {
      eventBusService.emit("onRemoveEmail", email);
    } else {
      eventBusService.emit("onMoveToTrash", email);
    }
  }

  function onMarkClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    eventBusService.emit("onUpdateEmail", { ...email, isRead: !email.isRead });
  }

  const dynClass = email.isRead ? "" : "unread";
  const starBtnTxt = email.isStarred ? "Unstar" : "Star";
  const markBtnClass = email.isRead ? "mark-as-unread-btn" : "mark-as-read-btn";
  const markBtnTxt = email.isRead ? "Mark As Unread" : "Mark As Read";
  return (
    <article className={`email-preview ${dynClass}`}>
      <input type="checkbox" name="" id="" />
      <button>{starBtnTxt}</button>
      <span className="from-wrapper">
        {utilService.capitalizeString(email.from.split("@")[0])}
      </span>
      <span className="subject-wrapper">{email.subject}</span>
      <span className="date-wrapper">
        {utilService.formatTimestamp(email.sentAt)}
      </span>
      <span className="action-buttons-wrapper">
        <button className="delete-button" onClick={onDeleteClick}>
          Delete
        </button>
        <button className={markBtnClass} onClick={onMarkClick}>
          {markBtnTxt}
        </button>
      </span>
    </article>
  );
}
