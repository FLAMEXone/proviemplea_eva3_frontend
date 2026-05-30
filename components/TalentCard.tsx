"use client";

import * as React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Briefcase, GraduationCap, DollarSign, Clock, ShieldCheck, HeartHandshake, EyeOff, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface TalentCardProps {
  id: string;
  codigo_talento: string;
  resumen?: string | null;
  titulo_carrera?: string | null;
  nivel_educacional?: string | null;
  anios_experiencia: number;
  competencias?: string[] | string | null;
  rango_renta?: string | null;
  tipo_jornada?: string | null;
  modalidad?: string | null;
  validado: boolean;
  persona_discapacidad?: boolean;
}

export function TalentCard({
  id,
  codigo_talento,
  resumen,
  titulo_carrera,
  nivel_educacional,
  anios_experiencia,
  competencias,
  rango_renta,
  tipo_jornada,
  modalidad,
  validado,
  persona_discapacidad = false,
}: TalentCardProps) {
  // Parseo seguro de competencias (pueden venir como JSON string, array, o null)
  const parsedCompetencias = React.useMemo(() => {
    if (!competencias) return [];
    if (Array.isArray(competencias)) return competencias;
    try {
      const parsed = JSON.parse(competencias);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return String(competencias)
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
    }
  }, [competencias]);

  return (
    <Card className="relative overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:hover:border-primary/20">
      {/* Indicador superior de validación */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-teal-500 to-emerald-500" />

      <CardHeader className="pt-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            {/* Título: Código de Talento Anonimizado */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider text-slate-400 dark:text-slate-500">
                CÓDIGO DE TALENTO
              </span>
              <Badge variant="outline" className="font-mono text-xs text-primary bg-primary/10 border-primary/20 dark:text-primary dark:bg-primary/20 dark:border-primary/30">
                {codigo_talento}
              </Badge>
            </div>
            {/* Título Profesional / Rol */}
            <CardTitle className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {titulo_carrera || "Perfil Profesional Registrado"}
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 dark:text-slate-400">
              <GraduationCap className="w-3.5 h-3.5" />
              {nivel_educacional || "Nivel educativo no especificado"}
            </CardDescription>
          </div>

          {/* Badges de Estado */}
          <div className="flex flex-col gap-1.5 items-end">
            {validado ? (
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1 text-[10px] font-medium shadow-none hover:bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Validado
              </Badge>
            ) : (
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 gap-1 text-[10px] font-medium shadow-none hover:bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Pendiente
              </Badge>
            )}
            {persona_discapacidad && (
              <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 gap-1 text-[10px] font-medium shadow-none hover:bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50">
                <HeartHandshake className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Inclusión L.21015
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Resumen Profesional */}
        {resumen && (
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {resumen}
          </p>
        )}

        {/* Detalles clave */}
        <div className="grid grid-cols-2 gap-3 text-xs border-y border-slate-100 py-3 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Briefcase className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>
              <strong>Exp:</strong> {anios_experiencia} {anios_experiencia === 1 ? "año" : "años"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="capitalize">
              <strong>Jornada:</strong> {tipo_jornada || "No especificada"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <DollarSign className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>
              <strong>Pretensión:</strong> {rango_renta || "A convenir"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span className="capitalize">
              <strong>Modalidad:</strong> {modalidad || "No especificada"}
            </span>
          </div>
        </div>

        {/* Competencias */}
        {parsedCompetencias.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Competencias Destacadas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {parsedCompetencias.slice(0, 5).map((comp, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-normal dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                >
                  {comp}
                </Badge>
              ))}
              {parsedCompetencias.length > 5 && (
                <Badge variant="outline" className="text-slate-400 dark:text-slate-500 font-normal border-dashed">
                  +{parsedCompetencias.length - 5} más
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 pb-6 flex items-center justify-between border-t border-slate-50 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
          <EyeOff className="w-3.5 h-3.5" />
          <span>Datos de contacto ocultos</span>
        </div>
        <Link
          href={`/contacto?persona_id=${id}`}
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
            "font-medium gap-1.5 transition-all shadow-sm"
          )}
        >
          Solicitar Intermediación
          <Send className="w-3 h-3" />
        </Link>
      </CardFooter>
    </Card>
  );
}

// Icono MapPin local para evitar errores de importación si no existiera
function MapPin(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
