"use client";

import * as React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Loader2, 
  Search,
  Info,
  Sparkles,
  Database
} from "lucide-react";
import { getEmpresas, crearEmpresa, getTalentos } from "@/lib/infrastructure/api";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";
import { IPersona } from "@/lib/domain/interfaces/persona.interface";
import { ETipoEmpresa } from "@/lib/domain/enums/empresa.enum";
import { validarRutChileno } from "@/lib/utils";

// Componentes modulares
import EmpresaHeader from "@/components/empresas/EmpresaHeader";
import EmpresaForm from "@/components/empresas/EmpresaForm";
import EmpresasDirectory from "@/components/empresas/EmpresasDirectory";
import { TalentCard } from "@/components/TalentCard";

function isTalentoCompleto(talento: IPersona): boolean {
  const email = talento.email?.trim();
  const telefono = talento.telefono?.trim();
  const resumen = talento.resumen?.trim();
  const nivel = talento.nivel_educacional;
  const titulo = talento.titulo_carrera?.trim();
  const anio = talento.anio_egreso;
  const aniosExp = talento.anios_experiencia;
  const renta = talento.rango_renta?.trim();
  const jornada = talento.tipo_jornada;
  const modalidad = talento.modalidad;
  const portafolio = talento.portafolio_url?.trim();

  // Competencias (array o string no vacío)
  const comps = Array.isArray(talento.competencias)
    ? talento.competencias.length > 0
    : !!(talento.competencias as any)?.trim();

  // Áreas (array o string no vacío)
  const areas = Array.isArray(talento.areas_experiencia)
    ? talento.areas_experiencia.length > 0
    : !!(talento.areas_experiencia as any)?.trim();

  // Cursos (array o string no vacío)
  const cursos = Array.isArray(talento.cursos)
    ? talento.cursos.length > 0
    : !!(talento.cursos as any)?.trim();

  // Idiomas (array o string no vacío)
  const idiomas = Array.isArray(talento.idiomas)
    ? talento.idiomas.length > 0
    : !!(talento.idiomas as any)?.trim();

  return !!(
    email &&
    telefono &&
    resumen &&
    nivel &&
    titulo &&
    anio !== null && anio !== undefined &&
    aniosExp !== null && aniosExp !== undefined &&
    renta &&
    jornada &&
    modalidad &&
    portafolio &&
    comps &&
    areas &&
    cursos &&
    idiomas
  );
}

export default function EmpresasPage() {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);

  // Estados de datos
  const [empresas, setEmpresas] = React.useState<IEmpresa[]>([]);
  const [talentos, setTalentos] = React.useState<IPersona[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isDemoMode, setIsDemoMode] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

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

  // Carga inicial de datos (Empresas y Talentos)
  React.useEffect(() => {
    async function loadData() {
      try {
        const [fetchedEmpresas, fetchedTalentos] = await Promise.all([
          getEmpresas(),
          getTalentos()
        ]);
        setEmpresas(fetchedEmpresas);
        setTalentos(fetchedTalentos);
      } catch (err) {
        console.warn("Laravel API offline, activando Modo Demostración:", err);
        setIsDemoMode(true);
        
        const { MOCK_EMPRESAS } = await import("@/lib/infrastructure/mocks/empresa.mock");
        const { MOCK_TALENTOS } = await import("@/lib/infrastructure/mocks/personas.mock");
        setEmpresas(MOCK_EMPRESAS);
        setTalentos(MOCK_TALENTOS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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
      setTimeout(() => {
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

        // Agregar al estado local dinámicamente en el front
        setEmpresas(prev => [nuevaEmpresaMock, ...prev]);
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

      const creada = await crearEmpresa(payload as any);
      
      // Añadir la nueva empresa a la lista visible
      setEmpresas(prev => [creada, ...prev]);
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

  // Filtrado de talentos por búsqueda reactiva
  const filteredTalentos = talentos.map(tal => ({
    ...tal,
    validado: isDemoMode ? isTalentoCompleto(tal) : !!tal.validado
  })).filter(tal => 
    tal.titulo_carrera?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tal.codigo_talento.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (Array.isArray(tal.competencias) && tal.competencias.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))) ||
    (typeof tal.competencias === "string" && tal.competencias.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Encabezado */}
      <EmpresaHeader />

      {/* Alerta de Modo Demostración */}
      {isDemoMode && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 w-full">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/30 flex gap-3 items-start animate-in fade-in slide-in-from-top-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                Modo Demostración Activo
              </h4>
              <p className="text-amber-700 dark:text-slate-300 mt-0.5 leading-relaxed">
                No detectamos conexión activa con el servidor de Laravel. En este modo puedes buscar candidatos mockeados y completar el formulario de convenio; el sistema simulará el guardado de forma interactiva.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Principal */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Columna Vitrina Corporativa de Talentos (7 columnas) */}
        <div id="talentos" className="lg:col-span-7 space-y-6 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 tracking-tight">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Vitrina Corporativa de Talentos
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Currículums Ciegos autorizados para intermediación laboral.
              </p>
            </div>
            {/* Buscador */}
            <div className="relative max-w-xs w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por rubro, código o competencias..."
                className="block w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
              <p className="text-xs font-medium text-slate-500">Recuperando catálogo de candidatos...</p>
            </div>
          ) : filteredTalentos.length === 0 ? (
            <div className="p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center space-y-3">
              <Database className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-950 dark:text-slate-50">No se encontraron perfiles</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Ningún currículum ciego validado coincide con los filtros o competencias buscadas en este momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTalentos.map((tal) => (
                <TalentCard key={tal.id} {...tal} />
              ))}
            </div>
          )}
        </div>

        {/* Columna Formulario de Registro y Directorio (5 columnas) */}
        <div className="lg:col-span-5 space-y-6">
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
          
          <EmpresasDirectory empresas={empresas} />
        </div>

      </main>

      <Footer />
    </div>
  );
}
