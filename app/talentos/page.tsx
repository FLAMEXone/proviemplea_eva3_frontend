"use client";

import * as React from "react";
import { Loader2, Search, Database, CheckCircle2, Clock, LayoutList } from "lucide-react";
import { getTalentos } from "@/lib/infrastructure/api";
import { IPersona } from "@/lib/domain/interfaces/persona.interface";
import { TalentCard } from "@/components/TalentCard";
import { CustomBadge } from "@/components/custom/CustomBadge";

type ValidadoFilter = "todos" | "validados" | "pendientes";

const FILTER_OPTIONS: { value: ValidadoFilter; label: string; icon: React.ReactNode }[] = [
  { value: "todos",      label: "Todos",      icon: <LayoutList   className="w-3.5 h-3.5" /> },
  { value: "validados",  label: "Validados",  icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  { value: "pendientes", label: "Pendientes", icon: <Clock        className="w-3.5 h-3.5" /> },
];

export default function TalentosPage() {
  const [talentos, setTalentos] = React.useState<IPersona[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [validadoFilter, setValidadoFilter] = React.useState<ValidadoFilter>("validados");

  React.useEffect(() => {
    async function loadData() {
      try {
        // Traemos todos los activos y filtramos en cliente por tab
        const fetchedTalentos = await getTalentos();
        setTalentos(fetchedTalentos);
      } catch {
        const { MOCK_TALENTOS } = await import("@/lib/infrastructure/mocks/personas.mock");
        setTalentos(MOCK_TALENTOS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredTalentos = talentos
    .filter(tal => {
      if (validadoFilter === "validados")  return tal.validado === true;
      if (validadoFilter === "pendientes") return tal.validado === false || tal.validado === null;
      return true; // "todos"
    })
    .filter(tal =>
      tal.titulo_carrera?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tal.codigo_talento.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(tal.competencias) && tal.competencias.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (typeof tal.competencias === "string" && (tal.competencias as string).toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <>
      <div className="relative overflow-hidden bg-slate-900 text-white py-12 dark:bg-black/40">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <CustomBadge
            color="glass-blue"
            size="md"
            text="Vitrina de Talentos"
            className="uppercase tracking-wider mb-4"
          />
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Currículums candidatos
          </h1>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Explora los perfiles de vecinos postulantes. Tu organización puede solicitar intermediación confidencial sin sesgos de selección.
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="space-y-6">

          {/* Barra de filtros */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Tabs de validación */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1">
              {FILTER_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setValidadoFilter(opt.value)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    validadoFilter === opt.value
                      ? opt.value === "validados"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : opt.value === "pendientes"
                          ? "bg-amber-500 text-white shadow-sm"
                          : "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                  {/* Contador */}
                  {!loading && (
                    <span className={`ml-1 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                      validadoFilter === opt.value
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}>
                      {opt.value === "todos"      ? talentos.length
                       : opt.value === "validados" ? talentos.filter(t => t.validado).length
                       : talentos.filter(t => !t.validado).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Buscador */}
            <div className="relative flex-grow max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por rubro, código o competencias..."
                className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Grid de talentos */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
              <p className="text-xs font-medium text-slate-500">Recuperando catálogo de candidatos...</p>
            </div>
          ) : filteredTalentos.length === 0 ? (
            <div className="p-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-3">
              <Database className="w-10 h-10 text-slate-400 mx-auto animate-bounce" />
              <h3 className="font-bold text-slate-950 dark:text-slate-50">No se encontraron perfiles</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Ningún currículum ciego coincide con los filtros seleccionados en este momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTalentos.map((tal) => (
                <TalentCard key={tal.id} {...tal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
