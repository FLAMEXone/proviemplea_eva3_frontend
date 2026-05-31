"use client";

import * as React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getEmpresas, crearEmpresa } from "@/lib/infrastructure/api";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";
import { ETipoEmpresa } from "@/lib/domain/enums/empresa.enum";
import { validarRutChileno } from "@/lib/utils";
import EmpresaForm from "@/components/empresas/EmpresaForm";
import EmpresaHeader from "@/components/empresas/EmpresaHeader";

export default function RegistroEmpresaPage() {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);
  const [isDemoMode, setIsDemoMode] = React.useState(false);

  // Estados del Formulario
  const [formData, setFormData] = React.useState({
    nombre_empresa: "",
    rut_empresa: "",
    email: "",
    rubro: "Tecnología",
    tipo_empresa: ETipoEmpresa.CONTRATACION_DIRECTA,
    contacto_nombre: "",
    contacto_email: "",
    contacto_telefono: "",
    presentacion: "",
    bot_trap: "" // Honeypot
  });

  // Feedback del Formulario
  const [submitting, setSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string[]>>({});

  // Estados para validación reactiva en vivo
  const [liveErrors, setLiveErrors] = React.useState({
    nombre_empresa: "",
    rut_empresa: "",
    email: "",
    contacto_nombre: "",
    contacto_email: ""
  });
  const [touched, setTouched] = React.useState({
    nombre_empresa: false,
    rut_empresa: false,
    email: false,
    contacto_nombre: false,
    contacto_email: false
  });

  // Hook de validación reactiva en tiempo real (en vivo)
  React.useEffect(() => {
    const newErrors = {
      nombre_empresa: "",
      rut_empresa: "",
      email: "",
      contacto_nombre: "",
      contacto_email: ""
    };

    if (touched.nombre_empresa && !formData.nombre_empresa.trim()) {
      newErrors.nombre_empresa = "El nombre de la empresa es obligatorio.";
    }

    if (touched.rut_empresa) {
      if (!formData.rut_empresa.trim()) {
        newErrors.rut_empresa = "El RUT es obligatorio.";
      } else if (!validarRutChileno(formData.rut_empresa)) {
        newErrors.rut_empresa = "El RUT no es válido. Escríbelo sin puntos, con guion y dígito verificador (ej: 76123456-1).";
      }
    }

    if (touched.email) {
      if (!formData.email.trim()) {
        newErrors.email = "El correo de la empresa es obligatorio.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "El correo no tiene un formato válido.";
      }
    }

    if (touched.contacto_nombre && !formData.contacto_nombre.trim()) {
      newErrors.contacto_nombre = "El nombre del representante es obligatorio.";
    }

    if (touched.contacto_email) {
      if (!formData.contacto_email.trim()) {
        newErrors.contacto_email = "El correo del representante es obligatorio.";
      } else if (!/\S+@\S+\.\S+/.test(formData.contacto_email)) {
        newErrors.contacto_email = "El correo del representante no es válido.";
      }
    }

    setLiveErrors(newErrors);
  }, [formData, touched]);

  // Carga de Tema
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

    // Verificar si la API está viva
    async function checkApiConnection() {
      try {
        await getEmpresas();
      } catch (err) {
        console.warn("Laravel API offline, activando Modo Demostración en formulario:", err);
        setIsDemoMode(true);
      }
    }
    checkApiConnection();
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
    
    // Marcar reactivamente como tocado para validaciones en vivo
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Limpiar errores del submit correspondientes a este input
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

  // Envío del Formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationErrors({});

    // Forzar touched en todos los campos al presionar enviar
    setTouched({
      nombre_empresa: true,
      rut_empresa: true,
      email: true,
      contacto_nombre: true,
      contacto_email: true
    });

    // 1. Honeypot check
    if (formData.bot_trap) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitSuccess(true);
        setSubmitting(false);
      }, 1000);
      return;
    }

    // 2. Validación de RUT
    if (!validarRutChileno(formData.rut_empresa)) {
      setErrorMessage("El RUT ingresado no es válido. Escríbelo sin puntos, con guion y dígito verificador (ej: 76123456-1).");
      return;
    }

    setSubmitting(true);

    if (isDemoMode) {
      // Simular guardado reactivo en Modo Demostración
      setTimeout(async () => {
        const { MOCK_EMPRESAS } = await import("@/lib/infrastructure/mocks/empresa.mock");
        const nuevaEmpresaMock: IEmpresa = {
          id: `emp-mock-${Date.now()}`,
          nombre_empresa: formData.nombre_empresa,
          rut_empresa: formData.rut_empresa,
          email: formData.email,
          rubro: formData.rubro,
          tipo_empresa: formData.tipo_empresa,
          contacto_nombre: formData.contacto_nombre,
          contacto_email: formData.contacto_email,
          contacto_telefono: formData.contacto_telefono || null,
          presentacion: formData.presentacion || null,
          activo: true,
          validado: true // Autovalidado para propósitos de simulación
        };

        // Agregar al mock local en memoria
        MOCK_EMPRESAS.unshift(nuevaEmpresaMock);
        setSubmitSuccess(true);
        setSubmitting(false);

        // Limpiar formulario
        setFormData({
          nombre_empresa: "",
          rut_empresa: "",
          email: "",
          rubro: "Tecnología",
          tipo_empresa: ETipoEmpresa.CONTRATACION_DIRECTA,
          contacto_nombre: "",
          contacto_email: "",
          contacto_telefono: "",
          presentacion: "",
          bot_trap: ""
        });
      }, 1500);
      return;
    }

    try {
      const payload: Partial<IEmpresa> = {
        nombre_empresa: formData.nombre_empresa,
        rut_empresa: formData.rut_empresa,
        email: formData.email,
        rubro: formData.rubro,
        tipo_empresa: formData.tipo_empresa,
        contacto_nombre: formData.contacto_nombre,
        contacto_email: formData.contacto_email,
        contacto_telefono: formData.contacto_telefono || undefined,
        presentacion: formData.presentacion || undefined,
      };

      await crearEmpresa(payload as any);
      setSubmitSuccess(true);

      // Limpiar Formulario
      setFormData({
        nombre_empresa: "",
        rut_empresa: "",
        email: "",
        rubro: "Tecnología",
        tipo_empresa: ETipoEmpresa.CONTRATACION_DIRECTA,
        contacto_nombre: "",
        contacto_email: "",
        contacto_telefono: "",
        presentacion: "",
        bot_trap: ""
      });
    } catch (err: any) {
      console.error("Error al registrar empresa:", err);
      if (err.status === 422 && err.errors) {
        setValidationErrors(err.errors);
        setErrorMessage("Errores de validación en los datos. El RUT o el Correo Corporativo ya pueden estar en uso por otra empresa.");
      } else {
        setErrorMessage(err.message || "Ocurrió un error inesperado al registrar el convenio corporativo.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Encabezado Municipal */}
      <EmpresaHeader />

      {/* Banner de Modo Demostración */}
      {isDemoMode && (
        <div className="max-w-3xl mx-auto px-4 mt-6 w-full">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/30 flex gap-3 items-start animate-in fade-in slide-in-from-top-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                Modo Demostración Activo (Servidor Offline)
              </h4>
              <p className="text-amber-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                El backend municipal no está activo. Se simulará el registro y firma de convenio localmente de manera exitosa para que aparezca en el directorio de convenios vigentes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-10 w-full">
        {/* Usamos el formulario modular EmpresaForm */}
        <div className="w-full">
          <EmpresaForm
            formData={formData}
            handleChange={handleChange}
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
