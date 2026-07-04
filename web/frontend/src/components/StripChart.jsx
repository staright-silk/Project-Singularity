import { useEffect, useRef } from "react";

export default function StripChart({ label, data, color, maxPoints = 300 }) {
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

    ctx.strokeStyle = "rgba(125, 207, 255, 0.08)";
    ctx.beginPath();
    ctx.moveTo(0, cssH / 2);
    ctx.lineTo(cssW, cssH / 2);
    ctx.stroke();

    if (!data || data.length < 2) return;
    const slice = data.slice(-maxPoints);
    const max = Math.max(...slice, 1e-6);

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = color;
    ctx.shadowBlur = 4;
    ctx.beginPath();
    slice.forEach((v, i) => {
      const x = (i / (slice.length - 1)) * cssW;
      const y = cssH - (v / max) * (cssH - 8) - 4;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [data, color, maxPoints]);

  const latest = data && data.length ? data[data.length - 1] : 0;

  return (
    <div className="strip">
      <div className="strip-head">
        <span className="strip-label">{label}</span>
        <span className="strip-value" style={{ color }}>
          {latest.toFixed(4)}
        </span>
      </div>
      <canvas ref={canvasRef} className="strip-canvas" />
    </div>
  );
}
