"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, UserPlus } from "lucide-react";
import { CustomBadge } from "@/components/custom/CustomBadge";

export default function RegistroTalentoHeader() {
  return (
    <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
        <CustomBadge 
          color="blue" 
          size="md" 
          text="Registro de Talentos de Providencia" 
          icon={<UserPlus className="w-3.5 h-3.5" />} 
          className="uppercase tracking-wide"
        />
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-4xl mt-3 tracking-tight">
          Inscribe tu Perfil en Formato de CV Ciego
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-3xl text-xs md:text-sm leading-relaxed">
          Ingresa tus competencias, experiencia y educación de forma anónima. Nuestro formato ciego protege tu identidad de sesgos discriminatorios visuales y sociodemográficos, garantizando una intermediación laboral inclusiva.
        </p>
      </div>
    </section>
  );
}
