"use client";

import * as React from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, PlusCircle, AlertCircle, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import { EModalidad, ENivelEducacional, ETipoJornada } from "@/lib/domain/enums/personas.enum";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CustomButton } from "@/components/custom/CustomButton";
import { talentoSchema, type TalentoFormValues } from "@/lib/schemas/talento.schema";
import { FormField, FormSelect, FormTextarea } from "@/components/custom/FormField";

interface RegistroTalentoFormProps {
  onSubmit: (data: TalentoFormValues) => Promise<void>;
  submitting: boolean;
  submitSuccess: boolean;
  setSubmitSuccess: (val: boolean) => void;
  serverError: string | null;
}

export default function RegistroTalentoForm({
  onSubmit,
  submitting,
  submitSuccess,
  setSubmitSuccess,
  serverError,
}: RegistroTalentoFormProps) {
  const methods = useForm<TalentoFormValues>({
    resolver: zodResolver(talentoSchema),
    defaultValues: {
      email: "",
      telefono: "",
      titulo_carrera: "",
      nivel_educacional: ENivelEducacional.UNIVERSITARIA,
      anio_egreso: "",
      anios_experiencia: "",
      areas_experiencia: "",
      competencias: "",
      rango_renta: "",
      tipo_jornada: ETipoJornada.COMPLETA,
      modalidad: EModalidad.REMOTO,
      cursos: "",
      idiomas: "",
      portafolio_url: "",
      resumen: "",
      persona_discapacidad: false,
      bot_trap: "",
    },
  });

  const handleSubmit = methods.handleSubmit(async (data) => {
    if (data.bot_trap) {
      await new Promise((r) => setTimeout(r, 1000));
      setSubmitSuccess(true);
      return;
    }
    await onSubmit(data);
    methods.reset();
  });

  if (submitSuccess) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="text-center py-8 animate-in scale-in duration-200">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">¡Perfil Registrado con Éxito!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
            Tu currículum ciego ya figura de forma activa en la vitrina del Portal de Empresas para coordinar intermediaciones laborales.
          </p>
          <CustomButton
            theme="blue"
            size="sm"
            className="mt-6"
            onClick={() => setSubmitSuccess(false)}
          >
            Inscribir otro perfil de Talento
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
          <Sparkles className="w-5 h-5 text-blue-600" />
          Formulario de Currículum Ciego
        </h3>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Completa los datos de tu experiencia profesional. Los campos sensibles personales no serán visibles para las empresas.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-300 flex gap-2.5 items-start text-xs leading-relaxed animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <span className="font-bold block">Error al registrar talento:</span>
            {serverError}
          </div>
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
          <div className="absolute hidden overflow-hidden w-0 h-0 opacity-0" aria-hidden="true">
            <input type="text" {...methods.register("bot_trap")} tabIndex={-1} autoComplete="off" />
          </div>

          {/* Datos de contacto confidenciales */}
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 space-y-4">
            <div className="flex gap-2.5 items-start text-amber-800 dark:text-amber-400">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider">
                  Información de Contacto Confidencial (Obligatorio para Intermediación)
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Estos datos son necesarios para que los gestores de Providencia puedan contactarte. <strong>Jamás se mostrarán en la vitrina pública</strong>.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField name="email" label="Correo Electrónico" required type="email" placeholder="Ej: postulante@correo.cl" />
              <FormField name="telefono" label="Teléfono de Contacto" placeholder="Ej: +56912345678" />
            </div>
          </div>

          {/* Datos académicos y de experiencia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField name="titulo_carrera" label="Título Profesional / Carrera" required placeholder="Ej: Desarrollador Backend" />
            <FormField name="anios_experiencia" label="Años de Experiencia" required type="number" min="0" placeholder="Ej: 3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormSelect name="nivel_educacional" label="Nivel Educacional" required>
              <option value={ENivelEducacional.BASICA}>Enseñanza Básica</option>
              <option value={ENivelEducacional.MEDIA}>Enseñanza Media</option>
              <option value={ENivelEducacional.TECNICA}>Educación Técnica</option>
              <option value={ENivelEducacional.UNIVERSITARIA}>Educación Universitaria</option>
              <option value={ENivelEducacional.POSTGRADO}>Postgrado (Mg/PhD)</option>
            </FormSelect>
            <FormField name="anio_egreso" label="Año de Egreso / Graduación" type="number" min="1950" max="2026" placeholder="Ej: 2024" />
          </div>

          {/* Condiciones laborales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField name="rango_renta" label="Pretensión de Renta" placeholder="Ej: $1.200.000 - $1.400.000 CLP" />
            <FormSelect name="tipo_jornada" label="Tipo de Jornada" required>
              <option value={ETipoJornada.COMPLETA}>Completa (44 hrs/s)</option>
              <option value={ETipoJornada.PART_TIME}>Part Time</option>
              <option value={ETipoJornada.POR_HORAS}>Por Horas / Freelance</option>
              <option value={ETipoJornada.FLEXIBLE}>Flexible</option>
            </FormSelect>
          </div>

          <FormSelect name="modalidad" label="Modalidad de Trabajo" required>
            <option value={EModalidad.REMOTO}>Remoto</option>
            <option value={EModalidad.PRESENCIAL}>Presencial</option>
            <option value={EModalidad.HIBRIDO}>Híbrido</option>
          </FormSelect>

          <FormField
            name="competencias"
            label="Competencias Destacadas"
            required
            placeholder="Ej: React, Laravel, Docker, APIs REST (separadas por comas)"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField name="areas_experiencia" label="Áreas de Experiencia" placeholder="Ej: Desarrollo Backend, Cloud (separadas por comas)" />
            <FormField name="portafolio_url" label="Portafolio o Web Personal" type="url" placeholder="Ej: https://github.com/miusuario" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField name="cursos" label="Cursos / Certificaciones" placeholder="Ej: AWS Certified, Scrum Master (separados por comas)" />
            <FormField name="idiomas" label="Idiomas" placeholder="Ej: Español Nativo, Inglés C1 (separados por comas)" />
          </div>

          <FormTextarea
            name="resumen"
            label="Resumen del Currículum Ciego"
            required
            rows={4}
            placeholder="Describe tu trayectoria técnica, fortalezas profesionales y experiencia destacada de forma anónima, sin incluir tu nombre real ni datos de contacto..."
          />

          {/* Checkbox inclusión Ley 21.015 */}
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-start gap-3 select-none">
            <Controller
              name="persona_discapacidad"
              control={methods.control}
              render={({ field }) => (
                <Checkbox
                  id="persona_discapacidad"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                  className="mt-0.5 border-slate-300 text-blue-600 focus-visible:ring-blue-500/20 cursor-pointer"
                />
              )}
            />
            <Label htmlFor="persona_discapacidad" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-normal cursor-pointer flex flex-col gap-0.5">
              <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold uppercase tracking-wider text-[10px]">
                <HeartHandshake className="w-3.5 h-3.5" />
                Aplicar a la Ley de Inclusión Laboral 21.015
              </span>
              Poseo credencial de discapacidad vigente o pensión de invalidez, y solicito intermediación asistida de Providencia.
            </Label>
          </div>

          <CustomButton
            type="submit"
            theme="blue"
            size="sm"
            isLoading={submitting}
            rightIcon={<PlusCircle className="w-3.5 h-3.5" />}
            className="w-full"
          >
            {submitting ? "Inscribiendo Perfil en Providencia..." : "Inscribir Perfil Inclusivo"}
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
}
