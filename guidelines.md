# Contribution Guide: Conventional Commits

This project follows the Conventional Commits standard for commit messages. It enables semantic versioning (SemVer), readable history, and automated releases.

## Basic format

```
<type>[!][(scope)]: <summary in present, imperative mood>

[Optional detailed description]

[Optional footers]
BREAKING CHANGE: <description of the incompatible change>
Refs: <issue|PR>
```

- type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- !: marks a breaking (incompatible) change
- scope (optional): the area affected, e.g., core, api, build, selector
- summary: short, single line, no trailing period

## Impact on semantic versioning (SemVer)

- feat: adds a new feature without breaking compatibility → MINOR (x.Y.z)
- fix: fixes a bug without breaking compatibility → PATCH (x.y.Z)
- feat! or any type with a breaking flag (! or BREAKING CHANGE) → MAJOR (X.y.z)

Requested summary examples:
- feat: add new feature       # Minor version bump
- fix: fix critical bug       # Patch version bump
- feat!: breaking change      # Major version bump

## Rules and best practices

- Keep language consistent across the repo; use English for this project. Use the imperative mood: "add", "fix", "update".
- Keep the subject short (≤ 72 chars). No trailing period.
- Use a scope when it helps identify the affected area: `feat(selector): ...`
- For breaking changes, add `!` after the type or include a `BREAKING CHANGE:` footer in the body.
- Reference issues/PRs in the footer when applicable: `Refs: #123`, `Closes: #456`.

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
  
  BREAKING CHANGE: The `activateOnLoad` option was renamed to `autoStart`. Consumers must update their configuration.
  ```

- Bug fix with tests:
  ```
  fix(utils): handle null root element in selector builder
  
  Adds guards to avoid exceptions when the root node is null.
  Includes tests.
  Closes: #128
  ```

## Common types (suggested)

- feat: new user-facing functionality
- fix: user-facing bug fix
- docs: documentation-only changes
- style: changes that don't affect logic (formatting, whitespace)
- refactor: internal changes without new features or fixes
- perf: performance improvements
- test: add/adjust tests
- build: build system or dependency changes
- ci: CI/workflow changes
- chore: maintenance (not src or tests)
- revert: revert a previous commit

## Quick template

```
<type>[!][(scope)]: <summary>

[context/reason]
[what changes]
[impact]

[BREAKING CHANGE: ...]
[Refs|Closes: #id]
```

Following these rules helps collaboration, automatic versioning, and a clear changelog.

## Workflow: Pull Requests (no direct commits to master/main)

- All changes must go through a Pull Request (PR).
- No direct commits or pushes to `master` or `main`.
- Create a branch from `main` with a descriptive name:
  - `feat/<short-description>` for new features
  - `fix/<short-description>` for fixes
  - `chore/<short-description>` or other types as appropriate
- Open a PR and request review. The PR must:
  - Pass CI and tests.
  - Maintain/improve test coverage.
  - Follow Conventional Commits in the PR title.
- Once approved, use "Squash & Merge" in the platform (e.g., GitHub). Do not rewrite `main` history.
- For breaking changes, mark with `!` or include a `BREAKING CHANGE:` footer in the PR body.

> Recommendation: enable branch protection for `main/master` and require reviews before merging.

## Commit Hooks & Automated Releases

This repository uses Husky to enforce commit messages and to optionally bump versions automatically after commits:

- commit-msg hook: validates the first line of your commit message. Allowed types (with optional scope) and optional breaking marker `!`:
  feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert.
  - Valid examples: `feat: add X`, `feat(ui): add X`, `feat!: breaking change`, `fix: correct Y`, `chore: maintenance`, `docs: update README`
  - Merge commits and version commits (e.g. `v0.1.1` or `0.1.1`) are allowed without checks.
- post-commit hook: decides which release script to run based on the last commit subject:
  - `feat!:` → runs `npm run release:major`
  - `feat:` → runs `npm run release:minor`
  - Any other allowed type (`fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`, etc.) → runs `npm run release:patch`
  - Skips on CI, for version commits, and if the subject contains `[skip release]`.

Notes:
- The release scripts call `npm version <type>` and push tags. Ensure your git remote is set and you have permissions.
- If you don’t want a specific commit to trigger a version bump, add `[skip release]` to its subject.

## CI & Publishing

- On Pull Requests: CI runs type-checking and tests with coverage.
- On push to `main`/`master`: CI builds the package and then publishes to npm.
  - Requires repository secret `NPM_TOKEN` configured in GitHub → Settings → Secrets and variables → Actions.
  - Publishing uses `npm publish --provenance --access public` and relies on `prepublishOnly` to build and test before publishing.
- Versioning: npm requires a unique version each publish. Make sure a version bump occurs before/when merging. Alternatively, switch to release-on-tags and publish only when a `v*` tag is pushed.

## Contributor checklist

- [ ] Write commits using Conventional Commits (feat, fix, chore; use `!` or BREAKING CHANGE for majors).
- [ ] Prefer English in code and docs.
- [ ] Add/adjust tests and keep CI green.
- [ ] If a commit shouldn’t bump version, include `[skip release]`.
- [ ] When merging to main/master, ensure version bump is appropriate so npm publish succeeds (or use tags workflow).
