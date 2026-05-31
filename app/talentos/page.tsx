"use client";

import * as React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Loader2, 
  Search,
  Info,
  Sparkles,
  Database
} from "lucide-react";
import { getTalentos } from "@/lib/infrastructure/api";
import { IPersona } from "@/lib/domain/interfaces/persona.interface";
import { TalentCard } from "@/components/TalentCard";
import { CustomBadge } from "@/components/custom/CustomBadge";

function isTalentoCompleto(talento: IPersona): boolean {
  const email = talento.email?.trim();
  const telefono = talento.telefono?.trim();
  const resumen = talento.resumen?.trim();
  const nivel = talento.nivel_educacional;
  const titulo = talento.titulo_carrera?.trim();
  const anio = talento.anio_egreso;
  const aniosExp = talento.anios_experiencia;
  const renta = talento.rango_renta?.trim();
  const jornada = talento.tipo_jornada;
  const modalidad = talento.modalidad;
  const portafolio = talento.portafolio_url?.trim();

  // Competencias (array o string no vacío)
  const comps = Array.isArray(talento.competencias)
    ? talento.competencias.length > 0
    : !!(talento.competencias as any)?.trim();

  // Áreas (array o string no vacío)
  const areas = Array.isArray(talento.areas_experiencia)
    ? talento.areas_experiencia.length > 0
    : !!(talento.areas_experiencia as any)?.trim();

  // Cursos (array o string no vacío)
  const cursos = Array.isArray(talento.cursos)
    ? talento.cursos.length > 0
    : !!(talento.cursos as any)?.trim();

  // Idiomas (array o string no vacío)
  const idiomas = Array.isArray(talento.idiomas)
    ? talento.idiomas.length > 0
    : !!(talento.idiomas as any)?.trim();

  return !!(
    email &&
    telefono &&
    resumen &&
    nivel &&
    titulo &&
    anio !== null && anio !== undefined &&
    aniosExp !== null && aniosExp !== undefined &&
    renta &&
    jornada &&
    modalidad &&
    portafolio &&
    comps &&
    areas &&
    cursos &&
    idiomas
  );
}

export default function TalentosPage() {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);

  // Estados de datos
  const [talentos, setTalentos] = React.useState<IPersona[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isDemoMode, setIsDemoMode] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Carga de Tema
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

  // Carga inicial de datos
  React.useEffect(() => {
    async function loadData() {
      try {
        const fetchedTalentos = await getTalentos();
        setTalentos(fetchedTalentos);
      } catch (err) {
        console.warn("Laravel API offline, activando Modo Demostración en vitrina:", err);
        setIsDemoMode(true);
        
        const { MOCK_TALENTOS } = await import("@/lib/infrastructure/mocks/personas.mock");
        setTalentos(MOCK_TALENTOS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtrado de talentos por búsqueda reactiva
  const filteredTalentos = talentos.map(tal => ({
    ...tal,
    validado: isDemoMode ? isTalentoCompleto(tal) : !!tal.validado
  })).filter(tal => 
    tal.titulo_carrera?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tal.codigo_talento.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (Array.isArray(tal.competencias) && tal.competencias.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))) ||
    (typeof tal.competencias === "string" && tal.competencias.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Banner decorativo */}
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
            Currículums Ciegos de Providencia
          </h1>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Explora los perfiles de vecinos postulantes que superaron las validaciones. Tu organización puede solicitar su intermediación confidencial sin sesgos de selección.
          </p>
        </div>
      </div>

      {/* Alerta de Modo Demostración */}
      {isDemoMode && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 w-full">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/30 flex gap-3 items-start animate-in fade-in slide-in-from-top-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                Modo Demostración Activo
              </h4>
              <p className="text-amber-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                El backend municipal no está activo. Se han cargado los candidatos mockeados simulando perfiles en vivo para verificar la completitud y el ruteo estático del portal.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Candidatos Autorizados para Intermediación
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Perfiles inclusivos que cumplen con los requisitos de intermediación municipal de Providencia.
              </p>
            </div>
            {/* Buscador */}
            <div className="relative max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-4.5 h-4.5" />
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
                Ningún currículum ciego validado coincide con los filtros o competencias buscadas en este momento.
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
      </main>

      <Footer />
    </div>
  );
}
