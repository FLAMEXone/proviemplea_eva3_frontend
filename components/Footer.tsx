import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Desc */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg shrink-0">
                <Image
                  src="/LOGO.jpg"
                  alt="Municipalidad de Providencia"
                  fill
                  className="object-cover scale-[1.7]"
                />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Provi<span className="text-blue-400">Emplea</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Plataforma de búsqueda inversa de empleo y CV Ciego de la Municipalidad de Providencia. Inclusión laboral, transparencia y conexión libre de sesgos.
            </p>
          </div>

          {/* Enlaces de interés */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Enlaces Institucionales
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://providencia.cl/provi/site/artic/20200930/pags/20200930185543.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Departamento de Empleo Providencia
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto Oficial */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Contacto Municipal
            </h3>
            <p className="text-sm text-slate-400 mb-2 leading-relaxed">
              📍 Av. Pedro de Valdivia 963, Providencia, Santiago, Chile.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              📞 <a href="tel:+56226543200" className="hover:text-white transition-colors">+562 2654 3200</a>
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ProviEmplea. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span>Desarrollado por Grupo 1 — Sección 51</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
