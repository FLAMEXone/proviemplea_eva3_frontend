"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { CustomBadge } from "@/components/custom/CustomBadge";

export default function ContactoHeader() {
  return (
    <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <CustomBadge 
          color="blue" 
          size="md" 
          text="Bolsa de Empleo Municipal de Providencia" 
          icon={<Sparkles className="w-3.5 h-3.5" />} 
          className="uppercase tracking-wide"
        />
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-4xl mt-3 tracking-tight">
          Intermediación Laboral Inclusiva
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl text-xs md:text-sm leading-relaxed">
          Formulario seguro de vinculación corporativa. Registra tu postulación confidencial directamente con la oficina de empleo de la Comuna de Providencia.
        </p>
      </div>
    </section>
  );
}
