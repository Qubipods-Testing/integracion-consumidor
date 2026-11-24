export async function obtenerSaludo(nombre, baseUrl) {
  const url = `${baseUrl}/saludo?nombre=${encodeURIComponent(nombre)}`;
  const res = await fetch(url);
  const body = await res.json();
  if (res.status === 200) {
    return body.saludo;
  }
  const error = new Error(body.error.message);
  error.code = body.error.code;
  throw error;
}
