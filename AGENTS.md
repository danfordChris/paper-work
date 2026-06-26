# AGENTS.md

## Workflow Authority

- Canonical workflow policy: `.agents/workflows/workflow-contract/spec/*`
- Canonical validator: `python3 .agents/workflows/workflow-contract/scripts/validate_workflow.py`

## Start Here

1. Classify the request by layer, lifecycle state, and agent mode.
2. Run `python3 .agents/workflows/workflow-contract/scripts/validate_workflow.py`.
3. Read `docs/design/` before changing code or implementation docs.
4. Read `docs/implementation/project.md` and linked phase/task docs before execution work.
5. If behavior is unresolved, create or update a proposal in `docs/changes/proposed/`.
6. Load the required repo skill before editing frontend code.

## Repo Skills

- Use `$workflow-contract` for design docs, implementation docs, backlog changes, status updates, and workflow validation work.
- Use `$paper-work-frontend` for React, TypeScript, Tailwind, scene choreography, data modeling, and local UI verification work.
- Use `browser:control-in-app-browser` after significant UI changes to inspect `http://127.0.0.1:3000`.
- Use `vercel:react-best-practices` after editing multiple TSX files or changing interaction-heavy components.

## Project Boundaries

- `src/App.tsx` owns global scroll orchestration, viewport chrome, and scene mounting order.
- `src/components/*.tsx` own scene-local rendering and animation state.
- `src/data.ts` owns static content fixtures for the immersive demo.
- `src/types.ts` owns cross-scene data contracts and scene bounds.
- `src/index.css` owns theme tokens, paper aesthetic, and shared motion primitives.

## Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Type check: `npm run lint`
- Production build: `npm run build`

## Non-Negotiables

- Do not define new product behavior in `docs/implementation`.
- Do not change scene order or `SCENE_BOUNDS` without updating `docs/design/features/immersive-landing-page.md`.
- Do not move data contracts from `src/types.ts` into component-local ad hoc types.
- Verify UI-affecting work with `npm run build` and browser inspection when the change is substantial.
