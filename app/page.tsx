"use client";

import * as React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FAQ from "@/components/FAQ";

import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { Loader2, MessageSquareQuote } from "lucide-react";
import { CustomBadge } from "@/components/custom/CustomBadge";
import { getEstadisticas } from "@/lib/infrastructure/api";
import { IEstadisticas } from "@/lib/domain/interfaces/estadisticas.interface";

export default function Home() {
  const [stats, setStats] = React.useState<IEstadisticas>({
    total_personas: 0,
    personas_validadas: 0,
    total_empresas: 0,
    empresas_validadas: 0,
    contactos_pendientes: 0,
    contactos_en_proceso: 0,
    contactos_exitosos: 0
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadApiData() {
      try {
        const fetchedStats = await getEstadisticas();
        if (fetchedStats) {
          setStats(fetchedStats);
        }
      } catch {
        const { MOCK_ESTADISTICAS } = await import("@/lib/infrastructure/mocks/estadisticas.mock");
        setStats(MOCK_ESTADISTICAS);
      } finally {
        setLoading(false);
      }
    }

    loadApiData();
  }, []);

  return (
    <>
      <Hero />

      <section className="bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 py-10 sm:py-14 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-4 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-xs font-semibold text-slate-400">Actualizando cifras de empleo municipal...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 animate-in fade-in duration-300">
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
          )}
        </div>
      </section>

      <About />

      <section id="testimonios" className="bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/80 py-20 sm:py-28 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col gap-4 mb-12">
            <CustomBadge
              color="emerald"
              size="md"
              text="Testimonios de Impacto"
              icon={<MessageSquareQuote className="w-3.5 h-3.5" />}
              className="self-center uppercase tracking-wide"
            />
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
    </>
  );
}
