"use client";

import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, PlusCircle, AlertCircle, User } from "lucide-react";
import { ETipoEmpresa } from "@/lib/domain/enums/empresa.enum";
import { empresaSchema, type EmpresaFormValues } from "@/lib/schemas/empresa.schema";
import { FormField, FormSelect, FormTextarea } from "@/components/custom/FormField";
import { CustomButton } from "@/components/custom/CustomButton";

interface EmpresaFormProps {
  onSubmit: (data: EmpresaFormValues) => Promise<void>;
  submitting: boolean;
  submitSuccess: boolean;
  setSubmitSuccess: (v: boolean) => void;
  serverError: string | null;
}

export default function EmpresaForm({
  onSubmit,
  submitting,
  submitSuccess,
  setSubmitSuccess,
  serverError,
}: EmpresaFormProps) {
  const methods = useForm<EmpresaFormValues>({
    resolver: zodResolver(empresaSchema),
    mode: "onTouched",
    defaultValues: {
      nombre_empresa: "",
      rut_empresa: "",
      email: "",
      rubro: "Tecnología",
      tipo_empresa: ETipoEmpresa.CONTRATACION_DIRECTA,
      contacto_nombre: "",
      contacto_email: "",
      contacto_telefono: "",
      presentacion: "",
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
      <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="text-center py-6 animate-in scale-in duration-200">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">¡Solicitud Registrada!</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            El convenio se ha ingresado de manera exitosa en el sistema municipal de Providencia. La empresa ya figura en la nómina para intermediaciones laborales.
          </p>
          <CustomButton
            theme="blue"
            size="sm"
            className="mt-6 w-full"
            onClick={() => setSubmitSuccess(false)}
          >
            Registrar otra empresa
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
          <PlusCircle className="w-5 h-5 text-blue-600" />
          Solicitar Convenio Municipal
        </h3>
        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
          Inscribe a tu empresa para integrarla con la base de datos de currículums ciegos aprobados.
        </p>
      </div>

      {serverError && (
        <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-300 flex gap-2.5 items-start text-xs leading-relaxed animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
          <div>
            <span className="font-bold block">Error al procesar:</span>
            {serverError}
          </div>
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="absolute hidden overflow-hidden w-0 h-0 opacity-0" aria-hidden="true">
            <input type="text" {...methods.register("bot_trap")} tabIndex={-1} autoComplete="off" />
          </div>

          <FormField name="nombre_empresa" label="Nombre Empresa" required placeholder="Ej: Inversiones Providencia Ltda" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField name="rut_empresa" label="RUT Empresa" required placeholder="76123456-1" />
            <FormField name="email" label="Email Empresa" required type="email" placeholder="info@empresa.cl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormSelect name="rubro" label="Rubro" required>
              <option value="Tecnología">Tecnología</option>
              <option value="Construcción">Construcción</option>
              <option value="Comercio">Comercio</option>
              <option value="Salud">Salud</option>
              <option value="Gastronomía">Gastronomía</option>
              <option value="Transporte">Transporte</option>
              <option value="Finanzas">Finanzas</option>
            </FormSelect>
            <FormSelect name="tipo_empresa" label="Tipo de Alianza" required>
              <option value="contratacion-directa">Contratación Directa</option>
              <option value="est">EST (Serv. Transitorios)</option>
              <option value="outsourcing">Outsourcing</option>
            </FormSelect>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-600" />
              Datos del Representante
            </h4>

            <div className="space-y-3">
              <FormField name="contacto_nombre" label="Nombre Contacto" required placeholder="Nombre completo" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField name="contacto_email" label="Email Contacto" required type="email" placeholder="contacto@empresa.cl" />
                <FormField name="contacto_telefono" label="Teléfono Contacto" placeholder="+56 9 1234 5678" />
              </div>
            </div>
          </div>

          <FormTextarea
            name="presentacion"
            label="Presentación Corporativa"
            rows={3}
            placeholder="Breve reseña sobre la cultura de la empresa, beneficios y focos de contratación..."
          />

          <CustomButton
            type="submit"
            theme="blue"
            size="sm"
            isLoading={submitting}
            rightIcon={<PlusCircle className="w-3.5 h-3.5" />}
            className="w-full"
          >
            {submitting ? "Registrando Convenio..." : "Registrar Convenio Corporativo"}
          </CustomButton>
        </form>
      </FormProvider>
    </div>
  );
}
