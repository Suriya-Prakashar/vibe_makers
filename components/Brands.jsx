export default function Brands() {
  return (
    <section className="brands" aria-label="Partner logos">
      <div className="brands-viewport">
        <div className="brands-track" id="brandsTrack">
          <div className="brands-row">
            <img src="/images/brand-focus.png" alt="Focus Visuals" />
            <img src="/images/brand-thabagai.png" alt="Thabagai" />
            <img src="/images/brand-sounds.png" alt="Sounds Good" />
            <img src="/images/brand-nellikuppam.png" alt="Nellikuppam" />
            <img src="/images/brand-resin.png" alt="Resin D'Aisance" />
          </div>
          <div className="brands-row" aria-hidden="true">
            <img src="/images/brand-focus.png" alt="" />
            <img src="/images/brand-thabagai.png" alt="" />
            <img src="/images/brand-sounds.png" alt="" />
            <img src="/images/brand-nellikuppam.png" alt="" />
            <img src="/images/brand-resin.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
