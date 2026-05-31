"use client";

import * as React from "react";
import { Building, Building2, AlertCircle, AlertTriangle, Send, MessageSquare } from "lucide-react";

import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";
import { CustomButton } from "@/components/custom/CustomButton";

interface ContactoFormProps {
  empresas: IEmpresa[];
  selectedEmpresa: string;
  setSelectedEmpresa: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
  botTrap: string;
  setBotTrap: (val: string) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  errorMessage: string | null;
  setErrorMessage: (val: string | null) => void;
  validationErrors: Record<string, string[]>;
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  liveErrors: {
    selectedEmpresa: string;
    notes: string;
  };
  setTouched: React.Dispatch<React.SetStateAction<{
    selectedEmpresa: boolean;
    notes: boolean;
  }>>;
  isDuplicated: boolean;
}

export default function ContactoForm({
  empresas,
  selectedEmpresa,
  setSelectedEmpresa,
  notes,
  setNotes,
  botTrap,
  setBotTrap,
  submitting,
  handleSubmit,
  errorMessage,
  setErrorMessage,
  validationErrors,
  setValidationErrors,
  liveErrors,
  setTouched,
  isDuplicated
}: ContactoFormProps) {
  return (
    <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Formulario de Intermediación
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Ingresa los datos para solicitar la vinculación a través del equipo de empleo de Providencia.
        </p>
      </div>

      {/* Alertas de error del servidor */}
      {errorMessage && (
        <div className={`mb-6 p-4 rounded-2xl border flex gap-3 items-start ${
          isDuplicated 
            ? "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-300"
            : "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-300"
        } animate-in fade-in duration-200`}>
          {isDuplicated ? (
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
          )}
          <div className="text-xs leading-relaxed">
            <span className="font-bold block mb-0.5">
              {isDuplicated ? "Proceso en Curso Detectado" : "Error en Solicitud"}
            </span>
            {errorMessage}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="absolute hidden overflow-hidden w-0 h-0 opacity-0" aria-hidden="true">
          <label htmlFor="bot_trap">No completar este campo</label>
          <input
            type="text"
            id="bot_trap"
            name="bot_trap"
            value={botTrap}
            onChange={(e) => setBotTrap(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Selector de Empresas */}
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Empresa Solicitante <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              <Building2 className="w-4 h-4" />
            </div>
            <select
              required
              value={selectedEmpresa}
              onChange={(e) => {
                setSelectedEmpresa(e.target.value);
                setTouched(prev => ({ ...prev, selectedEmpresa: true }));
                if (validationErrors.empresa_id) {
                  setValidationErrors(prev => {
                    const next = { ...prev };
                    delete next.empresa_id;
                    return next;
                  });
                }
              }}
              onBlur={() => setTouched(prev => ({ ...prev, selectedEmpresa: true }))}
              className="block w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option value="" disabled>Selecciona una empresa registrada...</option>
              {empresas.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre_empresa} ({emp.rut_empresa})
                </option>
              ))}
            </select>
          </div>
          {liveErrors.selectedEmpresa && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1.5 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {liveErrors.selectedEmpresa}
            </p>
          )}
          {validationErrors.empresa_id && (
            <p className="text-[11px] text-red-500 mt-1.5 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {validationErrors.empresa_id[0]}
            </p>
          )}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
            Solo se despliegan empresas activas con convenio de empleo vigente en Providencia.
          </p>
        </div>

        {/* Notas y justificación */}
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Notas de Intermediación / Justificación del Cargo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3.5 left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              required
              rows={5}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setTouched(prev => ({ ...prev, notes: true }));
                if (validationErrors.notas_admin) {
                  setValidationErrors(prev => {
                    const next = { ...prev };
                    delete next.notas_admin;
                    return next;
                  });
                }
                if (errorMessage) {
                  setErrorMessage(null);
                }
              }}
              onBlur={() => setTouched(prev => ({ ...prev, notes: true }))}
              placeholder="Describe el perfil requerido para la vacante, condiciones del puesto (renta, turnos) y los motivos por los cuales el perfil anonimizado encaja en tu requerimiento profesional..."
              className="block w-full pl-10 pr-4 py-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-y min-h-[120px]"
            />
          </div>
          {liveErrors.notes && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-1.5 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {liveErrors.notes}
            </p>
          )}
          {validationErrors.notas_admin && (
            <p className="text-[11px] text-red-500 mt-1.5 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              {validationErrors.notas_admin[0]}
            </p>
          )}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
            Por favor, detalla lo más posible. Esto facilitará al equipo de psicología y terapeutas ocupacionales de Providencia la intermediación. Mínimo 10 caracteres.
          </p>
        </div>

        <CustomButton
          type="submit"
          theme="blue"
          size="default"
          isLoading={submitting}
          rightIcon={<Send className="w-3.5 h-3.5" />}
          className="w-full py-3.5"
        >
          {submitting ? "Procesando con Servidores Municipales..." : "Enviar Solicitud de Intermediación"}
        </CustomButton>
      </form>
    </div>
  );
}
