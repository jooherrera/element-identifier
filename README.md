# element-identifier

Generate stable, unique CSS selectors to identify DOM elements — and use a Web Component to inspect and pick them visually.

## How to use (CDN + Web Component)

1) Add the script tag (ESM) to your HTML (head or before </body>):
`
<script type="module" src="https://cdn.jsdelivr.net/npm/element-identifier/dist/index.esm.js"></script>


2) Place the Web Component tag anywhere in the page:
`
<element-identifier></element-identifier>
`

That’s it. Load the page and you’ll see a floating button (wheel). Activate it to hover and click elements; the panel will show the selector and details.

### Optional attributes (no JavaScript needed)
Use attributes on the tag to control behavior:

`
<element-identifier active="false" show-wheel="true" show-panel="true"></element-identifier>
`

- active: true | false (default false) — start activated.
- show-wheel: true | false (default true) — show the floating button (wheel).
- show-panel: true | false (default true) — allow the info panel.
- auto-start: alias for active.

### Notes
- If you don’t see the button, verify the CDN script loaded and no blockers prevented it.
- You can toggle the tool from the on-screen controls. No additional JS is required for basic use.
