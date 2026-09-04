# Output Efficiency and Token Budget

This rule prevents max-output-token failures and retry loops.

## General

Keep model turns concise and tool-driven.
- Do not reproduce complete files in chat after writing them.
- Do not print large diffs unless explicitly requested.
- Do not repeat documentation already stored in files/GitHub/Obsidian.
- Use editor/patch/file tools directly.
- Prefer several small sequential steps over one huge response.
- Keep explanations around tool calls brief.

## Large Tasks

Use phases:
1. inspect
2. plan
3. implement
4. targeted verify
5. review
6. full verify
7. completion + memory sync
8. concise final report

Do not narrate all phases at length in one model turn.

## Files

For large file edits:
1. edit with tools directly;
2. do not first generate the full file in conversational prose;
3. do not echo the full resulting file back;
4. verify only necessary sections unless full verification is required.

## Subagents

Subagent handoffs should contain only:
- status
- files changed
- tests run
- findings/blockers
- recommended next action

Never include full file contents in handoffs.

## Final Response

Normally keep completion reports under roughly 600-800 words and use only:
- Status
- Version
- Built / Changed
- Bugs / GitHub Issues
- Verification
- GitHub
- Memory
- Remaining Work
- Finished

Reference GitHub issue numbers and Obsidian note paths instead of reproducing their full contents.

## Retry Behavior

If max output tokens are reached:
- do not retry the same oversized response unchanged;
- continue from the last completed step;
- reduce prose;
- use tools more aggressively;
- split remaining work into smaller steps.

Never enter a repeated retry loop requesting the same oversized response.
