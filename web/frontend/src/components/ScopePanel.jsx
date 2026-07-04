import { useEffect, useRef } from "react";

const VIEW_SPAN = 60; // how many units past the horizon to show

function drawTrace(ctx, r, y, xOf, baseline, scale, color, width, glow) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.shadowColor = glow ? color : "transparent";
  ctx.shadowBlur = glow ? 7 : 0;
  ctx.beginPath();
  let started = false;
  for (let i = 0; i < r.length; i++) {
    const x = xOf(r[i]);
    const yy = baseline - y[i] * scale;
    if (!started) {
      ctx.moveTo(x, yy);
      started = true;
    } else {
      ctx.lineTo(x, yy);
    }
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}

export default function ScopePanel({ state }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth;
    const cssH = canvas.clientHeight;
    if (canvas.width !== cssW * dpr || canvas.height !== cssH * dpr) {
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    if (!state) return;

    const { r, density, hawking, potential, rs } = state;
    const rMin = rs;
    const rMax = rs + VIEW_SPAN;
    const xOf = (rv) => ((rv - rMin) / (rMax - rMin)) * cssW;
    const baseline = cssH - 18;

    // instrument grid
    ctx.strokeStyle = "rgba(125, 207, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let gx = 0; gx <= cssW; gx += cssW / 12) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, cssH);
      ctx.stroke();
    }
    for (let gy = 0; gy <= cssH; gy += cssH / 6) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(cssW, gy);
      ctx.stroke();
    }

    // event horizon marker
    const hx = xOf(rs);
    ctx.strokeStyle = "rgba(255, 158, 100, 0.85)";
    ctx.setLineDash([3, 5]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(hx, 0);
    ctx.lineTo(hx, cssH);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#ff9e64";
    ctx.font = "600 10px var(--font-mono)";
    ctx.textBaseline = "top";
    ctx.fillText("r = rs", hx + 6, 6);

    // potential well (context, faint)
    drawTrace(ctx, r, potential, xOf, baseline, cssH * 0.045, "rgba(111, 119, 147, 0.55)", 1, false);

    // bound wavefunction — what's still there
    drawTrace(ctx, r, density, xOf, baseline, cssH * 0.78, "#7dcfff", 1.75, true);

    // escaping radiation — what's leaving
    drawTrace(ctx, r, hawking, xOf, baseline, cssH * 0.78, "#ff9e64", 1.75, true);
  }, [state]);

  return (
    <div className="scope-panel">
      <div className="scope-corner scope-corner--tl" />
      <div className="scope-corner scope-corner--tr" />
      <div className="scope-corner scope-corner--bl" />
      <div className="scope-corner scope-corner--br" />
      <div className="scope-legend">
        <span className="legend-item">
          <span className="legend-swatch legend-swatch--bound" /> bound |ψ|²
        </span>
        <span className="legend-item">
          <span className="legend-swatch legend-swatch--radiation" /> Hawking flux
        </span>
      </div>
      <canvas ref={canvasRef} className="scope-canvas" />
      {!state && <div className="scope-empty">AWAITING SIGNAL FROM SOLVER…</div>}
    </div>
  );
}
