# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is the frontend for **Aartech Solonics' relay/protection panel product line** (BTS-2000, TransSync, etc.) — a marketing site plus a live SCADA-style dashboard for monitoring/controlling relay hardware (binary I/O, analog measurements, Modbus registers) over real-time streams, plus a separate admin panel.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint (flat config in `eslint.config.js`)

There is no test suite configured in this repo.

## Architecture

**Stack**: React 19 + Vite 7 + React Router 7 (client-side routing, `BrowserRouter`) + Tailwind CSS 3. No TypeScript, no state management library — state is local `useState`/`useEffect` per page.

**Routing** (`src/App.jsx`): a single flat `<Routes>` list. `Header`, `ChatBot`, and `Footer` are mounted globally outside `<Routes>` so they persist across all pages. Public marketing/product pages live in `src/pages/`; the admin-only panel lives in `src/admin/` (`Adminlogin.jsx`, `Relay.jsx`, `Userrelay_detail.jsx`, routed at `/admin-login`, `/admin-relay`, `/admin-relaydetail`).

**Live data pages** — the core of the product (`Binary-input.jsx`, `AnalogMeasurement.jsx`, `ModbusControlPanel.jsx`, `Digital_inputs.jsx`) connect to a backend at `https://mqtt-testing-2.onrender.com` via **Server-Sent Events** (`EventSource`, not WebSockets) on endpoints like `/api/v1/stream/bi-bo` and `/api/v1/stream/analog`. Pattern to follow when touching these pages:
- Auth token read from `localStorage.getItem("token") || sessionStorage.getItem("token")` and passed as a `?token=` query param on the SSE URL (SSE cannot send custom headers).
- `onerror` handlers detect `EventSource.CLOSED` as an auth failure and otherwise auto-reconnect via `setTimeout` (commonly ~3s).
- Each of these files currently hardcodes its own `API_BASE`/`STREAM_URL` constant near the top rather than importing a shared config — check for (and prefer reusing) an existing constant in the file before adding a new one.
- These are large, single-file page components (`ModbusControlPanel.jsx` alone is ~13,800 lines) mixing data-fetching, derived state, and full UI in one file. Don't assume small edits are "quick" — search within the file for the relevant section/tab first rather than reading it top to bottom.

**Auth**: no central auth context/provider. Each component independently reads `token`/`user` from `localStorage`/`sessionStorage` and treats presence of a token as authenticated. The admin panel (`src/admin/Adminlogin.jsx`) is separate from the public site's `Login.jsx`/`Register.jsx` and talks to a different-looking API base (`http://localhost:8000/api/v1` — appears to be a local/dev backend, distinct from the `onrender.com` streaming backend used elsewhere). When editing auth flows, check whether the file already has commented-out `axios`-based alternates left in place above the active `fetch`/`axios` implementation (this repo has several files with large blocks of dead/commented alternate implementations — don't assume the top of the file is authoritative, find the actual active code).

**ChatBot** (`src/pages/ChatBot.jsx`): currently has its runtime logic commented out entirely, with a `websiteData` Q&A dataset present for what appears to be a semantic-search bot (the `@tensorflow/tfjs` + `@tensorflow-models/universal-sentence-encoder` deps in `package.json` support this). Verify current state before assuming it's live in the running app.

**Styling**: Tailwind utility classes throughout; `framer-motion` for animation, `lucide-react` for icons, `recharts` for charts (used on the analog/dashboard pages).

## Notes for making changes

- Several page files contain large commented-out blocks (old implementations, alternate API URLs). When modifying one of these files, locate the actual active/uncommented code path first — don't edit inside a comment block by mistake, and don't assume the first matching definition in the file is the one in use.
- No environment variable convention (`import.meta.env`/`VITE_*`) is currently used — API base URLs are hardcoded per-file as plain string constants.
