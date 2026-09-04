# Persistent Project Memory and Obsidian Brain

This rule defines the persistent memory architecture for Fleetmanagement and complements `.clinerules/40-completion-gate-github.md`.

## Sources of Truth

- Current Cline task context = working memory for the current task.
- Repository files = authoritative current code/configuration.
- Git = exact source history and diffs.
- GitHub = authoritative tasks, bugs, issues, PRs, milestones and CI.
- Obsidian = long-term project brain: architecture, decisions, verified Current/Previous state, verification history and sessions.
- `memory-bank/` = small fast cross-task cache/index.

Do not copy full source files into Obsidian or `memory-bank/`.

## Required Local Memory

Maintain:
- `memory-bank/activeContext.md`
- `memory-bank/projectState.md`
- `memory-bank/brainIndex.md`

Keep them concise.

## Task Start

At the beginning of a substantial task:
1. read the three local memory-bank files;
2. load only relevant Obsidian Current notes and ADRs;
3. read GitHub issues only when task/bug status matters;
4. verify implementation details against actual repository files.

Do not recursively read the whole repository merely to restore context.
Do not load the whole Obsidian vault into context.

## In-Session File Memory

When you create or modify a file during the current task:
- retain the written content/diff in working context;
- do not re-read it solely to remember what you just wrote.

Re-read when:
- shell/fallback writing requires verification;
- another agent/process/formatter/generator may have changed it;
- a command may have rewritten it;
- the on-disk state is needed for testing/review;
- context compaction means previous content is no longer reliable.

The repository on disk remains authoritative.

## Obsidian Structure

Use vault `ClineBrain` and root `Projects/Fleetmanagement/`.

Maintain:
- `Current/Project-State.md`
- `Current/Work-Queue.md`
- `Current/Architecture.md`
- `Current/Backend.md`
- `Current/Frontend.md`
- `Current/Android.md`
- `Current/Database.md`
- `Current/Infrastructure.md`
- `Current/Verification.md`
- `Previous/`
- `Decisions/`
- `Sessions/`

`Current/` is only the latest fully verified state.
`Previous/` is exactly the verified state immediately before Current.
Keep only one Previous snapshot; exact history belongs in Git.

## Current -> Previous Rotation

Only after `.clinerules/40-completion-gate-github.md` passes:
1. replace Previous with the old Current snapshot;
2. write a new Current snapshot from the verified repository state;
3. synchronize `Current/Work-Queue.md` from GitHub;
4. create/update durable ADRs;
5. create a concise Session note;
6. update the three local memory-bank files;
7. only then send the final user response.

Never rotate a failed or unverified state into Current.
Do not bump the project version again during memory synchronization.

## ADRs

Store durable decisions as `Decisions/ADR-NNN-short-name.md` with:
- Date
- Status
- Context
- Decision
- Reason
- Alternatives considered
- Consequences
- Affected systems
- Related files
- Related GitHub issues/PRs
- Supersedes / Superseded by

Do not rewrite accepted historical reasoning. Create a new ADR when a decision changes.

## Sessions

After every completed repository-changing prompt create:
`Sessions/YYYY-MM-DD-HHMM-short-description.md`

Include:
- user request
- previous/new version
- work completed
- important files changed
- durable decisions
- bugs found
- GitHub issues created/updated/closed
- verification performed/result
- remaining work
- next recommended step

Sessions are append-only.

## Agent Responsibilities

Planner: read local memory first, then only relevant Obsidian details.
Builders: use memory for context but repository files for implementation truth.
Reviewer: compare implementation against Current architecture and ADRs.
Tester: write verification facts only after tests actually execute.
Coordinator: owns final memory rotation after the completion gate passes.

## Memory Quality

Store verified facts and conclusions, not private chain-of-thought.
Never store passwords, tokens, secrets, credentials, auth headers, temporary guesses or speculative architecture as fact.
If memory conflicts with the repository, inspect the repository and correct memory after verification.
