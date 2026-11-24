# Tasks — req-2026-004-cliente-saludo

## Serie INCR-01 — Cliente de saludo-api y pruebas

- [ ] Verificar que `.ai-stack/contracts/mock-server.mjs` existe y expone el
      contrato `saludo-api@1.0.0`; si falta, detener y reportarlo como
      bloqueante (no escribir un mock ad hoc, ver ADR-02).
- [ ] Escribir primero las pruebas en rojo (`test/cliente-saludo.test.mjs`)
      con `node:test`, levantando el mock del contrato antes de cada caso:
  - [ ] AC-01.01.1: `obtenerSaludo("Ana", url)` devuelve `"Hola, Ana."`.
  - [ ] AC-01.01.2: `obtenerSaludo("", url)` lanza un `Error` con
        `error.code === "NOMBRE_OBLIGATORIO"`.
- [ ] Implementar `src/cliente-saludo.mjs` con `obtenerSaludo(nombre, baseUrl)`
      (fetch de Node 22, sin dependencias de npm) hasta que las pruebas pasen.
- [ ] Agregar `package.json` con el script `test` (`node --test`) y sin la
      clave `dependencies`, o con `dependencies: {}`.
- [ ] Correr `npm test` localmente y confirmar que las dos pruebas pasan.
- [ ] Confirmar NFR-01 inspeccionando `package.json` (sin dependencias
      externas de npm).
