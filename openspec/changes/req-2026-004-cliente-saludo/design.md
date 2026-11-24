# Design — req-2026-004-cliente-saludo

## Arquitectura

módulo consumidor → `obtenerSaludo(nombre, baseUrl)` → `GET /saludo?nombre=`
(`saludo-api`) → texto del saludo.

`obtenerSaludo` arma la URL `${baseUrl}/saludo?nombre=${encodeURIComponent(nombre)}`,
hace `fetch(url)` y:
- si la respuesta es `200`, devuelve `body.saludo` (string);
- si no es `200`, lee `body.error` y lanza `new Error(message)` con
  `error.code = body.error.code` (p. ej. `NOMBRE_OBLIGATORIO`,
  `NOMBRE_DEMASIADO_LARGO`).

## Decisiones (ADR)

- **ADR-01 · Cliente con fetch de Node 22** — se usa `fetch` global de Node 22,
  sin dependencias de npm, igual que el proveedor. Tal como lo fija el DERCAS
  aprobado; sin desviaciones.
- **ADR-02 · Pruebas contra el mock del contrato** — las pruebas de
  `node:test` levantan `.ai-stack/contracts/mock-server.mjs` con el contrato
  `saludo-api@1.0.0` y corren contra ese mock, no contra un servidor escrito a
  mano, para validar contra el contrato publicado. Tal como lo fija el DERCAS
  aprobado; sin desviaciones.

## Contratos

- `saludo-api@1.0.0` — API de saludo, publicado por `integracion-sandbox`
  (Aprobada, hash `e0eefdfbaf17dad6e8e30d9327d8977d16c74f6b4feb213729fd8608ffaa6e15`).
  Este cambio solo lo consume: no se copia ni redefine aquí. El cliente llama
  `GET /saludo?nombre=` y maneja las respuestas `200` (`SaludoResponse.saludo`)
  y `400` (`ErrorResponse.error.code`/`error.message`) tal como las documenta
  el contrato. No falta nada del contrato para este alcance: no hay
  "Faltante" que reportar.

## Riesgos

- El mock del contrato (`.ai-stack/contracts/mock-server.mjs`) no existe aún
  en este repo al momento de escribir este paquete; lo trae el kit de
  Qubipods para construcción. Mitigación: las tareas de `tasks.md` verifican
  su existencia antes de usarlo y, si falta, lo señalan como bloqueante en
  lugar de escribir un servidor mock ad hoc (ADR-02 lo prohíbe).
- `fetch` global requiere Node ≥ 18; el entorno del Qubipod trae Node 22, así
  que no hay riesgo de runtime.

## Entorno de ejecución

El Qubipod ejecuta las pruebas en Node 22 (coincide con lo que pide ADR-01).
No se necesita PostgreSQL, Redis ni Docker para este alcance: el cliente y
sus pruebas no tocan base de datos ni contenedores. `npm test` corre
`node --test` directamente en la máquina del Qubipod, sin RollForward.

## Verificación

- AC-01.01.1 y AC-01.01.2 se verifican con pruebas de `node:test` que
  levantan el mock del contrato y llaman `obtenerSaludo` (ver
  `specs/integracion-consumidor/spec.md`).
- NFR-01 se verifica inspeccionando que `package.json` no tenga la clave
  `dependencies` (o la tenga vacía).

## Interfaz

Esta solicitud no tiene interfaz gráfica: el DERCAS aprobado no la pide, no
se agrega sección UI ni mockup.
