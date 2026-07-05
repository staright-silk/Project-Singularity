import Backdrop from "../components/Backdrop.jsx";
import SiteNav from "../components/SiteNav.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Reveal from "../components/Reveal.jsx";

const TIMELINE = [
  {
    phase: "Phase 1",
    title: "Volumetric renderer & quantum core",
    desc: "A Python/moderngl four-pass HDR pipeline — dithered raymarching, bright-pass extraction, separable Gaussian bloom, ACES tonemapping — live-coupled to a split-operator quantum solver.",
  },
  {
    phase: "Phase 2",
    title: "C++/OpenGL scaffold",
    desc: "Full Vulkan/GL infrastructure — window, camera, framebuffers, bloom pass — with a raymarched fragment shader approximating gravitational lensing and an ImGui control panel.",
  },
  {
    phase: "Phase 3",
    title: "Research-grade solver rewrite",
    desc: "The simulation backend became a full 3D split-operator Fourier solver with Strang splitting, absorbing boundaries, stochastic Hawking injection, and automated PDF reporting.",
  },
  {
    phase: "Phase 4",
    title: "Web dashboard & physical sculpture",
    desc: "A FastAPI + WebSocket backend paired with a React instrument-panel frontend, alongside a 3D-printed, LED-lit event horizon and accretion disk for the exhibition floor.",
  },
  {
    phase: "Phase 5",
    title: "Standalone Vulkan renderer",
    desc: "A dedicated compute-shader black hole renderer — two-pass Schwarzschild lensing raymarch plus Unreal-style bloom — iteratively tuned toward a fragmented, ridge-noise accretion disk.",
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
            Why build <em>four</em> versions
            <br />
            of the same black hole?
          </h1>
          <p className="page-sub">
            Project Singularity started as a single Python renderer and grew into a solver, a GPU pipeline, a
            live dashboard, and a physical sculpture — each one a different answer to "how do you show gravity
            bending light?"
          </p>
        </div>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">Timeline</div>
              <h2 className="section-title">How it came together.</h2>
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
              <h2 className="section-title">What the solver gets wrong, left in on purpose.</h2>
              <p className="section-desc">
                Two numerical findings are documented rather than hidden: convergence with respect to timestep
                isn't clean because stochastic noise amplitude isn't scaled by √dt, and the spectrum comparison is
                illustrative rather than rigorous. A judge who asks about either gets a real answer, not a dodge.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
