import { ENivelEducacional, ETipoJornada, EModalidad } from "../enums/personas.enum";

export interface IPersona {
  id: string;
  codigo_talento: string;
  resumen?: string | null;
  nivel_educacional?: ENivelEducacional | null;
  titulo_carrera?: string | null;
  anio_egreso?: number | null;
  anios_experiencia: number;
  areas_experiencia?: string[] | null;
  competencias?: string[] | string | null;
  rango_renta?: string | null;
  tipo_jornada?: ETipoJornada | null;
  modalidad?: EModalidad | null;
  cursos?: string[] | null;
  idiomas?: string[] | null;
  portafolio_url?: string | null;
  persona_discapacidad: boolean;
  validado: boolean;
  activo: boolean;
}
