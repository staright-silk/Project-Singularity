import Backdrop from "../components/Backdrop.jsx";
import SiteNav from "../components/SiteNav.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Reveal from "../components/Reveal.jsx";

const TIMELINE = [
  {
    phase: "Phase 1",
    title: "A radial wave model",
    desc: "The project begins with a live web dashboard for a 1D radial Hawking-radiation model and a standalone Python engine for black-hole wave-packet scattering.",
  },
  {
    phase: "Phase 2",
    title: "A Schwarzschild-like environment",
    desc: "The solver moves a Gaussian wave packet on a radial grid outside the event horizon, using an effective potential shaped by the Schwarzschild radius rs.",
  },
  {
    phase: "Phase 3",
    title: "Split-operator evolution",
    desc: "The live backend advances the complex wavefunction with a split-operator FFT step, absorbing boundaries, and a stochastic Hawking-like source near the horizon.",
  },
  {
    phase: "Phase 4",
    title: "A browser-based instrument panel",
    desc: "FastAPI and WebSocket deliver state frames to React, where retained probability, emitted flux, captured probability, and the horizon marker are displayed.",
  },
  {
    phase: "Phase 5",
    title: "A wider simulation stack",
    desc: "The repository keeps both the live web workflow and the standalone research engines so the same numerical ideas can be inspected in more than one way.",
  },
];

export default function About() {
  return (
    <div className="site-page">
      <Backdrop intensity={0.6} />
      <SiteNav />

      <main>
        <div className="page-hero">
          <div className="eyebrow mono">Origin & scope</div>
          <h1 className="page-title">
            The project grows
            <br />
            <em>from one idea.</em>
          </h1>
          <p className="page-sub">
            Project Singularity started as a numerical description of a black-hole wave packet and grew into a
            live solver, a web dashboard, and a physical companion piece. The repository keeps the process visible
            instead of hiding it behind a single polished animation.
          </p>
        </div>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">Timeline</div>
              <h2 className="section-title">How the stack came together.</h2>
            </Reveal>
            <Reveal className="timeline">
              {TIMELINE.map((item) => (
                <div className="tl-item" key={item.phase}>
                  <div className="tl-date mono">{item.phase}</div>
                  <div>
                    <div className="tl-title">{item.title}</div>
                    <div className="tl-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">Honesty over polish</div>
              <h2 className="section-title">What the model is, and what it is not.</h2>
              <p className="section-desc">
                The README is explicit about the scope: this is not a full quantum-gravity simulator. It is a
                controlled model built from a wave packet, an effective black-hole potential, split-operator
                evolution, absorbing boundaries, and diagnostics that are meant to be examined.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
