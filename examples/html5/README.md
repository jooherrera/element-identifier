# Example: HTML5 using element-identifier

A minimal HTML-only demo that uses the `element-identifier` Web Component. It loads the library from a CDN (unpkg), so you don’t need to build the project to try it.

## How to run

- Option A: Just open `examples/html5/index.html` in your browser.
- Option B (recommended): Serve the folder with a tiny static server for best results:
  - Using `serve`:
    ```bash
    npx serve examples/html5
    ```
    # then open http://localhost:5173
    ```

## What you’ll see

- The page includes the `<element-identifier>` Web Component (auto-registered by the ESM bundle).
- Use the floating action button (wheel) to activate the tool.
- Click any element (buttons, inputs, list items). The component will show details about the selected element.

## Notes

- The example uses the CDN ESM: `https://unpkg.com/element-identifier/dist/index.esm.js`.
- If you prefer to use your locally built bundle instead, build at the repo root (`npm run build`) and replace the script tag with a local path that your server can access.
