"use client";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Brands from "../components/Brands";
import About from "../components/About";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";

export default function Home() {
  const [scale, setScale] = useState(1);
  const [activeSection, setActiveSection] = useState("home");
  const wrapRef = useRef(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const scalePage = () => {
      if (!wrapRef.current || !pageRef.current) return;
      const scaleX = window.innerWidth / 1080;
      const newScale = Math.min(1, scaleX);
      setScale(newScale);
      
      pageRef.current.style.transform = `scale(${newScale})`;
      pageRef.current.style.setProperty('--scale', newScale);
      wrapRef.current.style.height = `${pageRef.current.scrollHeight * newScale}px`;
    };

    const setActiveNav = () => {
      if (!pageRef.current) return;
      const sections = ["home", "about", "services", "gallery", "contact"].map(id => document.getElementById(id));
      const y = window.scrollY / scale + 165;
      let current = "home";
      for (const section of sections) {
        if (section && section.offsetTop <= y) current = section.id;
      }
      setActiveSection(current);
    };

    const onResize = () => {
      scalePage();
      setActiveNav();
    };

    const onScroll = () => {
      setActiveNav();
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial calls
    scalePage();
    setTimeout(() => {
      scalePage();
      setActiveNav();
    }, 100);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scale]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({ top: target.offsetTop * scale, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />
      <div className="scale-wrap" ref={wrapRef}>
        <div className="page" id="page" ref={pageRef}>
          <Hero />
          <Brands />
          <About />
          <Services scale={scale} />
          <Gallery />
          <Contact />
        </div>
      </div>
    </>
  );
}
