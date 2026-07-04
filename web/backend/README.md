# Project Singularity — Hawking Radiation Backend

FastAPI + WebSocket server wrapping the split-operator quantum simulation
from `quantum3_hawking_complete.py`. This is the backend piece only — no
React/Three.js frontend yet, per the current build plan.

## Files

- `solver.py` — the physics engine. Refactored from your script into a
  `HawkingSimulation` class: same numerics (Strang-split Fourier method,
  absorbing boundaries, stochastic Hawking source), but steppable/resettable/
  reconfigurable instead of driving a matplotlib loop.
- `main.py` — FastAPI app. WebSocket at `/ws` for live streaming + control,
  plus REST endpoints for the same operations.
- `test_client.html` — a standalone, dependency-free HTML page that connects
  to the WebSocket and draws the wavefunction live. Use this to sanity-check
  the backend before the real frontend exists.
- `requirements.txt`

## Run it

```bash
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Then either:
- open `test_client.html` directly in a browser (it points at
  `ws://<hostname>:8000/ws`), or
- hit `http://localhost:8000/docs` for interactive REST docs.

## WebSocket protocol (`/ws`)

On connect, the server immediately sends one `state` frame and one `params`
frame. After that it's message-driven: send JSON, get JSON back.

**Client → server** (`{"command": ..., "params": {...}}`):

| command       | params                          | effect                                      |
|---------------|----------------------------------|----------------------------------------------|
| `start`       | —                                | resumes stepping + broadcasting              |
| `pause`       | —                                | stops stepping                               |
| `reset`       | —                                | reinitializes wavepacket, clears history     |
| `set_params`  | any subset of the fields below   | updates params, rebuilds grid, resets        |
| `get_history` | —                                | requests full (downsampled) time series      |
| `get_params`  | —                                | requests current parameter values            |

**Server → client** (`{"type": ..., "data": ...}`):

- `type: "state"` — one simulation frame, broadcast continuously at ~30 Hz
  while running (3 physics steps per broadcast tick, so effective sim rate
  is ~90 steps/sec). Fields: `r`, `density`, `hawking`, `potential` (each
  downsampled to ~1024 points), plus `time`, `step`, `probability`,
  `captured_probability`, `flux`, `rs`, `running`.
- `type: "history"` — `{times, probs, flux}`, downsampled to ≤500 points.
- `type: "params"` — current parameter dict.
- `type: "error"` — `{message}`.

## Tunable parameters

These map directly to the knobs in your original script and are what the
eventual UI controls (mass, momentum, wave-packet width, Hawking
temperature, grid size, time step, radiation strength) should drive:

| param                  | meaning                                         | script default |
|-------------------------|--------------------------------------------------|-----------------|
| `rs`                    | Schwarzschild radius (≈ black hole mass)          | 2.0 |
| `L`                      | radial domain length                              | 100.0 |
| `N`                      | grid points (perf/quality tradeoff)               | 4096 |
| `dt`                     | integration time step                             | 0.005 |
| `r0`, `sigma`, `p0`      | initial wave packet center, width, momentum       | 30, 2, -2.5 |
| `hawking_temperature`    | amplitude of the stochastic Hawking source         | 0.15 |
| `radiation_width`        | radial extent of the Hawking emission region       | 3.0 |
| `eps`                    | potential softening near the horizon               | 0.01 |
| `awl`, `awr`             | absorbing-boundary widths (left/horizon, right)    | 5.0, 15.0 |
| `noise_amp`              | coupling strength of injected Hawking noise        | 0.002 |

**Note on `N`:** the original script uses `N=4096`. That's fine for a
matplotlib loop redrawing every 20 steps, but at `N=4096` every broadcast
frame ships ~1024 floats × 3 arrays over the wire, ~90×/sec while running.
That's manageable, but if the exhibition machine + browser start to strain,
drop `N` (e.g. 1024–2048) via `set_params` — the physics is unchanged, just
lower resolution.

## What's next

This backend is standalone-testable now (via `test_client.html`) but isn't
wired to anything else in Project Singularity yet. Natural next steps, in
whatever order you want them:

1. React dashboard (live probability/flux charts, param controls, start/
   pause/reset) consuming this same `/ws` protocol.
2. Three.js black hole scene, either independent or fed by this same socket
   for radius/temperature-driven visuals.
3. Swap this backend to import your actual `quantum3.py` classes
   (`SchwarzschildPotential`, `SplitOperatorSolver`) directly, since you
   mentioned the OpenGL renderer already does — that'd replace `solver.py`'s
   local numerics with your canonical 3D implementation instead of this 1D
   radial refactor, if you want full parity with the C++/Python renderers.
