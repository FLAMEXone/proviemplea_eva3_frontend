"use client";

import * as React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { IPersona } from "@/lib/domain/interfaces/persona.interface";
import { CustomBadge } from "@/components/custom/CustomBadge";

interface CandidatoConfidencialCardProps {
  talento: IPersona;
}

export default function CandidatoConfidencialCard({ talento }: CandidatoConfidencialCardProps) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-3xl dark:bg-slate-900 dark:border-slate-800/80 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500" />
        
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-mono text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500">
            CANDIDATO CONFIDENCIAL
          </span>
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
          {talento.titulo_carrera || "Perfil Profesional"}
        </h3>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <CustomBadge 
            color="primary" 
            size="md" 
            text={talento.codigo_talento} 
            className="font-mono uppercase"
          />
          {talento.persona_discapacidad && (
            <CustomBadge 
              color="indigo" 
              size="sm" 
              text="Ley Inclusión 21.015" 
            />
          )}
        </div>

        <div className="mt-6 border-t border-slate-200/80 dark:border-slate-800/80 pt-6 space-y-4 text-xs">
          <div>
            <h4 className="font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
              Experiencia Profesional
            </h4>
            <p className="text-slate-700 dark:text-slate-300 font-semibold mt-1">
              {talento.anios_experiencia} {talento.anios_experiencia === 1 ? "año" : "años"} en el rubro
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
              Nivel de Estudios
            </h4>
            <p className="text-slate-700 dark:text-slate-300 font-semibold mt-1 capitalize">
              {talento.nivel_educacional || "No especificado"}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-400 uppercase tracking-wider dark:text-slate-500">
              Modalidad y Jornada
            </h4>
            <p className="text-slate-700 dark:text-slate-300 font-semibold mt-1 capitalize">
              {talento.modalidad || "No especificada"} • {talento.tipo_jornada || "No especificada"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl dark:bg-blue-950/10 dark:border-blue-900/20 text-xs text-blue-800 dark:text-blue-300 leading-relaxed flex gap-3">
        <Info className="w-5 h-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div className="space-y-1.5">
          <h5 className="font-bold">¿Cómo funciona el CV Ciego?</h5>
          <p>
            Por motivos de inclusión y contra la discriminación, los datos personales del candidato (nombre, RUT, correo, dirección) se mantienen confidenciales.
          </p>
          <p>
            Al enviar la solicitud, el equipo municipal de intermediación de Providencia validará los requisitos de tu empresa y coordinará la vinculación.
          </p>
        </div>
      </div>
    </div>
  );
}
