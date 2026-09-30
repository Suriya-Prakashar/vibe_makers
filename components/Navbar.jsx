"use client";

export default function Navbar({ activeSection, onNavClick }) {
  return (
    <header className="header" id="header">
      <a className="logo" href="#home" aria-label="Vibe Makers home" onClick={(e) => onNavClick(e, "home")}>
        <img className="logo-icon" src="/images/logo.png" alt="" height="56" />
        <img className="logo-wordmark" src="/images/logo-text.png" alt="Vibe Makers" width="208" height="32" />
      </a>
      <nav className="nav" aria-label="Primary">
        {["home", "about", "services", "gallery", "contact"].map((id) => (
          <a
            key={id}
            className={`nav-link ${activeSection === id ? "is-active" : ""}`}
            href={`#${id}`}
            onClick={(e) => onNavClick(e, id)}
          >
            {id.toUpperCase()}
          </a>
        ))}
      </nav>
    </header>
  );
}
