"use client";

import * as React from "react";
import { 
  Loader2, 
  Search,
  Database
} from "lucide-react";
import { getEmpresas } from "@/lib/infrastructure/api";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";
import EmpresaCard from "@/components/empresas/EmpresaCard";
import { CustomBadge } from "@/components/custom/CustomBadge";

export default function EmpresasPage() {
  const [empresas, setEmpresas] = React.useState<IEmpresa[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Carga inicial de datos
  React.useEffect(() => {
    async function loadData() {
      try {
        const fetchedEmpresas = await getEmpresas();
        setEmpresas(fetchedEmpresas);
      } catch {
        const { MOCK_EMPRESAS } = await import("@/lib/infrastructure/mocks/empresa.mock");
        setEmpresas(MOCK_EMPRESAS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtrado de empresas por búsqueda reactiva
  const filteredEmpresas = empresas.filter(emp => 
    emp.nombre_empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (emp.rubro?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    emp.rut_empresa.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="relative overflow-hidden bg-slate-900 text-white py-12 dark:bg-black/40">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-600/30 opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <CustomBadge 
            color="glass-emerald" 
            size="md" 
            text="Convenios Vigentes" 
            className="uppercase tracking-wider mb-4"
          />
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Directorio de Empresas Aliadas
          </h1>
          <p className="mt-3 text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Conoce a las organizaciones con convenio activo. Estas corporaciones impulsan la inclusión social y participan de la vitrina de reclutamiento sin sesgos.
          </p>
        </div>
      </div>


      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                Alianzas Corporativas de Providencia
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Nómina de empresas que participan activamente en los procesos de intermediación inclusiva.
              </p>
            </div>
            <div className="relative max-w-sm w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-4.5 h-4.5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, rubro o RUT..."
                className="block w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
              <p className="text-xs font-medium text-slate-500">Recuperando nómina de empresas...</p>
            </div>
          ) : filteredEmpresas.length === 0 ? (
            <div className="p-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-3">
              <Database className="w-10 h-10 text-slate-400 mx-auto animate-bounce" />
              <h3 className="font-bold text-slate-950 dark:text-slate-50">No se encontraron convenios</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Ninguna empresa con convenio municipal coincide con la búsqueda en este momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmpresas.map((emp) => (
                <EmpresaCard key={emp.id} empresa={emp} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

