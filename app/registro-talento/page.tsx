"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { crearTalento } from "@/lib/infrastructure/api";
import { IPersona } from "@/lib/domain/interfaces/persona.interface";
import { type TalentoFormValues } from "@/lib/schemas/talento.schema";

import RegistroTalentoHeader from "@/components/talentos/RegistroTalentoHeader";
import RegistroTalentoForm from "@/components/talentos/RegistroTalentoForm";

export default function RegistroTalentoPage() {
  const [isDemoMode, setIsDemoMode] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/health", { method: "GET" })
      .then((res) => { if (!res.ok) setIsDemoMode(true); })
      .catch(() => setIsDemoMode(true));
  }, []);

  const handleSubmit = async (data: TalentoFormValues) => {
    setServerError(null);
    setSubmitting(true);

    const splitByComma = (val?: string) =>
      val ? val.split(",").map((s) => s.trim()).filter(Boolean) : null;

    const parseFinalUrl = (url?: string) => {
      if (!url?.trim()) return null;
      const trimmed = url.trim();
      return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    };

    try {
      if (isDemoMode) {
        const { MOCK_TALENTOS } = await import("@/lib/infrastructure/mocks/personas.mock");
        const mockPayload: IPersona = {
          id: `tal-mock-${Date.now()}`,
          codigo_talento: `PROV-2026-T${(Math.random() * 900 + 100).toFixed(0)}`,
          email: data.email,
          telefono: data.telefono?.trim() || null,
          titulo_carrera: data.titulo_carrera,
          nivel_educacional: data.nivel_educacional,
          anio_egreso: data.anio_egreso ? Number(data.anio_egreso) : null,
          anios_experiencia: Number(data.anios_experiencia),
          areas_experiencia: splitByComma(data.areas_experiencia),
          competencias: splitByComma(data.competencias) ?? [],
          rango_renta: data.rango_renta?.trim() ?? "",
          tipo_jornada: data.tipo_jornada,
          modalidad: data.modalidad,
          cursos: splitByComma(data.cursos),
          idiomas: splitByComma(data.idiomas),
          portafolio_url: parseFinalUrl(data.portafolio_url),
          resumen: data.resumen,
          persona_discapacidad: data.persona_discapacidad,
          activo: true,
          validado: false,
        };
        await new Promise((r) => setTimeout(r, 1500));
        MOCK_TALENTOS.unshift(mockPayload);
        setSubmitSuccess(true);
        return;
      }

      const payload: Partial<IPersona> = {
        codigo_talento: `PROV-2026-T${(Math.random() * 900 + 100).toFixed(0)}`,
        email: data.email,
        telefono: data.telefono?.trim() || null,
        titulo_carrera: data.titulo_carrera,
        nivel_educacional: data.nivel_educacional,
        anio_egreso: data.anio_egreso ? Number(data.anio_egreso) : null,
        anios_experiencia: Number(data.anios_experiencia),
        areas_experiencia: splitByComma(data.areas_experiencia),
        competencias: splitByComma(data.competencias) ?? [],
        rango_renta: data.rango_renta?.trim() ?? "",
        tipo_jornada: data.tipo_jornada,
        modalidad: data.modalidad,
        cursos: splitByComma(data.cursos),
        idiomas: splitByComma(data.idiomas),
        portafolio_url: parseFinalUrl(data.portafolio_url),
        resumen: data.resumen,
        persona_discapacidad: data.persona_discapacidad,
        activo: true,
        validado: false,
      };

      await crearTalento(payload);
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error("Error al registrar talento:", err);
      if (err.status === 422 && err.errors) {
        setServerError("Errores de validación en los datos ingresados.");
      } else {
        setServerError(err.message || "Ocurrió un error inesperado al registrar tu postulación municipal.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <RegistroTalentoHeader />

      {isDemoMode && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 w-full">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/30 flex gap-3 items-start animate-in fade-in slide-in-from-top-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                Modo Demostración Activo (Servidor Offline)
              </h4>
              <p className="text-amber-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                El backend municipal no está activo. Se inyectará tu currículum ciego directamente a la vitrina simulada en memoria del Portal de Empresas.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <RegistroTalentoForm
          onSubmit={handleSubmit}
          submitting={submitting}
          submitSuccess={submitSuccess}
          setSubmitSuccess={setSubmitSuccess}
          serverError={serverError}
        />
      </div>
    </>
  );
}