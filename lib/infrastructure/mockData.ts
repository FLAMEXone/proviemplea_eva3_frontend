import { type Persona, NivelEducacional, TipoJornada, Modalidad } from "@/lib/interfaces/persona.interface";
import { type Estadisticas } from "@/lib/interfaces/estadisticas.interface";

export const MOCK_TALENTOS: Persona[] = [
  {
    id: "d9e83162-bbbe-426b-9c3f-ecb6613ccf68",
    codigo_talento: "PROV-2026-T011",
    resumen: "Desarrollador Full Stack con sólida experiencia en Laravel y React. Especializado en desarrollo de APIs REST, optimización de consultas SQL y despliegue de microservicios en AWS. Altamente proactivo y enfocado en código limpio.",
    titulo_carrera: "Ingeniero Civil en Informática",
    nivel_educacional: NivelEducacional.UNIVERSITARIA,
    anios_experiencia: 5,
    competencias: ["Laravel", "React", "PostgreSQL", "AWS", "Docker"],
    rango_renta: "$1.800.000 - $2.200.000 CLP",
    tipo_jornada: TipoJornada.COMPLETA,
    modalidad: Modalidad.REMOTO,
    validado: true,
    persona_discapacidad: false,
    activo: true
  },
  {
    id: "3c3ef271-e94d-4da4-8b1e-7b77ab6ef1e2",
    codigo_talento: "PROV-2026-T023",
    resumen: "Administrativa bilingüe con experiencia en gestión de oficina, atención al cliente y soporte contable. Dominio de herramientas ofimáticas avanzadas (Excel, Notion) y sistemas ERP (SAP). Alta capacidad organizativa y orientación a resultados.",
    titulo_carrera: "Técnico en Administración de Empresas",
    nivel_educacional: NivelEducacional.TECNICA,
    anios_experiencia: 3,
    competencias: ["SAP ERP", "Excel Avanzado", "Gestión de Agenda", "Inglés B2", "Facturación"],
    rango_renta: "$800.000 - $1.000.000 CLP",
    tipo_jornada: TipoJornada.COMPLETA,
    modalidad: Modalidad.PRESENCIAL,
    validado: true,
    persona_discapacidad: true,
    activo: true
  },
  {
    id: "6f5cf9e1-ca6c-4876-b9b5-c08ef1284d12",
    codigo_talento: "PROV-2026-T042",
    resumen: "Diseñadora UX/UI apasionada por crear interfaces digitales accesibles y centradas en el usuario. Experiencia en metodologías de diseño (Design Thinking), desarrollo de prototipos interactivos en Figma y pruebas de usabilidad con usuarios reales.",
    titulo_carrera: "Diseñadora Gráfica Mención Multimedia",
    nivel_educacional: NivelEducacional.UNIVERSITARIA,
    anios_experiencia: 2,
    competencias: ["Figma", "UI Design", "Design Thinking", "HTML/CSS", "Wireframing"],
    rango_renta: "$1.100.000 - $1.300.000 CLP",
    tipo_jornada: TipoJornada.COMPLETA,
    modalidad: Modalidad.HIBRIDO,
    validado: false,
    persona_discapacidad: false,
    activo: true
  }
];

export const MOCK_ESTADISTICAS: Estadisticas = {
  total_personas: 45,
  personas_validadas: 38,
  total_empresas: 12,
  empresas_validadas: 10,
  contactos_pendientes: 5,
  contactos_en_proceso: 8,
  contactos_exitosos: 15
};
