import { useCallback, useEffect, useRef, useState } from "react";

// Override with VITE_WS_URL in a .env file if the backend isn't on the same
// host, e.g. VITE_WS_URL=ws://192.168.1.50:8000/ws for the exhibition rig.
const WS_URL = import.meta.env.VITE_WS_URL || `ws://${window.location.hostname}:8000/ws`;
const RECONNECT_DELAY_MS = 1500;
const HISTORY_POLL_MS = 1000;

/**
 * Owns the WebSocket connection to the Project Singularity backend and
 * exposes live simulation state, params, and history, plus control actions.
 * Reconnects automatically on drop — important for a kiosk running unattended.
 */
export function useSimulationSocket() {
  const [status, setStatus] = useState("connecting"); // connecting | connected | disconnected
  const [state, setState] = useState(null);
  const [params, setParams] = useState(null);
  const [history, setHistory] = useState({ times: [], probs: [], flux: [] });

  const wsRef = useRef(null);
  const reconnectTimer = useRef(null);
  const historyTimer = useRef(null);
  const mounted = useRef(true);

  const send = useCallback((command, extra = {}) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ command, ...extra }));
    }
  }, []);

  useEffect(() => {
    mounted.current = true;

    function connect() {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mounted.current) return;
        setStatus("connected");
        historyTimer.current = setInterval(() => send("get_history"), HISTORY_POLL_MS);
      };

      ws.onclose = () => {
        if (!mounted.current) return;
        setStatus("disconnected");
        clearInterval(historyTimer.current);
        reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY_MS);
      };

      ws.onerror = () => ws.close();

      ws.onmessage = (ev) => {
        let msg;
        try {
          msg = JSON.parse(ev.data);
        } catch {
          return;
        }
        if (msg.type === "state") setState(msg.data);
        else if (msg.type === "params") setParams(msg.data);
        else if (msg.type === "history") setHistory(msg.data);
        else if (msg.type === "error") console.error("[singularity]", msg.message);
      };
    }

    connect();

    return () => {
      mounted.current = false;
      clearTimeout(reconnectTimer.current);
      clearInterval(historyTimer.current);
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = useCallback(() => send("start"), [send]);
  const pause = useCallback(() => send("pause"), [send]);
  const reset = useCallback(() => send("reset"), [send]);
  const setSimParams = useCallback((patch) => send("set_params", { params: patch }), [send]);

  return { status, state, params, history, start, pause, reset, setSimParams };
}
