import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { utilService } from "../services/util.service";

import starInactiveImageUrl from "../assets/imgs/star-inactive.png";
import starActiveImageUrl from "../assets/imgs/star-active.png";
import readImgUrl from "../assets/imgs/read-message.png";
import unreadImgUrl from "../assets/imgs/unread-message.png";
import trashImgUrl from "../assets/imgs/trash.png";

export function EmailPreview({ email, onUpdateEmail, onRemoveEmail }) {
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  function onButtonClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    const btnType = ev.target.className;
    switch (btnType) {
      case "star-button":
        onUpdateEmail({ ...email, isStarred: !email.isStarred });
        break;
      case "read-button":
      case "unread-button":
        onUpdateEmail({ ...email, isRead: !email.isRead });
        break;
      case "delete-button":
        onRemoveEmail(email.id);
        break;
    }
  }

  const previewColorClass = email.isRead ? "read" : "unread";
  const starImageUrl = email.isStarred
    ? starActiveImageUrl
    : starInactiveImageUrl;
  return (
    <article
      className={`email-preview ${previewColorClass}`}
      onMouseEnter={() => setIsMouseHovering(true)}
      onMouseLeave={() => setIsMouseHovering(false)}
    >
      <Link to={`/email/${email.id}`}>
        <div className="email-summary">
          <button className="star-button" onClick={onButtonClick}>
            <img src={starImageUrl} alt="" />
          </button>
          <h4 className="from">
            {utilService.capitalizeString(email.from.split("@")[0])}
          </h4>
          <h4 className="subject">{email.subject}</h4>
          {!isMouseHovering && (
            <h4 className="date">
              {utilService.formatTimestamp(email.sentAt)}
            </h4>
          )}
          {isMouseHovering && (
            <div className="action-buttons-wrapper">
              {email.isRead && (
                <button className="unread-button" onClick={onButtonClick}>
                  <img src={unreadImgUrl} alt="" />
                </button>
              )}
              {!email.isRead && (
                <button className="read-button" onClick={onButtonClick}>
                  <img src={readImgUrl} alt="" />
                </button>
              )}
              <button className="delete-button" onClick={onButtonClick}>
                <img src={trashImgUrl} alt="" />
              </button>
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
