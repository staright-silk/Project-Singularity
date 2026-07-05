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
          <div className="eyebrow mono">Solver · renderer · dashboard</div>
          <h1 className="page-title">
            What the <em>numbers</em> look like.
          </h1>
          <p className="page-sub">
            Three independent programs computing and displaying the same spacetime — a physics core, a GPU
            renderer, and the live telemetry dashboard running below, connected to the real backend.
          </p>
        </div>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">01 — quantum core</div>
              <h2 className="section-title">The split-operator solver.</h2>
              <p className="section-desc">
                A 3D split-operator Fourier method with Strang splitting propagates a wavefunction through a real
                Schwarzschild potential. Absorbing boundaries prevent reflection artifacts, and a stochastic term
                injects Hawking radiation directly into the evolving state — so the glow in the dashboard below
                isn't decorative, it's read off this solver.
              </p>
            </Reveal>
            <div className="grid-2">
              <Reveal className="card glass">
                <span className="card-index mono">method</span>
                <h3 className="card-name">Strang Splitting</h3>
                <p className="card-desc">
                  Kinetic and potential operators alternate in a symmetric sequence, giving second-order accuracy
                  in time without solving the full Hamiltonian at every step.
                </p>
              </Reveal>
              <Reveal className="card glass">
                <span className="card-index mono">diagnostics</span>
                <h3 className="card-name">Full Instrumentation</h3>
                <p className="card-desc">
                  Probability conservation, energy expectation, and radiation flux are logged every step, plus
                  marching-cubes isosurfaces for 3D visualization and automated PDF reporting.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">02 — photon pipeline</div>
              <h2 className="section-title">The Vulkan raymarcher.</h2>
              <p className="section-desc">
                A compute-shader pipeline raymarches light paths bent by the horizon's curvature, then runs an
                Unreal-style bloom pass for the glow around the photon ring. The accretion disk uses ridged noise
                to fracture into bright filaments with visible dark gaps, rather than a smooth painted gradient.
              </p>
            </Reveal>
            <div className="grid-2">
              <Reveal className="card glass">
                <span className="card-index mono">pass 1</span>
                <h3 className="card-name">Lensing Raymarch</h3>
                <p className="card-desc">
                  Photon trajectories are bent using a Schwarzschild approximation, producing the characteristic
                  ring and disk-behind-horizon warp.
                </p>
              </Reveal>
              <Reveal className="card glass">
                <span className="card-index mono">pass 2</span>
                <h3 className="card-name">HDR Bloom</h3>
                <p className="card-desc">
                  A separable Gaussian bloom over the bright-pass buffer, tonemapped with ACES filmic curves for a
                  cinematic rather than clipped highlight.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">03 — instrument panel</div>
              <h2 className="section-title">Live telemetry, right here.</h2>
              <p className="section-desc">
                This panel is the real dashboard, connected over WebSocket to the FastAPI backend — not a
                recording. If the backend isn't running, it'll show a link-lost state below rather than fake data.
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
