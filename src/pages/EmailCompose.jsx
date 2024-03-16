import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { emailService } from "../services/email.service";
import { func } from "prop-types";

export function EmailCompose() {
  const navigate = useNavigate();
  const context = useOutletContext();
  const { emailId } = useParams();
  const [email, setEmail] = useState(emailService.getDefaultEmail());

  useEffect(() => {
    if (emailId) {
      loadEmail();
    }
  }, []);

  useEffect(() => {
    if (email.to) {
      sendEmail();
    }
  }, [email.sentAt]);

  async function loadEmail() {
    try {
      const email = await emailService.getById(emailId);
      setEmail(email);
    } catch (err) {
      console.log("Had issues loading email", err);
    }
  }

  async function sendEmail() {
    try {
      if (email.id) await context.onUpdateEmail(email);
      else await context.onAddEmail(email);
    } catch (err) {
      console.log("Had issues saving email", err);
    }
    navigate(-1);
  }

  function onChange(ev) {
    let { value, name: field } = ev.target;
    setEmail((prevEmail) => ({ ...prevEmail, [field]: value }));
  }

  async function onCloseClick() {
    console.log("Close clicked, saving draft...");
    navigate(-1);
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    if (!email.body) {
      const send = confirm("Send this message without a subject or text in the body?");
      if (!send) {
        return;
      }
    }
    setEmail((prevEmail) => ({ ...prevEmail, sentAt: Date.now() }));
  }

  return (
    <section className="email-compose">
      <header>
        <h4>New Message</h4>
        <button onClick={onCloseClick}>Close</button>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            value={email.to}
            name="to"
            id="to"
            placeholder="To"
            onChange={onChange}
            required
          />
          <input
            value={email.subject}
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            onChange={onChange}
          />
          <textarea
            value={email.body}
            type="text"
            name="body"
            id="body"
            onChange={onChange}
          ></textarea>
          <div>
            <button>Send</button>
          </div>
        </form>
      </main>
    </section>
  );
}
