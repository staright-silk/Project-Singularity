import { NavLink } from "react-router-dom";

export default function SiteNav() {
  return (
    <nav className="site-navbar glass">
      <div className="site-brand">
        <span className="site-brand-dot" />
        SINGULARITY
      </div>
      <div className="site-nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink to="/simulation" className={({ isActive }) => (isActive ? "active" : "")}>
          Simulation
        </NavLink>
        <NavLink to="/model" className={({ isActive }) => (isActive ? "active" : "")}>
          Physical Model
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          About
        </NavLink>
      </div>
      <a
        className="site-nav-cta glass"
        href="https://github.com/staright-silk/Project-Singularity"
        target="_blank"
        rel="noopener noreferrer"
      >
        Repository
      </a>
    </nav>
  );
}
