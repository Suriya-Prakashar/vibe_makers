"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const heroSlides = [
  { src: "/images/hero-left.png", alt: "Wedding altar decorated with balloons" },
  { src: "/images/hero-center.png", alt: "Floral tablescape" },
  { src: "/images/hero-right.png", alt: "Guests at a formal event" },
];

function wrapIndex(value, length) {
  return (value + length) % length;
}

function crossfadeImage(imgEl, newSrc, newAlt) {
  if (!imgEl || imgEl.getAttribute("src") === newSrc) return;
  
  imgEl.parentNode.querySelectorAll('.crossfade-clone').forEach(c => c.remove());
  
  const clone = imgEl.cloneNode();
  clone.removeAttribute("id");
  clone.className = "crossfade-clone";
  clone.style.position = "absolute";
  clone.style.top = "0";
  clone.style.left = "0";
  clone.style.zIndex = "2";
  clone.style.transition = "opacity 0.8s ease-in-out";
  clone.style.opacity = "1";
  
  imgEl.parentNode.appendChild(clone);
  
  imgEl.src = newSrc;
  if (newAlt !== undefined) imgEl.alt = newAlt;
  
  void clone.offsetWidth;
  clone.style.opacity = "0";
  
  setTimeout(() => {
    if (clone.parentNode) clone.remove();
  }, 800);
}

export default function Hero() {
  const [heroIndex, setHeroIndex] = useState(1);
  const stageRef = useRef(null);
  const dragStartX = useRef(0);
  const dragging = useRef(false);
  const timerRef = useRef(null);
  
  const prevImgRef = useRef(null);
  const mainImgRef = useRef(null);
  const nextImgRef = useRef(null);

  const startHeroInterval = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setHeroIndex((prev) => wrapIndex(prev + 1, heroSlides.length));
    }, 3000);
  }, []);

  useEffect(() => {
    startHeroInterval();
    return () => clearInterval(timerRef.current);
  }, [startHeroInterval]);

  useEffect(() => {
    const prev = heroSlides[wrapIndex(heroIndex - 1, heroSlides.length)];
    const current = heroSlides[heroIndex];
    const next = heroSlides[wrapIndex(heroIndex + 1, heroSlides.length)];

    if (prevImgRef.current) crossfadeImage(prevImgRef.current, prev.src);
    if (mainImgRef.current) crossfadeImage(mainImgRef.current, current.src, current.alt);
    if (nextImgRef.current) crossfadeImage(nextImgRef.current, next.src);
  }, [heroIndex]);

  const goHero = (index) => {
    setHeroIndex(wrapIndex(index, heroSlides.length));
    startHeroInterval();
  };

  const handlePointerDown = (e) => {
    clearInterval(timerRef.current);
    dragging.current = true;
    dragStartX.current = e.clientX;
    if (stageRef.current) {
      stageRef.current.classList.add("is-dragging");
      stageRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerUp = (e) => {
    if (!dragging.current) return;
    const delta = e.clientX - dragStartX.current;
    dragging.current = false;
    if (stageRef.current) stageRef.current.classList.remove("is-dragging");
    
    if (delta > 45) goHero(heroIndex - 1);
    if (delta < -45) goHero(heroIndex + 1);
  };

  const handlePointerCancel = () => {
    dragging.current = false;
    if (stageRef.current) stageRef.current.classList.remove("is-dragging");
    startHeroInterval();
  };

  return (
    <section className="hero" id="home">
      <div 
        className="hero-stage" 
        id="heroStage"
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <button 
          className="hero-shot hero-shot--side hero-shot--left" 
          type="button" 
          id="heroPrev"
          aria-label="Previous slide"
          onClick={() => goHero(heroIndex - 1)}
        >
          <img id="heroPrevImg" ref={prevImgRef} src={heroSlides[0].src} alt="" />
        </button>
        <figure className="hero-shot hero-shot--center">
          <img id="heroMainImg" ref={mainImgRef} src={heroSlides[1].src} alt={heroSlides[1].alt} />
        </figure>
        <button 
          className="hero-shot hero-shot--side hero-shot--right" 
          type="button" 
          id="heroNext"
          aria-label="Next slide"
          onClick={() => goHero(heroIndex + 1)}
        >
          <img id="heroNextImg" ref={nextImgRef} src={heroSlides[2].src} alt="" />
        </button>
      </div>

      <div className="hero-copy">
        <h1>We Create . You Celebrate</h1>
        <p className="hero-pills">
          <span>Event</span>
          <img src="/images/dot.svg" alt="" width="6" height="6" />
          <span>Entertainment</span>
          <img src="/images/dot.svg" alt="" width="6" height="6" />
          <span>Memories</span>
        </p>
      </div>

      <div className="hero-slider" role="tablist" aria-label="Hero slides">
        {[0, 1, 2].map((idx) => (
          <button 
            key={idx}
            className={`slider-dot ${heroIndex === idx ? "is-active" : ""}`} 
            type="button" 
            aria-label={`Slide ${idx + 1}`}
            onClick={() => goHero(idx)}
          />
        ))}
      </div>

      <p className="hero-lede">
        We transform your ideas into stunning experiences designed to make every celebration unforgettable.<br />
        From creative decor to complete event solutions
      </p>
    </section>
  );
}
