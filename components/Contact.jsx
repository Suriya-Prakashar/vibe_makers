export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="panel panel--intro">
        <h2>Let’s Connect</h2>
        <p className="panel-kicker">Planning an event? Let’s make it memorable.</p>
        <p className="panel-body">
          Whether it’s a wedding, celebration, corporate event, or special occasion, Vibe Makers brings together
          creative décor, entertainment, production, and event solutions to create a complete experience.
        </p>
      </div>

      <div className="contact-card">
        <img src="/images/icon-phone.png" alt="" width="33" height="33" className="contact-icon" />
        <span className="contact-label">Call Us :</span>
        <span className="contact-value">
          <a href="tel:9514407188">9514407188</a>,{" "}
          <a href="tel:9597950143">9597950143</a>
        </span>

        <img src="/images/icon-web.png" alt="" width="33" height="33" className="contact-icon" />
        <span className="contact-label">Get in Touch :</span>
        <span className="contact-value">
          <a href="https://www.vibemakers.in" target="_blank" rel="noopener noreferrer">www.vibemakers.in</a>
        </span>

        <img src="/images/icon-instagram.png" alt="" width="33" height="33" className="contact-icon" />
        <span className="contact-label">Follow Us :</span>
        <span className="contact-value">
          <a href="https://www.instagram.com/vibe_makers_events/" target="_blank"
            rel="noopener noreferrer">vibe_makers_events</a>
        </span>

        <img src="/images/icon-pin.png" alt="" width="33" height="33" className="contact-icon" />
        <span className="contact-label">Visite Us :</span>
        <span className="contact-value">
          <a href="https://www.google.com/maps/search/?api=1&query=4%2F379%2C%20Sri%20Subha%20Complex%2C%20Kullampalayam%20Pirivu%2C%20Gobichettipalayam%20-%20638476"
            target="_blank" rel="noopener noreferrer">
            4/379, Sri Subha Complex, Kullampalayam Pirivu,<br />
            Gobichettipalayam - 638476
          </a>
        </span>
      </div>

      <p className="contact-wordmark">Vibe Makers</p>
      <p className="contact-tagline">Event Production · Event Decor · Custom Decor · Entertainment</p>
    </section>
  );
}
