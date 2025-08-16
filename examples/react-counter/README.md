# Example: React Counter using element-identifier

This is a minimal React app example (no build tools) that uses the `element-identifier` library to identify DOM elements.

## Requirements
- Node 18+ (only to build the library at the project root)
- A simple static server (you can use `npx serve` or `python -m http.server`)

## Steps to run
1. At the repository root, install dependencies and build the library:

   ```bash
   npm install
   npm run build
   ```

2. Start a static server pointing to this example folder:

   - With `serve` (recommended):
     ```bash
     npx serve examples/react-counter
     ```
   - With Python 3:
     ```bash
     cd examples/react-counter
     python -m http.server 5173
     # then open http://localhost:5173
     ```

3. Open the browser at the URL provided by your server (for example `http://localhost:3000` or `http://localhost:5173`).

4. In the UI:
   - Use the buttons to increment/decrement the counter.
   - Press "Toggle identifier" or "Activate" to enable the `<element-identifier>` component.
   - Click elements (buttons, number, texts) and observe the panel with selector and metadata.

## How is the library integrated?
- In `index.html`, load the already-built ESM bundle of the library:

  ```html
  <script type="module" src="./dist/index.esm.js"></script>
  ```

  This automatically registers the `<element-identifier>` Web Component and exposes an API on `window.elementIdentifier` with methods like `activate()`, `deactivate()`, and `toggle()`.

- The example uses React UMD + Babel to keep it simple and without extra build tooling.

## Notes
- Make sure to run `npm run build` at the root before opening the example, since `dist/index.esm.js` is required.
- If you have published `element-identifier` to npm, you could replace the local load with an import from a CDN (unpkg, jsDelivr) or integrate the package into a real Vite/CRA app.
