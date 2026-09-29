const page = document.getElementById("page");
const wrap = document.querySelector(".scale-wrap");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = ["home", "about", "services", "gallery", "contact"].map((id) =>
  document.getElementById(id)
);
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

const heroSlides = [
  {
    src: "/images/hero-left.png",
    alt: "Wedding altar decorated with balloons",
  },
  {
    src: "/images/hero-center.png",
    alt: "Floral tablescape",
  },
  {
    src: "/images/hero-right.png",
    alt: "Guests at a formal event",
  },
];

const services = [
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

let heroIndex = 1;
let serviceIndex = 0;
let scale = 1;

function scalePage() {
  const scaleX = window.innerWidth / 1080;
  scale = Math.min(1, scaleX);
  page.style.transform = `scale(${scale})`;
  page.style.setProperty('--scale', scale);
  wrap.style.height = `${page.scrollHeight * scale}px`;
}

function setActiveNav() {
  const y = window.scrollY / scale + 165;
  let current = "home";
  for (const section of sections) {
    if (section.offsetTop <= y) current = section.id;
  }
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
}

function wrapIndex(value, length) {
  return (value + length) % length;
}

function crossfadeImage(imgEl, newSrc, newAlt) {
  if (imgEl.getAttribute("src") === newSrc) return;
  
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

function renderHero() {
  const prev = heroSlides[wrapIndex(heroIndex - 1, heroSlides.length)];
  const current = heroSlides[heroIndex];
  const next = heroSlides[wrapIndex(heroIndex + 1, heroSlides.length)];

  crossfadeImage(document.getElementById("heroPrevImg"), prev.src);
  crossfadeImage(document.getElementById("heroMainImg"), current.src, current.alt);
  crossfadeImage(document.getElementById("heroNextImg"), next.src);

  document.querySelectorAll(".slider-dot").forEach((dot) => {
    dot.classList.toggle("is-active", Number(dot.dataset.slide) === heroIndex);
  });
}

let heroInterval;
function startHeroInterval() {
  clearInterval(heroInterval);
  heroInterval = setInterval(() => {
    goHero(heroIndex + 1);
  }, 3000);
}

function goHero(index) {
  heroIndex = wrapIndex(index, heroSlides.length);
  renderHero();
  startHeroInterval();
}

// Initialize horizontal slider content
const slider = document.getElementById("serviceSlider");
if (slider && services.length > 0) {
  slider.innerHTML = services.map(s => `
    <div class="service-feature">
      <div class="service-visual">
        <img class="stage-glow" src="/images/stage-glow.png" alt="" />
        <img class="stage-platform" src="/images/stage-platform.png" alt="" />
        <div class="led-frame">
          <div class="led-bar"></div>
          <div class="led-photo">
            <img src="${s.image}" alt="" />
          </div>
          <div class="led-bar"></div>
        </div>
        <h3>${s.title}</h3>
      </div>
      <div class="service-copy">
        <p class="service-headline">${s.headline}</p>
        <p class="service-body">${s.body}</p>
        <p class="service-highlights-label">Highlights:</p>
        <p class="service-highlights-text">${s.highlights}</p>
      </div>
    </div>
  `).join('');
}

function updateServiceScroll() {
  const track = document.getElementById("servicesTrack");
  const feature = document.getElementById("serviceSticky");
  const slider = document.getElementById("serviceSlider");
  if (!track || !feature || !slider) return;

  const rect = track.getBoundingClientRect();

  // The fixed header takes up 111px (92.25px height + 18.75px top offset).
  // We want the feature to stick safely below the header so the title isn't blocked.
  const stickOffsetPx = 127.5 * scale;

  // How many real pixels we have scrolled past the sticky point
  const scrolledPx = stickOffsetPx - rect.top;

  // Intro panel scroll-driven fade out and up
  const intro = document.querySelector("#services .panel--intro");
  if (intro) {
    const fadeStart = 300 * scale;
    if (scrolledPx < -fadeStart) {
      intro.style.opacity = 1;
      intro.style.transform = `translateY(0px)`;
    } else if (scrolledPx < 0) {
      const progress = 1 - (-scrolledPx / fadeStart); // 0 to 1
      intro.style.opacity = 1 - progress;
      intro.style.transform = `translateY(${-30 * progress}px)`;
    } else {
      intro.style.opacity = 0;
      intro.style.transform = `translateY(-30px)`;
    }
  }

  // Convert real scrolled pixels to unscaled coordinate space
  let translateY = scrolledPx / scale;

  // Maximum distance the feature can translate down the track
  const maxTranslateY = track.offsetHeight - feature.offsetHeight;

  // Clamp translation between 0 and maxTranslateY
  translateY = Math.max(0, Math.min(translateY, maxTranslateY));

  // Apply translation to simulate sticky vertically
  feature.style.transform = `translateY(${translateY}px)`;

  // Map progress (0 to 1) for horizontal scroll
  let progress = maxTranslateY > 0 ? translateY / maxTranslateY : 0;

  // Translate the horizontal slider by the number of items - 1
  const totalHorizontalScroll = (services.length - 1) * 1080;
  const translateX = progress * totalHorizontalScroll;

  slider.style.transform = `translateX(-${translateX}px)`;
}

// Initial render
updateServiceScroll();

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    window.scrollTo({ top: target.offsetTop * scale, behavior: "smooth" });
  });
});

document.querySelectorAll(".slider-dot").forEach((dot) => {
  dot.addEventListener("click", () => goHero(Number(dot.dataset.slide)));
});

document.getElementById("heroPrev").addEventListener("click", () => goHero(heroIndex - 1));
document.getElementById("heroNext").addEventListener("click", () => goHero(heroIndex + 1));

const stage = document.getElementById("heroStage");
let dragStartX = 0;
let dragging = false;

stage.addEventListener("pointerdown", (event) => {
  clearInterval(heroInterval);
  dragging = true;
  dragStartX = event.clientX;
  stage.classList.add("is-dragging");
  stage.setPointerCapture(event.pointerId);
});

stage.addEventListener("pointerup", (event) => {
  if (!dragging) return;
  const delta = event.clientX - dragStartX;
  dragging = false;
  stage.classList.remove("is-dragging");
  if (delta > 45) goHero(heroIndex - 1);
  if (delta < -45) goHero(heroIndex + 1);
});

stage.addEventListener("pointercancel", () => {
  dragging = false;
  stage.classList.remove("is-dragging");
  startHeroInterval();
});

document.querySelectorAll(".gallery-tile").forEach((tile) => {
  tile.addEventListener("click", () => {
    const url = tile.style.backgroundImage.slice(5, -2);
    lightboxImg.src = url;
    lightbox.hidden = false;
  });
});

document.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.hidden = true;
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.hidden = true;
});

window.addEventListener("resize", () => {
  scalePage();
  setActiveNav();
});
window.addEventListener("scroll", () => {
  setActiveNav();
  updateServiceScroll();
}, { passive: true });

renderHero();
scalePage();
setActiveNav();
updateServiceScroll();
startHeroInterval();

// Intersection Observer for Service Features Animation
const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    } else {
      entry.target.classList.remove('is-visible'); // Re-animates when scrolling back
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.service-feature').forEach(feature => {
  featureObserver.observe(feature);
});
