# Task: Workflow Contract Adoption

## Status

- done
- Last updated: 2026-06-26

## Linked Phase

- `docs/implementation/phases/phase-01-workflow-and-doc-foundation.md`

## Agent Context

- Skills: workflow-contract, paper-work-frontend
- Design docs: docs/design/features/immersive-landing-page.md, docs/design/architecture/scene-orchestration.md, docs/design/data-models/scene-content.md, docs/design/integrations/runtime-dependencies.md
- Constraints: keep workflow enforcement repo-specific; keep implementation docs free of net-new product behavior
- Do not touch: src/components unless a validation or documentation issue requires source correction

## Objective

Make the workflow contract enforce repo-specific design docs, skills, and implementation artifacts for the current landing-page app.

## Scope Boundary

**In scope:**
- AGENTS.md
- docs/README.md
- docs/design/
- docs/implementation/
- docs/changes/
- .agents/workflows/workflow-contract/repo.config.json
- .agents/skills/paper-work-frontend/

**Out of scope:**
- Functional UI redesign
- Scene content changes in `src/data.ts`
- Runtime logic changes in `src/components/`

## Acceptance Criteria

- [x] Workflow validation requires repo-specific design docs and `paper-work-frontend` skill files.
- [x] Documentation identifies the current scene order, architecture boundaries, and inactive Gemini/server scaffolding.
- [x] Agent instructions define which skills and verification commands to use for frontend work.

## Dependencies

- None

## Implementation Checklist

- [x] Audit repo structure, app runtime, and existing workflow contract files.
- [x] Update workflow config to enforce repo-specific docs and skill paths.
- [x] Create approved design docs for the current frontend.
- [x] Update implementation docs and status to point at the new design authority.
- [x] Add repo-specific frontend skill instructions.
- [x] Run workflow validation and production build.

## Verification

- Command: `python3 .agents/workflows/workflow-contract/scripts/validate_workflow.py && npm run build`
- Evidence: workflow validator returned `WORKFLOW:ok`; Vite production build completed successfully on 2026-06-26.
