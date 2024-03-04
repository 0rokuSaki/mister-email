import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { emailService } from "../services/email.service";

export function EmailDetails() {
  const [email, setEmail] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadEmail();
  }, [params.emailId]);

  async function loadEmail() {
    try {
      const email = await emailService.getById(params.emailId);
      setEmail(email);
    } catch (err) {
      navigate("/email");
      console.log("Error in loadEmail", err);
    }
  }
  if (!email) return <div>Loading...</div>
  return <section className="email-details">
    <button onClick={() => navigate("/email")}>Go Back</button>
    <h2>{email.subject}</h2>
    <h3>{email.from}</h3>
    <p>{email.body}</p>
  </section>
}
