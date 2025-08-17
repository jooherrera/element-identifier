# Changelog

All notable changes to this project will be documented in this file.
## 1.0.1 - 2025-08-17
- Docs: recommend using data-component in README for more stable selectors.

## 1.0.0 - 2025-08-17
- Docs: simplify README to usage-only (CDN script, component tag, optional attributes, brief notes).

## 0.2.4 - 2025-08-17
- Docs: simplify README to usage-only (CDN script, component tag, optional attributes, brief notes).

## 0.2.3 - 2025-08-17
- Docs: minor documentation cleanups and clarifications; no code changes.

## 0.2.2 - 2025-08-17
- Docs: update README CDN example to use jsDelivr (cdn.jsdelivr.net) ESM URL for element-identifier.

## 0.2.1 - 2025-08-16
- Docs: recommend adding a `data-component` attribute to identify components; examples and practical tips added to README.
- Docs: translated the new `data-component` recommendation section to English, keeping examples (HTML and React) and wording consistent.

## 0.2.0 - 2025-08-16
- Feat: add HTML5 demo with minimal setup and CDN usage for `element-identifier` (examples/html5). Documentation updated to point to the demo.

## 0.1.8 - 2025-08-16
- Docs: streamline README — removed getUniqueSelector usage and the Scripts/Tests/Contributing sections; moved the Examples section to the end; clarified Web Component API and events; simplified Quick Start and CDN usage.

## 0.1.7 - 2025-08-16
- Docs: add README screenshot for the React Counter demo (examples/img.png).

## 0.1.6 - 2025-08-16
- Docs: remove explicit `defineElementIdentifier()` usage from README quick start as requested.

## 0.1.5 - 2025-08-16
- Docs: add/update changelog to reflect current state.
- CI: clarify that publishing happens on push to main/master, aligning docs with the existing workflow.

## 0.1.4 - 2025-08-16
- CI: publish to npm only on tags (refs/tags/v*); keeps provenance, NPM_TOKEN checks, always-auth, and .npmrc fallback.

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
