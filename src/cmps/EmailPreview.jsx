export function EmailPreview({email}) {
  return <article className="email-preview">
    <h3>Subject: {email.subject}</h3>
    <h4>From {email.from}</h4>
  </article>
}