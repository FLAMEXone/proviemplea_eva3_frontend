import { type Persona } from "@/lib/interfaces/persona.interface";
import { type Estadisticas } from "@/lib/interfaces/estadisticas.interface";

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
    throw new Error(errorData.message || `Error HTTP! Estado: ${response.status}`);
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
}): Promise<Persona[]> {
  const params = new URLSearchParams();
  if (filters?.validado !== undefined) {
    params.append("validado", String(filters.validado));
  }
  if (filters?.nivel_educacional) {
    params.append("nivel_educacional", filters.nivel_educacional);
  }

  const queryString = params.toString();
  const path = `/personas${queryString ? `?${queryString}` : ""}`;
  return fetchApi<Persona[]>(path);
}

/**
 * Obtener estadísticas consolidadas y acumuladas de la plataforma (Cached en Backend).
 * GET /api/admin/estadisticas
 */
export async function getEstadisticas(): Promise<Estadisticas> {
  return fetchApi<Estadisticas>("/admin/estadisticas");
}
