# GitHub Tasks/Bugs and Obsidian Work-Queue Sync

GitHub is authoritative for tasks and bugs. Obsidian stores a readable memory snapshot only.

## GitHub

Use GitHub Issues for:
- tasks
- bugs
- features
- maintenance
- milestones/releases when applicable

Prefer labels such as `type:task`, `type:bug`, `type:feature`, `type:maintenance` if equivalent labels do not already exist.
Reuse existing equivalent labels instead of creating duplicates.

For bugs, use the severity/area conventions from `.clinerules/40-completion-gate-github.md`.

## Planning

For substantial work:
1. search existing GitHub issues first;
2. create a parent issue when the user request is a meaningful tracked unit of work;
3. create/link smaller issues/sub-issues only when independently actionable;
4. use milestones only for real milestones/releases;
5. do not create dozens of tiny issues for trivial internal steps.

Planner proposes structure. Coordinator owns final issue creation/status.

## Bug Flow

Bug discovered -> search GitHub -> create/update issue -> diagnose -> fix -> targeted retest -> update issue -> full regression -> independent verification -> close.

Do not duplicate the full issue body into Obsidian.

## Obsidian Work Queue

Maintain `Projects/Fleetmanagement/Current/Work-Queue.md` as a snapshot generated from GitHub.

It must contain:
- sync timestamp
- project version
- active milestone if any
- open task summary
- open feature summary
- open bug summary
- BLOCKER/HIGH summary
- recently closed items relevant to the current session
- issue numbers + short titles

Every Work-Queue note must state:
`GitHub Issues are authoritative. This note is a memory snapshot only.`

## Rotation

When the completion gate passes:
1. old Current Work-Queue becomes Previous Work-Queue;
2. query GitHub again;
3. generate a fresh Current Work-Queue from actual GitHub state.

This allows Current vs Previous comparisons without creating a second task system.

## GitHub Access

Preferred order:
1. GitHub MCP
2. `gh` CLI fallback

If GitHub is unavailable, do not invent task/bug state. Keep the previous snapshot unchanged and report memory sync as incomplete.
