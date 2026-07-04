export default function Readout({ label, value, unit = "" }) {
  return (
    <div className="readout">
      <span className="readout-label">{label}</span>
      <span className="readout-value">
        {value}
        {unit && <span className="readout-unit">{unit}</span>}
      </span>
    </div>
  );
}
