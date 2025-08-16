# Changelog

All notable changes to this project will be documented in this file.

## 0.1.3 - 2025-08-16
- CI: harden npm publish step — verify NPM_TOKEN is set, enable always-auth, and configure .npmrc fallback for NODE_AUTH_TOKEN.
- Docs: clarify commit hooks, release mapping, and CI/publishing flow in guidelines.
- Docs: minor English copy improvements in README and example.

## 0.1.2 - 2025-08-16
- Docs: translated README, example README, and example HTML to English; clarified usage and scripts.
- Chore: expanded Husky commit-msg to support common Conventional Commit types; simplified post-commit to map feat!/feat/others to major/minor/patch; added Husky shim; documented hooks in guidelines.
- CI: adjusted workflow permissions and job names for npm provenance; behavior unchanged for triggers.
- Dev: serve-react-counter script messages in English; copies dist to example before serving.
- UI: switched some console messages in the Web Component to English; no API or functional changes.

## 0.1.1 - 2025-08-16
- CI: run tests on PR; on push to main/master, build and publish to npm with provenance (requires NPM_TOKEN).
- Chore: added Husky hooks to validate Conventional Commits (feat, fix, feat!, chore) and trigger the corresponding release scripts.
- Build: `prepublishOnly` ensures build + tests before publishing.

## 0.1.0 - 2025-08-15
- Initial release: basic unique selector generator, TypeScript types, build, and tests.
