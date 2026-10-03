import { useEffect, useRef, useState } from "react";
import portrait from "./assets/omkar-joshi-enhanced.png";
import brandMark from "./assets/bytelabs-mark.svg";
import "./App.css";
const email = "joshiomkar104@gmail.com";
const phone = "919028679760";
const linkedin = "https://www.linkedin.com/in/omkar-joshi-51949a419";
const instagram = "https://www.instagram.com/omkarjoshi_";
const wa = (text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
const nav = [
  ["services", "Services"],
  ["work", "Selected work"],
  ["studio", "The studio"],
  ["contact", "Contact"],
];
const services = [
  [
    "⌘",
    "Websites that make an impression.",
    "A distinctive presence for your business. Responsive websites designed around your audience and your next stage of growth.",
    "Website development",
  ],
  [
    "⊞",
    "Software that fits your business.",
    "From clinic workflows to operational dashboards, custom applications that turn everyday complexity into a simpler way to work.",
    "Web apps & business software",
  ],
  [
    "◈",
    "Experiences people want to use.",
    "Thoughtful interfaces, understandable user journeys, and attention to the details that make a product feel right.",
    "UI/UX design",
  ],
  [
    "↻",
    "A partner beyond the launch.",
    "Updates, maintenance, and practical improvements to keep your website or application moving with your business.",
    "Maintenance & support",
  ],
];
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function EmailContact({ prominent = false }) {
  const [activated, setActivated] = useState(false);
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setActivated(true);
    }
  }
  return (
    <div className="email-contact">
      <a className={prominent ? "contact-email" : undefined} href={`mailto:${email}`} onClick={() => setActivated(true)}>
        {prominent ? email : "Email"} <Arrow />
      </a>
      {activated && <div className="email-fallback">
        <p role="status">If your email app didn’t open, use Gmail or copy the address.</p>
        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`} target="_blank" rel="noopener noreferrer">Open Gmail <Arrow /></a>
        <button type="button" onClick={copyEmail}>{copied ? "Email copied" : "Copy email"}</button>
        <span className="email-address">{email}</span>
      </div>}
    </div>
  );
}
function ExpertiseStrip() {
  const [paused, setPaused] = useState(false);
  const items = ["Websites", "Web applications", "Business software", "Digital experiences"];
  return (
    <div className={`expertise-strip ${paused ? "is-paused" : ""}`}>
      <div className="container expertise-inner">
        <span className="expertise-label">BUILT WITH PURPOSE</span>
        <div className="marquee-window" aria-label="Our expertise">
          <span className="sr-only">{items.join(", ")}</span>
          <div className="marquee-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy}>
                {[...items, ...items].map((item, index) => (
                  <span className="marquee-item" key={`${copy}-${index}`}>
                    {item}<i>✳</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button className="marquee-toggle" type="button" aria-label={paused ? "Play expertise animation" : "Pause expertise animation"} aria-pressed={paused} onClick={() => setPaused(!paused)}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
        </button>
      </div>
    </div>
  );
}
function Brand() {
  return (
    <a className="brand" href="#home" aria-label="ByteLabs home">
      <span className="brand-symbol" aria-hidden="true">
        <img src={brandMark} width="36" height="36" alt="" />
      </span>
      <span>
        byte<span className="brand-light">labs</span>
        <span className="brand-dot">.</span>
      </span>
    </a>
  );
}
function Preview() {
  return (
    <div
      className="product-preview"
      aria-label="Illustrative clinic dashboard, not a product screenshot"
    >
      <aside>
        <b>✚ VedCare</b>
        <span className="selected">▦ Overview</span>
        <span>♙ Patients</span>
        <span>▤ Appointments</span>
        <span>⊞ Billing</span>
        <i>VC</i>
      </aside>
      <div className="preview-content">
        <div className="preview-top">
          Clinic overview <span>OJ</span>
        </div>
        <div className="preview-greeting">
          <small>YOUR WORKDAY, SIMPLIFIED</small>
          <h3>
            A little clarity.
            <br />A lot more care.
          </h3>
        </div>
        <div className="preview-stats">
          {[
            ["Appointments", "24"],
            ["Patients", "128"],
            ["Payments", "₹18.4k"],
          ].map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
              <em>At a glance</em>
            </div>
          ))}
        </div>
        <div className="preview-chart">
          <b>Weekly overview</b>
          <span>This week ⌄</span>
          <div className="chart-bars">
            {[42, 64, 48, 82, 60, 93, 72].map((height, index) => (
              <div key={index}>
                <span
                  style={{
                    height: `${height}%`,
                    animationDelay: `${index * 100}ms`,
                  }}
                />
                <small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small>
              </div>
            ))}
          </div>
        </div>
        <div className="preview-foot">
          ● Everything in one place <span>Designed by ByteLabs</span>
        </div>
      </div>
    </div>
  );
}
export default function ByteLabs() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState(""),
    [channel, setChannel] = useState("whatsapp"),
    [status, setStatus] = useState("");
  const menuRef = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "";
      nav.forEach(([id]) => {
        if (document.getElementById(id).getBoundingClientRect().top <= 180)
          current = id;
      });
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 8)
        current = "contact";
      setActive(current);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
      if (e.type === "pointerdown" && !e.target.closest(".site-header"))
        setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", close);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", close);
    };
  }, [open]);
  useEffect(() => {
    const media = matchMedia("(min-width: 801px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add("reveal-pending");
        observer.observe(el);
      }
    });
    return () => {
      observer.disconnect();
      document
        .querySelectorAll(".reveal-pending")
        .forEach((el) => el.classList.remove("reveal-pending"));
    };
  }, []);
  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name")).trim(),
      message = String(data.get("message")).trim();
    if (!name || !message) {
      setStatus("Please enter your name and a short project description.");
      return;
    }
    const body = `Hello ByteLabs,\n\nName: ${name}\nEmail: ${data.get("email")}\nProject: ${data.get("service")}\n\n${message}`;
    if (channel === "whatsapp") {
      window.open(wa(body), "_blank", "noopener,noreferrer");
      setStatus(
        "Your WhatsApp message is ready. Review it and press Send in WhatsApp. If no tab opened, allow pop-ups and try again.",
      );
    } else {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`ByteLabs project inquiry — ${name}`)}&body=${encodeURIComponent(body)}`;
      setStatus(
        "An email draft has been requested in your email app. Review and send it there. You can also email joshiomkar104@gmail.com directly.",
      );
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            ref={menuRef}
            className="menu-toggle"
            aria-controls="navigation"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
          <nav
            id="navigation"
            className={`navigation ${open ? "open" : ""}`}
            aria-label="Main navigation"
          >
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="button small-button"
              href="#contact"
              onClick={() => setOpen(false)}
            >
              Let’s talk <Arrow />
            </a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero container" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <i className="status-dot" /> INDEPENDENT SOFTWARE STUDIO
            </div>
            <h1>
              Good ideas.
              <br />
              Great software.
              <br />
              <span>Real impact.</span>
            </h1>
            <p>
              We turn your next big idea into a website or software product that
              looks exceptional and works beautifully.
            </p>
            <div className="hero-actions">
              <a className="button" href="#contact">
                Build something with us <Arrow />
              </a>
              <a className="text-link" href="#work">
                Explore our work <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="hero-note">
              <span aria-hidden="true">↳</span> Thoughtful design. Practical
              engineering. Personal attention.
            </div>
            <div className="studio-principles" aria-label="Our approach">
              <span>Design-led</span><span>Business-focused</span><span>Built to last</span>
            </div>
          </div>
          <div className="hero-art">
            <div className="orbit" />
            <div className="orbit outer" />
            <div className="art-label">
              <i className="status-dot" /> FROM IDEA TO EVERYDAY IMPACT
            </div>
            <div className="hero-dashboard">
              <Preview />
            </div>
            <div className="floating-note">
              <span aria-hidden="true">✓</span>
              <div>
                <strong>Built around your business</strong>
                <small>Not the other way around.</small>
              </div>
            </div>
            <div className="art-caption">
              <span>ILLUSTRATIVE INTERFACE</span>
              <span>BYTELABS / 01</span>
            </div>
          </div>
        </section>
        <ExpertiseStrip />
        <section className="section container" id="services">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow">01 / WHAT WE DO</div>
              <h2>
                From first impression
                <br />
                to everyday operation.
              </h2>
            </div>
            <p>
              Everything your digital product needs.
              <br />
              One studio to bring it together.
            </p>
          </div>
          <div className="service-grid">
            {services.map(([icon, title, text, label], index) => (
              <article className="service-card" key={title} data-reveal>
                <div className="service-top">
                  <span className="service-icon" aria-hidden="true">
                    {icon}
                  </span>
                  <span>0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a className="service-link" href="#contact">
                  {label}
                  <Arrow />
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className="work-section" id="work">
          <div className="container section">
            <div className="section-heading" data-reveal>
              <div>
                <div className="eyebrow">02 / SELECTED WORK</div>
                <h2>Ideas made useful.</h2>
              </div>
              <p>
                A look at what we’re building.
                <br />
                Purposeful products for real workflows.
              </p>
            </div>
            <article className="project" data-reveal>
              <div className="project-visual">
                <div className="visual-label">VEDCARE / CLINIC MANAGEMENT</div>
                <Preview />
                <span className="mockup-label">ILLUSTRATIVE INTERFACE</span>
              </div>
              <div className="project-copy">
                <span className="badge live">● Live product</span>
                <h3>
                  Better systems.
                  <br />
                  Better care.
                </h3>
                <p>
                  VedCare brings patient records, appointments, prescriptions,
                  and billing into one clinic management system.
                </p>
                <div className="tags">
                  <span>Healthcare</span>
                  <span>Business software</span>
                  <span>Responsive dashboard</span>
                </div>
                <a
                  className="text-link"
                  href="https://shrirangayurved.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live website <Arrow />
                </a>
                <a
                  className="text-link"
                  href={wa("Hello ByteLabs, I would like a demo of VedCare.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request a VedCare demo <Arrow />
                </a>
              </div>
            </article>
            <article className="project" data-reveal>
              <div className="project-visual puja-visual">
                <div className="visual-label">
                  PUROHITSEVA / SERVICE PLATFORM
                </div>
                <div className="puja-concept">
                  <span aria-hidden="true">✳</span>
                  <small>TRADITION MEETS SIMPLICITY</small>
                  <h3>
                    Purohit<i>Seva</i>
                  </h3>
                  <p>
                    A more connected
                    <br />
                    way to arrange puja services.
                  </p>
                  <div className="puja-steps">
                    <span>Discover</span>→<span>Request</span>→
                    <span>Connect</span>
                  </div>
                </div>
                <span className="mockup-label">PRODUCT CONCEPT</span>
              </div>
              <div className="project-copy">
                <span className="badge progress">● In development</span>
                <h3>
                  Meaningful traditions.
                  <br />
                  Simpler connections.
                </h3>
                <p>
                  PurohitSeva is a managed puja booking platform in progress,
                  bringing service requests, priest profiles, and booking
                  management together.
                </p>
                <div className="tags">
                  <span>Service platform</span>
                  <span>Booking workflows</span>
                  <span>Admin tools</span>
                </div>
                <a
                  className="text-link"
                  href={wa(
                    "Hello ByteLabs, I would like to learn about PurohitSeva.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk about the platform <Arrow />
                </a>
              </div>
            </article>
          </div>
        </section>
        <section className="section container">
          <div className="section-heading" data-reveal>
            <div>
              <div className="eyebrow">03 / HOW WE WORK</div>
              <h2>
                A clear path.
                <br />
                From hello to launch.
              </h2>
            </div>
            <p>
              A thoughtful process.
              <br />
              Clear communication at every step.
            </p>
          </div>
          <div className="process-grid">
            {[
              [
                "Discover",
                "We understand your goals, your users, and the problem worth solving.",
              ],
              [
                "Design",
                "We shape the structure and interface before moving into development.",
              ],
              [
                "Build",
                "We develop, test, and refine your product across screen sizes.",
              ],
              [
                "Launch & support",
                "We prepare for launch and discuss the support your product needs next.",
              ],
            ].map(([title, text], index) => (
              <article key={title} data-reveal>
                <span className="process-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="studio-section" id="studio">
          <div className="container studio-grid">
            <div className="founder-image" data-reveal>
              <img
                src={portrait}
                alt="Omkar Joshi, Founder and CEO of ByteLabs"
                width="1114"
                height="1412"
                loading="lazy"
              />
              <div className="portrait-caption">
                <strong>Omkar Joshi</strong>
                <span>Founder & CEO · ByteLabs</span>
              </div>
            </div>
            <div className="studio-copy" data-reveal>
              <div className="eyebrow">04 / MEET THE FOUNDER</div>
              <h2>
                Built with care.
                <br />
                <span>Led with purpose.</span>
              </h2>
              <p>
                ByteLabs is an independent software studio founded by Omkar
                Joshi, focused on websites, web applications, and practical
                business software.
              </p>
              <p>
                You work directly with the person building your product. That
                means a closer understanding of your goals, considered
                decisions, and attention to the details.
              </p>
              <div className="founder-signature">
                <div>
                  <strong>Omkar Joshi</strong>
                  <span>Founder & CEO · ByteLabs</span>
                </div>
              </div>
              <div className="social-links">
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <Arrow />
                </a>
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  Instagram <Arrow />
                </a>
                <EmailContact />
              </div>
            </div>
          </div>
        </section>
        <section className="section container faq-section">
          <div data-reveal>
            <div className="eyebrow">A FEW GOOD QUESTIONS</div>
            <h2>
              Before we{" "}
              <br />
              get started.
            </h2>
          </div>
          <div className="faq-list" data-reveal>
            {[
              [
                "What kind of projects do you take on?",
                "We build business websites, web applications, dashboards, and custom software. Share your idea and we’ll discuss the right scope and approach.",
              ],
              [
                "How much will my project cost?",
                "Pricing depends on the scope, features, and complexity. After understanding your requirements, we can discuss a proposal with deliverables and an estimated timeline.",
              ],
              [
                "Can you improve an existing product?",
                "Yes. We can review your current website or application and discuss design improvements, bug fixes, new features, or maintenance.",
              ],
              [
                "Do you provide support after launch?",
                "Maintenance and support are available. We agree on the coverage and terms for your project before starting.",
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div className="contact-copy" data-reveal>
              <div className="eyebrow">
                <i className="status-dot" /> LET’S BUILD SOMETHING GOOD
              </div>
              <h2>
                Your next chapter
                <br />
                starts with
                <br />
                <span>a conversation.</span>
              </h2>
              <p>
                Have an idea, a challenge, or a product in mind?
                <br />
                Tell us a little about it. We’ll take it from there.
              </p>
              <EmailContact prominent />
              <div className="direct-contact">
                <a href="tel:+919028679760">+91 90286 79760</a>
                <span>/</span>
                <a
                  href={wa(
                    "Hello ByteLabs, I would like to discuss a project.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp <Arrow />
                </a>
              </div>
            </div>
            <form className="inquiry-form" onSubmit={submit} data-reveal>
              <h3>Tell us what you’re thinking.</h3>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Alex Sharma"
                    required
                    maxLength="100"
                  />
                </label>
                <label>
                  Email address
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="alex@yourbusiness.com"
                    required
                    maxLength="254"
                  />
                </label>
              </div>
              <label>
                What can we help with?
                <select name="service" defaultValue="Website development">
                  <option>Website development</option>
                  <option>Web application / business software</option>
                  <option>UI/UX design</option>
                  <option>Maintenance & support</option>
                  <option>VedCare demo</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>
                A little about your project
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your idea, goals, or the problem you’d like to solve…"
                  required
                  maxLength="3000"
                />
              </label>
              <fieldset>
                <legend>Continue the conversation on</legend>
                <label>
                  <input
                    type="radio"
                    name="channel"
                    value="whatsapp"
                    checked={channel === "whatsapp"}
                    onChange={() => setChannel("whatsapp")}
                  />{" "}
                  WhatsApp
                </label>
                <label>
                  <input
                    type="radio"
                    name="channel"
                    value="email"
                    checked={channel === "email"}
                    onChange={() => setChannel("email")}
                  />{" "}
                  Email
                </label>
              </fieldset>
              <button className="button" type="submit">
                {channel === "whatsapp"
                  ? "Continue on WhatsApp"
                  : "Open email draft"}{" "}
                <Arrow />
              </button>
              <p className="form-note">
                Your details open in{" "}
                {channel === "whatsapp" ? "WhatsApp" : "your email app"}. Review
                and send your message there. This website does not store your
                inquiry.
              </p>
              <p className="form-status" role="status" aria-live="polite">
                {status}
              </p>
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Crafted for impact.</p>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <Arrow />
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              Instagram <Arrow />
            </a>
          </div>
          <a href="#home" className="back-top">
            Back to top ↑
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} ByteLabs. Independent software studio.
          </span>
          <span>Thoughtfully designed. Carefully built.</span>
        </div>
      </footer>
    </>
  );
}
