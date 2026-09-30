export default function About() {
  return (
    <section className="about" id="about">
      <div className="panel panel--intro">
        <h2>About Vibe Makers</h2>
        <p className="panel-kicker">Creating experiences. Delivering every detail with purpose.</p>
        <p className="panel-body">
          Vibe Makers is an event production and décor company focused on creating visually impressive, well-executed
          celebrations. We combine creative ideas, quality equipment, skilled professionals, and carefully planned
          execution to turn every event into a memorable experience.
        </p>
      </div>

      <div className="value-grid">
        <article className="value-card">
          <img src="/images/icon-creative.png" alt="" />
          <h3>Creative Designs</h3>
        </article>
        <article className="value-card">
          <img src="/images/icon-premium.png" alt="" />
          <h3>Premium Quality</h3>
        </article>
        <article className="value-card">
          <img src="/images/icon-seamless.png" alt="" />
          <h3>Seamless Execution</h3>
        </article>
        <article className="value-card">
          <img src="/images/icon-team.png" alt="" />
          <h3>Professional Team</h3>
        </article>
        <article className="value-card">
          <img src="/images/icon-custom.png" alt="" />
          <h3>Custom Solutions</h3>
        </article>
        <article className="value-card">
          <img src="/images/icon-detail.png" alt="" />
          <h3>Attention to Detail</h3>
        </article>
        <article className="value-card">
          <img src="/images/icon-ontime.png" alt="" />
          <h3>On-Time Delivery</h3>
        </article>
        <article className="value-card">
          <img src="/images/icon-support.png" alt="" />
          <h3>Reliable Support</h3>
        </article>
      </div>
    </section>
  );
}
