"use client";

import * as React from "react";
import { TalentCard } from "@/components/TalentCard";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sun, Moon } from "lucide-react";

// Mock de candidatos basado exactamente en la estructura de la base de datos de Laravel
const MOCK_TALENTOS = [
  {
    id: "d9e83162-bbbe-426b-9c3f-ecb6613ccf68",
    codigo_talento: "TAL-2026-001",
    resumen: "Desarrollador Full Stack con sólida experiencia en Laravel y React. Especializado en desarrollo de APIs REST, optimización de consultas SQL y despliegue de microservicios en AWS. Altamente proactivo y enfocado en código limpio.",
    titulo_carrera: "Ingeniero Civil en Informática",
    nivel_educacional: "Universitario Graduado",
    anios_experiencia: 5,
    competencias: ["Laravel", "React", "PostgreSQL", "AWS", "Docker"],
    rango_renta: "$1.800.000 - $2.200.000 CLP",
    tipo_jornada: "Completa",
    modalidad: "Remoto",
    validado: true,
    persona_discapacidad: false,
  },
  {
    id: "3c3ef271-e94d-4da4-8b1e-7b77ab6ef1e2",
    codigo_talento: "TAL-2026-002",
    resumen: "Administrativa bilingüe con experiencia en gestión de oficina, atención al cliente y soporte contable. Dominio de herramientas ofimáticas avanzadas (Excel, Notion) y sistemas ERP (SAP). Alta capacidad organizativa y orientación a resultados.",
    titulo_carrera: "Técnico en Administración de Empresas",
    nivel_educacional: "Técnico Profesional Completo",
    anios_experiencia: 3,
    competencias: ["SAP ERP", "Excel Avanzado", "Gestión de Agenda", "Inglés B2", "Facturación"],
    rango_renta: "$800.000 - $1.000.000 CLP",
    tipo_jornada: "Completa",
    modalidad: "Presencial",
    validado: true,
    persona_discapacidad: true, // Incluida bajo ley de inclusión 21015
  },
  {
    id: "6f5cf9e1-ca6c-4876-b9b5-c08ef1284d12",
    codigo_talento: "TAL-2026-003",
    resumen: "Diseñadora UX/UI apasionada por crear interfaces digitales accesibles y centradas en el usuario. Experiencia en metodologías de diseño (Design Thinking), desarrollo de prototipos interactivos en Figma y pruebas de usabilidad con usuarios reales.",
    titulo_carrera: "Diseñadora Gráfica Mención Multimedia",
    nivel_educacional: "Universitario Graduado",
    anios_experiencia: 2,
    competencias: ["Figma", "UI Design", "Design Thinking", "HTML/CSS", "Wireframing"],
    rango_renta: "$1.100.000 - $1.300.000 CLP",
    tipo_jornada: "Completa",
    modalidad: "Híbrido",
    validado: false, // Perfil recién registrado, aún no validado por el administrador
    persona_discapacidad: false,
  }
];

export default function Home() {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      
      {/* Header Municipal Premium */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo de Providencia Estilizado */}
            <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
              PR
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 block leading-tight">
                ProviEmplea
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block tracking-wide">
                BÚSQUEDA INVERSA • PROVIDENCIA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
              <a href="#vitrina" className="hover:text-primary transition-colors">Vitrina de Talentos</a>
              <a href="#testimonios" className="hover:text-primary transition-colors">Testimonios</a>
              <a href="#nosotros" className="hover:text-primary transition-colors">Sobre el Portal</a>
            </nav>
            
            {/* Botón de alternancia de tema */}
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema de color"
              className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 py-16 md:py-24">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10 dark:bg-primary/20 dark:text-primary dark:border-primary/30 mb-4 px-3 py-1 text-xs shadow-none">
            Hito 1: Componentes Reutilizables Shadcn Activos
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            Encuentra el talento local <br/>
            <span className="bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              sin sesgos de contratación
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Invertimos el modelo tradicional de empleo. Son las empresas quienes buscan a través de perfiles profesionales totalmente <strong>anonimizados (CV Ciego)</strong> y solicitan intermediación directa a la Municipalidad.
          </p>

          {/* Estadísticas Rápidas Simuladas */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-100 pt-8 dark:border-slate-900">
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-primary dark:text-primary">100%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">CV Ciego Confidencial</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-teal-600 dark:text-teal-400">+50</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">Empresas Aliadas</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">24/7</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">Vitrina Activa</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-extrabold text-amber-600 dark:text-amber-400">L. 21015</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">Fomento de Inclusión</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrina de Talentos - Showcase de TalentCard */}
      <section id="vitrina" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-6 h-6 text-primary dark:text-primary" />
            Vitrina de Talentos Disponibles
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Explora los perfiles de los vecinos de Providencia. Para contactarlos de manera formal y segura, haz clic en <strong>Solicitar Intermediación</strong>.
          </p>
        </div>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TALENTOS.map((talento) => (
            <TalentCard key={talento.id} {...talento} />
          ))}
        </div>
      </section>

      {/* Sección del Carrusel de Testimonios */}
      <section id="testimonios" className="bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              ¿Qué dicen quienes nos usan?
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Empresas aliadas y vecinos beneficiados nos cuentan su experiencia con el nuevo modelo de intermediación inversa.
            </p>
          </div>

          {/* Carrusel de Testimonios Accesible */}
          <TestimonialsCarousel />
        </div>
      </section>

      {/* Explicativo de Proceso */}
      <section id="nosotros" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          ¿Cómo opera la intermediación de ProviEmplea?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary flex items-center justify-center mx-auto mb-4 font-bold">
              1
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Exploración</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Las empresas buscan talentos de forma anónima basándose puramente en habilidades técnicas y experiencia.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400 flex items-center justify-center mx-auto mb-4 font-bold">
              2
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Solicitud</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              La empresa selecciona el talento de interés y solicita la intermediación a través de un formulario seguro.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-950 p-6 rounded-xl border border-slate-100 dark:border-slate-900 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 font-bold">
              3
            </div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Conexión Municipal</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              El equipo municipal de Providencia gestiona el contacto, valida la disponibilidad y facilita la entrevista directa.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-950 py-8 text-center text-xs text-slate-400">
        <p>
          © 2026 Municipalidad de Providencia. Portal de Búsqueda Inversa de Talentos ProviEmplea.
        </p>
        <p className="mt-1 font-mono text-[10px]">
          Desarrollado para la Evaluación Sumativa U3 — Sección 51
        </p>
      </footer>
    </div>
  );
}
