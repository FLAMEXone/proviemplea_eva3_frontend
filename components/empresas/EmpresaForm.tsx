"use client";

import * as React from "react";
import { CheckCircle2, PlusCircle, AlertCircle, Loader2, User } from "lucide-react";
import { ETipoEmpresa } from "@/lib/domain/enums/empresa.enum";

interface EmpresaFormProps {
  formData: {
    nombre_empresa: string;
    rut_empresa: string;
    email: string;
    rubro: string;
    tipo_empresa: ETipoEmpresa;
    contacto_nombre: string;
    contacto_email: string;
    contacto_telefono: string;
    presentacion: string;
    bot_trap: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  submitSuccess: boolean;
  setSubmitSuccess: (success: boolean) => void;
  errorMessage: string | null;
  validationErrors: Record<string, string[]>;
  liveErrors: {
    nombre_empresa: string;
    rut_empresa: string;
    email: string;
    contacto_nombre: string;
    contacto_email: string;
  };
  touched: {
    nombre_empresa: boolean;
    rut_empresa: boolean;
    email: boolean;
    contacto_nombre: boolean;
    contacto_email: boolean;
  };
  setTouched: React.Dispatch<React.SetStateAction<{
    nombre_empresa: boolean;
    rut_empresa: boolean;
    email: boolean;
    contacto_nombre: boolean;
    contacto_email: boolean;
  }>>;
  setFormData: React.Dispatch<React.SetStateAction<{
    nombre_empresa: string;
    rut_empresa: string;
    email: string;
    rubro: string;
    tipo_empresa: ETipoEmpresa;
    contacto_nombre: string;
    contacto_email: string;
    contacto_telefono: string;
    presentacion: string;
    bot_trap: string;
  }>>;
}

export default function EmpresaForm({
  formData,
  handleChange,
  handleSubmit,
  submitting,
  submitSuccess,
  setSubmitSuccess,
  errorMessage,
  validationErrors,
  liveErrors,
  touched,
  setTouched,
  setFormData
}: EmpresaFormProps) {
  return (
    <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
      {submitSuccess ? (
        /* Pantalla de Éxito */
        <div className="text-center py-6 animate-in scale-in duration-200">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            ¡Solicitud Registrada!
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            El convenio se ha ingresado de manera exitosa en el sistema municipal de Providencia. La empresa ya figura en la nómina para intermediaciones laborales.
          </p>
          
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors shadow-md"
          >
            Registrar otra empresa
          </button>
        </div>
      ) : (
        /* Formulario */
        <div>
          <div className="mb-5">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              Solicitar Convenio Municipal
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Inscribe a tu empresa para integrarla con la base de datos de currículums ciegos aprobados en Providencia.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-300 flex gap-2.5 items-start text-xs leading-relaxed animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <span className="font-bold block">Error al procesar:</span>
                {errorMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="absolute hidden overflow-hidden w-0 h-0 opacity-0" aria-hidden="true">
              <label htmlFor="bot_trap">No completar este campo</label>
              <input
                type="text"
                id="bot_trap"
                name="bot_trap"
                value={formData.bot_trap}
                onChange={(e) => setFormData(prev => ({ ...prev, bot_trap: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Nombre Empresa <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="nombre_empresa"
                value={formData.nombre_empresa}
                onChange={handleChange}
                onBlur={() => setTouched(prev => ({ ...prev, nombre_empresa: true }))}
                placeholder="Ej: Inversiones Providencia Ltda"
                className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {liveErrors.nombre_empresa && (
                <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {liveErrors.nombre_empresa}
                </p>
              )}
              {validationErrors.nombre_empresa && (
                <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.nombre_empresa[0]}</p>
              )}
            </div>

            {/* RUT y Correo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  RUT Empresa <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="rut_empresa"
                  value={formData.rut_empresa}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, rut_empresa: true }))}
                  placeholder="76123456-1"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.rut_empresa && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {liveErrors.rut_empresa}
                  </p>
                )}
                {validationErrors.rut_empresa && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.rut_empresa[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Email Empresa <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                  placeholder="info@empresa.cl"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.email && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {liveErrors.email}
                  </p>
                )}
                {validationErrors.email && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.email[0]}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Rubro <span className="text-red-500">*</span>
                </label>
                <select
                  name="rubro"
                  value={formData.rubro}
                  onChange={handleChange}
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="Tecnología">Tecnología</option>
                  <option value="Construcción">Construcción</option>
                  <option value="Comercio">Comercio</option>
                  <option value="Salud">Salud</option>
                  <option value="Gastronomía">Gastronomía</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Finanzas">Finanzas</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Tipo de Alianza <span className="text-red-500">*</span>
                </label>
                <select
                  name="tipo_empresa"
                  value={formData.tipo_empresa}
                  onChange={handleChange}
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="contratacion-directa">Contratación Directa</option>
                  <option value="est">EST (Serv. Transitorios)</option>
                  <option value="outsourcing">Outsourcing</option>
                </select>
              </div>
            </div>

            {/* Seccion del Representante */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                Datos del Representante
              </h4>
              
              {/* Nombre Representante */}
              <div className="mb-3">
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Nombre Contacto <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="contacto_nombre"
                  value={formData.contacto_nombre}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, contacto_nombre: true }))}
                  placeholder="Nombre completo"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.contacto_nombre && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {liveErrors.contacto_nombre}
                  </p>
                )}
                {validationErrors.contacto_nombre && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.contacto_nombre[0]}</p>
                )}
              </div>

              {/* Email y Telefono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Email Contacto <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="contacto_email"
                    value={formData.contacto_email}
                    onChange={handleChange}
                    onBlur={() => setTouched(prev => ({ ...prev, contacto_email: true }))}
                    placeholder="contacto@empresa.cl"
                    className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  {liveErrors.contacto_email && (
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {liveErrors.contacto_email}
                    </p>
                  )}
                  {validationErrors.contacto_email && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.contacto_email[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Teléfono Contacto
                  </label>
                  <input
                    type="text"
                    name="contacto_telefono"
                    value={formData.contacto_telefono}
                    onChange={handleChange}
                    placeholder="+56 9 1234 5678"
                    className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  {validationErrors.contacto_telefono && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold">{validationErrors.contacto_telefono[0]}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Presentación Corporativa
              </label>
              <textarea
                rows={3}
                name="presentacion"
                value={formData.presentacion}
                onChange={handleChange}
                placeholder="Breve reseña sobre la cultura de la empresa, beneficios y focos de contratación..."
                className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              />
              {validationErrors.presentacion && (
                <p className="text-[10px] text-red-500 mt-1 font-semibold">{validationErrors.presentacion[0]}</p>
              )}
            </div>

            {/* Botón de Enviar */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registrando Convenio...
                </>
              ) : (
                <>
                  Registrar Convenio Corporativo
                  <PlusCircle className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
