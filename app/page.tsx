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
import { Card, CardContent } from "@/components/ui/card";

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

      <section className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-900 py-12 sm:py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-4 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-xs font-semibold text-slate-400">Actualizando cifras de empleo municipal...</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6 animate-in fade-in duration-300">
              <Card className="text-center shadow-sm hover:shadow-lg border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="pt-8 pb-7">
                  <span className="block text-5xl font-extrabold text-blue-600 dark:text-blue-400">{stats.personas_validadas}</span>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-3 block uppercase tracking-widest">Talentos Validados</span>
                </CardContent>
              </Card>
              <Card className="text-center shadow-sm hover:shadow-lg border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="pt-8 pb-7">
                  <span className="block text-5xl font-extrabold text-teal-600 dark:text-teal-400">{stats.total_empresas}</span>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-3 block uppercase tracking-widest">Empresas Registradas</span>
                </CardContent>
              </Card>
              <Card className="text-center shadow-sm hover:shadow-lg border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="pt-8 pb-7">
                  <span className="block text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">{stats.contactos_exitosos}</span>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-3 block uppercase tracking-widest">Vinculaciones Exitosas</span>
                </CardContent>
              </Card>
              <Card className="text-center shadow-sm hover:shadow-lg border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-0.5">
                <CardContent className="pt-8 pb-7">
                  <span className="block text-5xl font-extrabold text-amber-600 dark:text-amber-400">{stats.contactos_en_proceso}</span>
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-3 block uppercase tracking-widest">En Intermediación</span>
                </CardContent>
              </Card>
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
