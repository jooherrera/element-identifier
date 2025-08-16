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

## Contributing

PRs welcome! Please run `npm run build` and `npm test` before submitting.

## License

MIT © Joo Herrera
