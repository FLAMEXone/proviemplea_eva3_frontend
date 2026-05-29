import { EyeOff, Accessibility, Zap } from "lucide-react";

export default function About() {
  const pillars = [
    {
      icon: <EyeOff className="h-6 w-6 text-blue-600" />,
      title: "Currículum Ciego",
      description:
        "Ocultamos datos sociodemográficos sensibles (nombres, género, edad, dirección) para evitar sesgos inconscientes en el reclutamiento.",
    },
    {
      icon: <Accessibility className="h-6 w-6 text-blue-600" />,
      title: "Inclusión y Diversidad",
      description:
        "Damos soporte al cumplimiento de la Ley 21.015, destacando habilidades y aptitudes de forma equitativa e inclusiva.",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Búsqueda Inversa Ágil",
      description:
        "Son las empresas quienes buscan a los talentos. Menos burocracia, vinculaciones rápidas y procesos fluidos.",
    },
  ];

  return (
    <section id="nosotros" className="w-full py-20 sm:py-28 bg-slate-50 text-slate-800 border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex self-start items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold tracking-wide text-blue-700 uppercase">
              🛡️ Selección Sin Sesgos
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Un paso adelante en la equidad laboral municipal.
            </h2>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              El Departamento de Empleo de la Municipalidad de Providencia promueve un mercado laboral inclusivo y transparente. A través de <strong>ProviEmplea</strong>, modernizamos el flujo tradicional eliminando planillas Excel manuales y correos de intermediación tediosos.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              Las empresas acceden a una vitrina digital de candidatos calificados donde la única información expuesta es el mérito y el perfil técnico. Así, aceleramos las contrataciones y reducimos significativamente la pérdida de talento local.
            </p>
          </div>

          {/* Pillars List */}
          <div className="flex flex-col gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-100/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 shadow-sm border border-blue-100/50">
                  {pillar.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
