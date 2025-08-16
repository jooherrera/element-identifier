# Tests

This document reflects the current state of the project’s tests.

At the moment, Jest is configured to only run tests under the `src/api` subtree and to collect coverage only from files in `src/api`. This is defined in `jest.config.js`:

- roots: `['<rootDir>/src/api']`
- collectCoverageFrom: `['src/api/**/*.ts', '!src/api/**/__tests__/**']`
- testEnvironment: `jsdom`
- preset: `ts-jest`

## How to run

- Install dependencies: `npm install`
- Run tests: `npm test`
- Watch mode: `npm test -- --watch`
- Coverage: `npm test -- --coverage` (also enabled by default via `jest.config.js`)

The current output shows 100% coverage within the API scope.

## What is covered (API)

- Public API exposure and delegation
  - The `ElementIdentifierAPI` class delegates all methods to the host (`activate`, `deactivate`, `toggle`, `togglePanel`, `showWheel`, `hideWheel`, `toggleWheel`, `isWheelVisible`).
  - The `version` getter and `help()` output (console messages) are validated.

- Full delegation using a mocked host
  - Each API method is verified to call the corresponding host method and to pass through return values correctly.

## Test file structure

Tests live in:

- `src/api/__tests__/element-identifier-api.test.ts` — tests the public API surface and its basic integration with a real host (`ElementIdentifier`).
- `src/api/__tests__/element-identifier-api-delegation.test.ts` — verifies complete method delegation using a mocked host.

> Note: Previous integration tests for the Web Component that lived in `src/__tests__` were removed from the repository because, with the current Jest configuration, they do not run (the `root` is limited to `src/api`). If in the future you want to test the Web Component end-to-end again, you would need to extend `roots`/`testMatch` and adjust `collectCoverageFrom` in `jest.config.js`.

## Notes

- The test environment is `jsdom` and TypeScript compilation is handled by `ts-jest`.
- Noisy console logs are silenced in `src/test-setup.ts` to keep test output clean.
- Coverage reported corresponds exclusively to files under `src/api`. If the test scope is expanded, update this documentation and the Jest configuration accordingly.
