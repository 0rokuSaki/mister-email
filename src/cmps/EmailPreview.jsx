import { useState } from "react";
import { Link } from "react-router-dom";

import { utilService } from "../services/util.service";

export function EmailPreview({ email }) {

  function onDeleteClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    console.log("TODO: NEED TO IMPLEMENT 'onDeleteClick'");
  }

  const dynClass = email.isRead ? "" : "unread";
  const starBtnTxt = email.isStarred ? "Unstar" : "Star";
  const markBtnClass = email.isRead ? "mark-as-unread-btn" : "mark-as-unread-btn";
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
        <button className="delete-button" onClick={onDeleteClick}>Delete</button>
        <button className={markBtnClass}>{markBtnTxt}</button>
      </span>
    </article>
  );
}
