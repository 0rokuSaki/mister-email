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

  const starBtnTxt = (email && email.isStarred) ? "Unstar" : "Star";

  if (!email) return <div>Loading...</div>;
  return (
    <section className="email-details">
      <h2>{email.subject}</h2>
      <div className="sub-header">
        <h3>{email.from}</h3>
        <aside>
          <h4>{utilService.formatTimestamp(email.sentAt)}</h4>
          <div className="action-buttons">
            <button className="star-toggle-btn">{starBtnTxt}</button>
            <button className="reply-btn">Reply</button>
            <button className="delete-btn">Delete</button>
          </div>
        </aside>
      </div>
      <main>
        {email.body}
      </main>
    </section>
  );
}
