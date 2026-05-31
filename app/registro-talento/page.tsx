"use client";

import * as React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Info } from "lucide-react";
import { crearTalento } from "@/lib/infrastructure/api";
import { IPersona } from "@/lib/domain/interfaces/persona.interface";
import { EModalidad, ENivelEducacional, ETipoJornada } from "@/lib/domain/enums/personas.enum";

// Componentes modulares
import RegistroTalentoHeader from "@/components/talentos/RegistroTalentoHeader";
import RegistroTalentoForm from "@/components/talentos/RegistroTalentoForm";

export default function RegistroTalentoPage() {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);
  const [isDemoMode, setIsDemoMode] = React.useState(false);

  // Estados del Formulario
  const [formData, setFormData] = React.useState({
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
    bot_trap: "" // Honeypot
  });

  // Feedback del Formulario
  const [submitting, setSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string[]>>({});

  // Estados para validación reactiva en vivo
  const [liveErrors, setLiveErrors] = React.useState({
    email: "",
    telefono: "",
    titulo_carrera: "",
    anio_egreso: "",
    anios_experiencia: "",
    areas_experiencia: "",
    competencias: "",
    cursos: "",
    idiomas: "",
    portafolio_url: "",
    resumen: ""
  });
  const [touched, setTouched] = React.useState({
    email: false,
    telefono: false,
    titulo_carrera: false,
    anio_egreso: false,
    anios_experiencia: false,
    areas_experiencia: false,
    competencias: false,
    cursos: false,
    idiomas: false,
    portafolio_url: false,
    resumen: false
  });

  // Hook de validación reactiva en tiempo real (en vivo)
  React.useEffect(() => {
    const newErrors = {
      email: "",
      telefono: "",
      titulo_carrera: "",
      anio_egreso: "",
      anios_experiencia: "",
      areas_experiencia: "",
      competencias: "",
      cursos: "",
      idiomas: "",
      portafolio_url: "",
      resumen: ""
    };

    if (touched.email) {
      if (!formData.email.trim()) {
        newErrors.email = "El correo electrónico es obligatorio para contactarte.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Ingresa un correo electrónico válido.";
      }
    }

    if (touched.telefono && formData.telefono.trim()) {
      if (!/^\+?[0-9\s-]{7,15}$/.test(formData.telefono.trim())) {
        newErrors.telefono = "Ingresa un formato de teléfono válido (Ej: +56912345678).";
      }
    }

    if (touched.anio_egreso && formData.anio_egreso.trim()) {
      const anio = Number(formData.anio_egreso);
      if (isNaN(anio) || anio < 1950 || anio > 2026) {
        newErrors.anio_egreso = "Ingresa un año de egreso válido entre 1950 y 2026.";
      }
    }

    if (touched.titulo_carrera && !formData.titulo_carrera.trim()) {
      newErrors.titulo_carrera = "El título profesional o carrera es obligatorio.";
    }

    if (touched.anios_experiencia) {
      if (!formData.anios_experiencia.trim()) {
        newErrors.anios_experiencia = "Los años de experiencia son requeridos.";
      } else if (isNaN(Number(formData.anios_experiencia)) || Number(formData.anios_experiencia) < 0) {
        newErrors.anios_experiencia = "Ingresa una cantidad de años válida (mínimo 0).";
      }
    }

    if (touched.competencias && !formData.competencias.trim()) {
      newErrors.competencias = "Ingresa al menos una competencia clave.";
    }

    if (touched.portafolio_url && formData.portafolio_url.trim()) {
      // Intentar validar URL amigablemente
      const trimmedUrl = formData.portafolio_url.trim();
      const hasProtocol = /^https?:\/\//i.test(trimmedUrl);
      const urlToTest = hasProtocol ? trimmedUrl : `http://${trimmedUrl}`;
      try {
        new URL(urlToTest);
      } catch (_) {
        newErrors.portafolio_url = "Ingresa un enlace o sitio web válido (Ej: https://github.com/usuario).";
      }
    }

    if (touched.resumen) {
      if (!formData.resumen.trim()) {
        newErrors.resumen = "El resumen del CV ciego es obligatorio.";
      } else if (formData.resumen.trim().length < 15) {
        newErrors.resumen = `El resumen debe contener al menos 15 caracteres (actual: ${formData.resumen.trim().length}).`;
      }
    }

    setLiveErrors(newErrors);
  }, [formData, touched]);

  // Carga de Tema y detección de red
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Ping rápido o detección silenciosa de conexión
    fetch("http://localhost:8080/api/health", { method: "GET" })
      .then(res => {
        if (!res.ok) setIsDemoMode(true);
      })
      .catch(() => {
        setIsDemoMode(true);
      });
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Manejo de Inputs del Formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Marcar como touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Limpiar errores
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }

    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Envío de Datos a la API de Laravel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationErrors({});

    // Forzar touched en todos los campos al presionar enviar
    setTouched({
      email: true,
      telefono: true,
      titulo_carrera: true,
      anio_egreso: true,
      anios_experiencia: true,
      areas_experiencia: true,
      competencias: true,
      cursos: true,
      idiomas: true,
      portafolio_url: true,
      resumen: true
    });

    // Validar formato de forma síncrona inmediata en el submit para evitar falsos envíos
    const emailStr = formData.email.trim();
    if (!emailStr) {
      setErrorMessage("El correo electrónico de contacto es obligatorio.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(emailStr)) {
      setErrorMessage("Por favor, ingresa un correo electrónico de contacto válido.");
      return;
    }
    if (formData.telefono.trim() && !/^\+?[0-9\s-]{7,15}$/.test(formData.telefono.trim())) {
      setErrorMessage("Por favor, ingresa un formato de teléfono de contacto válido (Ej: +56912345678).");
      return;
    }
    if (formData.anio_egreso.trim()) {
      const anio = Number(formData.anio_egreso);
      if (isNaN(anio) || anio < 1950 || anio > 2026) {
        setErrorMessage("Por favor, ingresa un año de egreso válido entre 1950 y 2026.");
        return;
      }
    }
    if (!formData.titulo_carrera.trim()) {
      setErrorMessage("El título profesional o carrera es obligatorio.");
      return;
    }
    if (!formData.anios_experiencia.trim() || isNaN(Number(formData.anios_experiencia)) || Number(formData.anios_experiencia) < 0) {
      setErrorMessage("Ingresa una cantidad de años de experiencia válida (mínimo 0).");
      return;
    }
    if (!formData.competencias.trim()) {
      setErrorMessage("Ingresa al menos una competencia clave.");
      return;
    }
    if (formData.portafolio_url.trim()) {
      const trimmedUrl = formData.portafolio_url.trim();
      const hasProtocol = /^https?:\/\//i.test(trimmedUrl);
      const urlToTest = hasProtocol ? trimmedUrl : `http://${trimmedUrl}`;
      try {
        new URL(urlToTest);
      } catch (_) {
        setErrorMessage("Por favor, ingresa un enlace o portafolio URL válido (Ej: https://github.com/usuario).");
        return;
      }
    }
    if (!formData.resumen.trim() || formData.resumen.trim().length < 15) {
      setErrorMessage("El resumen del currículum ciego debe contener al menos 15 caracteres.");
      return;
    }

    // 1. Honeypot check
    if (formData.bot_trap) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitSuccess(true);
        setSubmitting(false);
      }, 1000);
      return;
    }

    setSubmitting(true);

    // Parsear competencias separadas por coma
    const compArray = formData.competencias
      .split(",")
      .map(c => c.trim())
      .filter(Boolean);

    // Parsear áreas de experiencia separadas por coma
    const areasArray = formData.areas_experiencia
      .split(",")
      .map(a => a.trim())
      .filter(Boolean);

    // Parsear cursos separados por coma
    const cursosArray = formData.cursos
      .split(",")
      .map(c => c.trim())
      .filter(Boolean);

    // Parsear idiomas separados por coma
    const idiomasArray = formData.idiomas
      .split(",")
      .map(i => i.trim())
      .filter(Boolean);

    // Formatear url del portafolio amigablemente
    let finalPortafolioUrl: string | null = null;
    if (formData.portafolio_url.trim()) {
      const trimmedUrl = formData.portafolio_url.trim();
      const hasProtocol = /^https?:\/\//i.test(trimmedUrl);
      finalPortafolioUrl = hasProtocol ? trimmedUrl : `https://${trimmedUrl}`;
    }

    // Crear el payload alineado a la firma de IPersona en el backend (validado: true para aparecer de inmediato)
    const payload: Partial<IPersona> = {
      codigo_talento: `PROV-2026-T${(Math.random() * 900 + 100).toFixed(0)}`,
      email: emailStr,
      telefono: formData.telefono.trim() || null,
      titulo_carrera: formData.titulo_carrera.trim(),
      nivel_educacional: formData.nivel_educacional,
      anio_egreso: formData.anio_egreso.trim() ? Number(formData.anio_egreso) : null,
      anios_experiencia: Number(formData.anios_experiencia),
      areas_experiencia: areasArray.length > 0 ? areasArray : null,
      competencias: compArray,
      rango_renta: formData.rango_renta.trim(),
      tipo_jornada: formData.tipo_jornada,
      modalidad: formData.modalidad,
      cursos: cursosArray.length > 0 ? cursosArray : null,
      idiomas: idiomasArray.length > 0 ? idiomasArray : null,
      portafolio_url: finalPortafolioUrl,
      resumen: formData.resumen.trim(),
      persona_discapacidad: formData.persona_discapacidad,
      activo: true,
      validado: false // Registrado por defecto como pendiente de validación municipal
    };

    if (isDemoMode) {
      // Simular guardado reactivo en memoria local
      setTimeout(async () => {
        const { MOCK_TALENTOS } = await import("@/lib/infrastructure/mocks/personas.mock");
        MOCK_TALENTOS.unshift(payload as IPersona); // Inyectar al mock local en memoria
        
        setSubmitSuccess(true);
        setSubmitting(false);

        // Limpiar Formulario
        setFormData({
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
          bot_trap: ""
        });
        
        setTouched({
          email: false,
          telefono: false,
          titulo_carrera: false,
          anio_egreso: false,
          anios_experiencia: false,
          areas_experiencia: false,
          competencias: false,
          cursos: false,
          idiomas: false,
          portafolio_url: false,
          resumen: false
        });
      }, 1500);
      return;
    }

    try {
      await crearTalento(payload);
      setSubmitSuccess(true);
      
      // Limpiar Formulario
      setFormData({
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
        bot_trap: ""
      });

      setTouched({
        email: false,
        telefono: false,
        titulo_carrera: false,
        anio_egreso: false,
        anios_experiencia: false,
        areas_experiencia: false,
        competencias: false,
        cursos: false,
        idiomas: false,
        portafolio_url: false,
        resumen: false
      });
    } catch (err: any) {
      console.error("Error al registrar talento:", err);
      if (err.status === 422 && err.errors) {
        setValidationErrors(err.errors);
        setErrorMessage("Errores de validación en los datos ingresados.");
      } else {
        setErrorMessage(err.message || "Ocurrió un error inesperado al registrar tu postulación municipal.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Encabezado */}
      <RegistroTalentoHeader />

      {/* Alerta de Modo Demostración */}
      {isDemoMode && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 w-full">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/30 flex gap-3 items-start animate-in fade-in slide-in-from-top-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                Modo Demostración Activo (Servidor Offline)
              </h4>
              <p className="text-amber-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                El backend municipal no está activo. Se inyectará tu currículum ciego directamente a la vitrina simulada en memoria del Portal de Empresas para fines de pruebas locales de la plataforma.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Formulario de Registro */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <RegistroTalentoForm
          formData={formData}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSubmit={handleSubmit}
          submitting={submitting}
          submitSuccess={submitSuccess}
          setSubmitSuccess={setSubmitSuccess}
          errorMessage={errorMessage}
          validationErrors={validationErrors}
          liveErrors={liveErrors}
          touched={touched}
          setTouched={setTouched}
          setFormData={setFormData}
        />
      </main>

      <Footer />
    </div>
  );
}
