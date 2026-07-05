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
          <div className="eyebrow mono">Numerical black-hole simulation stack</div>
          <h1 className="page-title">
            A controlled
            <br />
            <em>quantum model</em>
          </h1>
          <p className="page-sub">
            Project Singularity is a numerical black-hole quantum simulation stack. It pairs a live web dashboard
            for a 1D radial Hawking-radiation model with standalone Python research engines for black-hole
            wave-packet scattering.
          </p>
          <div className="hud glass">
            <div className="hud-item">
              <div className="hud-label mono">State</div>
              <div className="hud-value mono">psi(r, t)</div>
            </div>
            <div className="hud-item">
              <div className="hud-label mono">Density</div>
              <div className="hud-value mono">|psi|²</div>
            </div>
            <div className="hud-item">
              <div className="hud-label mono">Method</div>
              <div className="hud-value mono">FFT split-operator</div>
            </div>
            <div className="hud-item">
              <div className="hud-label mono">Source</div>
              <div className="hud-value mono">Hawking-like noise</div>
            </div>
          </div>
        </div>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">The process</div>
              <h2 className="section-title">Two related pieces, one shared method.</h2>
              <p className="section-desc">
                The live backend evolves a complex wavefunction near a Schwarzschild-like horizon, while the
                standalone Python engines explore the same ideas in a more research-oriented form.
              </p>
            </Reveal>
            <div className="grid-2">
              <Reveal as={Link} to="/simulation" className="card glass">
                <span className="card-index mono">01 / solver</span>
                <h3 className="card-name">Live Wave Solver</h3>
                <p className="card-desc">
                  The backend solves a 1D radial wave equation in a Schwarzschild-inspired background, tracks
                  retained probability, and streams the result to a React dashboard.
                </p>
                <div className="tags">
                  <span className="tag">Python</span>
                  <span className="tag">FFT</span>
                </div>
              </Reveal>
              <Reveal as={Link} to="/simulation" className="card glass">
                <span className="card-index mono">02 / engines</span>
                <h3 className="card-name">Research Engines</h3>
                <p className="card-desc">
                  The repository also contains standalone Python models for black-hole wave-packet scattering,
                  built from a Gaussian packet, an effective potential, and split-operator evolution.
                </p>
                <div className="tags">
                  <span className="tag">Wave packet</span>
                  <span className="tag">Schwarzschild</span>
                </div>
              </Reveal>
              <Reveal as={Link} to="/simulation" className="card glass">
                <span className="card-index mono">03 / dashboard</span>
                <h3 className="card-name">Instrument Panel</h3>
                <p className="card-desc">
                  The browser receives state frames over WebSocket and plots retained density, Hawking-like flux,
                  captured probability, and the horizon marker in real time.
                </p>
                <div className="tags">
                  <span className="tag">React</span>
                  <span className="tag">FastAPI</span>
                </div>
              </Reveal>
              <Reveal as={Link} to="/model" className="card glass">
                <span className="card-index mono">04 / object</span>
                <h3 className="card-name">Physical Companion</h3>
                <p className="card-desc">
                  The physical model translates the same numerical ingredients into a tangible exhibit, so the
                  horizon and emission region can be seen and touched.
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
              This is not a full quantum-gravity simulator. It is a controlled numerical model built from standard
              ingredients: a wave packet, an effective black-hole potential, absorbing boundaries, and diagnostics.
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
