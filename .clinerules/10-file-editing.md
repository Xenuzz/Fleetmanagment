# File Editing Rules

## Before Editing

Read the relevant existing file before modifying it unless the file is being created from scratch.

Inspect surrounding implementation when necessary to understand dependencies.

## Preferred Editing Method

Use this order:

1. editor/file editing tools
2. patch/apply-patch tools
3. robust shell-based writes only as fallback

Do not use simple echo, > or >> for normal source-code editing.

## In-Session File Memory

When a file has just been created or modified during the current task:

- retain the content and diff in current working context;
- do not re-read it solely to remember what was just written.

Re-read when:

- another agent/process may have modified it;
- a formatter/generator may have rewritten it;
- shell/fallback writing was used;
- actual on-disk verification is required;
- current context is no longer reliable.

The on-disk repository remains authoritative.

## Verification

After shell/fallback writes, verify the resulting file.

Never claim a file was changed successfully without tool evidence.
