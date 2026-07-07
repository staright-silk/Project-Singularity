import { useCallback, useRef, useState } from "react";

// Same host-detection pattern as useSimulationSocket.js — override with
// VITE_API_URL in a .env file if the backend isn't on the same host.
const API_BASE = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:8000`;

const POLL_INTERVAL_MS = 1500;

/**
 * Drives the backend's report generation pipeline:
 *   POST /api/report            -> starts a job (runs the full quantum sim +
 *                                   parameter sweeps + convergence test +
 *                                   PDF assembly on the backend)
 *   GET  /api/report/{id}       -> polled while the job runs
 *   GET  /api/report/{id}/download -> the finished PDF
 *
 * This can take anywhere from ~10s ("quick") to a couple of minutes ("full"),
 * since it's re-running real physics, not just formatting a template.
 */
export function useReportJob() {
  const [job, setJob] = useState(null); // { id, status, stage, summary, filename, error, ... }
  const pollRef = useRef(null);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const pollJob = useCallback(
    (jobId) => {
      stopPolling();
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${API_BASE}/api/report/${jobId}`);
          if (!res.ok) throw new Error(`status check failed (${res.status})`);
          const data = await res.json();
          setJob(data);
          if (data.status === "ready" || data.status === "failed") {
            stopPolling();
          }
        } catch (err) {
          setJob((prev) => ({ ...(prev || {}), status: "failed", error: String(err) }));
          stopPolling();
        }
      }, POLL_INTERVAL_MS);
    },
    [stopPolling]
  );

  const generate = useCallback(
    async (label = "singularity_run", quality = "quick") => {
      setJob({ status: "queued", stage: "queued" });
      try {
        const res = await fetch(`${API_BASE}/api/report`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ label, quality }),
        });
        if (!res.ok) throw new Error(`failed to start report (${res.status})`);
        const data = await res.json();
        setJob(data);
        if (data.id) pollJob(data.id);
      } catch (err) {
        setJob({ status: "failed", error: String(err) });
      }
    },
    [pollJob]
  );

  const downloadUrl = job?.status === "ready" && job?.id ? `${API_BASE}/api/report/${job.id}/download` : null;

  return { job, generate, downloadUrl };
}
