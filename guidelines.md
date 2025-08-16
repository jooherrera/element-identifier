# Contribution Guide: Conventional Commits

This project follows the Conventional Commits standard for commit messages. It enables Semantic Versioning (SemVer), a readable history, and automated releases.

Note: Husky + commitlint are configured to enforce Conventional Commits locally on each commit message. Ensure you run `npm install` (or `npm run prepare`) to install the hooks.

## Basic format

```
<type>[!][(scope)]: <summary in present, imperative>

[Optional detailed description]

[Optional notes]
BREAKING CHANGE: <description of the breaking change>
Refs: <issue|PR>
```

- type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- !: marks a breaking change
- scope (optional): the affected area, e.g., core, api, build, selector
- summary: short, one line, no trailing period

## Impact on Semantic Versioning (SemVer)

- feat: adds a new backward‑compatible feature → MINOR (x.Y.z)
- fix: backwards‑compatible bug fix → PATCH (x.y.Z)
- feat! or any type marked as breaking (! or BREAKING CHANGE) → MAJOR (X.y.z)

Quick mapping:
- feat: add new feature       # Minor version bump
- fix: fix critical bug       # Patch version bump
- feat!: breaking change      # Major version bump

## Rules and best practices

- Use English consistently across the repository. Keep the imperative mood: "add", "fix", "update".
- Keep the summary short (≤ 72 characters). No trailing period.
- Use a scope when it helps identify the affected area: `feat(selector): ...`
- For breaking changes, mark with `!` after the type or add a `BREAKING CHANGE:` block in the body.
- If applicable, reference issues/PRs in the footer: `Refs: #123`, `Closes: #456`.

## Examples

- Simple messages:
  - `feat: add copy to clipboard functionality`
  - `fix: resolve panel positioning issue`
  - `feat!: change API from activate() to start()`

- With scope and body:
  ```
  feat(selector): support nth-child strategy for complex queries
  
  Adds an additional algorithm to build stable selectors when id is not available.
  Refs: #42
  ```

- Breaking change (two equivalent forms):
  ```
  feat!: rename option `activateOnLoad` to `autoStart`
  
  BREAKING CHANGE: The `activateOnLoad` option has been renamed to `autoStart`. Consumers must update their configuration.
  ```

- Bug fix with tests:
  ```
  fix(utils): handle null root element in selector builder
  
  Add guards to avoid exceptions when the root node is null.
  Tests included.
  Closes: #128
  ```

## Common types (suggested)

- feat: new user-visible feature
- fix: user-visible bug fix
- docs: documentation-only changes
- style: changes that do not affect logic (formatting, whitespace, commas)
- refactor: internal changes without new features or fixes
- perf: performance improvements
- test: add/adjust tests
- build: changes to the build system or dependencies
- ci: changes to pipelines/Workflows
- chore: maintenance (not src or tests)
- revert: revert a previous commit

## Quick template

```
<type>[!][(scope)]: <summary>

[context/motivation]
[what changes]
[impact]

[BREAKING CHANGE: ...]
[Refs|Closes: #id]
```

By following these rules, we make collaboration easier, enable automated versioning, and keep a clear change history.

## Workflow: Pull Requests (no direct commits to main/master)

- All changes must be made via Pull Request (PR).
- No commits or pushes directly to `master` or `main`.
- Create a branch from `main` with a descriptive name:
  - `feat/<short-description>` for new features
  - `fix/<short-description>` for fixes
  - `chore/<short-description>` or other types as appropriate
- Open a PR and request review. The PR must:
  - Pass CI and tests.
  - Maintain/Improve test coverage.
  - Follow "Conventional Commits" in the PR title.
- Once approved, use "Squash & Merge" from the platform (e.g., GitHub). Do not rewrite `main` history.
- For breaking changes, mark with `!` or include a `BREAKING CHANGE:` block in the PR body.

> Recommendation: enable branch protection for `main/master` and require reviews before merging.
