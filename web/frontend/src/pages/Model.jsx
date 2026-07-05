import Backdrop from "../components/Backdrop.jsx";
import SiteNav from "../components/SiteNav.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Model() {
  return (
    <div className="site-page">
      <Backdrop intensity={0.6} />
      <SiteNav />

      <main>
        <div className="page-hero">
          <div className="eyebrow mono">Held in the hand</div>
          <h1 className="page-title">
            The same process,
            <br />
            <em>made physical.</em>
          </h1>
          <p className="page-sub">
            The physical model is not a separate simulation. It is a material version of the same ingredients from
            the README: a wave packet, a horizon, and a near-horizon emission region made visible.
          </p>
        </div>

        <section>
          <div className="section-inner model-layout">
            <Reveal className="model-figure">
              <div className="core" />
            </Reveal>
            <Reveal>
              <div className="section-eyebrow mono">Construction</div>
              <h2 className="section-title">A horizon, a disk, and a light source.</h2>
              <p className="section-desc">
                The horizon and disk are printed separately so the disk can remain translucent while the horizon
                stays matte black, making the geometry legible without pretending it is a full spacetime model.
              </p>
              <ul className="model-list">
                <li>
                  <span className="dot">→</span>A matte-black event-horizon sphere stands in for the Schwarzschild
                  radius rs.
                </li>
                <li>
                  <span className="dot">→</span>A translucent disk ring represents the radial domain outside the
                  horizon.
                </li>
                <li>
                  <span className="dot">→</span>Addressable LEDs echo the Hawking-like emission model rather than a
                  fixed animation.
                </li>
                <li>
                  <span className="dot">→</span>The object turns the numerical process into something that can be seen
                  and touched at an exhibition table.
                </li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">Bill of materials</div>
              <h2 className="section-title">What actually makes it work.</h2>
            </Reveal>
            <div className="grid-2">
              <Reveal className="card glass">
                <span className="card-index mono">printing</span>
                <h3 className="card-name">Filament & Print</h3>
                <p className="card-desc">
                  Matte black PLA or PETG for the horizon, and translucent or clear filament for the disk. FDM is
                  enough for the geometry described in the project notes.
                </p>
                <div className="tags">
                  <span className="tag">PLA</span>
                  <span className="tag">PETG</span>
                  <span className="tag">FDM</span>
                </div>
              </Reveal>
              <Reveal className="card glass">
                <span className="card-index mono">structure</span>
                <h3 className="card-name">Base & Mounts</h3>
                <p className="card-desc">
                  An MDF or acrylic plate and simple standoffs keep the disk clear of the horizon while leaving the
                  geometry readable from the side.
                </p>
                <div className="tags">
                  <span className="tag">MDF</span>
                  <span className="tag">Acrylic</span>
                </div>
              </Reveal>
              <Reveal className="card glass">
                <span className="card-index mono">lighting</span>
                <h3 className="card-name">LEDs & Control</h3>
                <p className="card-desc">
                  WS2812B addressable LEDs and an ESP32 or Arduino controller provide a controllable light source
                  for the emission region.
                </p>
                <div className="tags">
                  <span className="tag">WS2812B</span>
                  <span className="tag">ESP32</span>
                </div>
              </Reveal>
              <Reveal className="card glass">
                <span className="card-index mono">finishing</span>
                <h3 className="card-name">Paint & Tools</h3>
                <p className="card-desc">
                  Matte black spray for the horizon and a clear coat for the disk are enough to keep the object
                  visually direct, with a soldering iron and multimeter for wiring checks.
                </p>
                <div className="tags">
                  <span className="tag">Spray paint</span>
                  <span className="tag">Soldering</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section>
          <Reveal className="section-inner">
            <p className="pull">
              The optional next step is to let the ESP32 respond to live Hawking-flux values from the solver, so the
              disk brightness answers to <span>an actual running simulation</span> rather than a fixed animation.
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
