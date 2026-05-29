"use client";

import * as React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

import { TalentCard } from "@/components/TalentCard";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { Sparkles } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300">
      {/* Navbar con control de Dark Mode incorporado */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <Hero />
      
      <About />
      
      {/* 🔮 Vitrina de Talentos Real (Hito 1 integrado) */}
      <section id="talentos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="mb-12 text-center sm:text-left flex flex-col gap-4">
          <div className="inline-flex self-center sm:self-start items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold tracking-wide text-blue-700 dark:text-blue-400 uppercase">
            <Sparkles className="w-4 h-4" />
            Vitrina de Talentos Disponibles
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Currículums Ciegos Validados
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Explora los perfiles profesionales de vecinas y vecinos de Providencia. Puedes solicitar intermediación laboral al equipo municipal directamente desde cada perfil.
          </p>
        </div>

        {/* Grid de Tarjetas Reales del Hito 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_TALENTOS.map((talento) => (
            <TalentCard key={talento.id} {...talento} />
          ))}
        </div>
      </section>

      {/* ✍️ Testimonios de Inclusión Laboral Real (Hito 1 integrado) */}
      <section id="testimonios" className="bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/80 py-20 sm:py-28 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col gap-4 mb-12">
            <div className="inline-flex self-center items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-3 py-1 text-xs font-bold tracking-wide text-emerald-700 dark:text-emerald-400 uppercase">
              ✍️ Testimonios de Impacto
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              ¿Qué dicen quienes nos usan?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Empresas aliadas y vecinos beneficiados comparten cómo el formato de CV Ciego de Providencia promueve una selección más justa e inclusiva.
            </p>
          </div>

          {/* Carrusel de Testimonios Accesible */}
          <TestimonialsCarousel />
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
}
