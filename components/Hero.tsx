import Link from "next/link";
import Image from "next/image";
import { CustomBadge } from "@/components/custom/CustomBadge";
import { CustomButton } from "@/components/custom/CustomButton";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full text-white py-14 sm:py-20 border-b border-slate-800"
    >
      {/* Capa de imagen de fondo — overflow-hidden solo aquí para que fill no se salga */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-bg.png"
          alt="Equipo diverso e inclusivo trabajando en Providencia"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-blue-950/75" />
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Contenido — sin overflow-hidden, libre en altura */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Badge */}
          <CustomBadge
            color="glass-blue"
            size="md"
            text="Innovación Municipal"
            className="self-center sm:self-start uppercase tracking-wider"
          />

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-md">
            Encuentra el talento ideal,{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              sin sesgos ni discriminación.
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl drop-shadow">
            ProviEmplea revoluciona el mercado laboral a través de la{" "}
            <strong>búsqueda inversa de empleo</strong>: los empleadores buscan
            activamente a los candidatos mediante un formato de{" "}
            <strong>CV Ciego</strong>, garantizando que el mérito, la experiencia
            y las competencias sean el único filtro de contratación.
          </p>

          {/* Actions */}
          <div className="flex flex-row flex-wrap gap-3 justify-center sm:justify-start pt-4">
            <Link href="/registro-talento">
              <CustomButton theme="blue" size="lg" className="w-auto">
                <span className="hidden sm:inline">Inscribir Mi Perfil</span>
                <span className="sm:hidden">Inscribir Perfil</span>
              </CustomButton>
            </Link>
            <Link href="/talentos">
              <CustomButton theme="outline" size="lg" className="w-auto">
                <span className="hidden sm:inline">Vitrina de Talentos</span>
                <span className="sm:hidden">Ver Vitrina</span>
              </CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
