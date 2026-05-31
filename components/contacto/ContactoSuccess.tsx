"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { IPersona } from "@/lib/domain/interfaces/persona.interface";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";

interface ContactoSuccessProps {
  talento: IPersona;
  empresas: IEmpresa[];
  selectedEmpresa: string;
}

export default function ContactoSuccess({ talento, empresas, selectedEmpresa }: ContactoSuccessProps) {
  const codigoProceso = React.useMemo(() => {
    return `PROV-INT-${(Math.random() * 100000).toFixed(0)}`;
  }, []);

  const nombreEmpresa = React.useMemo(() => {
    return empresas.find(e => e.id === selectedEmpresa)?.nombre_empresa || "Empresa Registrada";
  }, [empresas, selectedEmpresa]);

  const fechaRegistro = React.useMemo(() => {
    return new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 md:p-12 text-center shadow-xl animate-in scale-in duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
      <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400 shadow-inner">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">
        ¡Intermediación Solicitada!
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto leading-relaxed">
        La solicitud de contacto para el talento <strong className="font-mono text-primary bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded-lg text-sm">{talento.codigo_talento}</strong> se ha registrado con éxito en los servidores de la Municipalidad de Providencia.
      </p>

      <div className="my-8 p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-left max-w-md mx-auto space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 dark:text-slate-500 uppercase font-semibold">Código Proceso:</span>
          <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
            {codigoProceso}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 dark:text-slate-500 uppercase font-semibold">Empresa Solicitante:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {nombreEmpresa}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 dark:text-slate-500 uppercase font-semibold">Fecha Registro:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {fechaRegistro}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 dark:text-slate-500 uppercase font-semibold">Estado Inicial:</span>
          <span className="inline-flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400 uppercase">
            Pendiente
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mx-auto mb-8">
        El departamento de Empleo y Capacitación de la Municipalidad de Providencia revisará los antecedentes y se pondrá en contacto con el reclutador para coordinar la entrevista.
      </p>

      <Link
        href="/#talentos"
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-md"
      >
        Volver a la Vitrina de Talentos
      </Link>
    </div>
  );
}
