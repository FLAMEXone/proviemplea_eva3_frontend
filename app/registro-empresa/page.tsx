"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { getEmpresas, crearEmpresa } from "@/lib/infrastructure/api";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";
import { type EmpresaFormValues } from "@/lib/schemas/empresa.schema";
import EmpresaForm from "@/components/empresas/EmpresaForm";
import EmpresaHeader from "@/components/empresas/EmpresaHeader";

export default function RegistroEmpresaPage() {
  const [isDemoMode, setIsDemoMode] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function checkApiConnection() {
      try {
        await getEmpresas();
      } catch {
        console.warn("Laravel API offline, activando Modo Demostración en formulario.");
        setIsDemoMode(true);
      }
    }
    checkApiConnection();
  }, []);

  const handleSubmit = async (data: EmpresaFormValues) => {
    setServerError(null);
    setSubmitting(true);

    try {
      if (isDemoMode) {
        const { MOCK_EMPRESAS } = await import("@/lib/infrastructure/mocks/empresa.mock");
        const nuevaEmpresaMock: IEmpresa = {
          id: `emp-mock-${Date.now()}`,
          nombre_empresa: data.nombre_empresa,
          rut_empresa: data.rut_empresa,
          email: data.email,
          rubro: data.rubro,
          tipo_empresa: data.tipo_empresa,
          contacto_nombre: data.contacto_nombre,
          contacto_email: data.contacto_email,
          contacto_telefono: data.contacto_telefono || null,
          presentacion: data.presentacion || null,
          activo: true,
          validado: true,
        };
        await new Promise((r) => setTimeout(r, 1500));
        MOCK_EMPRESAS.unshift(nuevaEmpresaMock);
        setSubmitSuccess(true);
        return;
      }

      await crearEmpresa({
        nombre_empresa: data.nombre_empresa,
        rut_empresa: data.rut_empresa,
        email: data.email,
        rubro: data.rubro,
        tipo_empresa: data.tipo_empresa,
        contacto_nombre: data.contacto_nombre,
        contacto_email: data.contacto_email,
        contacto_telefono: data.contacto_telefono || undefined,
        presentacion: data.presentacion || undefined,
      } as any);
      setSubmitSuccess(true);
    } catch (err: any) {
      console.error("Error al registrar empresa:", err);
      if (err.status === 422) {
        setServerError("Errores de validación. El RUT o el correo corporativo ya pueden estar en uso por otra empresa.");
      } else {
        setServerError(err.message || "Ocurrió un error inesperado al registrar el convenio corporativo.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <EmpresaHeader />

      {isDemoMode && (
        <div className="max-w-3xl mx-auto px-4 mt-6 w-full">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/30 flex gap-3 items-start animate-in fade-in slide-in-from-top-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                Modo Demostración Activo (Servidor Offline)
              </h4>
              <p className="text-amber-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                El backend municipal no está activo. Se simulará el registro y firma de convenio localmente.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow max-w-3xl mx-auto px-4 py-10 w-full">
        <EmpresaForm
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
