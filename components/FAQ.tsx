import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CustomBadge } from "@/components/custom/CustomBadge";
import { Lightbulb } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      id: "faq-1",
      question: "¿Qué es el modelo de búsqueda inversa de empleo?",
      answer:
        "Es un modelo disruptivo donde se invierte el flujo tradicional: en lugar de que los candidatos postulen a ofertas de empleo enviando currículums masivos, las empresas e instituciones empleadoras acreditadas son quienes buscan proactivamente a los talentos idóneos dentro de nuestra vitrina digital.",
    },
    {
      id: "faq-2",
      question: "¿Qué información oculta el Currículum Ciego (CV Ciego)?",
      answer:
        "Ocultamos toda información sociodemográfica que pueda inducir a sesgos inconscientes de contratación, como nombres completos, dirección física, comuna, edad, género, nacionalidad o fotografía. Solo se exponen competencias técnicas, años de experiencia laboral, nivel educacional, certificaciones e idiomas.",
    },
    {
      id: "faq-3",
      question: "¿Cómo se garantiza la validez de los perfiles y empresas?",
      answer:
        "El Departamento de Empleo de la Municipalidad de Providencia realiza un diagnóstico y verificación manual de cada empresa (revisando RUT tributario) y talento antes de habilitar su estado 'Validado'. Solo las entidades validadas pueden interactuar en la vitrina pública.",
    },
    {
      id: "faq-4",
      question: "¿Cómo se inicia la intermediación laboral?",
      answer:
        "Cuando una empresa validada encuentra un perfil de talento idóneo, presiona el botón 'Solicitar Intermediación'. El formulario pre-rellena el ID del talento y envía la solicitud a la administración municipal, quienes coordinan de forma segura la entrevista y vinculación final.",
    },
  ];

  return (
    <section id="faqs" className="w-full py-20 sm:py-28 bg-white text-slate-800 border-b border-slate-100 dark:bg-slate-950 dark:text-slate-200 dark:border-slate-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col gap-4 mb-12">
          <CustomBadge 
            color="blue" 
            size="md" 
            text="Dudas Frecuentes" 
            icon={<Lightbulb className="w-3.5 h-3.5" />}
            className="self-center uppercase tracking-wide"
          />
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Preguntas Frecuentes del Portal
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Resuelve tus dudas sobre el funcionamiento de la búsqueda inversa, la privacidad del currículum ciego y el flujo de intermediación municipal.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/80 rounded-2xl px-6 py-2 shadow-sm shadow-slate-100/50 dark:shadow-none hover:shadow-md transition-all duration-200"
            >
              <AccordionTrigger className="text-left font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:no-underline text-base sm:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
