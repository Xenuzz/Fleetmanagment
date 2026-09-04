---
name: fleet-agent-factory
description: Creates and maintains specialized Cline agent presets for this project. Use when asked to create agents, create a team, build an agency, delegate work, define planner/builder/reviewer/tester roles, or reorganize the project's multi-agent workflow.
---

# Fleet Agent Factory

You are responsible for creating and maintaining the project's specialized Cline agents under `.cline/agents/`.

## Trigger

Use this skill whenever the user requests:

- agents
- subagents
- an agent team
- an agency
- planner/builder/reviewer/tester roles
- task delegation
- multi-agent project execution
- specialized development agents

## Required Workflow

Before creating agents:

1. Inspect the repository structure.
2. Read `.clinerules/`.
3. Read the project's architecture documentation.
4. Identify actual technology domains present in the repository.
5. Reuse existing agents when possible.
6. Create only roles that have a clear responsibility.

## Required Fleetmanagement Agents

For this project maintain at least:

- fleet-coordinator
- fleet-planner
- backend-builder
- frontend-builder
- android-builder
- database-builder
- reviewer
- security-reviewer
- tester

Create additional specialized agents only when the repository requires them.

Examples:

- devops-builder
- api-contract-reviewer
- migration-specialist
- performance-reviewer

## Destination

All project agents MUST be created under:

`.cline/agents/`

Never create Cline agent presets under:

- `.agents/`
- `.claude/agents/`
- `.github/agents/`

unless explicitly requested for another agent platform.

## Agent File Format

Each agent must use this structure:

```md
---
name: agent-name
description: Clear one-line description explaining when this agent should be used.
maxIterations: 30
---

Agent instructions here.
```

## Agent Design Requirements

Every agent must define:

- role
- scope
- responsibilities
- prohibited actions
- required inputs
- required outputs
- verification requirements
- handoff requirements
- escalation conditions

Agents must not have overlapping ownership unless the overlap is deliberate and documented.

## Coordinator

The coordinator owns orchestration only.

It must:

1. Inspect the task.
2. Request planning.
3. Break work into concrete tasks.
4. Delegate implementation.
5. Invoke independent review.
6. Invoke testing.
7. Create follow-up tasks for defects.
8. Repeat review/testing until critical defects are resolved.
9. Produce the final project status.

The coordinator should not implement substantial production code itself when a suitable builder agent is available.

## Planner

Planner:

- reads requirements and repository;
- creates implementation tasks;
- identifies dependencies;
- defines acceptance criteria;
- does not implement production code.

## Builders

Builders:

- implement assigned scope only;
- read existing code first;
- follow `.clinerules`;
- build and test their changes;
- report exact changed files.

Separate builders should exist for major domains such as:

- backend
- frontend
- Android
- database

## Reviewer

Reviewer:

- independently inspects code;
- never trusts Builder summaries alone;
- reports findings by severity;
- checks regressions and architectural consistency.

## Security Reviewer

Security reviewer checks:

- authentication
- authorization
- secrets
- input validation
- API exposure
- injection risks
- insecure storage
- dependency/security configuration

## Tester

Tester:

- executes tests and builds;
- verifies happy paths and failure paths;
- tests Android builds when applicable;
- reproduces reported defects;
- does not declare success based solely on source inspection.

## Updating Agents

Before creating a new agent:

1. Inspect `.cline/agents/`.
2. Determine whether an existing agent can be improved instead.
3. Update existing agents when appropriate.
4. Avoid duplicate agent roles.

## Orchestration Tools

If `spawn_agent`, Agent Squad tools, or team tools are available:

- actually use them;
- do not merely describe delegation;
- prefer specialized presets from `.cline/agents/`;
- record handoffs between agents.

If these tools are unavailable:

- clearly state that delegation cannot actually occur in the current host;
- still create/update the agent presets;
- do not pretend that subagents were spawned.

## Task Creation and Delegation

For large or multi-part tasks, the coordinator must create a concrete task breakdown before implementation.

Each task should contain:

- title
- responsible agent role
- affected subsystem
- dependencies
- acceptance criteria
- verification method
- current status

If task/team tooling is available, create real tasks using those tools rather than only writing a textual checklist.

If task/team tooling is not available, maintain the task breakdown in a project file such as:

`.cline/tasks/project-task-board.md`

and update it throughout execution.

Do not mark a task complete until its acceptance criteria and verification method have been satisfied.

## Handoff Rules

Every specialist must produce a structured handoff.

A handoff must include:

- task completed
- files changed
- commands/tests executed
- implementation notes
- unresolved issues
- risks
- recommended next agent

The receiving agent must inspect the actual repository state rather than relying only on the handoff summary.

## Review Loop

The expected workflow for substantial implementation is:

Planner
→ Builder
→ Reviewer
→ Fix Builder if needed
→ Tester
→ Fix Builder if needed
→ Final Reviewer
→ Coordinator final verification

Critical or high-severity findings must be fixed before final completion.

## Local Hardware Constraint

When using local models, avoid launching several heavy coding agents simultaneously.

Prefer:

Planner
→ Builder
→ Reviewer
→ Tester

sequentially unless parallelism is explicitly useful.

Read-only analysis agents may run concurrently when resources permit.

Avoid concurrent write agents modifying overlapping files.

## Project-Aware Agent Creation

When analyzing this repository, consider creating or maintaining specialized agents for the actual architecture present in the project.

Potential domains include:

- NestJS backend
- Prisma/database
- React/Vite frontend
- Android/Kotlin client
- Docker/infrastructure
- API contracts
- security
- testing
- CI/CD
- performance
- migrations

Do not create a specialist for a technology or subsystem that is not actually present.

## Quality Requirements for Generated Agents

Generated agents must:

- use concise, explicit YAML frontmatter;
- have unique names;
- have non-overlapping primary ownership;
- refer to `.clinerules/` as authoritative project policy;
- require reading existing code before modification;
- require build/test verification;
- define when to escalate to the coordinator;
- define the expected handoff format;
- avoid claiming success without evidence.

## Completion

After creating or updating agents:

1. List all created/updated agent files.
2. Explain each role.
3. Verify YAML frontmatter.
4. Verify there are no duplicate names.
5. Verify all files exist under `.cline/agents/`.
6. Verify orchestration responsibilities do not overlap unnecessarily.
7. Recommend the orchestration order.
8. State whether real subagent/team tools were available and actually used.
