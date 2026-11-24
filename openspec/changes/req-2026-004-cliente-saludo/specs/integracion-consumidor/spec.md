# Capability: integracion-consumidor

## ADDED Requirements

### Requirement: Obtener el saludo del proveedor
The consumer module SHALL expose `obtenerSaludo(nombre, baseUrl)`, which SHALL
request the greeting from `GET /saludo?nombre=` of the `saludo-api@1.0.0`
contract and return the greeting text on success.

#### Scenario: Saludo exitoso
- **GIVEN** the `saludo-api@1.0.0` contract mock is running at `baseUrl`
- **WHEN** `obtenerSaludo("Ana", baseUrl)` is called
- **THEN** it resolves to `"Hola, Ana."`

### Requirement: Propagar el error de validación del proveedor
When the provider responds with a validation error, `obtenerSaludo` SHALL
throw an `Error` whose `code` property equals the provider's error code.

#### Scenario: Nombre obligatorio
- **GIVEN** the `saludo-api@1.0.0` contract mock is running at `baseUrl`
- **WHEN** `obtenerSaludo("", baseUrl)` is called
- **THEN** it throws an `Error` whose `code` is `"NOMBRE_OBLIGATORIO"`

### Requirement: Sin dependencias externas de npm
The consumer module SHALL have no npm runtime dependencies: it SHALL use only
Node 22's built-in `fetch` and `node:test`.

#### Scenario: package.json sin dependencias
- **GIVEN** `package.json` in this change
- **WHEN** its `dependencies` field is inspected
- **THEN** it is absent or empty
