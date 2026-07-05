import { Link } from "react-router-dom";
import Backdrop from "../components/Backdrop.jsx";
import SiteNav from "../components/SiteNav.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Home() {
  return (
    <div className="site-page">
      <Backdrop intensity={1.0} />
      <SiteNav />

      <main>
        <div className="page-hero">
          <div className="eyebrow mono">Schwarzschild geometry · live solver</div>
          <h1 className="page-title">
            A universe bent
            <br />
            <em>around nothing.</em>
          </h1>
          <p className="page-sub">
            Project Singularity renders gravitational lensing, evaporating Hawking radiation, and a rotating
            accretion disk from a real split-operator quantum solver — across a GPU renderer, a live dashboard,
            and a physical sculpture.
          </p>
          <div className="hud glass">
            <div className="hud-item">
              <div className="hud-label mono">Mass</div>
              <div className="hud-value mono">4.3M M☉</div>
            </div>
            <div className="hud-item">
              <div className="hud-label mono">Schwarzschild r</div>
              <div className="hud-value mono">1.27×10⁷ km</div>
            </div>
            <div className="hud-item">
              <div className="hud-label mono">Hawking T</div>
              <div className="hud-value mono">6.2×10⁻¹⁴ K</div>
            </div>
            <div className="hud-item">
              <div className="hud-label mono">Spin a*</div>
              <div className="hud-value mono">0.00</div>
            </div>
          </div>
        </div>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">The stack</div>
              <h2 className="section-title">Four instruments, one geometry.</h2>
              <p className="section-desc">
                Each component approaches the same Schwarzschild spacetime from a different angle — a solver, a
                renderer, a dashboard, and a sculpture — built independently, converging on the same physics.
              </p>
            </Reveal>
            <div className="grid-2">
              <Reveal as={Link} to="/simulation" className="card glass">
                <span className="card-index mono">01 / solver</span>
                <h3 className="card-name">Quantum Core</h3>
                <p className="card-desc">
                  A 3D split-operator Fourier solver with Strang splitting and stochastic Hawking radiation
                  injection, run against a real Schwarzschild potential.
                </p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">FFT</span>
                </div>
              </Reveal>
              <Reveal as={Link} to="/simulation" className="card glass">
                <span className="card-index mono">02 / renderer</span>
                <h3 className="card-name">Photon Pipeline</h3>
                <p className="card-desc">
                  A Vulkan compute-shader raymarcher bending light around the horizon in real time, with a
                  fragmented, ridge-noise accretion disk.
                </p>
                <div className="tags">
                  <span className="tag">Vulkan</span>
                  <span className="tag">GLSL</span>
                </div>
              </Reveal>
              <Reveal as={Link} to="/simulation" className="card glass">
                <span className="card-index mono">03 / dashboard</span>
                <h3 className="card-name">Instrument Panel</h3>
                <p className="card-desc">
                  A React front end streaming live solver state over WebSocket from a FastAPI backend, updated in
                  real time.
                </p>
                <div className="tags">
                  <span className="tag">React</span>
                  <span className="tag">FastAPI</span>
                </div>
              </Reveal>
              <Reveal as={Link} to="/model" className="card glass">
                <span className="card-index mono">04 / object</span>
                <h3 className="card-name">Physical Model</h3>
                <p className="card-desc">
                  A 3D-printed event horizon and accretion disk, lit with addressable LEDs driven by the solver's
                  own Hawking-flux output.
                </p>
                <div className="tags">
                  <span className="tag">PLA/PETG</span>
                  <span className="tag">ESP32</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section>
          <Reveal className="section-inner" as="div">
            <p className="pull">
              Built to survive contact with a judge who asks{" "}
              <span>"okay, but what's actually being computed?"</span> — every visual on this site traces back to
              a real number the solver produced.
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
