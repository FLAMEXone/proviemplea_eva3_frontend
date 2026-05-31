import { EModalidad, ENivelEducacional, ETipoJornada } from "@/lib/domain/enums/personas.enum";
import { IPersona } from "@/lib/domain/interfaces/persona.interface";
 
export const MOCK_TALENTOS: IPersona[] = [
  {
    id: "d9e83162-bbbe-426b-9c3f-ecb6613ccf68",
    email: "desarrollador.prov@correo.cl",
    telefono: "+56911112222",
    codigo_talento: "PROV-2026-T011",
    resumen: "Desarrollador Full Stack con sólida experiencia en Laravel y React. Especializado en desarrollo de APIs REST, optimización de consultas SQL y despliegue de microservicios en AWS. Altamente proactivo y enfocado en código limpio.",
    titulo_carrera: "Ingeniero Civil en Informática",
    nivel_educacional: ENivelEducacional.UNIVERSITARIA,
    anio_egreso: 2021,
    anios_experiencia: 5,
    areas_experiencia: ["Desarrollo Software", "Integración de Sistemas", "Logística"],
    competencias: ["Laravel", "React", "PostgreSQL", "AWS", "Docker"],
    rango_renta: "$1.800.000 - $2.200.000 CLP",
    tipo_jornada: ETipoJornada.COMPLETA,
    modalidad: EModalidad.REMOTO,
    cursos: ["AWS Certified Solutions Architect", "Scrum Master"],
    idiomas: ["Español Nativo", "Inglés B2"],
    portafolio_url: "https://github.com/desarrollador-fullstack",
    validado: true,
    persona_discapacidad: false,
    activo: true
  },
  {
    id: "3c3ef271-e94d-4da4-8b1e-7b77ab6ef1e2",
    email: "administradora.prov@correo.cl",
    telefono: "+56922223333",
    codigo_talento: "PROV-2026-T023",
    resumen: "Administrativa bilingüe con experiencia en gestión de oficina, atención al cliente y soporte contable. Dominio de herramientas ofimáticas avanzadas (Excel, Notion) y sistemas ERP (SAP). Alta capacidad organizativa y orientación a resultados.",
    titulo_carrera: "Técnico en Administración de Empresas",
    nivel_educacional: ENivelEducacional.TECNICA,
    anios_experiencia: 3,
    competencias: ["SAP ERP", "Excel Avanzado", "Gestión de Agenda", "Inglés B2", "Facturación"],
    rango_renta: "$800.000 - $1.000.000 CLP",
    tipo_jornada: ETipoJornada.COMPLETA,
    modalidad: EModalidad.PRESENCIAL,
    validado: true,
    persona_discapacidad: true,
    activo: true
  },
  {
    id: "6f5cf9e1-ca6c-4876-b9b5-c08ef1284d12",
    email: "disenadora.prov@correo.cl",
    telefono: null,
    codigo_talento: "PROV-2026-T042",
    resumen: "Diseñadora UX/UI apasionada por crear interfaces digitales accesibles y centradas en el usuario. Experiencia en metodologías de diseño (Design Thinking), desarrollo de prototipos interactivos en Figma y pruebas de usabilidad con usuarios reales.",
    titulo_carrera: "Diseñadora Gráfica Mención Multimedia",
    nivel_educacional: ENivelEducacional.UNIVERSITARIA,
    anios_experiencia: 2,
    competencias: ["Figma", "UI Design", "Design Thinking", "HTML/CSS", "Wireframing"],
    rango_renta: "$1.100.000 - $1.300.000 CLP",
    tipo_jornada: ETipoJornada.COMPLETA,
    modalidad: EModalidad.HIBRIDO,
    validado: false,
    persona_discapacidad: false,
    activo: true
  }
];