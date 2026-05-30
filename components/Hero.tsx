import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white py-24 sm:py-32 overflow-hidden border-b border-slate-800"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex self-center sm:self-start items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase">
            🌟 Innovación Municipal
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Encuentra el talento ideal,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              sin sesgos ni discriminación.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
            ProviEmplea revoluciona el mercado laboral a través de la{" "}
            <strong>búsqueda inversa de empleo</strong>: los empleadores buscan activamente a los candidatos mediante un formato de <strong>CV Ciego</strong>, garantizando que el mérito, la experiencia y las competencias sean el único filtro de contratación.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start pt-4">
            <Link href="/registro-talento">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-8 py-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:scale-105 transition-all text-base duration-300">
                Inscribir Mi Perfil (Talentos)
              </Button>
            </Link>
            <Link href="/talentos">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-slate-700 bg-transparent hover:border-slate-500 text-slate-300 hover:text-white font-extrabold px-8 py-6 rounded-2xl hover:bg-slate-800/50 hover:scale-105 transition-all text-base duration-300"
              >
                Vitrina de Talentos (Empresas)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

