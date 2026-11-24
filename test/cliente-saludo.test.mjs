import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { obtenerSaludo } from '../src/cliente-saludo.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PORT = 4310;
const BASE_URL = `http://127.0.0.1:${PORT}`;

let mock;

before(async () => {
  mock = spawn('node', ['.ai-stack/contracts/mock-server.mjs', '--port', String(PORT), '--slug', 'saludo-api'], {
    cwd: ROOT,
  });
  await new Promise((resolve, reject) => {
    mock.stdout.once('data', resolve);
    mock.once('error', reject);
  });
});

after(() => {
  mock.kill();
});

function registrarObservado(slug, nombreFixture, data) {
  const dir = join(ROOT, '.agentos', 'contracts', 'observed', slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${nombreFixture}.json`), JSON.stringify(data));
}

test('AC-01.01.1: obtenerSaludo("Ana", url) devuelve "Hola, Ana."', async () => {
  const saludo = await obtenerSaludo('Ana', BASE_URL);
  assert.equal(saludo, 'Hola, Ana.');
  registrarObservado('saludo-api', 'ana', { exercised: true, test: 'AC-01.01.1' });
});

test('contrato saludo-api: nombre demasiado largo propaga NOMBRE_DEMASIADO_LARGO', async () => {
  const nombreLargo = 'a'.repeat(101);
  await assert.rejects(() => obtenerSaludo(nombreLargo, BASE_URL), (err) => {
    assert.equal(err.code, 'NOMBRE_DEMASIADO_LARGO');
    return true;
  });
  registrarObservado('saludo-api', 'demasiado-largo', {
    exercised: true,
    test: 'contrato saludo-api: nombre demasiado largo propaga NOMBRE_DEMASIADO_LARGO',
  });
});

test('contrato saludo-api: GET /saludo sin la query exacta responde METODO_NO_PERMITIDO (fixture metodo-no-permitido)', async () => {
  const res = await fetch(`${BASE_URL}/saludo`);
  const body = await res.json();
  assert.equal(res.status, 405);
  assert.equal(body.error.code, 'METODO_NO_PERMITIDO');
  registrarObservado('saludo-api', 'metodo-no-permitido', {
    exercised: true,
    test: 'contrato saludo-api: GET /saludo sin la query exacta responde METODO_NO_PERMITIDO',
  });
});
