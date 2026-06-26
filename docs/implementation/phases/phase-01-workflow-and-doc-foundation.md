# Phase 01: Workflow And Doc Foundation

## Scope

- Align workflow enforcement with the actual `paper-work` repo.
- Establish approved design docs for the current frontend architecture and experience.
- Register repo-specific skills and agent instructions.

## Features

- Repo-specific `AGENTS.md` guidance.
- Repo config validation for design docs and frontend skill files.
- Design authority docs covering scenes, architecture, contracts, and integrations.
- Implementation docs that point execution work at the correct source-of-truth files.

## Tasks

- `docs/implementation/tasks/task-workflow-contract-adoption.md`

## Acceptance Criteria

- [x] `python3 .agents/workflows/workflow-contract/scripts/validate_workflow.py` returns `WORKFLOW:ok`.
- [x] `AGENTS.md` names workflow authority, repo skills, commands, and project boundaries.
- [x] `docs/design/` documents current frontend behavior without relying on implementation docs.
