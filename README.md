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

## Ejemplos

- React Counter: examples/react-counter
  - Pasos:
    1. npm install
    2. npm run build
    3. Sirve la carpeta examples/react-counter (por ejemplo: `npx serve examples/react-counter`) y abre el navegador.

## Web Component (element-identifier)

El proyecto incluye un Web Component que muestra una rueda flotante (FAB) y un panel de información para identificar elementos del DOM.

- Insertar en HTML con configuración inicial desde la etiqueta:
  
  <element-identifier 
    show-wheel="true" 
    active="false" 
    show-panel="true">
  </element-identifier>
  
  Atributos disponibles (booleanos):
  - `show-wheel`: controla si se muestra la rueda (FAB).
    - `true`, `1`, `on`, `yes` o vacío → visible (por defecto)
    - `false`, `0`, `off`, `no` → oculta
  - `active`: controla si la herramienta inicia activada.
    - `true`/vacío → activa al iniciar
    - `false` → desactiva (por defecto)
  - `show-panel`: controla si el panel puede mostrarse.
    - `true`/vacío → el panel se mostrará cuando haya un elemento seleccionado (por defecto)
    - `false` → el panel permanece oculto hasta que lo alternes
  - Compatibilidad: `auto-start` sigue funcionando como alias de `active` (soporta `true`/`false`).

- API en consola (y desde código vía `elementIdentifier` o `window.elementIdentifier`):
  - `elementIdentifier.showWheel()` → muestra la rueda
  - `elementIdentifier.hideWheel()` → oculta la rueda
  - `elementIdentifier.toggleWheel()` → alterna visibilidad de la rueda
  - `elementIdentifier.isWheelVisible()` → devuelve `true/false`

Además de:
  - `elementIdentifier.activate()` / `deactivate()` / `toggle()`
  - `elementIdentifier.togglePanel()`

Nota:
- En la consola del navegador puedes usar directamente `elementIdentifier.activate()` sin el prefijo `window`. La librería define un alias global para tu comodidad. Si prefieres, `window.elementIdentifier` también funciona.

## License

MIT © Joo Herrera
