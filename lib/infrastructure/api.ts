import { IPersona } from "@/lib/domain/interfaces/persona.interface";
import { IEstadisticas } from "@/lib/domain/interfaces/estadisticas.interface";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";
import { IContactoSolicitado } from "@/lib/domain/interfaces/contacto.interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(options?.headers || {}),
    },
    // Aseguramos que Next.js no cachee indefinidamente las peticiones dinámicas de API real
    next: {
      revalidate: 0,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(errorData.message || `Error HTTP! Estado: ${response.status}`);
    (error as any).status = response.status;
    (error as any).errors = errorData.errors;
    throw error;
  }

  const result = await response.json();
  return result.data as T;
}

/**
 * Obtener lista de talentos en formato CV Ciego con soporte para filtros de búsqueda.
 * GET /api/personas
 */
export async function getTalentos(filters?: {
  validado?: boolean;
  nivel_educacional?: string;
}): Promise<IPersona[]> {
  const params = new URLSearchParams();
  if (filters?.validado !== undefined) {
    params.append("validado", String(filters.validado));
  }
  if (filters?.nivel_educacional) {
    params.append("nivel_educacional", filters.nivel_educacional);
  }

  const queryString = params.toString();
  const path = `/personas${queryString ? `?${queryString}` : ""}`;
  return fetchApi<IPersona[]>(path);
}

/**
 * Obtener estadísticas consolidadas y acumuladas de la plataforma (Cached en Backend).
 * GET /api/admin/estadisticas
 */
export async function getEstadisticas(): Promise<IEstadisticas> {
  return fetchApi<IEstadisticas>("/admin/estadisticas");
}

/**
 * Obtener lista de empresas validadas municipales.
 * GET /api/empresas
 */
export async function getEmpresas(filters?: {
  tipo_empresa?: string;
}): Promise<IEmpresa[]> {
  const params = new URLSearchParams();
  if (filters?.tipo_empresa) {
    params.append("tipo_empresa", filters.tipo_empresa);
  }
  const queryString = params.toString();
  const path = `/empresas${queryString ? `?${queryString}` : ""}`;
  return fetchApi<IEmpresa[]>(path);
}

/**
 * Registrar una nueva solicitud de intermediación laboral/contacto.
 * POST /api/admin/contactos
 */
export async function crearContacto(
  empresaId: string,
  personaId: string,
  notasAdmin?: string
): Promise<IContactoSolicitado> {
  return fetchApi<IContactoSolicitado>("/admin/contactos", {
    method: "POST",
    body: JSON.stringify({
      empresa_id: empresaId,
      persona_id: personaId,
      notas_admin: notasAdmin,
    }),
  });
}

/**
 * Registrar una nueva empresa solicitante de convenio.
 * POST /api/empresas
 */
export async function crearEmpresa(data: Partial<IEmpresa>): Promise<IEmpresa> {
  return fetchApi<IEmpresa>("/empresas", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
