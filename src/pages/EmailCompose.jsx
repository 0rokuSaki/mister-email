export function EmailCompose() {
  return (
    <section className="email-compose">
      <header>
        <h4>New Message</h4>
        <button>Close</button>
      </header>
      <main>
        <form action="">
          <input type="text" name="to" id="to" placeholder="To" required />
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
          />
          <input type="text" name="" id="" />
          <button>Send</button>
        </form>
      </main>
    </section>
  );
}
