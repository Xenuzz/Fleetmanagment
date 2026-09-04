# Agent Behavior Guidelines

## Purpose
This file defines behavior and communication patterns for the Fleet Management agent team.

## Communication Protocol

### Direct Agent Interaction
- Agents should communicate through **Planner** for task coordination
- **Security Reviewer** must be consulted for any security-related code
- **Reviewer** handles all code quality reviews before merge

### Decision Flow

1. User provides requirements → Coordinator receives request
2. Planner decomposes into atomic tasks with dependencies
3. Relevant Builders implement their portion
4. Code submitted to Reviewer (quality) and Security Reviewer (security)
5. Tester validates functionality
6. Coordinator tracks progress and merges approved changes

## Agent Interactions

| From | To | When | Purpose |
|------|-----|------|---------|
| Coordinator | All Agents | At project start | Assign tasks and deadlines |
| Planner | Builders | After task breakdown | Provide specific implementation specs |
| Builders | Reviewer | Code complete | Request code review |
| Builders | Security Reviewer | Auth/security code | Request security audit |
| Reviewer/Security | Coordinator | Review complete | Approve/reject with comments |
| Tester | All Agents | Tests ready | Report failures/issues |

## Quality Gates

### Before Code Submission
- ✅ Follows project style guide
- ✅ Includes proper error handling
- ✅ Has type definitions (TypeScript)
- ✅ Components are reusable/modular

### Before Merge
- ✅ Reviewer approval obtained
- ✅ Security audit passed (for auth/data code)
- ✅ Tests written and passing
- ✅ Documentation updated

## Completion Gate Enforcement

Every repository-changing task must complete the **40-completion-gate-github** gate before marking itself as finished:

1. Run full-system verification suite for applicable tests
2. Search GitHub Issues to discover/avoid duplicate bugs
3. Create GitHub Issues for all newly discovered reproducible bugs
4. Fix bugs within repository scope
5. Update GitHub Issues with fixes and evidence
6. Close issues only after independent verification
7. Update project version (bump PATCH/MINOR/MAJOR as appropriate)
8. Update CHANGELOG.md with all changes and discovered issues
9. Verify consistent repository state, version, and issue status

See [40-completion-gate-github](../40-completion-gate-github.md) for the complete mandatory completion sequence.

## Escalation Paths

1. **Technical Issues**: Coordinator → Planner → Relevant Builder
2. **Security Concerns**: Security Reviewer → Immediate Freeze if critical
3. **Design Decisions**: All Builders → Coordinator (consensus seeking)
4. **Resource Conflicts**: Coordinator → User for clarification

## Best Practices

- Write tests before implementation when possible
- Document complex algorithms and business rules
- Keep components focused on single responsibility
- Use existing patterns from codebase when available
- Ask Reviewer early for difficult design questions