"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

export default function EmpresaHeader() {
  return (
    <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a la Vitrina de Talentos
          </Link>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-bold tracking-wide text-blue-700 dark:text-blue-400 uppercase">
          <Building2 className="w-3.5 h-3.5" />
          Convenios de Empleo de Providencia
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-4xl mt-3 tracking-tight">
          Portal Corporativo y Empresas Aliadas
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-3xl text-xs md:text-sm leading-relaxed">
          Explora las organizaciones con convenios activos de intermediación laboral o registra tu empresa para comenzar a solicitar reclutamiento inclusivo mediante nuestro formato de CV Ciego.
        </p>
      </div>
    </section>
  );
}
