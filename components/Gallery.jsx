"use client";
import { useState } from "react";

const galleryImages = [
  "/images/hero-left.png",
  "/images/hero-center.png",
  "/images/hero-right.png",
  "/images/led-screen.png",
  "/images/hero-center.png",
  "/images/hero-left.png",
  "/images/hero-right.png",
  "/images/led-screen.png",
  "/images/hero-center.png",
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImgSrc, setLightboxImgSrc] = useState("");

  const openLightbox = (src) => {
    setLightboxImgSrc(src);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <section className="gallery" id="gallery">
        <div className="gallery-panel">
          <h2>Gallery</h2>
          <div className="gallery-window" id="galleryWindow">
            <div className="gallery-grid">
              {galleryImages.map((src, idx) => (
                <button 
                  key={idx}
                  className="gallery-tile" 
                  type="button" 
                  style={{ backgroundImage: `url('${src}')` }}
                  aria-label={`Open gallery image ${idx + 1}`}
                  onClick={() => openLightbox(src)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {!lightboxOpen ? null : (
        <div className="lightbox" id="lightbox" onClick={(e) => {
          if (e.target.className === "lightbox") closeLightbox();
        }}>
          <button className="lightbox-close" type="button" aria-label="Close gallery preview" onClick={closeLightbox}>&times;</button>
          <img id="lightboxImg" alt="Gallery preview" src={lightboxImgSrc} />
        </div>
      )}
    </>
  );
}
