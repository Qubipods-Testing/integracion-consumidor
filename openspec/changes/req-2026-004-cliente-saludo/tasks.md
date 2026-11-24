# Tasks — req-2026-004-cliente-saludo

## Serie INCR-01 — Cliente de saludo-api y pruebas

- [x] Verificar que `.ai-stack/contracts/mock-server.mjs` existe y expone el
      contrato `saludo-api@1.0.0`; si falta, detener y reportarlo como
      bloqueante (no escribir un mock ad hoc, ver ADR-02).
- [x] Escribir primero las pruebas en rojo (`test/cliente-saludo.test.mjs`)
      con `node:test`, levantando el mock del contrato antes de cada caso:
  - [x] AC-01.01.1: `obtenerSaludo("Ana", url)` devuelve `"Hola, Ana."`.
  - [ ] AC-01.01.2: `obtenerSaludo("", url)` lanza un `Error` con
        `error.code === "NOMBRE_OBLIGATORIO"`. **Bloqueada** — ver
        `.agentos/report.json` (`blockedContracts`): las fixtures `vacio` y
        `no-encontrada` son inalcanzables vía HTTP contra
        `.ai-stack/contracts/mock-server.mjs` publicado (quedan siempre
        eclipsadas por la fixture `metodo-no-permitido`, que coincide con
        cualquier `GET /saludo` sin query exacta). No se escribió esta prueba
        porque quedaría permanentemente en rojo por un defecto del
        mock/fixtures publicados, no del cliente.
- [x] Implementar `src/cliente-saludo.mjs` con `obtenerSaludo(nombre, baseUrl)`
      (fetch de Node 22, sin dependencias de npm) hasta que las pruebas pasen.
- [x] Agregar `package.json` con el script `test` (`node --test`) y sin la
      clave `dependencies`, o con `dependencies: {}`.
- [x] Correr `npm test` localmente y confirmar que las dos pruebas pasan.
      (De las dos pruebas de `tasks.md`, solo AC-01.01.1 se pudo ejecutar;
      AC-01.01.2 queda bloqueada, ver arriba. `npm test` corre 3 pruebas en
      verde: AC-01.01.1 y dos pruebas adicionales que ejercitan las fixtures
      `demasiado-largo` y `metodo-no-permitido` del contrato.)
- [x] Confirmar NFR-01 inspeccionando `package.json` (sin dependencias
      externas de npm).
