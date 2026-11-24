# req-2026-004-cliente-saludo — Mostrar el saludo de la API en el consumidor

## Why

El consumidor necesita pedir un saludo de texto sin reimplementar la regla de
saludar. El contrato `saludo-api@1.0.0` ya expone `GET /saludo?nombre=` para
eso; falta el cliente HTTP en este repo que lo consuma.

## What Changes

- Agregar `src/cliente-saludo.mjs` con `obtenerSaludo(nombre, baseUrl)`, que
  llama a `GET /saludo?nombre=<nombre>` del contrato `saludo-api@1.0.0` con
  `fetch` de Node 22 y devuelve el texto del saludo.
- Agregar pruebas con `node:test` que corren contra el mock del contrato
  (`.ai-stack/contracts/mock-server.mjs`), no contra un servidor escrito a
  mano.
- Agregar `package.json` con el script `test`, sin `dependencies` de npm.

## Capabilities

- `integracion-consumidor`: cliente HTTP del contrato `saludo-api@1.0.0`.

## Acceptance Criteria (trazadas al DERCAS)

- AC-01.01.1 (US-01.01): dado el mock del contrato levantado, `obtenerSaludo("Ana", url)`
  devuelve `"Hola, Ana."`.
- AC-01.01.2 (US-01.01): dado que el proveedor responde 400 `NOMBRE_OBLIGATORIO`,
  `obtenerSaludo("", url)` lanza un `Error` cuyo `code` es `NOMBRE_OBLIGATORIO`.
- NFR-01: `package.json` no declara `dependencies` (sin dependencias externas de npm).

## Impact

Serie única (INCR-01): cliente + pruebas, mergeado en `main` en un solo PR de
construcción. Alcance pequeño (un módulo, un archivo de pruebas, un
`package.json`), no requiere partirlo en series adicionales.

## Non-goals

- No se agrega interfaz gráfica (el DERCAS no la pide para esta solicitud).
- No se valida ni reimplementa la lógica de saludo del lado del proveedor:
  eso vive en `saludo-api@1.0.0` y no se redefine aquí.
- No se agregan reintentos, timeouts configurables, ni caching al cliente
  HTTP: fuera del alcance aprobado.
