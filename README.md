# element-identifier

Generate stable, unique CSS selectors to identify DOM elements.

## Installation

```bash
npm install element-identifier
```

## Quick Start

```typescript
import { getUniqueSelector } from 'element-identifier';

const el = document.querySelector('button.primary')!;
const { selector, unique } = getUniqueSelector(el);
console.log(selector, unique);
```

## API

### getUniqueSelector(element, options?)

Returns a stable CSS selector that identifies the given element.

- element: Element
- options?: IdentifierOptions

```ts
export interface IdentifierOptions {
  readonly attributes?: readonly string[]; // Attributes to consider for uniqueness
  readonly maxClasses?: number;            // Max classes to include per element (default: 2)
  readonly root?: Element | Document | ShadowRoot; // Search root (default: document.body)
  readonly shallow?: boolean;              // If true, do not traverse ancestors
  readonly maxLength?: number;             // Max selector length (default: 512)
}

export interface IdentifierResult {
  readonly selector: string;
  readonly unique: boolean;
}
```

Prioritizes common testing attributes (data-testid, data-test, data-qa, data-cy), `name`, `aria-label`, `role`, and `id`, then falls back to classes or `:nth-of-type()` and ancestor paths until uniqueness is achieved.

## Scripts

- build: `rollup -c`
- dev: `rollup -c -w`
- test: `jest`
- lint: `eslint src/**/*.ts`
- format: `prettier --write src/**/*.ts`
- type-check: `tsc --noEmit`

## Tests

This project uses Jest (ts-jest + jsdom). Currently, tests are limited to the `src/api` subtree and coverage is collected only from `src/api/**/*.ts` (see `jest.config.js`).

See TESTS.md for the full test plan and instructions.

Quick start:
- Install dependencies: `npm install`
- Run tests: `npm test`
- Coverage: `npm test -- --coverage`

## Contributing

PRs welcome! Please run `npm run build` and `npm test` before submitting.

## Examples

- React Counter: examples/react-counter
  - Steps:
    1. npm install
    2. npm run build
    3. Serve the examples/react-counter folder (for example: `npx serve examples/react-counter`) and open your browser.

## Web Component (element-identifier)

The project includes a Web Component that shows a floating action button (FAB) and an info panel to help identify DOM elements.

- Insert in HTML with initial configuration via attributes:
  
  <element-identifier 
    show-wheel="true" 
    active="false" 
    show-panel="true">
  </element-identifier>
  
  Available boolean attributes:
  - `show-wheel`: controls whether the wheel (FAB) is shown.
    - `true`, `1`, `on`, `yes`, or empty → visible (default)
    - `false`, `0`, `off`, `no` → hidden
  - `active`: controls whether the tool starts activated.
    - `true`/empty → active on start
    - `false` → disabled (default)
  - `show-panel`: controls whether the panel can be shown.
    - `true`/empty → the panel will show when an element is selected (default)
    - `false` → the panel remains hidden until you toggle it
  - Compatibility: `auto-start` still works as an alias for `active` (supports `true`/`false`).

- Console API (and from code via `elementIdentifier` or `window.elementIdentifier`):
  - `elementIdentifier.showWheel()` → show the wheel
  - `elementIdentifier.hideWheel()` → hide the wheel
  - `elementIdentifier.toggleWheel()` → toggle wheel visibility
  - `elementIdentifier.isWheelVisible()` → returns `true/false`

Additionally:
  - `elementIdentifier.activate()` / `deactivate()` / `toggle()`
  - `elementIdentifier.togglePanel()`

Note:
- In the browser console you can call `elementIdentifier.activate()` directly without the `window` prefix. The library exposes a global alias for convenience. `window.elementIdentifier` also works if you prefer.

## License

MIT © Joo Herrera
