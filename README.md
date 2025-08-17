# element-identifier
version: 1.0.2

Generate stable, unique CSS selectors to identify DOM elements — and use a Web Component to inspect and pick them visually.

## How to use (CDN + Web Component)

1) Add the script tag (ESM) to your HTML (head or before):
- CDN : https://cdn.jsdelivr.net/npm/element-identifier/dist/index.esm.js
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/element-identifier/dist/index.esm.js"></script>
```

2) Place the Web Component tag anywhere in the page:
```html
<element-identifier></element-identifier>
```

That’s it. Load the page and you’ll see a floating button (wheel). Activate it to hover and click elements; the panel will show the selector and details.

### Optional attributes (no JavaScript needed)
Use attributes on the tag to control behavior:

```html
<element-identifier active="false" show-wheel="true" show-panel="true"></element-identifier>
```

- active: true | false (default false) — start activated.
- show-wheel: true | false (default true) — show the floating button (wheel).
- show-panel: true | false (default true) — allow the info panel.
- auto-start: alias for active.

### Notes
- If you don’t see the button, verify the CDN script loaded and no blockers prevented it.
- You can toggle the tool from the on-screen controls. No additional JS is required for basic use.

### Recommendation: use data-component
For more stable, human- and tool-friendly selectors, add a data-component attribute to your component root or key nodes (e.g., product card, image, or button).

Example:
```html
<div class="card" data-component="ProductCard">
  <img src="/img.jpg" alt="..." data-component="ProductImage" />
  <button data-component="AddToCartButton">Add to cart</button>
</div>
```


## React usage (Example)
If you use React, you can load the Web Component dynamically to ensure the custom element is defined before rendering it.

```tsx
import {useEffect} from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'element-identifier': {
                active?: string;
                'show-wheel'?: string;
                'show-panel'?: string;
            };
        }
    }
}

export default function Home() {
    useEffect(() => {
        import('element-identifier');
    }, []);
  return (
    <main>    
        <element-identifier
            active="false"
            show-wheel="true"
            show-panel="true"
        />
    </main>
  );
}
```

- The dynamic import registers the custom element (`<element-identifier>`) in the browser when the component mounts.
- You can then use the tag directly in your JSX with the optional attributes.

### Screenshot

![Element Identifier demo (React Counter)](examples/img.png)
