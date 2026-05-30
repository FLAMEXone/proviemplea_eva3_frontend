export enum NivelEducacional {
  BASICA = "basica",
  MEDIA = "media",
  TECNICA = "tecnica",
  UNIVERSITARIA = "universitaria",
  POSTGRADO = "postgrado",
}

export enum TipoJornada {
  COMPLETA = "completa",
  PART_TIME = "part-time",
  POR_HORAS = "por-horas",
}

export enum Modalidad {
  PRESENCIAL = "presencial",
  REMOTO = "remoto",
  HIBRIDO = "hibrido",
}

export interface Persona {
  id: string;
  codigo_talento: string;
  resumen?: string | null;
  nivel_educacional?: NivelEducacional | null;
  titulo_carrera?: string | null;
  anio_egreso?: number | null;
  anios_experiencia: number;
  areas_experiencia?: string[] | null;
  competencias?: string[] | string | null;
  rango_renta?: string | null;
  tipo_jornada?: TipoJornada | null;
  modalidad?: Modalidad | null;
  cursos?: string[] | null;
  idiomas?: string[] | null;
  portafolio_url?: string | null;
  persona_discapacidad: boolean;
  validado: boolean;
  activo: boolean;
}
