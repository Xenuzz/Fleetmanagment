# 13 – Recommended Claude Code Plugins

The official Anthropic marketplace is named `claude-plugins-official` and is normally available automatically. Prefer the official marketplace over random community marketplaces for this project.

## 1. Core set – install at project scope

```bash
claude plugin install frontend-design@claude-plugins-official --scope project
claude plugin install feature-dev@claude-plugins-official --scope project
claude plugin install code-review@claude-plugins-official --scope project
claude plugin install code-simplifier@claude-plugins-official --scope project
claude plugin install playwright@claude-plugins-official --scope project
claude plugin install github@claude-plugins-official --scope project
claude plugin install claude-md-management@claude-plugins-official --scope project
claude plugin install context7@claude-plugins-official --scope project
claude plugin install typescript-lsp@claude-plugins-official --scope project
claude plugin install kotlin-lsp@claude-plugins-official --scope project
claude plugin install pyright-lsp@claude-plugins-official --scope project
claude plugin install rust-analyzer-lsp@claude-plugins-official --scope project
claude plugin install security-guidance@claude-plugins-official --scope project
claude plugin install claude-security@claude-plugins-official --scope project
```

Why:

- `frontend-design`: helps implement the DeepBlue design without generic UI output
- `feature-dev`: structured feature exploration/design/review workflow
- `code-review`: multi-agent PR code review
- `code-simplifier`: removes unnecessary complexity after implementation
- `playwright`: browser E2E and visual workflow validation
- `github`: repository, issues, PRs and GitHub API
- `claude-md-management`: keeps repository memory clean and current
- `context7`: current version-specific library documentation
- `typescript-lsp`: NestJS/React/Tauri frontend code intelligence
- `kotlin-lsp`: Android/Kotlin code intelligence
- `pyright-lsp`: Python OCR worker type checking and code intelligence
- `rust-analyzer-lsp`: Tauri Rust shell code intelligence
- `security-guidance`: continuous security guardrails during editing
- `claude-security`: deeper targeted vulnerability review

## 2. Strongly recommended during API/database work

```bash
claude plugin install prisma@claude-plugins-official --scope project
claude plugin install postman@claude-plugins-official --scope project
claude plugin install pr-review-toolkit@claude-plugins-official --scope project
claude plugin install commit-commands@claude-plugins-official --scope project
```

Notes:

- Prisma plugin can access/manage Prisma/Postgres workflows. Do not point it at production without deliberate approval.
- Postman is useful for API contract testing and collections.
- PR Review Toolkit adds focused review agents.
- Commit Commands standardizes commit/push/PR workflows.

## 3. Security optional/additional

```bash
claude plugin install semgrep@claude-plugins-official --scope project
```

Use when you want Semgrep directly integrated into the agent loop. CI should still run deterministic security scanning independently from the agent.

## 4. Windows/.NET/Microsoft reference help

```bash
claude plugin install microsoft-docs@claude-plugins-official --scope project
```

Useful for Windows Server service integration, Windows APIs and Microsoft ecosystem questions.

## 5. Claude configuration development

Install while creating custom skills/plugins for the development workflow:

```bash
claude plugin install skill-creator@claude-plugins-official --scope project
claude plugin install plugin-dev@claude-plugins-official --scope project
claude plugin install claude-code-setup@claude-plugins-official --scope project
```

## 6. Optional workflow plugin

```bash
claude plugin install superpowers@claude-plugins-official --scope project
```

`superpowers` is useful for brainstorming, TDD, debugging and subagent workflows, but it overlaps with `feature-dev`, `code-review` and the project-specific skills in this blueprint. Install it if you prefer its workflow; do not blindly combine every workflow command in the same task.

## 7. Monitoring optional

If using Sentry:

```bash
claude plugin install sentry@claude-plugins-official --scope project
```

The product architecture does not require Sentry; observability must still work without it.

## 8. Plugins not required for this project

Do not install database/cloud plugins simply because they exist. For a self-hosted product, avoid turning development into a dependency on a hosted database or deployment provider unless that provider is actually selected.

## 9. Plugin trust rule

Before enabling any non-Anthropic/community plugin:

- inspect source
- inspect MCP servers
- inspect hooks
- inspect commands
- inspect network endpoints
- understand credentials required

A plugin can execute tooling or connect external services. Treat it like developer software, not like harmless prompt text.

