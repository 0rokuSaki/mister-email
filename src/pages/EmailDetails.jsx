import { useParams } from "react-router-dom";
import { useOutletContext, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const { folder } = useParams();
  const { emailId, onUpdateEmail, onRemoveEmail } = useOutletContext();

  const starBtnTxt = email && email.isStarred ? "Unstar" : "Star";
  const goBackUrl = `/email/${folder}`;

  useEffect(() => {
    loadEmail();
  }, [emailId]);

  async function loadEmail() {
    try {
      let email = await emailService.getById(emailId);
      email = { ...email, isRead: true };
      onUpdateEmail(email);
      setEmail(email); // TODO: What to do if onUpdateEmail fails?
    } catch (err) {
      navigate(goBackUrl);
      console.log("Error loading email:", err);
    }
  }

  function onStarToggleClick() {
    const updatedEmail = { ...email, isStarred: !email.isStarred };
    onUpdateEmail(updatedEmail);
    setEmail(updatedEmail); // TODO: What to do if onUpdateEmail fails?
  }

  async function onDeleteClick() {
    await onRemoveEmail(email);
    navigate(goBackUrl);
  }

  if (!email) return <div>Loading...</div>;
  return (
    <section className="email-details">
      <header>
        <div className="action-buttons">
          <button className="go-back-btn" onClick={() => navigate(goBackUrl)}>
            Go Back
          </button>
          <button className="star-toggle-btn" onClick={onStarToggleClick}>
            {starBtnTxt}
          </button>
          <button className="reply-btn">Reply</button>
          <button className="delete-btn" onClick={onDeleteClick}>
            Delete
          </button>
        </div>
        <h2>{email.subject}</h2>
      </header>
      <div className="sub-header">
        <h3>From: {email.from}</h3>
        <span className="date-wrapper">
          <h4>{utilService.formatTimestamp(email.sentAt)}</h4>
        </span>
      </div>
      <main>{email.body}</main>
    </section>
  );
}
