---
name: paper-work-frontend
description: Work on the paper-work Vite/React landing page with the correct scene architecture, data boundaries, verification flow, and repository-specific frontend conventions.
---

# Paper Work Frontend

Use this skill for any React, TypeScript, CSS, scene, animation, or visual verification task in this repo.

## Read First

1. `docs/design/features/immersive-landing-page.md`
2. `docs/design/architecture/scene-orchestration.md`
3. `docs/design/data-models/scene-content.md`
4. `src/App.tsx`
5. `src/types.ts`
6. `src/data.ts`
7. Target scene component in `src/components/`

## Architecture Map

- `src/main.tsx` mounts the app.
- `src/App.tsx` owns global scroll state, easing, active-scene detection, and fixed chrome.
- `src/types.ts` owns shared scene and fixture types plus `SCENE_BOUNDS`.
- `src/data.ts` owns static content fixtures.
- `src/components/*.tsx` own scene-local transitions and interactions.
- `src/index.css` owns theme tokens and reusable paper/stamp utilities.

## Working Rules

- Keep scene-level behavior inside the owning component unless multiple scenes require the same logic.
- Treat `SCENE_BOUNDS` as the canonical scene registry.
- Update design docs before changing scene order, architecture boundaries, or user-facing behavior.
- Prefer extending existing visual tokens in `src/index.css` over scattering one-off inline values.
- Keep static content in `src/data.ts` unless the feature introduces a documented data source.

## Verification

- Run `npm run lint` after TypeScript or JSX edits.
- Run `npm run build` after significant frontend changes.
- Use `browser:control-in-app-browser` against `http://127.0.0.1:3000` after major UI work.

## Common Task Routing

- New scene behavior: update design docs first, then edit `src/App.tsx`, `src/types.ts`, and the target scene file.
- Scene copy or fixture updates: edit `src/data.ts` and verify the owning scene.
- Shared visual language updates: edit `src/index.css` and inspect multiple scenes for regressions.
