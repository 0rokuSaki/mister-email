import { useState } from "react";
import { Link } from "react-router-dom";

import { utilService } from "../services/util.service";

export function EmailPreview({ email }) {
  const dynClass = email.isRead ? "" : "unread";
  const dynBtnClass = email.isRead ? "mark-as-unread-btn" : "mark-as-unread-btn";
  const dynBtnTxt = email.isRead ? "Mark As Unread" : "Mark As Read";
  return (
    <article className={`email-preview ${dynClass}`}>
      <input type="checkbox" name="" id="" />
      <button>Star</button>
      <span className="from-wrapper">
        {utilService.capitalizeString(email.from.split("@")[0])}
      </span>
      <span className="subject-wrapper">{email.subject}</span>
      <span className="date-wrapper">
        {utilService.formatTimestamp(email.sentAt)}
      </span>
      <span className="action-buttons-wrapper">
        <button className="delete-button">Delete</button>
        <button className={dynBtnClass}>{dynBtnTxt}</button>
      </span>
    </article>
  );
}
