# Completion, Testing, GitHub Bug Tracking, Versioning and Release Gate

This rule is mandatory for every repository-changing implementation task, milestone, bug fix, refactor, and release-preparation task.

A task is NOT complete until this gate has been executed.

## Bug Tracking Source of Truth

GitHub Issues are the single source of truth for bugs.

- Do NOT create or maintain `BUGS.md`.
- If `BUGS.md` already exists, migrate any unique relevant entries to GitHub Issues before removing it.
- Prefer GitHub MCP for GitHub operations.
- Use `gh` CLI only as fallback.
- If neither GitHub MCP nor `gh` works, do not silently skip bug tracking. Report the task as `PARTIALLY READY` or `BLOCKED`.

## Mandatory Completion Sequence

Before the final response:

1. Finish the requested implementation.
2. Discover the real build/test/lint/typecheck/migration/Android/frontend/backend/integration/E2E commands from the repository.
3. Run the complete applicable verification suite.
4. Inspect all failures, warnings, crashes, regressions, and reproducible bugs.
5. Search GitHub Issues to avoid duplicates.
6. Create or update a GitHub Issue for every newly discovered reproducible bug BEFORE considering it handled.
7. Fix all reproducible bugs that can be fixed inside the repository.
8. Run targeted retests after each fix.
9. Update the corresponding GitHub Issue with root cause, fix, changed components, and verification evidence.
10. Run the complete applicable verification suite again.
11. Repeat the loop until all required checks pass or a genuine blocker remains.
12. Close issues only after independent verification succeeds.
13. Update the project version.
14. Update `CHANGELOG.md`.
15. Verify repository state, version, changelog, and GitHub issue state are consistent.
16. Only then provide the final completion report.

## Full-System Verification

Discover commands from actual project files instead of inventing them.

Inspect where applicable:

- root/workspace `package.json`
- Gradle/Android files
- test configs
- Playwright config
- Docker/Docker Compose
- Prisma/database config
- CI config
- architecture/project docs

Run every applicable category that exists:

- dependency validation
- lint
- formatting validation
- type checking
- backend build/tests
- frontend build/tests
- Android Gradle build/tests
- database schema/migration validation
- API/integration tests
- E2E/Playwright tests
- Docker build/start/health checks
- smoke/regression tests
- security checks
- CI checks when available

If something cannot be run, state exactly why in the final report.

## GitHub Bug Issue Format

Prefer one issue per independently actionable defect.

Suggested title:

`[BUG][AREA][SEVERITY] Short descriptive title`

Every bug issue must contain:

- discovered date/time
- project version where discovered
- severity
- affected component
- related prompt/task/milestone
- symptoms
- reproduction steps
- expected behavior
- actual behavior
- root cause when known
- affected files/components
- fix description
- fixed date/time
- fixed-in version
- verification performed
- verification result
- remaining risk/notes

Use ISO 8601 timestamps including timezone where possible.

## Severity Labels

Use exactly:

- `BLOCKER`
- `HIGH`
- `MEDIUM`
- `LOW`

Preferred labels:

- `bug`
- `severity:blocker`
- `severity:high`
- `severity:medium`
- `severity:low`

## Area Labels

Reuse equivalent existing labels first.

Otherwise prefer:

- `area:backend`
- `area:web`
- `area:android`
- `area:database`
- `area:api`
- `area:security`
- `area:infrastructure`
- `area:testing`
- `area:documentation`

Do not create duplicate labels with equivalent meaning.

## Issue Lifecycle

1. Search for an existing matching issue.
2. Create a new issue only if no matching issue exists.
3. Add diagnosis/progress comments while investigating.
4. After implementation, add root cause, fix, changed files/components, and targeted test results.
5. After full regression verification passes, add final verification evidence.
6. Close the issue only after independent verification.

A builder must not close its own bug solely because it implemented a fix.

## Existing Bugs Found During Regression

If full-system testing reveals an existing unrelated defect:

1. Search GitHub Issues.
2. Reuse an existing issue if it matches.
3. Otherwise create a new issue.
4. Attempt to fix it when reasonably in scope.
5. Verify independently.
6. Keep the issue history permanently.

If it cannot be fixed due to an external dependency, unavailable service, missing credential, unsupported environment, hardware limitation, or another genuine blocker:

- keep the issue open
- document the blocker
- do not claim full completion

## GitHub Milestones

If a GitHub milestone is in use:

- associate relevant issues with it
- check issue state before declaring the milestone complete

A milestone is not complete while it contains unresolved blocking defects or failed required verification.

## Versioning

Maintain a canonical project version.

Preferred file:

`VERSION`

If it does not exist:

1. inspect the repository for the authoritative existing version
2. create `VERSION` using that version
3. if no version exists, initialize at `0.1.0`

Use Semantic Versioning:

`MAJOR.MINOR.PATCH`

For every successfully completed repository-changing implementation prompt, increment the version exactly once.

- PATCH: normal fixes, maintenance, small changes
- MINOR: completed meaningful backward-compatible feature or milestone
- MAJOR: explicitly approved breaking release

Do not bump the version when no deliverable repository change was completed.

## Version Synchronization

Synchronize locations that represent the same application/release version where appropriate:

- `VERSION`
- root `package.json`
- relevant application manifests
- Android `versionName`
- Android `versionCode`
- release/version docs

Do not modify dependency versions or intentionally independent component versions without reason.

## Changelog

Maintain:

`CHANGELOG.md`

For every version change, add:

- version
- date/time
- prompt/task/milestone
- features added
- changes made
- GitHub issues discovered
- GitHub issues fixed
- known/open issues
- tests executed
- verification result
- migration/deployment notes if relevant

Reference GitHub issue numbers where possible.

Never remove historical changelog entries.

## Agent Responsibilities

### Builders

- implement assigned changes
- may read and comment on relevant issues
- must not independently close bugs they fixed

### Reviewer

- independently inspect real repository changes
- create/update GitHub Issues for discovered defects
- do not trust builder summaries alone

### Security Reviewer

- create/update security bug issues
- record severity and affected trust boundary
- do not self-close findings without independent verification

### Tester

- execute real verification
- create/update GitHub Issues for newly discovered defects
- add verification evidence
- recommend closure only after successful verification

### Coordinator

The Coordinator owns this completion gate.

It must:

- ensure every discovered bug is represented in GitHub
- prevent duplicate issues
- maintain appropriate labels/milestones
- ensure fixes are independently verified
- close verified issues or ensure closure
- perform the version bump
- update `CHANGELOG.md`
- produce the final report

The Coordinator must not finish based solely on subagent summaries.

## GitHub Access Policy

Preferred order:

1. GitHub MCP
2. `gh` CLI fallback
3. report GitHub integration as blocked

Never expose credentials, tokens, secrets, or authorization headers in code, issues, logs, comments, or final reports.

## Failure Loop

Use this loop:

`Test -> Search/Create/Update GitHub Issue -> Diagnose -> Fix -> Targeted Retest -> Update Issue -> Full Retest`

Repeat until verification passes or a genuine blocker remains.

## Final Response Format

Every completed implementation prompt must end with:

### Status

`READY`, `PARTIALLY READY`, or `BLOCKED`

### Version

`previous_version -> new_version`

### Built / Changed

What was implemented or modified.

### Bugs / GitHub Issues

- number discovered
- issue numbers/titles
- number fixed
- number closed
- unresolved issues
- blocked issues

### Verification

Important builds/tests/checks and results.

### GitHub

- issues created
- issues updated
- issues closed
- milestone affected if any

### Documentation

Version/changelog/release files updated.

### Remaining Work

Use `None` when nothing remains.

### Finished

Use exactly:

`Yes`

only when the gate fully passed.

Otherwise:

`No`

Never claim the task, milestone, release, or system is finished when required verification failed, was skipped, GitHub bug tracking failed, or an unresolved blocker remains.
