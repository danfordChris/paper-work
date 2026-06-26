# Scene Orchestration

## Runtime Shape

- `src/main.tsx` mounts a single `App` root.
- `src/App.tsx` owns the global scroll listener, eased progress interpolation, active scene detection, and fixed chrome.
- `src/components/*.tsx` render scene-local UI from the shared `progress` value.
- `src/App.tsx` mounts scenes into stacked document sections whose heights are derived from `SCENE_BOUNDS`.

## Orchestration Rules

- Use one document scroll source: `window.scrollY`.
- Store raw progress and eased progress separately.
- Derive active scene labels from `SCENE_BOUNDS` in `src/types.ts`.
- Mount scenes in normal document flow inside `main`.
- Size each scene section from the scene's `start`/`end` range.
- Let each scene decide visibility and local interpolation from the shared progress input.

## Scene Order

1. `hero`
2. `brief`
3. `room`
4. `search`
5. `people`
6. `sorting`
7. `drawers`
8. `footer`

## Ownership Boundaries

- `src/App.tsx`: scroll engine, header, footer bar, scene mount order, reset control.
- `src/App.tsx`: section stacking and section height mapping from `SCENE_BOUNDS`.
- `src/types.ts`: `SceneId` union and `SCENE_BOUNDS`.
- `src/data.ts`: fixture content rendered by scene components.
- `src/index.css`: global tokens, background grid, shared paper/stamp motion utilities.

## Change Constraints

- Do not add a new scene without updating `SceneId`, `SCENE_BOUNDS`, `App.tsx`, and `docs/design/features/immersive-landing-page.md`.
- Do not move shared visual tokens into scene-local CSS.
- Do not create cross-scene state coupling unless the behavior is documented here first.
