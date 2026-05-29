export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800 p-6">
      <main className="text-center max-w-xl bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-md">
          PE
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-slate-900 sm:text-4xl">
          ProviEmplea
        </h1>
        <p className="text-sm font-semibold tracking-wide uppercase text-blue-600 mb-6">
          Portal Municipal de Empleo Inverso
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 text-left">
          <p className="text-sm text-slate-600 leading-relaxed">
            Bienvenido a la vitrina digital de talentos de la <strong>Municipalidad de Providencia</strong>. Nuestra plataforma de búsqueda inversa de empleo y CV Ciego está en construcción metodológica.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Desarrollado para la Evaluación Sumativa U3 — Sección 51
        </div>

      </main>
    </div>
  );
}

