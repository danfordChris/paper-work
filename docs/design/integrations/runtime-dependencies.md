# Runtime Dependencies

## Active Runtime

- `react` and `react-dom`: single-page application runtime.
- `vite`: local development and production bundling.
- `@vitejs/plugin-react`: React compilation for Vite.
- `@tailwindcss/vite` and `tailwindcss`: utility styling pipeline.
- `lucide-react`: icon set used across scenes.
- `motion`: animation dependency available to the repo.

## Repo-Level Constraints

- Development server default: `npm run dev` on port `3000`.
- Type check command: `npm run lint`.
- Production verification command: `npm run build`.

## Dormant or Unused Paths

- `@google/genai`, `dotenv`, and `express` are installed but not imported by the current `src/` entry path.
- `.env.example` and `metadata.json` indicate AI Studio and Gemini-related scaffolding that is not part of the current rendered scene flow.

## Decision Boundary

- Do not build workflow assumptions around Gemini or server-side behavior unless a design doc adopts that behavior first.
