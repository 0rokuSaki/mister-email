import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const { emailId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadRobot();
  }, [emailId]);

  async function loadRobot() {
    try {
      const email = await emailService.getById(emailId);
      setEmail(email);
    } catch (err) {
      navigate("/email/inbox");
      console.log("Error loading email:", err);
    }
  }

  const starBtnTxt = email && email.isStarred ? "Unstar" : "Star";

  if (!email) return <div>Loading...</div>;
  return (
    <section className="email-details">
      <header>
        <div className="action-buttons">
          <button className="go-back-button">Go Back</button>
          <button className="star-toggle-btn">{starBtnTxt}</button>
          <button className="reply-btn">Reply</button>
          <button className="delete-btn">Delete</button>
        </div>
        <h2>{email.subject}</h2>
      </header>
      <div className="sub-header">
        <h3>From: {email.from}</h3>
        <span className="date-wrapper"><h4>{utilService.formatTimestamp(email.sentAt)}</h4></span>
      </div>
      <main>{email.body}</main>
    </section>
  );
}
