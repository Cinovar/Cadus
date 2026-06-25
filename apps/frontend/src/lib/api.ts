/**
 * Clientes HTTP para cada microsserviço do Cadus.
 *
 * Uso:
 *   import { registerApi } from '@/lib/api'
 *   const data = await registerApi.get('/identidades/12345678900')
 */

const AUTH_URL      = import.meta.env.VITE_AUTH_URL      as string;
const REGISTER_URL  = import.meta.env.VITE_REGISTER_URL  as string;
const HISTORICO_URL = import.meta.env.VITE_HISTORICO_URL as string;

// Lê o token do localStorage sem importar o authStore
// (evita ciclo de dependência: authStore importa api, api não importa authStore)
function getToken(): string | null {
  try {
    const raw = localStorage.getItem("cadus-auth");
    if (!raw) return null;
    return (JSON.parse(raw) as { state?: { token?: string } }).state?.token ?? null;
  } catch {
    return null;
  }
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
  body?: unknown;
  /** true para rotas públicas (login, cadastro) que não precisam de token */
  public?: boolean;
}

async function request<T>(
  baseUrl: string,
  method: HttpMethod,
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (!options.public) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    credentials: "include",
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const json = await res.json();
      message = json.erro ?? json.error ?? json.message ?? message;
    } catch { /* resposta sem body */ }
    throw new Error(message);
  }

  // 204 No Content não tem body
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

function makeClient(baseUrl: string) {
  return {
    get:    <T>(path: string, opts?: RequestOptions) =>
      request<T>(baseUrl, "GET", path, opts),
    post:   <T>(path: string, body: unknown, opts?: RequestOptions) =>
      request<T>(baseUrl, "POST", path, { ...opts, body }),
    patch:  <T>(path: string, body: unknown, opts?: RequestOptions) =>
      request<T>(baseUrl, "PATCH", path, { ...opts, body }),
    delete: <T>(path: string, opts?: RequestOptions) =>
      request<T>(baseUrl, "DELETE", path, opts),
  };
}

export const authApi      = makeClient(AUTH_URL);
export const registerApi  = makeClient(REGISTER_URL);
export const historicoApi = makeClient(HISTORICO_URL);