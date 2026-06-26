# Immersive Landing Page

## Objective

- Deliver a source-faithful, highly polished single-page portfolio experience with a stationery-paper aesthetic.

## User-Facing Structure

- Fixed header with brand mark, active scene label, and reset control.
- Fixed footer status bar with local/scene telemetry styling.
- One long scroll rail composed of stacked scene sections in normal document flow.

## Scene Behaviors

- `hero`: scattered paper snippets introduce the world and visual language.
- `brief`: notebook-style prioritization scene with stamps, stickers, and task toggles.
- `room`: workspace scene for structured records and tables.
- `search`: search machine scene that auto-types queries and releases stamped output.
- `people`: people index scene for relationship-oriented cards and constellation layout.
- `sorting`: abstract sorting scene that reorganizes category markers into order.
- `drawers`: interactive filing cabinet scene with open, inspect, and cleanup behaviors.
- `footer`: signature close with final brand framing.

## Interaction Rules

- Scrolling is the primary navigation mechanism.
- Browser scrolling moves through real page sections instead of a single fixed viewport shell.
- Scene-local interactions can enrich a scene without changing global route state.
- Reset returns scroll position to the top of the composition.
- Scene labels must reflect eased progress, not raw scroll progress.

## Visual Rules

- Base palette centers on paper, ink, manila, and stamp accents.
- Typography mixes expressive serif, sans, and mono roles.
- Background uses a dot-grid paper field rather than a flat fill.
- Shared decorative elements include tears, staples, stains, stamps, and soft shadows.
