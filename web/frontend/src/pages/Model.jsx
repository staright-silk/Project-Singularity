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
            The sculpture judges
            <br />
            <em>actually touch.</em>
          </h1>
          <p className="page-sub">
            A matte event horizon suspended inside a translucent, lit accretion disk — the one exhibit piece that
            doesn't need a screen to be understood.
          </p>
        </div>

        <section>
          <div className="section-inner model-layout">
            <Reveal className="model-figure">
              <div className="core" />
            </Reveal>
            <Reveal>
              <div className="section-eyebrow mono">Construction</div>
              <h2 className="section-title">Two prints, one light source.</h2>
              <p className="section-desc">
                The horizon and disk are printed separately so the disk can be translucent while the horizon
                stays matte black — light diffuses through the disk rather than pooling at LED points.
              </p>
              <ul className="model-list">
                <li>
                  <span className="dot">→</span>Matte-black PLA/PETG event-horizon sphere, sprayed flat to kill
                  reflections.
                </li>
                <li>
                  <span className="dot">→</span>Translucent disk ring, mounted on standoffs so it never touches
                  the horizon.
                </li>
                <li>
                  <span className="dot">→</span>WS2812B addressable strip graded white-hot inward to deep red
                  outward, matching real temperature falloff.
                </li>
                <li>
                  <span className="dot">→</span>A thin photon-ring of LEDs just outside the horizon — the single
                  detail that reads as "real black hole" at a glance.
                </li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section>
          <div className="section-inner">
            <Reveal className="section-head">
              <div className="section-eyebrow mono">Bill of materials</div>
              <h2 className="section-title">What's actually in it.</h2>
            </Reveal>
            <div className="grid-2">
              <Reveal className="card glass">
                <span className="card-index mono">printing</span>
                <h3 className="card-name">Filament & Print</h3>
                <p className="card-desc">
                  Matte black PLA/PETG for the horizon; translucent or clear filament for the disk. FDM is
                  sufficient — resin only if finer photon-ring detail is wanted.
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
                  MDF or acrylic base plate, threaded rod or printed standoffs to hold the disk at an angle around
                  the horizon with a visible gap.
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
                  WS2812B addressable strip, ESP32 or Arduino controller, 5V supply sized to the strip's draw,
                  plus frosted acrylic or the print itself for diffusion.
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
                  Matte black spray for the horizon, clear UV-resistant coat for the disk, plus a soldering iron,
                  hot glue, and a multimeter for wiring checks.
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
              Optional: feed the ESP32 live Hawking-flux values from the quantum solver over WiFi, so disk
              brightness answers to <span>an actual running simulation</span> instead of a fixed animation.
            </p>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
