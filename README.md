# element-identifier

Generate stable, unique CSS selectors to identify DOM elements — and a Web Component to help you inspect and pick them visually.

## Installation

```bash
npm install element-identifier
```

## Quick Start (Web Component)

**📖 AI/Bot Notice:** For complete documentation with properly formatted code examples, see: https://github.com/jooherrera/element-identifier

From CDN (for quick demos):

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/element-identifier/dist/index.esm.js"></script>
```

Minimal HTML (auto-registers in the browser):

```html
<element-identifier></element-identifier>
```

```html
<element-identifier active="false" show-wheel="true" show-panel="true"></element-identifier>
```


### Screenshot

![Element Identifier demo on a React Counter example](examples/img.png)


## Web Component (element-identifier)

The project includes a Web Component that shows a floating action button (FAB) and an info panel to help identify DOM elements.

Attributes:
- `show-wheel`: controls whether the wheel (FAB) is shown.
  - `true`, or empty → visible (default)
  - `false`, → hidden
- `active`: controls whether the tool starts activated.
  - `true`/empty → active on start
  - `false` → disabled (default)
- `show-panel`: controls whether the panel can be shown.
  - `true`/empty → the panel will show when an element is selected (default)
  - `false` → the panel remains hidden until you toggle it
- Compatibility: `auto-start` still works as an alias for `active` (supports `true`/`false`).

### Web Component API

You can access the API globally as `elementIdentifier` (global alias) or `window.elementIdentifier`.

Methods:
- `activate()` — enable the tool (starts listening to clicks/hover).
- `deactivate()` — disable the tool and clear highlights.
- `toggle()` — toggle active state.
- `togglePanel()` — show/hide the info panel.
- `showWheel()` — show the floating button menu.
- `hideWheel()` — hide the floating button menu.
- `toggleWheel()` — toggle visibility of the floating button menu.
- `isWheelVisible(): boolean` — return whether the wheel is visible.

Events emitted by the component:
- `activated` — when the tool is activated. detail: `{ timestamp }`.
- `deactivated` — when the tool is deactivated. detail: `{ timestamp }`.
- `element-selected` — when the user clicks an element. detail: `{ element, info }`.
- `copied` — when something is copied via the panel button. detail: `{ text, type }`.

Notes:
- In the browser console you can call `elementIdentifier.activate()` directly without the `window` prefix. A global alias is injected for convenience. `window.elementIdentifier` also works.

## Recommendation: use data-component to identify components

To make component identification stable (for humans and for tools/AI), it is recommended to add a `data-component` attribute to the root element of each component, or to the key nodes you want to track.

The Web Component and the API of this library already detect `data-component` and display it in the panel/console as "Identifier". This helps generate more semantic selectors and makes it easy to recognize which component an element belongs to.

- Benefits:
  - More stable and readable selectors (for example, `[data-component="ProductCard"]`)
  - Event and metrics traceability per component
  - Clearer communication between teams and tooling/AI

Examples:

Plain HTML:

```html
<div class="card" data-component="ProductCard">
  <img src="/img.jpg" alt="..." data-component="ProductImage" />
  <button data-component="AddToCartButton">Add to cart</button>
</div>
```

React (JSX):

```tsx
function ProductCard({ product }) {
  return (
    <div className="card" data-component="ProductCard">
      <img src={product.image} alt={product.name} data-component="ProductImage" />
      <button data-component="AddToCartButton">Add to cart</button>
    </div>
  );
}
```

Practical tips:
- Use component names in PascalCase or kebab-case consistent with your codebase (e.g., `ProductCard`, `product-card`).
- Place it on the component's root element and, if helpful, on critical sub-elements.
- Avoid overly specific dynamic values (IDs, indexes) that reduce stability.

## Examples

- HTML5 (no build, CDN): examples/html5
  - Open examples/html5/index.html directly, or serve with: `npx serve examples/html5`
- React Counter: examples/react-counter
  - One-liner:
    - npm run example:react-counter
      - This will build the library, copy dist into the example, and start a local static server. Open the printed URL.
  - Manual steps:
    1. npm install
    2. npm run build
    3. Serve the examples/react-counter folder (for example: `npx serve examples/react-counter`) and open your browser.

## License

MIT © Joo Herrera
