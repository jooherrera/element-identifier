# Ejemplo: Contador con React usando element-identifier

Este es un ejemplo mínimo de una app React (sin build) que utiliza la librería `element-identifier` para identificar elementos del DOM.

## Requisitos
- Node 18+ (solo para construir la librería en el root del proyecto)
- Un servidor estático simple (puedes usar `npx serve` o `python -m http.server`)

## Pasos para ejecutar
1. En el root del repositorio, instala dependencias y construye la librería:

   ```bash
   npm install
   npm run build
   ```

2. Inicia un servidor estático apuntando a esta carpeta de ejemplo:

   - Con `serve` (recomendado):
     ```bash
     npx serve examples/react-counter
     ```
   - Con Python 3:
     ```bash
     cd examples/react-counter
     python -m http.server 5173
     # luego abre http://localhost:5173
     ```

3. Abre el navegador en la URL indicada por tu servidor (por ejemplo `http://localhost:3000` o `http://localhost:5173`).

4. En la UI:
   - Usa los botones para incrementar/decrementar el contador.
   - Presiona "Alternar identificador" o "Activar" para habilitar el componente `<element-identifier>`.
   - Haz clic sobre elementos (botones, número, textos) y observa el panel con el selector y metadatos.

## ¿Cómo se integra la librería?
- En `index.html`, se carga el bundle ESM ya construido de la librería:

  ```html
  <script type="module" src="./dist/index.esm.js"></script>
  ```

  Esto registra automáticamente el Web Component `<element-identifier>` y expone una API en `window.elementIdentifier` con métodos como `activate()`, `deactivate()` y `toggle()`.

- El ejemplo usa React UMD + Babel para mantenerlo simple y sin herramientas de build adicionales.

## Notas
- Asegúrate de ejecutar `npm run build` en el root antes de abrir el ejemplo, ya que el archivo `dist/index.esm.js` es requerido.
- Si ya publicaste `element-identifier` en npm, podrías reemplazar la carga local por un import desde un CDN (unpkg, jsDelivr) o integrar el paquete en una app Vite/CRA real.
