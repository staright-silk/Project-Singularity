import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createTimeline } from "animejs";
import Backdrop from "../components/Backdrop.jsx";
import SiteNav from "../components/SiteNav.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Home() {
  const eyebrowRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const hudRef = useRef(null);

  // Hero entrance: a deliberate sequence (eyebrow -> title line 1 -> title
  // line 2 -> HUD row, each with its own timing) rather than everything
  // fading in at once. This runs once on mount since the hero is already
  // in view when the page loads, so it doesn't wait on a scroll trigger.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [eyebrowRef.current, titleLine1Ref.current, titleLine2Ref.current];
    const hudItems = hudRef.current ? Array.from(hudRef.current.children) : [];

    if (reduceMotion) {
      [...targets, ...hudItems].forEach((el) => { if (el) el.style.opacity = "1"; });
      return;
    }

    [...targets, ...hudItems].forEach((el) => {
      if (el) { el.style.opacity = "0"; }
    });

    const tl = createTimeline({ defaults: { easing: "easeOutExpo" } });
    tl.add(eyebrowRef.current, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 700,
    })
      .add(
        titleLine1Ref.current,
        { opacity: [0, 1], translateY: [30, 0], filter: ["blur(8px)", "blur(0px)"], duration: 900 },
        "-=400"
      )
      .add(
        titleLine2Ref.current,
        { opacity: [0, 1], translateY: [30, 0], filter: ["blur(8px)", "blur(0px)"], duration: 900 },
        "-=650"
      )
      .add(
        hudItems,
        { opacity: [0, 1], translateY: [18, 0], duration: 600, delay: (_, i) => i * 90 },
        "-=350"
      );

    return () => tl.pause();
  }, []);

  // Magnetic tilt + cursor-follow glow on the HUD row and cards: the
  // element leans very slightly toward the cursor and a soft highlight
  // tracks the pointer, so hovering feels responsive instead of static.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const els = document.querySelectorAll(".hud-item, .card");
    const handlers = [];

    els.forEach((el) => {
      el.style.setProperty("--glow-x", "50%");
      el.style.setProperty("--glow-y", "50%");

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        el.style.setProperty("--glow-x", `${px * 100}%`);
        el.style.setProperty("--glow-y", `${py * 100}%`);
        const tiltX = (py - 0.5) * -4; // degrees
        const tiltY = (px - 0.5) * 4;
        el.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      };
      const onLeave = () => {
        el.style.transform = "";
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      handlers.push({ el, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div className="site-page">
      <Backdrop intensity={1.0} />
      <SiteNav />

      <main>
        <div className="page-hero">
          <div className="eyebrow mono" ref={eyebrowRef}>
            A black-hole model, kept visible
          </div>
          <h1 className="page-title">
            <span ref={titleLine1Ref} style={{ display: "block" }}>
              A <em>wave packet</em>
            </span>
            <span ref={titleLine2Ref} style={{ display: "block" }}>
              near a horizon
            </span>
          </h1>
          <p className="page-sub"></p>
          <div className="hud glass" ref={hudRef}>
            <div className="hud-item glow-tilt">
              <div className="hud-label mono">State</div>
              <div className="hud-value mono">psi(r, t)</div>
            </div>
            <div className="hud-item glow-tilt">
              <div className="hud-label mono">Density</div>
              <div className="hud-value mono">|psi|²</div>
            </div>
            <div className="hud-item glow-tilt">
              <div className="hud-label mono">Method</div>
              <div className="hud-value mono">FFT split-operator</div>
            </div>
            <div className="hud-item glow-tilt">
              <div className="hud-label mono">Source</div>
              <div className="hud-value mono">Hawking-like noise</div>
            </div>
          </div>
        </div>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">The parts</div>
              <h2 className="section-title">The model is simple enough to describe.</h2>
              <p className="section-desc">
                Each page focuses on one piece of the setup: the packet, the grid, the solver step, and the readout
                that comes back from it.
              </p>
            </Reveal>
            <Reveal className="grid-2" staggerChildren>
              <Link to="/simulation" className="card glass glow-tilt">
                <span className="card-index mono">01 / solver</span>
                <h3 className="card-name">The wave packet</h3>
                <p className="card-desc">
                  A normalized Gaussian begins on a radial grid just outside the horizon. The solver follows it as it
                  interacts with a Schwarzschild-like potential.
                </p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">FFT</span>
                </div>
              </Link>
              <Link to="/simulation" className="card glass glow-tilt">
                <span className="card-index mono">02 / engines</span>
                <h3 className="card-name">The code</h3>
                <p className="card-desc">
                  The repository has two ways to look at the same idea: a live web version and a Python version for
                  more direct experiments.
                </p>
                <div className="tags">
                  <span className="tag">Wave packet</span>
                  <span className="tag">Schwarzschild</span>
                </div>
              </Link>
              <Link to="/simulation" className="card glass glow-tilt">
                <span className="card-index mono">03 / dashboard</span>
                <h3 className="card-name">The readout</h3>
                <p className="card-desc">
                  The browser receives state updates and plots the probability curve, the absorbed part, and the
                  near-horizon source as the calculation goes forward.
                </p>
                <div className="tags">
                  <span className="tag">React</span>
                  <span className="tag">FastAPI</span>
                </div>
              </Link>
              <Link to="/model" className="card glass glow-tilt">
                <span className="card-index mono">04 / object</span>
                <h3 className="card-name">The object</h3>
                <p className="card-desc">
                  The physical model takes the same geometry and turns it into something you can place on a table and
                  look at for a minute.
                </p>
                <div className="tags">
                  <span className="tag">PLA/PETG</span>
                  <span className="tag">ESP32</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>

        <section>
          <Reveal className="section-inner" as="div">
            <p className="pull">
              The point is not to look spectacular. The point is to make the assumptions legible.
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
