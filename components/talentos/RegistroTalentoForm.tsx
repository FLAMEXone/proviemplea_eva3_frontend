"use client";

import * as React from "react";
import { CheckCircle2, PlusCircle, AlertCircle, Loader2, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import { EModalidad, ENivelEducacional, ETipoJornada } from "@/lib/domain/enums/personas.enum";

interface RegistroTalentoFormProps {
  formData: {
    email: string;
    telefono: string;
    titulo_carrera: string;
    nivel_educacional: ENivelEducacional;
    anio_egreso: string;
    anios_experiencia: string;
    areas_experiencia: string;
    competencias: string;
    rango_renta: string;
    tipo_jornada: ETipoJornada;
    modalidad: EModalidad;
    cursos: string;
    idiomas: string;
    portafolio_url: string;
    resumen: string;
    persona_discapacidad: boolean;
    bot_trap: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  submitSuccess: boolean;
  setSubmitSuccess: (val: boolean) => void;
  errorMessage: string | null;
  validationErrors: Record<string, string[]>;
  liveErrors: {
    email: string;
    telefono: string;
    titulo_carrera: string;
    anio_egreso: string;
    anios_experiencia: string;
    areas_experiencia: string;
    competencias: string;
    cursos: string;
    idiomas: string;
    portafolio_url: string;
    resumen: string;
  };
  touched: {
    email: boolean;
    telefono: boolean;
    titulo_carrera: boolean;
    anio_egreso: boolean;
    anios_experiencia: boolean;
    areas_experiencia: boolean;
    competencias: boolean;
    cursos: boolean;
    idiomas: boolean;
    portafolio_url: boolean;
    resumen: boolean;
  };
  setTouched: React.Dispatch<React.SetStateAction<{
    email: boolean;
    telefono: boolean;
    titulo_carrera: boolean;
    anio_egreso: boolean;
    anios_experiencia: boolean;
    areas_experiencia: boolean;
    competencias: boolean;
    cursos: boolean;
    idiomas: boolean;
    portafolio_url: boolean;
    resumen: boolean;
  }>>;
  setFormData: React.Dispatch<React.SetStateAction<{
    email: string;
    telefono: string;
    titulo_carrera: string;
    nivel_educacional: ENivelEducacional;
    anio_egreso: string;
    anios_experiencia: string;
    areas_experiencia: string;
    competencias: string;
    rango_renta: string;
    tipo_jornada: ETipoJornada;
    modalidad: EModalidad;
    cursos: string;
    idiomas: string;
    portafolio_url: string;
    resumen: string;
    persona_discapacidad: boolean;
    bot_trap: string;
  }>>;
}

export default function RegistroTalentoForm({
  formData,
  handleChange,
  handleCheckboxChange,
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
}: RegistroTalentoFormProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
      {submitSuccess ? (
        /* Pantalla de Éxito */
        <div className="text-center py-8 animate-in scale-in duration-200">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            ¡Perfil Registrado con Éxito!
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
            Tu currículum ciego se ha inyectado a los sistemas municipales. Ya figura de forma activa y validada en la vitrina del Portal de Empresas para coordinar intermediaciones laborales.
          </p>
          
          <button
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition-colors shadow-md"
          >
            Inscribir otro perfil de Talento
          </button>
        </div>
      ) : (
        /* Formulario */
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Formulario de Currículum Ciego
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
              Completa los datos de tu experiencia profesional. Los campos sensibles personales no serán visibles para las empresas de Providencia.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-300 flex gap-2.5 items-start text-xs leading-relaxed animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <span className="font-bold block">Error al registrar talento:</span>
                {errorMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot Trap */}
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

            {/* Sección de Datos de Contacto Confidenciales */}
            <div className="p-4.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 space-y-4">
              <div className="flex gap-2.5 items-start text-amber-800 dark:text-amber-400">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider">
                    Información de Contacto Confidencial (Obligatorio para Intermediación)
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Estos datos son estrictamente necesarios para que los gestores de Providencia puedan contactarte y programar tus entrevistas. <strong>Jamás se mostrarán en la vitrina pública</strong> y las empresas no tendrán acceso directo a ellos.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Correo Electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    placeholder="Ej: postulante@correo.cl"
                    className="block w-full px-3.5 py-2.5 bg-white hover:bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  {liveErrors.email && (
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      {liveErrors.email}
                    </p>
                  )}
                  {validationErrors.email && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      {validationErrors.email[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Teléfono de Contacto <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    onBlur={() => setTouched(prev => ({ ...prev, telefono: true }))}
                    placeholder="Ej: +56912345678"
                    className="block w-full px-3.5 py-2.5 bg-white hover:bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  {liveErrors.telefono && (
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                      {liveErrors.telefono}
                    </p>
                  )}
                  {validationErrors.telefono && (
                    <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                      {validationErrors.telefono[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Fila Título de Carrera y Años de Experiencia */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Título Profesional / Carrera <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="titulo_carrera"
                  value={formData.titulo_carrera}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, titulo_carrera: true }))}
                  placeholder="Ej: Desarrollador Backend"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.titulo_carrera && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {liveErrors.titulo_carrera}
                  </p>
                )}
                {validationErrors.titulo_carrera && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.titulo_carrera[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Años de Experiencia <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  name="anios_experiencia"
                  min="0"
                  value={formData.anios_experiencia}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, anios_experiencia: true }))}
                  placeholder="Ej: 3"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.anios_experiencia && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {liveErrors.anios_experiencia}
                  </p>
                )}
                {validationErrors.anios_experiencia && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.anios_experiencia[0]}</p>
                )}
              </div>
            </div>

            {/* Fila Académica: Nivel Educacional y Año de Egreso */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Nivel Educacional <span className="text-red-500">*</span>
                </label>
                <select
                  name="nivel_educacional"
                  value={formData.nivel_educacional}
                  onChange={handleChange}
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value={ENivelEducacional.BASICA}>Enseñanza Básica</option>
                  <option value={ENivelEducacional.MEDIA}>Enseñanza Media</option>
                  <option value={ENivelEducacional.TECNICA}>Educación Técnica</option>
                  <option value={ENivelEducacional.UNIVERSITARIA}>Educación Universitaria</option>
                  <option value={ENivelEducacional.POSTGRADO}>Postgrado (Mg/Phd)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Año de Egreso / Graduación <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="number"
                  name="anio_egreso"
                  min="1950"
                  max="2026"
                  value={formData.anio_egreso}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, anio_egreso: true }))}
                  placeholder="Ej: 2024"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.anio_egreso && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {liveErrors.anio_egreso}
                  </p>
                )}
                {validationErrors.anio_egreso && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.anio_egreso[0]}</p>
                )}
              </div>
            </div>

            {/* Fila de Condiciones: Pretensión de Renta y Tipo de Jornada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Pretensión de Renta <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="rango_renta"
                  value={formData.rango_renta}
                  onChange={handleChange}
                  placeholder="Ej: $1.200.000 - $1.400.000 CLP"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {validationErrors.rango_renta && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold">{validationErrors.rango_renta[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Tipo de Jornada <span className="text-red-500">*</span>
                </label>
                <select
                  name="tipo_jornada"
                  value={formData.tipo_jornada}
                  onChange={handleChange}
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value={ETipoJornada.COMPLETA}>Completa (44 hrs/s)</option>
                  <option value={ETipoJornada.PART_TIME}>Part Time</option>
                  <option value={ETipoJornada.POR_HORAS}>Por Horas / Freelance</option>
                </select>
              </div>
            </div>

            {/* Fila de Modalidad: Modalidad de Trabajo */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Modalidad de Trabajo <span className="text-red-500">*</span>
                </label>
                <select
                  name="modalidad"
                  value={formData.modalidad}
                  onChange={handleChange}
                  className="block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value={EModalidad.REMOTO}>Remoto</option>
                  <option value={EModalidad.PRESENCIAL}>Presencial</option>
                  <option value={EModalidad.HIBRIDO}>Híbrido</option>
                </select>
              </div>
            </div>

            {/* Competencias Destacadas */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Competencias Destacadas <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="competencias"
                value={formData.competencias}
                onChange={handleChange}
                onBlur={() => setTouched(prev => ({ ...prev, competencias: true }))}
                placeholder="Ej: React, Laravel, Docker, APIs REST (separadas por comas)"
                className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
              {liveErrors.competencias && (
                <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  {liveErrors.competencias}
                </p>
              )}
              {validationErrors.competencias && (
                <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.competencias[0]}</p>
              )}
            </div>

            {/* Áreas de Experiencia y Portafolio URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Áreas de Experiencia <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  name="areas_experiencia"
                  value={formData.areas_experiencia}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, areas_experiencia: true }))}
                  placeholder="Ej: Desarrollo Backend, Cloud, Logística (separadas por comas)"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.areas_experiencia && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {liveErrors.areas_experiencia}
                  </p>
                )}
                {validationErrors.areas_experiencia && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.areas_experiencia[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Portafolio o Web Personal <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="url"
                  name="portafolio_url"
                  value={formData.portafolio_url}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, portafolio_url: true }))}
                  placeholder="Ej: https://github.com/miusuario"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.portafolio_url && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {liveErrors.portafolio_url}
                  </p>
                )}
                {validationErrors.portafolio_url && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.portafolio_url[0]}</p>
                )}
              </div>
            </div>

            {/* Cursos / Certificaciones e Idiomas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Cursos / Certificaciones <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  name="cursos"
                  value={formData.cursos}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, cursos: true }))}
                  placeholder="Ej: AWS Certified Cloud Practitioner, Scrum Master (separados por comas)"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.cursos && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {liveErrors.cursos}
                  </p>
                )}
                {validationErrors.cursos && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.cursos[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Idiomas <span className="text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  name="idiomas"
                  value={formData.idiomas}
                  onChange={handleChange}
                  onBlur={() => setTouched(prev => ({ ...prev, idiomas: true }))}
                  placeholder="Ej: Español Nativo, Inglés C1 (separados por comas)"
                  className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {liveErrors.idiomas && (
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    {liveErrors.idiomas}
                  </p>
                )}
                {validationErrors.idiomas && (
                  <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.idiomas[0]}</p>
                )}
              </div>
            </div>

            {/* Resumen Profesional */}
            <div>
              <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                Resumen del Currículum Ciego <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                name="resumen"
                value={formData.resumen}
                onChange={handleChange}
                onBlur={() => setTouched(prev => ({ ...prev, resumen: true }))}
                placeholder="Describe tu trayectoria técnica, fortalezas profesionales y experiencia destacada de forma anónima, sin incluir tu nombre real ni datos de contacto..."
                className="block w-full px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              />
              {liveErrors.resumen && (
                <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  {liveErrors.resumen}
                </p>
              )}
              {validationErrors.resumen && (
                <p className="text-[10px] text-red-500 mt-1 font-semibold flex items-center gap-1.5">{validationErrors.resumen[0]}</p>
              )}
            </div>

            {/* Checkbox de Inclusión Ley 21.015 */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl flex items-start gap-3 select-none">
              <input
                type="checkbox"
                id="persona_discapacidad"
                name="persona_discapacidad"
                checked={formData.persona_discapacidad}
                onChange={handleCheckboxChange}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
              />
              <label htmlFor="persona_discapacidad" className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-normal cursor-pointer flex flex-col gap-0.5">
                <span className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold uppercase tracking-wider text-[10px]">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Aplicar a la Ley de Inclusión Laboral 21.015
                </span>
                Poseo credencial de discapacidad vigente o pensión de invalidez, y solicito intermediación asistida de Providencia.
              </label>
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
                  Inscribiendo Perfil en Providencia...
                </>
              ) : (
                <>
                  Inscribir Perfil Inclusivo
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
