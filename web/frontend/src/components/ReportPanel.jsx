import { useReportJob } from "../hooks/useReportJob.js";

const STAGE_LABEL = {
  queued: "Queued…",
  baseline: "Running baseline simulation…",
  sweeps: "Running parameter sweeps (momentum, width, horizon)…",
  convergence: "Running convergence test…",
  pdf: "Assembling PDF…",
  done: "Done",
  error: "Failed",
};

export default function ReportPanel() {
  const { job, generate, downloadUrl } = useReportJob();

  const isRunning = job && (job.status === "queued" || job.status === "running");
  const isFailed = job?.status === "failed";
  const isReady = job?.status === "ready";

  return (
    <div className="report-panel glass">
      <div className="report-panel-head">
        <div>
          <h3 className="report-panel-title">Generate the full research report</h3>
          <p className="report-panel-desc">
            This re-runs the actual solver on the backend — the baseline evolution, momentum/width/horizon parameter
            sweeps, and a grid-convergence test — then assembles the results into a PDF. "Quick" finishes in roughly
            a minute; "Full" uses a larger grid and more steps and takes longer.
          </p>
        </div>
      </div>

      <div className="report-panel-actions">
        <button
          className="report-btn report-btn-primary"
          disabled={isRunning}
          onClick={() => generate("singularity_run", "quick")}
        >
          {isRunning ? "Working…" : "Generate quick report"}
        </button>
        <button
          className="report-btn"
          disabled={isRunning}
          onClick={() => generate("singularity_run", "full")}
        >
          Generate full report
        </button>
      </div>

      {job && (
        <div className="report-status mono">
          {isFailed ? (
            <span className="report-status-error">Failed: {job.error || "unknown error"}</span>
          ) : (
            <span>{STAGE_LABEL[job.stage] || job.status}</span>
          )}
        </div>
      )}

      {isReady && (
        <div className="report-summary">
          {job.summary && (
            <div className="report-summary-grid mono">
              <div>
                <span className="report-summary-label">Captured</span>
                <span className="report-summary-value">{formatPct(job.summary.captured)}</span>
              </div>
              <div>
                <span className="report-summary-label">Reflected</span>
                <span className="report-summary-value">{formatPct(job.summary.reflected)}</span>
              </div>
              <div>
                <span className="report-summary-label">Transmitted</span>
                <span className="report-summary-value">{formatPct(job.summary.transmitted)}</span>
              </div>
              <div>
                <span className="report-summary-label">Total energy</span>
                <span className="report-summary-value">{formatNum(job.summary.energy)}</span>
              </div>
            </div>
          )}
          <a className="report-btn report-btn-download" href={downloadUrl} download>
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
}

function formatPct(v) {
  if (typeof v !== "number") return "—";
  return `${(v * 100).toFixed(1)}%`;
}
function formatNum(v) {
  if (typeof v !== "number") return "—";
  return v.toFixed(4);
}
