import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Hero />
      <About />
      
      {/* 🔮 En los siguientes hitos se inyectará aquí la Vitrina de Talentos y el Carrusel del Hito 1 */}
      <div className="flex-grow">
        {/* Placeholder dinámico para Vitrina */}
        <section id="talentos" className="w-full py-20 sm:py-28 bg-white border-b border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="max-w-md px-4 flex flex-col gap-4">
            <div className="text-4xl">🔮</div>
            <h3 className="text-xl font-bold text-slate-900">Vitrina de Talentos (CV Ciego)</h3>
            <p className="text-sm text-slate-500">
              Esta sección está siendo desarrollada activamente por tu compañero de equipo como parte del Hito 1. Una vez fusionadas las ramas, aquí se renderizarán los currículums anónimos integrados a la API.
            </p>
          </div>
        </section>

        {/* Placeholder dinámico para Testimonios */}
        <section id="testimonios" className="w-full py-20 sm:py-28 bg-slate-50 border-b border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="max-w-md px-4 flex flex-col gap-4">
            <div className="text-4xl">✍️</div>
            <h3 className="text-xl font-bold text-slate-900">Carrusel de Testimonios Inclusivos</h3>
            <p className="text-sm text-slate-500">
              Esta sección está siendo desarrollada por fabian como parte del Hito 1, implementando estándares de accesibilidad WCAG 2.1 para la navegación con teclado.
            </p>
          </div>
        </section>
      </div>

      <FAQ />
      <Footer />
    </div>
  );
}
