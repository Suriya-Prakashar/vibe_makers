"use client";
import { useEffect, useRef } from "react";

const servicesData = [
  {
    title: "Backdrop Decors",
    image: "/images/Backdrop Decors.png",
    headline: "Designs that set the stage for memories.",
    body: "Transform your venue with customized backdrops, premium fabrics, floral arrangements, lighting, and decorative elements designed around your event theme.",
    highlights: "Custom Concepts · Premium Materials · Floral Decor · Lighting"
  },
  {
    title: "Plate Decors",
    image: "/images/Plate Decors.png",
    headline: "Handcrafted beauty made to impress.",
    body: "Beautiful decorative plate arrangements created with carefully selected materials, flowers, and customized designs to complement your celebration.",
    highlights: "Handcrafted · Premium Materials · Customized Designs · Attention to Detail "
  },
  {
    title: "DJ and Audio",
    image: "images/DJ and Audio.png",
    headline: "Feel the beat. Live the moment.",
    body: "Professional DJ and audio solutions with quality sound systems, experienced DJs, professional setup, and customized playlists for your event.",
    highlights: "Premium Audio · Experienced DJs · Professional Setup · Custom Playlists"
  },
  {
    title: "Event Props",
    image: "/images/Event Props.png",
    headline: "Turn your event into a visual experience.",
    body: "Creative props designed to bring your theme to life, from custom concepts and premium materials to complete setup and installation.",
    highlights: "Custom Designs · Theme-Based Props · Premium Materials · Setup & Installation"
  },
  {
    title: "Drone Shoot",
    image: "/images/Drone Shoot.png",
    headline: "See your moments from a whole new height.",
    body: "Capture your celebration from a cinematic aerial perspective with high-resolution footage, creative angles, and professional stabilization.",
    highlights: "Aerial Views · Cinematic Shots · High Quality · Creative Angles"
  },
  {
    title: "360° Photo",
    image: "/images/360° Photo.png",
    headline: "Capture every angle. Cherish every moment.",
    body: "An interactive 360° photo experience that lets guests create dynamic videos and instantly share their memorable moments.",
    highlights: "360° Booth · Slow Motion · Instant Sharing · Interactive Experience"
  },
  {
    title: "Instant Photo Frame",
    image: "/images/Instant Photo Frame.png",
    headline: "Instant memories, in your hands.",
    body: "Give your guests a tangible memory with high-quality instant prints, customized frames, and personalized designs.",
    highlights: "Instant Prints · High Quality · Custom Frames · Personalized Touch"
  },
  {
    title: "Resin Art",
    image: "/images/Resin Art.png",
    headline: "Art that captures moments. Beauty that lasts.",
    body: "Handcrafted resin creations designed to preserve memories through elegant, durable, and personalized artwork.",
    highlights: "Handmade · Durable · Customizable · Personalized Designs "
  },
  {
    title: "Return Gifts",
    image: "/images/Return Gifts.png",
    headline: "Gifts that express gratitude.",
    body: "Thoughtfully selected and customized return gifts, beautifully packaged to leave a lasting impression on your guests.",
    highlights: "Thoughtful Gifts · Premium Packaging · Custom Options · Quality Assured"
  },
  {
    title: "Catering",
    image: "/images/(Catering).png",
    headline: "Delicious food. Perfectly served.",
    body: "Delicious and tailored culinary experiences sure to delight your guests, featuring diverse menus and impeccable presentation.",
    highlights: "Quality Food · Hygiene & Freshness · Professional Service · Timely Service"
  },
  {
    title: "Censent",
    image: "/images/Censent.png",
    headline: "Powering your events without interruption.",
    body: "Reliable power backup solutions designed to keep your event running smoothly with high-capacity generators, dependable operation, and professional support.",
    highlights: "High Capacity · Silent Operation · Reliable Power · Event Support"
  },
  {
    title: "LED Screens",
    image: "/images/LED Screens.png",
    headline: "Brighter visuals. Bigger impact.",
    body: "High-resolution LED screen solutions designed to make your event visuals stand out with seamless displays, creative configurations, and reliable performance.",
    highlights: "High Resolution · Seamless Display · Custom Configurations · Professional Setup"
  }
];

export default function Services({ scale }) {
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const sliderRef = useRef(null);
  const introRef = useRef(null);

  useEffect(() => {
    const updateServiceScroll = () => {
      if (!trackRef.current || !stickyRef.current || !sliderRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const stickOffsetPx = 127.5 * scale;
      const scrolledPx = stickOffsetPx - rect.top;

      if (introRef.current) {
        const fadeStart = 300 * scale;
        if (scrolledPx < -fadeStart) {
          introRef.current.style.opacity = 1;
          introRef.current.style.transform = `translateY(0px)`;
        } else if (scrolledPx < 0) {
          const progress = 1 - (-scrolledPx / fadeStart);
          introRef.current.style.opacity = 1 - progress;
          introRef.current.style.transform = `translateY(${-30 * progress}px)`;
        } else {
          introRef.current.style.opacity = 0;
          introRef.current.style.transform = `translateY(-30px)`;
        }
      }

      let translateY = scrolledPx / scale;
      const maxTranslateY = trackRef.current.offsetHeight - stickyRef.current.offsetHeight;
      translateY = Math.max(0, Math.min(translateY, maxTranslateY));
      
      stickyRef.current.style.transform = `translateY(${translateY}px)`;
      
      let progress = maxTranslateY > 0 ? translateY / maxTranslateY : 0;
      const totalHorizontalScroll = (servicesData.length - 1) * 1080;
      const translateX = progress * totalHorizontalScroll;
      
      sliderRef.current.style.transform = `translateX(-${translateX}px)`;
    };

    window.addEventListener("scroll", updateServiceScroll, { passive: true });
    window.addEventListener("resize", updateServiceScroll);
    updateServiceScroll();
    
    return () => {
      window.removeEventListener("scroll", updateServiceScroll);
      window.removeEventListener("resize", updateServiceScroll);
    };
  }, [scale]);

  useEffect(() => {
    const featureObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    }, { threshold: 0.3 });

    const features = document.querySelectorAll('.service-feature');
    features.forEach(feature => featureObserver.observe(feature));

    return () => {
      features.forEach(feature => featureObserver.unobserve(feature));
    };
  }, []);

  return (
    <section className="services" id="services">
      <div className="panel panel--intro" ref={introRef}>
        <h2>Services We Provide</h2>
        <p className="panel-kicker">Everything You Need to Create an Unforgettable Event</p>
        <p className="panel-body">
          From stunning visuals and décor to entertainment, photography, catering, and event infrastructure, Vibe
          Makers brings every essential service together with professional execution and creative detail.
        </p>
      </div>

      <div className="services-scroll-track" id="servicesTrack" ref={trackRef}>
        <div className="service-sticky-container" id="serviceSticky" ref={stickyRef}>
          <div className="service-slider" id="serviceSlider" ref={sliderRef}>
            {servicesData.map((s, idx) => (
              <div className="service-feature" key={idx}>
                <div className="service-visual">
                  <img className="stage-glow" src="/images/stage-glow.png" alt="" />
                  <img className="stage-platform" src="/images/stage-platform.png" alt="" />
                  <div className="led-frame">
                    <div className="led-bar"></div>
                    <div className="led-photo">
                      <img src={s.image} alt="" />
                    </div>
                    <div className="led-bar"></div>
                  </div>
                  <h3>{s.title}</h3>
                </div>
                <div className="service-copy">
                  <p className="service-headline">{s.headline}</p>
                  <p className="service-body">{s.body}</p>
                  <p className="service-highlights-label">Highlights:</p>
                  <p className="service-highlights-text">{s.highlights}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
