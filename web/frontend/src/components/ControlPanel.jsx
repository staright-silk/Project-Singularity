import { useEffect, useState } from "react";

const PARAM_DEFS = [
  { key: "rs", label: "BLACK HOLE MASS", symbol: "rₛ", min: 0.5, max: 6, step: 0.1 },
  { key: "p0", label: "INITIAL MOMENTUM", symbol: "p₀", min: -6, max: 0, step: 0.1 },
  { key: "sigma", label: "PACKET WIDTH", symbol: "σ", min: 0.5, max: 6, step: 0.1 },
  { key: "hawking_temperature", label: "HAWKING TEMPERATURE", symbol: "Tₕ", min: 0, max: 1, step: 0.01 },
  { key: "radiation_width", label: "RADIATION WIDTH", symbol: "Δr", min: 0.5, max: 10, step: 0.1 },
];

export default function ControlPanel({ params, running, onStart, onPause, onReset, onSetParams }) {
  const [local, setLocal] = useState({});

  useEffect(() => {
    if (params) setLocal(params);
  }, [params]);

  if (!params) {
    return (
      <div className="control-panel control-panel--empty">
        <span className="pulse-dot" /> LINKING TO SOLVER…
      </div>
    );
  }

  const commit = (key, value) => setLocal((prev) => ({ ...prev, [key]: value }));
  const release = (key, value) => onSetParams({ [key]: value });

  return (
    <div className="control-panel">
      <div className="console-buttons">
        <button
          className={`console-btn console-btn--go ${running ? "is-active" : ""}`}
          onClick={onStart}
          aria-pressed={running}
        >
          ▶ Start
        </button>
        <button
          className={`console-btn console-btn--pause ${!running ? "is-active" : ""}`}
          onClick={onPause}
          aria-pressed={!running}
        >
          ❚❚ Pause
        </button>
        <button className="console-btn console-btn--reset" onClick={onReset}>
          ↺ Reset
        </button>
      </div>

      <div className="sliders">
        {PARAM_DEFS.map((def) => (
          <div className="slider-row" key={def.key}>
            <div className="slider-label">
              <span>{def.label}</span>
              <span className="slider-value">
                {(local[def.key] ?? def.min).toFixed(2)}
                <span className="slider-symbol"> {def.symbol}</span>
              </span>
            </div>
            <input
              type="range"
              min={def.min}
              max={def.max}
              step={def.step}
              value={local[def.key] ?? def.min}
              onChange={(e) => commit(def.key, parseFloat(e.target.value))}
              onMouseUp={(e) => release(def.key, parseFloat(e.target.value))}
              onTouchEnd={(e) => release(def.key, parseFloat(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
