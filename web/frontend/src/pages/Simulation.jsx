import Backdrop from "../components/Backdrop.jsx";
import SiteNav from "../components/SiteNav.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Reveal from "../components/Reveal.jsx";
import Dashboard from "../components/Dashboard.jsx";

export default function Simulation() {
  return (
    <div className="site-page">
      <Backdrop intensity={0.7} />
      <SiteNav />

      <main>
        <div className="page-hero">
          <div className="eyebrow mono">Solver · dashboard · process</div>
          <h1 className="page-title">
            The <em>numbers</em> in motion.
          </h1>
          <p className="page-sub">
            The live backend solves a 1D radial wave equation in a Schwarzschild-inspired background, and the
            dashboard below shows the result as it evolves: a complex wavefunction, a horizon-shaped potential,
            and a Hawking-like source near the event horizon.
          </p>
        </div>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">01 — wavefunction</div>
              <h2 className="section-title">The state variable is psi(r, t).</h2>
              <p className="section-desc">
                The solver starts from a normalized Gaussian wave packet and evolves it on a radial grid just
                outside the event horizon. The plotted density is |psi(r, t)|², and the retained probability is
                tracked as the packet interacts with the Schwarzschild-like potential.
              </p>
            </Reveal>
            <div className="grid-2">
              <Reveal className="card glass">
                <span className="card-index mono">state</span>
                <h3 className="card-name">Complex Wavefunction</h3>
                <p className="card-desc">
                  The packet moves on a radial grid outside the horizon, with the Schwarzschild radius rs shaping
                  the environment and the effective potential acting as the scattering background.
                </p>
              </Reveal>
              <Reveal className="card glass">
                <span className="card-index mono">diagnostics</span>
                <h3 className="card-name">Probability & Flux</h3>
                <p className="card-desc">
                  The live UI tracks retained probability, captured probability, and emitted flux so the visual
                  output can be tied back to the actual solver state.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">02 — numerical method</div>
              <h2 className="section-title">A split-operator FFT step.</h2>
              <p className="section-desc">
                Each time step is a half potential step, a full kinetic step in Fourier space, and another half
                potential step. The operators are precomputed, and an imaginary absorbing layer W removes outgoing
                probability near the grid boundaries so the simulation does not reflect waves back into the domain.
              </p>
            </Reveal>
            <div className="grid-2">
              <Reveal className="card glass">
                <span className="card-index mono">step</span>
                <h3 className="card-name">Half / Full / Half</h3>
                <p className="card-desc">
                  The method alternates kinetic and potential updates in a symmetric sequence, which keeps the
                  evolution compact and numerically explicit.
                </p>
              </Reveal>
              <Reveal className="card glass">
                <span className="card-index mono">absorption</span>
                <h3 className="card-name">Absorbing Boundaries</h3>
                <p className="card-desc">
                  The absorbed probability is estimated every step and appears as captured probability in the UI,
                  making the boundary behavior visible rather than hidden.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">03 — instrument panel</div>
              <h2 className="section-title">The dashboard reads the running solver.</h2>
              <p className="section-desc">
                The panel below is connected over WebSocket to the FastAPI backend. It shows the retained density,
                the near-horizon Hawking-like source display, the effective potential, and the event-horizon marker
                as the simulation evolves.
              </p>
            </Reveal>
            <Reveal className="dashboard-embed glass">
              <Dashboard />
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
