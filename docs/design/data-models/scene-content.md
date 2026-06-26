# Scene Content Model

## Core Contracts

- `HeroSnippet`: scattered paper card content and placement metadata for the hero pile.
- `BriefTask`: notebook task item contract for prioritization and lightweight actions.
- `RoomRow`: structured row data for the room workspace table.
- `PeopleContact`: constellation-card contract for the people scene.
- `SearchPrompt`: rotating query-to-output contract for the search machine.
- `DrawerDetail` and `DrawerSlip`: drawer cabinet summary and detailed slip payloads.

## Scene Registry

- `SceneId` is the canonical scene registry.
- `SCENE_BOUNDS` is the canonical map from scroll interval to scene identity and label.

## Data Rules

- Keep reusable contracts in `src/types.ts`.
- Keep static demo content in `src/data.ts`.
- Keep scene-local UI state inside the scene component unless multiple scenes need the same state.
- Keep scroll thresholds centralized in `SCENE_BOUNDS` or documented scene-local visibility ranges.

## Current Data Source

- All scene content is local static data.
- No runtime fetches are active in the current frontend path.
