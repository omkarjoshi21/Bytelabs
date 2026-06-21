import { useEffect, useRef, useState } from "react";
import bytelabsIcon from "../assets/bytelabs-icon-hq.png";
import bytelabsLogo from "../assets/bytelabs-logo-horizontal-hq.png";

const whatsappNumber = "919028679760";
const displayPhone = "9028679760";
const emailAddress = "joshiomkar104@gmail.com";
const instagramUrl = "https://www.instagram.com/omkarjoshi_?igsh=M2xidzlleXMyaXh1";
const whatsappText =
  "Hello ByteLabs, I want to discuss a website/software project. Please contact me.";
const emailSubject = "Project Inquiry for ByteLabs";
const emailBody = "Hello ByteLabs, I want to discuss a website/software project.";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "why", label: "Why Us" },
  { id: "contact", label: "Contact" },
];

const services = [
  {
    title: "Website Development",
    text: "Premium, responsive websites built for performance, clarity, and a strong first impression.",
    tag: "01",
  },
  {
    title: "Web App Development",
    text: "Custom web applications that simplify workflows, data, dashboards, and daily operations.",
    tag: "02",
  },
  {
    title: "UI/UX Design",
    text: "Clean interfaces, smooth journeys, and polished product experiences across every screen size.",
    tag: "03",
  },
  {
    title: "Business Software Solutions",
    text: "Practical management systems designed around real business processes and measurable outcomes.",
    tag: "04",
  },
  {
    title: "Maintenance & Support",
    text: "Reliable updates, improvements, fixes, and ongoing care after your product goes live.",
    tag: "05",
  },
];

const projects = [
  {
    title: "VedCare",
    eyebrow: "Clinic Management Software",
    text: "A standard clinic management software for doctors and clinics with a responsive dashboard and daily workflow tools.",
    features: [
      "Patient records",
      "Appointments",
      "Prescriptions",
      "Billing",
      "Medicine management",
      "Fee summary",
      "Backup/restore",
      "Responsive dashboard",
    ],
  },
  {
    title: "PurohitSeva",
    eyebrow: "Managed Puja Booking Platform",
    text: "A managed priest-service platform for puja bookings with admin controls and smooth request handling.",
    features: [
      "Service requests",
      "Guruji profiles",
      "City/service management",
      "Booking handling",
      "WhatsApp communication",
      "Dakshina management",
      "Admin dashboard",
    ],
  },
];

const strengths = [
  "Mobile-first responsive builds",
  "Premium UI with clear user flows",
  "Business-focused software logic",
  "Fast, clean, maintainable code",
  "Practical dashboards and reports",
  "Support after launch",
];

function ByteLabs({ onBack }) {
  const pageRef = useRef(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const encodedWhatsAppText = encodeURIComponent(whatsappText);
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodedWhatsAppText}`;
  const emailHref = `mailto:${emailAddress}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;
  const hasBack = typeof onBack === "function";

  useEffect(() => {
    const page = pageRef.current;

    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      setIsScrolled(scrollY > 18);

      if (page) {
        page.style.setProperty("--scroll-shift", `${Math.min(scrollY * 0.06, 58).toFixed(2)}px`);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const page = pageRef.current;

    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frame = 0;
    const handlePointerMove = (event) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        page.style.setProperty("--pointer-x", x.toFixed(3));
        page.style.setProperty("--pointer-y", y.toFixed(3));
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useEffect(() => {
    const page = pageRef.current;

    if (!page) {
      return undefined;
    }

    const revealItems = Array.from(page.querySelectorAll(".byte-reveal"));
    const sections = Array.from(page.querySelectorAll("section[id]"));

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.16 }
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-28% 0px -54% 0px", threshold: [0.18, 0.35, 0.6] }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    window.location.href = emailHref;
  };

  return (
    <div className="bytelabs-page" ref={pageRef}>
      <style>{css}</style>

      <div className="byte-bg-grid" aria-hidden="true" />
      <div className="byte-scanline" aria-hidden="true" />
      <div className="byte-orb byte-orb-one" aria-hidden="true" />
      <div className="byte-orb byte-orb-two" aria-hidden="true" />
      <div className="byte-orb byte-orb-three" aria-hidden="true" />

      <header className={`byte-navbar ${isScrolled ? "is-scrolled" : ""}`}>
        <div className="byte-nav-shell">
          <div className="byte-nav-left">
            {hasBack && (
              <button className="byte-back" type="button" onClick={onBack}>
                <span aria-hidden="true">{"<"}</span>
                Back
              </button>
            )}

            <a className="byte-brand" href="#hero" onClick={closeMenu} aria-label="ByteLabs home">
              <span className="byte-brand-mark byte-image-mark">
                <img src={bytelabsIcon} alt="" aria-hidden="true" />
              </span>
              <span>
                <strong>ByteLabs</strong>
                <small>Crafted for Impact.</small>
              </span>
            </a>
          </div>

          <nav className={`byte-nav-links ${isMenuOpen ? "is-open" : ""}`} id="byte-primary-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a
                className={`byte-nav-link ${activeSection === item.id ? "is-active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a className="byte-mobile-cta" href={whatsappHref} target="_blank" rel="noreferrer">
              Start Project
            </a>
          </nav>

          <a className="byte-nav-cta" href={whatsappHref} target="_blank" rel="noreferrer">
            Start Project
          </a>

          <button
            className={`byte-menu ${isMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Toggle navigation menu"
            aria-controls="byte-primary-nav"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="byte-hero" id="hero">
          <div className="byte-hero-copy byte-reveal slide-left">
            <p className="byte-kicker">Software Company / Digital Products</p>
            <h1>
              ByteLabs
              <span>Crafted for Impact.</span>
            </h1>
            <p className="byte-hero-text">
              ByteLabs builds premium websites, web applications, dashboards, and business software that look sharp,
              feel smooth, and solve real operational problems.
            </p>

            <div className="byte-actions" aria-label="Primary contact actions">
              <a className="byte-button byte-button-primary" href={whatsappHref} target="_blank" rel="noreferrer">
                Discuss on WhatsApp
              </a>
              <a className="byte-button byte-button-secondary" href="#projects">
                View Portfolio
              </a>
            </div>

            <div className="byte-hero-stats" aria-label="ByteLabs focus areas">
              <div>
                <strong>5+</strong>
                <span>Core Services</span>
              </div>
              <div>
                <strong>2</strong>
                <span>Featured Builds</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Responsive Focus</span>
              </div>
            </div>
          </div>

          <div className="byte-hero-visual byte-reveal slide-right" aria-label="ByteLabs product preview">
            <div className="byte-radar" aria-hidden="true" />
            <div className="byte-product-window">
              <div className="byte-window-top">
                <span />
                <span />
                <span />
                <em>ByteLabs OS</em>
              </div>
              <div className="byte-dashboard-brand">
                <img src={bytelabsLogo} alt="ByteLabs - Crafted for Impact." />
              </div>
              <div className="byte-dashboard-grid">
                <div className="byte-dashboard-panel panel-wide">
                  <small>Project Flow</small>
                  <div className="byte-flow-line">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="byte-dashboard-panel">
                  <small>UI Polish</small>
                  <strong>98%</strong>
                </div>
                <div className="byte-dashboard-panel">
                  <small>Speed</small>
                  <strong>Fast</strong>
                </div>
                <div className="byte-dashboard-panel panel-wide">
                  <small>Launch Stack</small>
                  <div className="byte-bars">
                    <span style={{ "--w": "82%" }} />
                    <span style={{ "--w": "64%" }} />
                    <span style={{ "--w": "92%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="byte-float-card float-one">
              <span>UI/UX</span>
              <strong>Clean interfaces</strong>
            </div>
            <div className="byte-float-card float-two">
              <span>Systems</span>
              <strong>Business ready</strong>
            </div>
          </div>
        </section>

        <section className="byte-section byte-about" id="about">
          <div className="byte-section-copy byte-reveal slide-left">
            <p className="byte-kicker">About ByteLabs</p>
            <h2>Modern software crafted with clarity, speed, and purpose.</h2>
          </div>
          <div className="byte-about-panel byte-reveal slide-right">
            <p>
              ByteLabs is owned by Omkar Joshi and focuses on turning ideas into polished digital products. From a
              public website to a complete business dashboard, every build is shaped around usability, performance, and
              long-term value.
            </p>
            <div className="byte-founder-strip">
              <span className="byte-brand-mark byte-image-mark">
                <img src={bytelabsIcon} alt="" aria-hidden="true" />
              </span>
              <div>
                <strong>Omkar Joshi</strong>
                <small>Owner / Software Creator</small>
              </div>
            </div>
          </div>
        </section>

        <section className="byte-section byte-services" id="services">
          <div className="byte-section-heading byte-reveal fade-up">
            <p className="byte-kicker">Services</p>
            <h2>Advanced digital services for growing businesses.</h2>
          </div>

          <div className="byte-card-grid">
            {services.map((service, index) => (
              <article
                className="byte-glass-card byte-service-card byte-reveal scale-in"
                key={service.title}
                style={{ "--delay": `${index * 80}ms` }}
              >
                <span className="byte-card-tag">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="byte-section byte-projects" id="projects">
          <div className="byte-section-heading byte-reveal fade-up">
            <p className="byte-kicker">Projects / Portfolio</p>
            <h2>Premium software concepts built for real operations.</h2>
          </div>

          <div className="byte-project-grid">
            {projects.map((project, index) => (
              <article
                className="byte-project-card byte-reveal fade-up"
                key={project.title}
                style={{ "--delay": `${index * 120}ms` }}
              >
                <div className="byte-project-top">
                  <span>{project.eyebrow}</span>
                  <b>{index + 1 < 10 ? `0${index + 1}` : index + 1}</b>
                </div>
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <div className="byte-feature-cloud">
                  {project.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="byte-section byte-why" id="why">
          <div className="byte-section-copy byte-reveal slide-left">
            <p className="byte-kicker">Why Choose ByteLabs</p>
            <h2>Strategy, interface, and software logic in one focused build.</h2>
          </div>

          <div className="byte-strength-grid">
            {strengths.map((strength, index) => (
              <div
                className="byte-strength-item byte-reveal slide-right"
                key={strength}
                style={{ "--delay": `${index * 70}ms` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{strength}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="byte-section byte-contact" id="contact">
          <div className="byte-contact-copy byte-reveal slide-left">
            <p className="byte-kicker">Contact</p>
            <h2>Ready to build a website or software project?</h2>
            <p>
              Reach ByteLabs directly for a clean, professional digital product that fits your workflow and growth
              goals.
            </p>

            <div className="byte-contact-buttons" aria-label="Contact ByteLabs">
             
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={emailHref}>Email</a>
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>

          <form className="byte-contact-form byte-reveal slide-right" onSubmit={handleContactSubmit}>
            <label>
              <span>Your name</span>
              <input type="text" name="name" placeholder="Your name" autoComplete="name" />
            </label>
            <label>
              <span>Project type</span>
              <input type="text" name="project" placeholder="Website, app, dashboard..." />
            </label>
            <label>
              <span>Project note</span>
              <textarea name="message" rows="4" placeholder="Share a short project idea" />
            </label>
            <button className="byte-button byte-button-primary" type="submit">
              Open Email Draft
            </button>
          </form>
        </section>
      </main>

      <footer className="byte-footer">
        <div className="byte-footer-brand">
          <span className="byte-brand-mark byte-image-mark">
            <img src={bytelabsIcon} alt="" aria-hidden="true" />
          </span>
          <div>
            <strong>ByteLabs</strong>
            <small>Crafted for Impact.</small>
          </div>
        </div>

        <div className="byte-footer-links">
          <a href={`tel:+${whatsappNumber}`}>Call</a>
          <a href={emailHref}>E-mail</a>
          <a href={instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>

        <p>Owned by Omkar Joshi. Premium websites, web apps, and business software.</p>
      </footer>
    </div>
  );
}

const css = `
  html {
    scroll-behavior: smooth;
  }

  .bytelabs-page {
    --bg: #02050c;
    --panel: rgba(8, 18, 31, 0.68);
    --panel-strong: rgba(11, 27, 43, 0.82);
    --line: rgba(148, 248, 255, 0.16);
    --line-strong: rgba(125, 249, 255, 0.34);
    --text: #f5fbff;
    --muted: #a7b8c8;
    --soft: #d8f7ff;
    --cyan: rgb(132, 180, 186);
    --teal: #2dd4bf;
    --green: #a7f3d0;
    --blue: #60a5fa;
    --shadow: 0 24px 90px rgba(0, 0, 0, 0.38);
    --radius-xl: 28px;
    --radius-lg: 20px;
    --pointer-x: 0;
    --pointer-y: 0;
    --scroll-shift: 0px;
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
    color: var(--text);
    background:
      radial-gradient(circle at 16% 12%, rgba(45, 212, 191, 0.18), transparent 30%),
      radial-gradient(circle at 82% 18%, rgba(96, 165, 250, 0.15), transparent 28%),
      radial-gradient(circle at 55% 92%, rgba(103, 232, 249, 0.10), transparent 30%),
      linear-gradient(135deg, #02050c 0%, #041016 48%, #020409 100%);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .bytelabs-page *,
  .bytelabs-page *::before,
  .bytelabs-page *::after {
    box-sizing: border-box;
  }

  .bytelabs-page a {
    color: inherit;
  }

  .byte-bg-grid,
  .byte-scanline,
  .byte-orb {
    position: fixed;
    pointer-events: none;
    z-index: 0;
  }

  .byte-bg-grid {
    inset: 0;
    opacity: 0.17;
    background-image:
      linear-gradient(rgba(148, 248, 255, 0.12) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 248, 255, 0.12) 1px, transparent 1px);
    background-size: 52px 52px;
    mask-image: linear-gradient(to bottom, black 0%, black 58%, transparent 92%);
    transform: translate3d(
      calc(var(--pointer-x) * -12px),
      calc((var(--scroll-shift) * -0.5) + (var(--pointer-y) * -12px)),
      0
    );
  }

  .byte-scanline {
    inset: 0;
    opacity: 0.08;
    background: linear-gradient(to bottom, transparent 0 49%, rgba(255,255,255,0.35) 50%, transparent 51% 100%);
    background-size: 100% 7px;
    mix-blend-mode: screen;
  }

  .byte-orb {
    width: 310px;
    height: 310px;
    border-radius: 999px;
    filter: blur(28px);
    opacity: 0.52;
    animation: byteFloat 9s ease-in-out infinite;
  }

  .byte-orb-one {
    top: 8%;
    right: 8%;
    background: rgba(103, 232, 249, 0.22);
    transform: translate3d(calc(var(--pointer-x) * 26px), calc(var(--scroll-shift) * -0.5), 0);
  }

  .byte-orb-two {
    left: 2%;
    top: 46%;
    width: 260px;
    height: 260px;
    background: rgba(45, 212, 191, 0.18);
    animation-delay: -2s;
    transform: translate3d(calc(var(--pointer-x) * -20px), calc(var(--scroll-shift) * -0.35), 0);
  }

  .byte-orb-three {
    right: 24%;
    bottom: 8%;
    width: 220px;
    height: 220px;
    background: rgba(96, 165, 250, 0.15);
    animation-delay: -4s;
    transform: translate3d(calc(var(--pointer-y) * 18px), calc(var(--scroll-shift) * -0.25), 0);
  }

  .byte-navbar {
    position: sticky;
    top: 14px;
    z-index: 20;
    max-width: 1180px;
    margin: 0 auto;
    padding: 14px clamp(16px, 3vw, 28px) 0;
  }

  .byte-nav-shell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 70px;
    padding: 10px 12px;
    border: 1px solid transparent;
    border-radius: 999px;
    background: rgba(2, 8, 15, 0.22);
    transition:
      background 260ms ease,
      border-color 260ms ease,
      box-shadow 260ms ease,
      backdrop-filter 260ms ease;
  }

  .byte-navbar.is-scrolled .byte-nav-shell {
    border-color: rgba(148, 248, 255, 0.16);
    background: rgba(2, 8, 15, 0.78);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(20px);
  }

  .byte-nav-left,
  .byte-brand,
  .byte-footer-brand {
    display: flex;
    align-items: center;
  }

  .byte-nav-left {
    gap: 10px;
    min-width: 0;
  }

  .byte-back {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 42px;
    padding: 0 14px;
    border: 1px solid rgba(148, 248, 255, 0.17);
    border-radius: 999px;
    color: var(--soft);
    background: rgba(255, 255, 255, 0.05);
    font: inherit;
    font-weight: 800;
    cursor: pointer;
    transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
  }

  .byte-back:hover,
  .byte-back:focus-visible {
    transform: translateY(-2px);
    border-color: rgba(103, 232, 249, 0.5);
    background: rgba(103, 232, 249, 0.10);
    outline: none;
  }

  .byte-brand,
  .byte-footer-brand {
    gap: 11px;
    text-decoration: none;
  }

  .byte-brand-mark {
    position: relative;
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    flex: 0 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.24);
    border-radius: 14px;
    color: #001114;
    background:
      linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.1)) padding-box,
      linear-gradient(135deg, var(--cyan), var(--teal), var(--blue)) border-box;
    box-shadow: 0 0 28px rgba(103, 232, 249, 0.28);
    font-size: 22px;
    font-weight: 1000;
    overflow: hidden;
  }

  .byte-brand-mark::after {
    content: "";
    position: absolute;
    inset: 6px;
    border-right: 2px solid rgba(2, 8, 15, 0.48);
    border-bottom: 2px solid rgba(2, 8, 15, 0.48);
    border-radius: 0 0 8px 0;
  }

  .byte-image-mark {
    padding: 0;
    background: #02050c;
    box-shadow:
      0 0 0 1px rgba(103, 232, 249, 0.24) inset,
      0 0 28px rgba(103, 232, 249, 0.24);
  }

  .byte-image-mark::after {
    display: none;
  }

  .byte-image-mark img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
    display: block;
  }

  .byte-brand strong,
  .byte-footer-brand strong {
    display: block;
    margin-bottom: 1px;
    font-size: 16px;
    letter-spacing: 0.2px;
  }

  .byte-brand small,
  .byte-footer-brand small {
    display: block;
    color: var(--muted);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.9px;
    text-transform: uppercase;
  }

  .byte-nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .byte-nav-link {
    position: relative;
    padding: 10px 12px;
    border-radius: 999px;
    color: #b9c8d7;
    font-size: 13px;
    font-weight: 850;
    text-decoration: none;
    transition: color 200ms ease, background 200ms ease, transform 200ms ease;
  }

  .byte-nav-link::after {
    content: "";
    position: absolute;
    left: 18%;
    right: 18%;
    bottom: 6px;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--cyan), var(--teal));
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 220ms ease;
  }

  .byte-nav-link:hover,
  .byte-nav-link:focus-visible,
  .byte-nav-link.is-active {
    color: var(--text);
    background: rgba(103, 232, 249, 0.08);
    outline: none;
  }

  .byte-nav-link:hover::after,
  .byte-nav-link:focus-visible::after,
  .byte-nav-link.is-active::after {
    transform: scaleX(1);
  }

  .byte-nav-cta,
  .byte-mobile-cta,
  .byte-button,
  .byte-contact-buttons a {
    position: relative;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    font-weight: 950;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    transition:
      transform 220ms ease,
      box-shadow 220ms ease,
      border-color 220ms ease,
      background 220ms ease;
  }

  .byte-nav-cta,
  .byte-mobile-cta,
  .byte-button-primary {
    color: #001114;
    background: linear-gradient(135deg, #ffffff 0%, var(--cyan) 42%, var(--green) 100%);
    box-shadow: 0 16px 38px rgba(45, 212, 191, 0.22);
  }

  .byte-nav-cta {
    padding: 0 18px;
    white-space: nowrap;
  }

  .byte-mobile-cta {
    display: none;
  }

  .byte-button {
    min-height: 50px;
    padding: 0 22px;
    font-size: 15px;
  }

  .byte-button::before,
  .byte-nav-cta::before,
  .byte-mobile-cta::before {
    content: "";
    position: absolute;
    inset: -2px;
    z-index: -1;
    background: linear-gradient(110deg, transparent 0 28%, rgba(255,255,255,0.88) 45%, transparent 62% 100%);
    transform: translateX(-120%) skewX(-18deg);
    transition: transform 620ms ease;
  }

  .byte-button:hover,
  .byte-button:focus-visible,
  .byte-nav-cta:hover,
  .byte-nav-cta:focus-visible,
  .byte-mobile-cta:hover,
  .byte-mobile-cta:focus-visible,
  .byte-contact-buttons a:hover,
  .byte-contact-buttons a:focus-visible {
    transform: translateY(-3px);
    border-color: rgba(167, 243, 208, 0.55);
    box-shadow: 0 20px 52px rgba(45, 212, 191, 0.28);
    outline: none;
  }

  .byte-button:hover::before,
  .byte-button:focus-visible::before,
  .byte-nav-cta:hover::before,
  .byte-nav-cta:focus-visible::before,
  .byte-mobile-cta:hover::before,
  .byte-mobile-cta:focus-visible::before {
    transform: translateX(120%) skewX(-18deg);
  }

  .byte-button:active,
  .byte-nav-cta:active,
  .byte-mobile-cta:active,
  .byte-contact-buttons a:active {
    transform: translateY(-1px) scale(0.98);
  }

  .byte-button-secondary {
    color: var(--text);
    background: rgba(255, 255, 255, 0.06);
    box-shadow: none;
  }

  .byte-actions .byte-button-primary {
    animation: ctaGlow 3.4s ease-in-out infinite;
  }

  .byte-menu {
    display: none;
    place-items: center;
    width: 46px;
    height: 46px;
    border: 1px solid rgba(148, 248, 255, 0.18);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    cursor: pointer;
  }

  .byte-menu span {
    display: block;
    width: 18px;
    height: 2px;
    border-radius: 99px;
    background: var(--text);
    transition: transform 220ms ease, opacity 220ms ease;
  }

  .byte-menu span + span {
    margin-top: 5px;
  }

  .byte-menu.is-open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .byte-menu.is-open span:nth-child(2) {
    opacity: 0;
  }

  .byte-menu.is-open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  main,
  .byte-footer {
    position: relative;
    z-index: 2;
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
  }

  section[id] {
    scroll-margin-top: 110px;
  }

  .byte-hero {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(340px, 0.92fr);
    gap: clamp(18px, 3vw, 28px);
    align-items: stretch;
    min-height: calc(100vh - 108px);
    padding: clamp(38px, 7vw, 88px) 0 34px;
  }

  .byte-hero-copy,
  .byte-hero-visual,
  .byte-section,
  .byte-glass-card,
  .byte-project-card,
  .byte-contact-form {
    border: 1px solid var(--line);
    background:
      linear-gradient(145deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.035)),
      var(--panel);
    box-shadow: var(--shadow);
    backdrop-filter: blur(22px);
  }

  .byte-hero-copy,
  .byte-hero-visual {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-xl);
  }

  .byte-hero-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 610px;
    padding: clamp(28px, 5.2vw, 64px);
  }

  .byte-hero-copy::before,
  .byte-hero-visual::before,
  .byte-section::before,
  .byte-glass-card::before,
  .byte-project-card::before,
  .byte-contact-form::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at 18% 14%, rgba(103, 232, 249, 0.17), transparent 34%),
      radial-gradient(circle at 90% 10%, rgba(45, 212, 191, 0.12), transparent 32%);
    opacity: 0.78;
  }

  .byte-kicker {
    position: relative;
    z-index: 1;
    margin: 0 0 18px;
    color: var(--cyan);
    font-size: 12px;
    font-weight: 1000;
    letter-spacing: 2.3px;
    text-transform: uppercase;
  }

  .byte-hero h1,
  .byte-section h2 {
    position: relative;
    z-index: 1;
    margin: 0;
    color: var(--text);
    letter-spacing: -0.045em;
  }

  .byte-hero h1 {
    max-width: 760px;
    font-size: clamp(54px, 9.4vw, 124px);
    line-height: 0.86;
  }

  .byte-hero h1 span {
    display: block;
    margin-top: 16px;
    font-size: clamp(25px, 4vw, 48px);
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: transparent;
    background: linear-gradient(90deg, var(--soft), var(--cyan), var(--green));
    background-clip: text;
    -webkit-background-clip: text;
  }

  .byte-section h2 {
    font-size: clamp(31px, 5.2vw, 58px);
    line-height: 1;
  }

  .byte-hero-text,
  .byte-about-panel p,
  .byte-contact-copy p {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 24px 0 0;
    color: var(--muted);
    font-size: clamp(16px, 2vw, 20px);
    line-height: 1.75;
  }

  .byte-actions {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 13px;
    margin-top: 34px;
  }

  .byte-hero-stats {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: clamp(28px, 5vw, 54px);
  }

  .byte-hero-stats div {
    min-height: 94px;
    padding: 18px;
    border: 1px solid rgba(148, 248, 255, 0.14);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.055);
    transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
  }

  .byte-hero-stats div:hover {
    transform: translateY(-4px);
    border-color: rgba(103, 232, 249, 0.38);
    background: rgba(103, 232, 249, 0.08);
  }

  .byte-hero-stats strong {
    display: block;
    font-size: clamp(26px, 4vw, 38px);
    line-height: 1;
  }

  .byte-hero-stats span {
    display: block;
    margin-top: 8px;
    color: var(--muted);
    font-size: 13px;
    font-weight: 850;
  }

  .byte-hero-visual {
    min-height: 610px;
    display: grid;
    place-items: center;
    padding: clamp(24px, 4vw, 42px);
  }

  .byte-radar {
    position: absolute;
    width: min(72%, 440px);
    aspect-ratio: 1;
    border-radius: 999px;
    background:
      repeating-radial-gradient(circle, rgba(103, 232, 249, 0.22) 0 1px, transparent 1px 52px),
      conic-gradient(from 0deg, rgba(103, 232, 249, 0.0), rgba(103, 232, 249, 0.18), rgba(103, 232, 249, 0.0) 34%);
    opacity: 0.5;
    animation: rotateRadar 18s linear infinite;
  }

  .byte-product-window {
    position: relative;
    z-index: 1;
    width: min(100%, 480px);
    border: 1px solid rgba(148, 248, 255, 0.18);
    border-radius: 26px;
    background: rgba(2, 8, 15, 0.72);
    box-shadow:
      0 30px 90px rgba(0, 0, 0, 0.4),
      0 0 80px rgba(103, 232, 249, 0.12);
    overflow: hidden;
    transform: perspective(1100px) rotateX(7deg) rotateY(-8deg);
    transition: transform 450ms ease, box-shadow 450ms ease;
  }

  .byte-hero-visual:hover .byte-product-window {
    transform: perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(-6px);
    box-shadow:
      0 40px 120px rgba(0, 0, 0, 0.48),
      0 0 95px rgba(103, 232, 249, 0.2);
  }

  .byte-window-top {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 50px;
    padding: 0 18px;
    border-bottom: 1px solid rgba(148, 248, 255, 0.14);
    background: rgba(255, 255, 255, 0.04);
  }

  .byte-window-top span {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--cyan);
    opacity: 0.82;
  }

  .byte-window-top span:nth-child(2) {
    background: var(--green);
  }

  .byte-window-top span:nth-child(3) {
    background: var(--blue);
  }

  .byte-window-top em {
    margin-left: auto;
    color: var(--muted);
    font-size: 12px;
    font-style: normal;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .byte-dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    padding: 18px;
  }

  .byte-dashboard-brand {
    margin: 18px 18px 0;
    padding: 10px;
    border: 1px solid rgba(148, 248, 255, 0.15);
    border-radius: 20px;
    background:
      radial-gradient(circle at 24% 20%, rgba(103, 232, 249, 0.14), transparent 34%),
      rgba(255, 255, 255, 0.04);
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
  }

  .byte-dashboard-brand img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 14px;
    filter: drop-shadow(0 0 24px rgba(103, 232, 249, 0.18));
  }

  .byte-dashboard-panel {
    min-height: 126px;
    padding: 16px;
    border: 1px solid rgba(148, 248, 255, 0.14);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.055);
  }

  .byte-dashboard-panel small,
  .byte-float-card span {
    display: block;
    color: var(--muted);
    font-size: 11px;
    font-weight: 950;
    letter-spacing: 1.4px;
    text-transform: uppercase;
  }

  .byte-dashboard-panel strong {
    display: block;
    margin-top: 22px;
    color: var(--soft);
    font-size: 30px;
    letter-spacing: -0.04em;
  }

  .panel-wide {
    grid-column: span 2;
  }

  .byte-flow-line {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 28px;
  }

  .byte-flow-line span {
    height: 42px;
    border-radius: 14px;
    background:
      linear-gradient(135deg, rgba(103, 232, 249, 0.36), rgba(45, 212, 191, 0.10)),
      rgba(255, 255, 255, 0.04);
    animation: panelPulse 2.8s ease-in-out infinite;
  }

  .byte-flow-line span:nth-child(2) {
    animation-delay: 0.24s;
  }

  .byte-flow-line span:nth-child(3) {
    animation-delay: 0.48s;
  }

  .byte-bars {
    display: grid;
    gap: 12px;
    margin-top: 24px;
  }

  .byte-bars span {
    display: block;
    width: var(--w);
    height: 10px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--cyan), var(--teal));
    box-shadow: 0 0 24px rgba(103, 232, 249, 0.22);
  }

  .byte-float-card {
    position: absolute;
    z-index: 2;
    width: 178px;
    padding: 16px;
    border: 1px solid rgba(148, 248, 255, 0.18);
    border-radius: 18px;
    background: rgba(3, 11, 20, 0.78);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.34);
    backdrop-filter: blur(18px);
    animation: byteFloat 5.8s ease-in-out infinite;
  }

  .byte-float-card strong {
    display: block;
    margin-top: 8px;
    color: var(--text);
    font-size: 14px;
  }

  .float-one {
    left: 24px;
    top: 17%;
  }

  .float-two {
    right: 22px;
    bottom: 16%;
    animation-delay: -1.6s;
  }

  .byte-section {
    position: relative;
    overflow: hidden;
    margin-top: 24px;
    padding: clamp(28px, 5vw, 54px);
    border-radius: var(--radius-xl);
  }

  .byte-about,
  .byte-why,
  .byte-contact {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: clamp(22px, 4vw, 44px);
    align-items: center;
  }

  .byte-section-heading,
  .byte-section-copy,
  .byte-about-panel,
  .byte-contact-copy {
    position: relative;
    z-index: 1;
  }

  .byte-section-heading {
    max-width: 760px;
    margin-bottom: 24px;
  }

  .byte-about-panel {
    padding: clamp(22px, 4vw, 34px);
    border: 1px solid rgba(148, 248, 255, 0.13);
    border-radius: 22px;
    background: rgba(255, 255, 255, 0.045);
  }

  .byte-about-panel p {
    margin-top: 0;
  }

  .byte-founder-strip {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 26px;
    padding-top: 22px;
    border-top: 1px solid rgba(148, 248, 255, 0.14);
  }

  .byte-founder-strip strong {
    display: block;
    font-size: 18px;
  }

  .byte-founder-strip small {
    display: block;
    margin-top: 4px;
    color: var(--muted);
    font-weight: 800;
  }

  .byte-card-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px;
  }

  .byte-glass-card,
  .byte-project-card,
  .byte-contact-form {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-lg);
  }

  .byte-glass-card::after,
  .byte-project-card::after,
  .byte-contact-form::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    opacity: 0;
    background: linear-gradient(135deg, rgba(103, 232, 249, 0.8), rgba(167, 243, 208, 0.42), transparent 68%);
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    transition: opacity 240ms ease;
  }

  .byte-glass-card:hover::after,
  .byte-project-card:hover::after,
  .byte-contact-form:focus-within::after,
  .byte-contact-form:hover::after {
    opacity: 1;
  }

  .byte-glass-card:hover,
  .byte-project-card:hover {
    transform: translateY(-8px);
    border-color: rgba(103, 232, 249, 0.28);
    box-shadow:
      0 30px 90px rgba(0, 0, 0, 0.42),
      0 0 70px rgba(103, 232, 249, 0.12);
  }

  .byte-service-card {
    min-height: 242px;
    padding: 22px;
    transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
  }

  .byte-card-tag {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    margin-bottom: 42px;
    border-radius: 16px;
    color: #001114;
    background: linear-gradient(135deg, var(--cyan), var(--green));
    box-shadow: 0 16px 34px rgba(45, 212, 191, 0.18);
    font-weight: 1000;
  }

  .byte-service-card h3,
  .byte-project-card h3 {
    position: relative;
    z-index: 1;
    margin: 0 0 12px;
    color: var(--text);
    letter-spacing: -0.03em;
  }

  .byte-service-card h3 {
    font-size: 22px;
    line-height: 1.08;
  }

  .byte-service-card p,
  .byte-project-card p,
  .byte-strength-item p {
    position: relative;
    z-index: 1;
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
  }

  .byte-project-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .byte-project-card {
    min-height: 438px;
    padding: clamp(24px, 4vw, 34px);
    transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
  }

  .byte-project-top {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: clamp(24px, 5vw, 56px);
  }

  .byte-project-top span {
    color: var(--cyan);
    font-size: 12px;
    font-weight: 1000;
    letter-spacing: 1.7px;
    text-transform: uppercase;
  }

  .byte-project-top b {
    color: rgba(216, 247, 255, 0.18);
    font-size: clamp(48px, 8vw, 74px);
    line-height: 0.8;
  }

  .byte-project-card h3 {
    font-size: clamp(34px, 5vw, 58px);
  }

  .byte-feature-cloud {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
  }

  .byte-feature-cloud span {
    padding: 9px 12px;
    border: 1px solid rgba(148, 248, 255, 0.14);
    border-radius: 999px;
    color: #d9f9ff;
    background: rgba(255, 255, 255, 0.055);
    font-size: 12px;
    font-weight: 850;
    transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
  }

  .byte-feature-cloud span:hover {
    transform: translateY(-2px);
    border-color: rgba(103, 232, 249, 0.38);
    background: rgba(103, 232, 249, 0.09);
  }

  .byte-strength-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .byte-strength-item {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 14px;
    min-height: 88px;
    padding: 16px;
    border: 1px solid rgba(148, 248, 255, 0.14);
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.05);
    transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
  }

  .byte-strength-item:hover {
    transform: translateX(6px);
    border-color: rgba(103, 232, 249, 0.34);
    background: rgba(103, 232, 249, 0.08);
  }

  .byte-strength-item span {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 14px;
    color: #001114;
    background: linear-gradient(135deg, var(--cyan), var(--green));
    font-weight: 1000;
  }

  .byte-contact {
    align-items: stretch;
  }

  .byte-contact-copy {
    align-self: center;
  }

  .byte-contact-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 28px;
  }

  .byte-contact-buttons a {
    min-height: 48px;
    padding: 0 16px;
    color: var(--text);
    background: rgba(255, 255, 255, 0.06);
  }

  .byte-contact-buttons a:nth-child(2) {
    color: #001114;
    background: linear-gradient(135deg, var(--cyan), var(--green));
  }

  .byte-contact-form {
    z-index: 1;
    display: grid;
    gap: 14px;
    padding: clamp(20px, 4vw, 30px);
  }

  .byte-contact-form label {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 8px;
  }

  .byte-contact-form label span {
    color: var(--soft);
    font-size: 12px;
    font-weight: 950;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .byte-contact-form input,
  .byte-contact-form textarea {
    width: 100%;
    border: 1px solid rgba(148, 248, 255, 0.15);
    border-radius: 16px;
    color: var(--text);
    background: rgba(255, 255, 255, 0.06);
    font: inherit;
    line-height: 1.5;
    outline: none;
    transition:
      border-color 220ms ease,
      background 220ms ease,
      box-shadow 220ms ease,
      transform 220ms ease;
  }

  .byte-contact-form input {
    min-height: 52px;
    padding: 0 16px;
  }

  .byte-contact-form textarea {
    min-height: 124px;
    resize: vertical;
    padding: 14px 16px;
  }

  .byte-contact-form input::placeholder,
  .byte-contact-form textarea::placeholder {
    color: rgba(167, 184, 200, 0.62);
  }

  .byte-contact-form label:focus-within input,
  .byte-contact-form label:focus-within textarea {
    transform: translateY(-2px);
    border-color: rgba(103, 232, 249, 0.62);
    background: rgba(103, 232, 249, 0.07);
    box-shadow: 0 0 0 4px rgba(103, 232, 249, 0.09);
  }

  .byte-contact-form .byte-button {
    width: 100%;
    border: 0;
    margin-top: 4px;
    font-family: inherit;
  }

  .byte-footer {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 18px 24px;
    align-items: center;
    padding: 28px 0 36px;
    color: var(--muted);
  }

  .byte-footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 10px;
  }

  .byte-footer-links a {
    padding: 9px 12px;
    border: 1px solid rgba(148, 248, 255, 0.12);
    border-radius: 999px;
    text-decoration: none;
    font-size: 13px;
    font-weight: 850;
    transition: border-color 200ms ease, color 200ms ease, background 200ms ease;
  }

  .byte-footer-links a:hover,
  .byte-footer-links a:focus-visible {
    color: var(--text);
    border-color: rgba(103, 232, 249, 0.36);
    background: rgba(103, 232, 249, 0.08);
    outline: none;
  }

  .byte-footer p {
    grid-column: 1 / -1;
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
  }

  .byte-reveal {
    opacity: 0;
    transition:
      opacity 720ms ease,
      transform 720ms cubic-bezier(0.2, 0.8, 0.2, 1);
    transition-delay: var(--delay, 0ms);
    will-change: transform, opacity;
  }

  .byte-reveal.fade-up {
    transform: translateY(28px);
  }

  .byte-reveal.slide-left {
    transform: translateX(-34px);
  }

  .byte-reveal.slide-right {
    transform: translateX(34px);
  }

  .byte-reveal.scale-in {
    transform: translateY(22px) scale(0.96);
  }

  .byte-reveal.is-visible {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }

  @keyframes byteFloat {
    0%, 100% {
      translate: 0 0;
    }
    50% {
      translate: 0 -14px;
    }
  }

  @keyframes rotateRadar {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes panelPulse {
    0%, 100% {
      opacity: 0.68;
      transform: translateY(0);
    }
    50% {
      opacity: 1;
      transform: translateY(-5px);
    }
  }

  @keyframes ctaGlow {
    0%, 100% {
      box-shadow: 0 16px 38px rgba(45, 212, 191, 0.20);
    }
    50% {
      box-shadow: 0 22px 58px rgba(103, 232, 249, 0.32);
    }
  }

  @media (max-width: 1120px) {
    .byte-card-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .byte-nav-links {
      gap: 0;
    }

    .byte-nav-link {
      padding-inline: 9px;
    }
  }

  @media (max-width: 920px) {
    .byte-navbar {
      top: 10px;
    }

    .byte-nav-shell {
      border-color: rgba(148, 248, 255, 0.13);
      background: rgba(2, 8, 15, 0.74);
      backdrop-filter: blur(18px);
    }

    .byte-nav-links {
      position: absolute;
      top: calc(100% + 10px);
      left: clamp(16px, 3vw, 28px);
      right: clamp(16px, 3vw, 28px);
      display: grid;
      gap: 8px;
      padding: 12px;
      border: 1px solid rgba(148, 248, 255, 0.15);
      border-radius: 24px;
      background: rgba(2, 8, 15, 0.94);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
      backdrop-filter: blur(22px);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px) scale(0.98);
      transition: opacity 220ms ease, visibility 220ms ease, transform 220ms ease;
    }

    .byte-nav-links.is-open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .byte-nav-link,
    .byte-mobile-cta {
      width: 100%;
      justify-content: flex-start;
      padding: 14px 16px;
      border-radius: 16px;
    }

    .byte-mobile-cta {
      display: inline-flex;
      justify-content: center;
      margin-top: 4px;
    }

    .byte-nav-cta {
      display: none;
    }

    .byte-menu {
      display: grid;
    }

    .byte-hero,
    .byte-about,
    .byte-why,
    .byte-contact {
      grid-template-columns: 1fr;
    }

    .byte-hero {
      min-height: auto;
    }

    .byte-hero-copy,
    .byte-hero-visual {
      min-height: auto;
    }

    .byte-hero-visual {
      min-height: 540px;
    }

    .byte-project-grid {
      grid-template-columns: 1fr;
    }

    .byte-strength-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    main,
    .byte-footer {
      width: min(100% - 24px, 1180px);
    }

    .byte-navbar {
      padding-inline: 12px;
    }

    .byte-nav-shell {
      min-height: 62px;
      padding: 8px;
    }

    .byte-back {
      width: 42px;
      padding: 0;
      justify-content: center;
      font-size: 0;
    }

    .byte-back span {
      font-size: 16px;
    }

    .byte-brand small {
      display: none;
    }

    .byte-brand strong {
      font-size: 15px;
    }

    .byte-brand-mark {
      width: 38px;
      height: 38px;
      border-radius: 13px;
      font-size: 20px;
    }

    .byte-hero {
      padding-top: 28px;
    }

    .byte-hero-copy,
    .byte-section {
      border-radius: 22px;
    }

    .byte-hero h1 {
      font-size: clamp(46px, 17vw, 72px);
    }

    .byte-hero-stats {
      grid-template-columns: 1fr;
    }

    .byte-actions,
    .byte-contact-buttons {
      display: grid;
      grid-template-columns: 1fr;
    }

    .byte-button,
    .byte-contact-buttons a {
      width: 100%;
    }

    .byte-card-grid {
      grid-template-columns: 1fr;
    }

    .byte-service-card {
      min-height: 0;
    }

    .byte-card-tag {
      margin-bottom: 28px;
    }

    .byte-hero-visual {
      min-height: 470px;
    }

    .byte-product-window {
      transform: none;
    }

    .byte-dashboard-grid {
      grid-template-columns: 1fr;
    }

    .panel-wide {
      grid-column: span 1;
    }

    .byte-flow-line {
      grid-template-columns: 1fr;
      margin-top: 18px;
    }

    .byte-float-card {
      width: 148px;
      padding: 13px;
    }

    .float-one {
      left: 14px;
      top: 12%;
    }

    .float-two {
      right: 14px;
      bottom: 10%;
    }

    .byte-footer {
      grid-template-columns: 1fr;
    }

    .byte-footer-links {
      justify-content: flex-start;
    }
  }

  @media (max-width: 420px) {
    .byte-hero-copy,
    .byte-section,
    .byte-contact-form {
      padding: 22px;
    }

    .byte-hero-visual {
      padding: 16px;
      min-height: 440px;
    }

    .byte-window-top em {
      display: none;
    }

    .byte-dashboard-panel {
      min-height: 108px;
    }

    .byte-project-card h3 {
      font-size: 36px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    .bytelabs-page *,
    .bytelabs-page *::before,
    .bytelabs-page *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.001ms !important;
    }

    .byte-reveal {
      opacity: 1;
      transform: none !important;
    } 
      
    }
`;

export default ByteLabs;
