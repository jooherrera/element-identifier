# Changelog

All notable changes to this project will be documented in this file.

## 0.1.1 - 2025-08-16
- Tests: scope Jest to `src/api` and achieve 100% coverage for API sources; remove non-running tests; document the current test setup and scope.
- CI/CD: run tests on Pull Requests; on push to `master` run the build and, if successful, publish to npm using the configured token; reuse dependency installation with Node cache.
- Docs: translate modified documentation to English and align with the current test configuration (README, TESTS.md); update contribution guidelines (Conventional Commits) in English.
- Maintenance: no runtime behavior changes to the Web Component or public API; housekeeping to keep repository clean and consistent.

## 0.1.0 - 2025-08-15
- Initial release: basic unique selector generator, TypeScript types, build, and tests.
