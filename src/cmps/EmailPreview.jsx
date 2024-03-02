import { utilService } from "../services/util.service";

import starInactiveImageUrl from "../assets/imgs/star-inactive.png";
import starActiveImageUrl from "../assets/imgs/star-active.png";

export function EmailPreview({ email }) {
  const previewColorClass = email.isRead ? "read" : "unread";
  const starImageUrl = email.isStarred ? starActiveImageUrl : starInactiveImageUrl;
  return (
    <article className={`email-preview ${previewColorClass}`}>
      <button className="star-button">
        <img src={starImageUrl} alt="" />
      </button>
      <h4 className="from">
        {utilService.capitalizeString(email.from.split("@")[0])}
      </h4>
      <h4 className="subject">
        {email.subject}
      </h4>
      <h4 className="date">
        {utilService.formatTimestamp(email.sentAt)}
      </h4>
    </article>
  );
}
