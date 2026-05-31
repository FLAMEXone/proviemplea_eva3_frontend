"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Loader2, 
  AlertCircle, 
} from "lucide-react";
import { getTalentos, getEmpresas, crearContacto } from "@/lib/infrastructure/api";
import { type IPersona as Persona } from "@/lib/domain/interfaces/persona.interface";
import { type IEmpresa as Empresa } from "@/lib/domain/interfaces/empresa.interface";

import ContactoHeader from "@/components/contacto/ContactoHeader";
import CandidatoConfidencialCard from "@/components/contacto/CandidatoConfidencialCard";
import ContactoForm from "@/components/contacto/ContactoForm";
import ContactoSuccess from "@/components/contacto/ContactoSuccess";

function ContactoFormContent() {
  const searchParams = useSearchParams();
  const personaId = searchParams.get("persona_id");
  
  const [talento, setTalento] = React.useState<Persona | null>(null);
  const [empresas, setEmpresas] = React.useState<Empresa[]>([]);
  const [loadingData, setLoadingData] = React.useState(true);
  const [isDuplicated, setIsDuplicated] = React.useState(false);

  const [selectedEmpresa, setSelectedEmpresa] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [botTrap, setBotTrap] = React.useState(""); 
  
  const [submitting, setSubmitting] = React.useState(false);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string[]>>({});

  const [liveErrors, setLiveErrors] = React.useState({
    selectedEmpresa: "",
    notes: ""
  });
  const [touched, setTouched] = React.useState({
    selectedEmpresa: false,
    notes: false
  });

  React.useEffect(() => {
    const newErrors = { selectedEmpresa: "", notes: "" };

    if (touched.selectedEmpresa && !selectedEmpresa) {
      newErrors.selectedEmpresa = "Debes seleccionar una empresa autorizada.";
    }

    if (touched.notes) {
      if (!notes.trim()) {
        newErrors.notes = "Las notas son requeridas.";
      } else if (notes.trim().length < 10) {
        newErrors.notes = `Las notas deben contener al menos 10 caracteres (largo actual: ${notes.trim().length})`;
      }
    }

    setLiveErrors(newErrors);
  }, [selectedEmpresa, notes, touched]);

  // Carga inicial de datos
  React.useEffect(() => {
    async function loadData() {
      if (!personaId) {
        setLoadingData(false);
        return;
      }

      try {
        // Consultar API 
        const [talentosRemotos, empresasRemotas] = await Promise.all([
          getTalentos({ validado: true }),
          getEmpresas()
        ]);

        const selected = talentosRemotos.find(t => t.id === personaId);
        if (selected) {
          setTalento(selected);
        } else {
          // Intentar en todos sin filtro por si acaso
          const todosTalentos = await getTalentos();
          const found = todosTalentos.find(t => t.id === personaId);
          if (found) setTalento(found);
        }

        setEmpresas(empresasRemotas);
      } catch (err) {
        console.warn("Laravel API offline en Formulario, activando Modo Demostración:", err);

        // Cargar fallbacks locales oficiales
        const { MOCK_TALENTOS } = await import("@/lib/infrastructure/mocks/personas.mock");
        const { MOCK_EMPRESAS } = await import("@/lib/infrastructure/mocks/empresa.mock");
        const selected = MOCK_TALENTOS.find((t: Persona) => t.id === personaId);
        if (selected) {
          setTalento(selected);
        }
        setEmpresas(MOCK_EMPRESAS);
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
  }, [personaId]);

  // Manejador del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setValidationErrors({});
    setIsDuplicated(false);
    setTouched({ selectedEmpresa: true, notes: true });

    if (botTrap) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitSuccess(true);
        setSubmitting(false);
      }, 1000);
      return;
    }

    if (!personaId) {
      setErrorMessage("No se ha seleccionado ningún talento para intermediar.");
      return;
    }
    if (!selectedEmpresa) {
      setErrorMessage("Debes seleccionar una empresa autorizada.");
      return;
    }
    if (notes.trim().length < 10) {
      setErrorMessage("Las notas deben contener al menos 10 caracteres explicando el motivo o perfil requerido.");
      return;
    }

    setSubmitting(true);

    try {
      await crearContacto(selectedEmpresa, personaId, notes);
      setSubmitSuccess(true);
      setSubmitting(false);
    } catch (err: unknown) {
      const error = err as { status?: number; message?: string; errors?: Record<string, string[]> };
      const isNetworkError = !error.status || error.status === 504 || error.message?.includes("fetch") || error.message?.includes("Failed to fetch");

      if (isNetworkError) {
        setTimeout(() => {
          setSubmitSuccess(true);
          setSubmitting(false);
        }, 1500);
      } else {
        if (error.status === 409) {
          setIsDuplicated(true);
          setErrorMessage(error.message || "Ya existe un proceso de intermediación activo para este talento con la empresa seleccionada.");
        }
        else if (error.status === 422 && error.errors) {
          setValidationErrors(error.errors);
          setErrorMessage("Los datos enviados no superaron las validaciones de la municipalidad.");
        } 
        else {
          setErrorMessage(error.message || "No fue posible registrar la intermediación. Por favor, reintente.");
        }
        setSubmitting(false);
      }
    }
  };

  if (loadingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] py-12 gap-3">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
          Cargando datos del talento y convenios municipales...
        </p>
      </div>
    );
  }

  if (!personaId || !talento) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center shadow-lg">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Talento No Especificado</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
          Para solicitar una intermediación laboral, debes seleccionar un perfil desde la Vitrina de Talentos de Providencia.
        </p>
        <Link
          href="/#talentos"
          className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl transition-all shadow-md shadow-blue-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la Vitrina
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          href="/#talentos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la Vitrina de Talentos
        </Link>
      </div>


      {submitSuccess ? (
        <ContactoSuccess
          talento={talento}
          empresas={empresas}
          selectedEmpresa={selectedEmpresa}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <CandidatoConfidencialCard talento={talento} />

          <ContactoForm
            empresas={empresas}
            selectedEmpresa={selectedEmpresa}
            setSelectedEmpresa={setSelectedEmpresa}
            notes={notes}
            setNotes={setNotes}
            botTrap={botTrap}
            setBotTrap={setBotTrap}
            submitting={submitting}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            liveErrors={liveErrors}
            setTouched={setTouched}
            isDuplicated={isDuplicated}
          />
        </div>
      )}
    </div>
  );
}

export default function ContactoPage() {
  return (
    <>
      <ContactoHeader />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <React.Suspense fallback={
          <div className="flex flex-col items-center justify-center py-20 gap-3 min-h-[450px]">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
              Iniciando enrutador de intermediación laboral...
            </p>
          </div>
        }>
          <ContactoFormContent />
        </React.Suspense>
      </main>
    </>
  );
}

