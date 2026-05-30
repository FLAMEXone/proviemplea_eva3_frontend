"use client";

import * as React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

import { TalentCard } from "@/components/TalentCard";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { Sparkles, Loader2, Database, AlertCircle, X } from "lucide-react";
import { getTalentos, getEstadisticas } from "@/lib/infrastructure/api";
import { type Persona } from "@/lib/interfaces/persona.interface";
import { type Estadisticas } from "@/lib/interfaces/estadisticas.interface";

export default function Home() {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);
  
  // Estados para API dinámicos
  const [talentos, setTalentos] = React.useState<Persona[]>([]);
  const [stats, setStats] = React.useState<Estadisticas>({
    total_personas: 0,
    personas_validadas: 0,
    total_empresas: 0,
    empresas_validadas: 0,
    contactos_pendientes: 0,
    contactos_en_proceso: 0,
    contactos_exitosos: 0
  });
  const [loading, setLoading] = React.useState(true);
  
  const [showMockToast, setShowMockToast] = React.useState(false);

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

  React.useEffect(() => {
    async function loadApiData() {
      try {
        const [fetchedTalentos, fetchedStats] = await Promise.all([
          getTalentos({ validado: true }),
          getEstadisticas()
        ]);

        if (fetchedTalentos) {
          setTalentos(fetchedTalentos);
        }

        if (fetchedStats) {
          setStats(fetchedStats);
        }
      } catch (err) {
        console.warn("Laravel API offline, cargando fallbacks y activando Modo Demostración:", err);
        
        const { MOCK_TALENTOS, MOCK_ESTADISTICAS } = await import("@/lib/infrastructure/mockData");
        setTalentos(MOCK_TALENTOS.filter(t => t.validado));
        setStats(MOCK_ESTADISTICAS);
        setShowMockToast(true);
      } finally {
        setLoading(false);
      }
    }

    loadApiData();
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
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <Hero />
      
      <section className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 py-10 sm:py-14 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300">
              <span className="block text-4xl font-extrabold text-blue-600 dark:text-blue-400">{stats.personas_validadas}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 block uppercase tracking-wider">Talentos Validados</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300">
              <span className="block text-4xl font-extrabold text-teal-600 dark:text-teal-400">{stats.total_empresas}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 block uppercase tracking-wider">Empresas Registradas</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300">
              <span className="block text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{stats.contactos_exitosos}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 block uppercase tracking-wider">Vinculaciones Exitosas</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300">
              <span className="block text-4xl font-extrabold text-amber-600 dark:text-amber-400">{stats.contactos_en_proceso}</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 block uppercase tracking-wider">En Intermediación</span>
            </div>
          </div>
        </div>
      </section>

      <About />
      
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

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Consultando perfiles municipales validados...</p>
          </div>
        ) : talentos.length === 0 ? (
          <div className="mx-auto max-w-md p-6 bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-2xl text-center flex flex-col items-center gap-3">
            <Database className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Vitrina actualmente vacía</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No hay currículums ciegos aprobados y validados para publicación en este momento. Los nuevos perfiles aparecerán una vez visados por el Administrador.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {talentos.map((talento) => (
              <TalentCard key={talento.id} {...talento} />
            ))}
          </div>
        )}
      </section>

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

          <TestimonialsCarousel />
        </div>
      </section>

      <FAQ />
      <Footer />

      {showMockToast && (
        <div className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-2xl border border-amber-200/50 bg-amber-50/95 p-4 shadow-xl backdrop-blur-md dark:border-amber-900/30 dark:bg-amber-950/95 text-slate-800 dark:text-slate-100 transition-all duration-500 animate-in slide-in-from-bottom-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 dark:bg-amber-500/20">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-grow">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Modo Demostración Activo
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
              No se detectó conexión con la base de datos municipal. Visualizando perfiles locales simulados.
            </p>
          </div>
          <button
            onClick={() => setShowMockToast(false)}
            className="rounded-lg p-1.5 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 text-slate-400 hover:text-slate-600 transition-all"
            aria-label="Cerrar notificación"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
