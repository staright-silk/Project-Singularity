import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Simulation from "./pages/Simulation.jsx";
import Model from "./pages/Model.jsx";
import About from "./pages/About.jsx";
import Splash, { shouldShowIntro } from "./components/Splash.jsx";

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro());

  if (showIntro) {
    return <Splash onDone={() => setShowIntro(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simulation" element={<Simulation />} />
      <Route path="/model" element={<Model />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
