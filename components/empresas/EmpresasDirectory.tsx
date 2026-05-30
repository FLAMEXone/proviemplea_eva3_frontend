"use client";

import * as React from "react";
import { Building, Building2, Search, ShieldCheck, User, Mail } from "lucide-react";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";

interface EmpresasDirectoryProps {
  empresas: IEmpresa[];
}

export default function EmpresasDirectory({ empresas }: EmpresasDirectoryProps) {
  const [localQuery, setLocalQuery] = React.useState("");

  const filtered = React.useMemo(() => {
    return empresas.filter(emp => 
      emp.nombre_empresa.toLowerCase().includes(localQuery.toLowerCase()) ||
      emp.rubro?.toLowerCase().includes(localQuery.toLowerCase()) ||
      emp.rut_empresa.toLowerCase().includes(localQuery.toLowerCase())
    );
  }, [empresas, localQuery]);

  return (
    <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
            <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Directorio de Convenios Activos
          </h4>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            Empresas validadas para intermediación en Providencia.
          </p>
        </div>
        {/* Buscador Local */}
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            placeholder="Buscar empresa o rubro..."
            className="block w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl text-center">
          <Building2 className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
          <p className="text-[10px] text-slate-500">No se encontraron convenios</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-1">
          {filtered.map((emp) => (
            <div 
              key={emp.id}
              className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/55 rounded-2xl p-4 shadow-none hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100/50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 text-xs font-black shrink-0">
                  {emp.nombre_empresa.substring(0, 2).toUpperCase()}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                  Activa
                </span>
              </div>

              <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2.5 leading-tight">
                {emp.nombre_empresa}
              </h5>
              <p className="font-mono text-[9px] text-slate-400 mt-0.5">RUT: {emp.rut_empresa}</p>

              <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-900 grid grid-cols-2 gap-2 text-[9px] text-slate-500 dark:text-slate-400">
                <div>
                  <span className="block font-semibold text-slate-400 dark:text-slate-500">Rubro</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{emp.rubro || "General"}</span>
                </div>
                <div>
                  <span className="block font-semibold text-slate-400 dark:text-slate-500">Alianza</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300 capitalize text-[8px]">{emp.tipo_empresa.replace("-", " ")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
