# byalina.dev - AI Development Guide & Directives

> **Purpose**
> This document is the absolute source of truth for any AI coding agent working on the byalina.dev portfolio codebase.

---

# 1. Strict AI Agent Directives

## Security & Execution

- **Never** execute a `rm -rf` command without explicit user consent.
- **Never** use `sudo` without explicit user consent (password input is required).
- **Do not** look into the `.env` file. Reading `.env.example` is tolerated.

## Version Control (Git)

- When staging files, systematically use `git add .` to avoid missing any modified files.
- **Never** execute `git commit` or `git push` without explicit user consent.

## Code Standards

- **ABSOLUTELY NO COMMENTS IN THE GENERATED SOURCE CODE.** (Unless explicitly requested for documentation purposes).

## Technical Documentation & Representation

- Produce separate technical documentation (`.md` files) for each component or feature.
- Rigorously update this documentation whenever a modification is made to the corresponding component.
- Always ask yourself what is the best way to represent and explain a specific part of the application.
- Use **Mermaid diagrams** inside `.md` files to illustrate architectures, flows, and component interactions.