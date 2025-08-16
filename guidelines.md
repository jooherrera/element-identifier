# Guía de Contribución: Convenciones de Commits

Este proyecto sigue el estándar "Conventional Commits" para mensajes de commit. Esto facilita el versionado semántico (SemVer), el historial legible y la automatización de lanzamientos.

## Formato básico

```
<tipo>[!][(alcance)]: <resumen en presente e imperativo>

[Descripción detallada opcional]

[Notas opcionales]
BREAKING CHANGE: <descripción del cambio incompatible>
Refs: <issue|PR>
```

- tipo: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- !: indica un cambio incompatible (breaking change)
- alcance (opcional): área del código afectada, por ejemplo: core, api, build, selector
- resumen: breve, en una línea, sin punto final

## Impacto en versionado semántico (SemVer)

- feat: agrega una nueva funcionalidad sin romper compatibilidad → MINOR (x.Y.z)
- fix: corrige un bug sin romper compatibilidad → PATCH (x.y.Z)
- feat! o cualquier tipo con bandera de ruptura (! o BREAKING CHANGE) → MAJOR (X.y.z)

Resumen solicitado:
- feat: add new feature       # Minor version bump
- fix: fix critical bug       # Patch version bump
- feat!: breaking change      # Major version bump

## Reglas y buenas prácticas

- Usa español o inglés de forma consistente; elige uno por repositorio. Mantén el imperativo: "agrega", "corrige", "actualiza".
- Mantén el resumen corto (≤ 72 caracteres). Sin punto final.
- Usa scope cuando ayude a identificar el área afectada: `feat(selector): ...`
- Para cambios incompatibles, marca con `!` tras el tipo o añade un bloque `BREAKING CHANGE:` en el cuerpo.
- Si aplica, referencia issues/PRs en el pie: `Refs: #123`, `Closes: #456`.

## Ejemplos

- Mensajes simples:
  - `feat: add copy to clipboard functionality`
  - `fix: resolve panel positioning issue`
  - `feat!: change API from activate() to start()`

- Con alcance y cuerpo:
  ```
  feat(selector): support nth-child strategy for complex queries
  
  Agrega un algoritmo adicional para construir selectores estables cuando el id no está disponible.
  Refs: #42
  ```

- Cambio incompatible (dos formas equivalentes):
  ```
  feat!: rename option `activateOnLoad` to `autoStart`
  
  BREAKING CHANGE: La opción `activateOnLoad` fue renombrada a `autoStart`. Los consumidores deben actualizar su configuración.
  ```

- Corrección de bug con test:
  ```
  fix(utils): handle null root element in selector builder
  
  Añade guardas para evitar excepciones cuando el nodo raíz es null.
  Tests incluidos.
  Closes: #128
  ```

## Tipos comunes (sugeridos)

- feat: nueva funcionalidad para el usuario
- fix: corrección de bug para el usuario
- docs: cambios solo en documentación
- style: cambios que no afectan la lógica (formato, espacios, comas)
- refactor: cambios internos sin nuevas features ni fixes
- perf: mejoras de rendimiento
- test: agregar/ajustar pruebas
- build: cambios en el sistema de build o dependencias
- ci: cambios en pipelines/Workflows
- chore: mantenimiento (no src ni test)
- revert: revertir un commit previo

## Plantilla rápida

```
<tipo>[!][(alcance)]: <resumen>

[contexto/motivo]
[qué cambia]
[impacto]

[BREAKING CHANGE: ...]
[Refs|Closes: #id]
```

Siguiendo estas reglas, facilitamos la colaboración, el versionado automático y un historial de cambios claro.

## Flujo de trabajo: Pull Requests (no commits directos a master/main)

- Todos los cambios deben realizarse mediante Pull Request (PR).
- No se permiten commits ni pushes directamente a las ramas `master` o `main`.
- Crea una rama a partir de `main` con un nombre descriptivo:
  - `feat/<descripcion-corta>` para nuevas funcionalidades
  - `fix/<descripcion-corta>` para correcciones
  - `chore/<descripcion-corta>` u otros tipos según corresponda
- Abre un PR y solicita revisión. El PR debe:
  - Pasar el pipeline de CI y pruebas.
  - Mantener/Mejorar cobertura de tests.
  - Seguir "Conventional Commits" en el título del PR.
- Una vez aprobado, realiza "Squash & Merge" desde la plataforma (p.ej. GitHub). No reescribas el historial de `main`.
- Para cambios incompatibles (breaking changes), márcalos con `!` o un bloque `BREAKING CHANGE:` en el cuerpo del PR.

> Recomendación: habilitar protección de ramas para `main/master` y requerir revisiones antes de mergear.
