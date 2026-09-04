# Quality Gates

Quality claims must be based on executed verification, not assumptions.

## During Implementation

Run targeted validation appropriate to the changed area.

Possible verification includes:

- type checking
- compilation/build
- linting
- unit tests
- integration tests
- database/schema validation
- Android build/tests
- web/E2E tests
- container/service health checks

Determine the actual applicable commands from the repository.

Do not invent commands or claim tests ran when they did not.

## Mandatory Final Completion Gate

For every repository-changing prompt and every milestone, the mandatory final gate is:

`.clinerules/40-completion-gate-github.md`

A task is not complete until that gate has passed.

## Failed Verification

When required verification fails:

1. investigate the failure;
2. create/update a GitHub Issue when it is a real reproducible bug;
3. fix reproducible defects when within scope;
4. rerun targeted verification;
5. rerun the required full verification suite.

Never report READY, PASS or Finished: Yes when mandatory verification did not actually succeed.

## Invalid Verification Evidence

The following alone are not sufficient:

- "files were created successfully"
- "configuration looks correct"
- "structure follows patterns"
- "should work"

Use actual build/test/verification evidence.
