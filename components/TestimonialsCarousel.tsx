"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Building2, User2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: string;
  autor: string;
  cargo: string;
  tipo: "empresa" | "vecino";
  testimonio: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    autor: "Cristóbal Valdivia",
    cargo: "Subgerente de Atracción de Talento, Retail Express",
    tipo: "empresa",
    testimonio: "El modelo de búsqueda inversa de ProviEmplea cambió la forma en que contratamos. Gracias a la vitrina de CV Ciego, evaluamos puras competencias reales, eliminando sesgos. Ya hemos incorporado a tres talentos excepcionales de Providencia en menos de un mes.",
  },
  {
    id: "test-2",
    autor: "Mónica Arancibia",
    cargo: "Vecina de Providencia - Desarrolladora Frontend Junior",
    tipo: "vecino",
    testimonio: "Pasé meses enviando currículums sin recibir respuestas, quizás por mi edad o por vivir en un sector específico. En ProviEmplea mi perfil fue publicado de forma anónima y fue la empresa quien me contactó a mí. Me sentí valorada por lo que sé hacer.",
  },
  {
    id: "test-3",
    autor: "Patricia O'Donnell",
    cargo: "Directora de Operaciones, FinTech Chile",
    tipo: "empresa",
    testimonio: "La plataforma es increíblemente ágil. Solicitar la intermediación municipal a través del portal nos ahorró días de reclutamiento. Los perfiles vienen validados por el equipo del Departamento de Empleo de Providencia, lo cual da una seguridad invaluable.",
  },
  {
    id: "test-4",
    autor: "Héctor Espinoza",
    cargo: "Vecino de Providencia - Analista de Datos",
    tipo: "vecino",
    testimonio: "El proceso de intermediación con apoyo de la municipalidad es excelente. Desde que se publicó mi CV Ciego, recibí dos ofertas de entrevistas. La transparencia de saber que me buscaban por mis habilidades técnicas es la mejor experiencia laboral que he tenido.",
  }
];

export function TestimonialsCarousel({ testimonials = DEFAULT_TESTIMONIALS }: { testimonials?: Testimonial[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Manejador para navegar directamente con los puntos indicadores
  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Contenedor del Carrusel */}
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "center",
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((test, index) => {
            const isActive = index === current;
            return (
              <CarouselItem
                key={test.id}
                className="pl-2 md:pl-4 basis-full"
                // WCAG 2.1 AA: Los elementos invisibles se ocultan del lector de pantallas
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
              >
                <div className="p-1">
                  <Card className={cn(
                    "border-slate-200/60 transition-all duration-500 bg-white dark:bg-slate-950 dark:border-slate-800",
                    isActive ? "scale-100 opacity-100 shadow-md ring-1 ring-primary/20" : "scale-95 opacity-50 shadow-none pointer-events-none"
                  )}>
                    <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
                      {/* Avatar y Tipo */}
                      <div className="flex flex-col items-center text-center shrink-0">
                        <div className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-inner transition-colors",
                          test.tipo === "empresa" 
                            ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary" 
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                        )}>
                          {test.tipo === "empresa" ? (
                            <Building2 className="w-8 h-8" />
                          ) : (
                            <User2 className="w-8 h-8" />
                          )}
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-500 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className={cn(
                          "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full",
                          test.tipo === "empresa"
                            ? "bg-primary/5 text-primary/80 dark:bg-primary/10 dark:text-primary"
                            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                        )}>
                          {test.tipo === "empresa" ? "Empresa" : "Vecino/a"}
                        </span>
                      </div>

                      {/* Texto del Testimonio */}
                      <div className="flex-1 relative">
                        <Quote className="absolute -top-4 -left-3 w-8 h-8 text-slate-100 dark:text-slate-800/50 -z-10 transform rotate-180" />
                        <p className="text-slate-700 dark:text-slate-300 text-base md:text-lg italic leading-relaxed font-normal">
                          &ldquo;{test.testimonio}&rdquo;
                        </p>
                        <div className="mt-4">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {test.autor}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {test.cargo}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Botones de Navegación (Ocultos en móvil, visibles en MD y superior) */}
        <CarouselPrevious 
          className="hidden md:flex -left-12 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100" 
          tabIndex={0}
          aria-label="Diapositiva anterior"
        />
        <CarouselNext 
          className="hidden md:flex -right-12 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100" 
          tabIndex={0}
          aria-label="Diapositiva siguiente"
        />
      </Carousel>

      {/* Puntos Indicadores (Dot Indicators) y Estado de Accesibilidad */}
      <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Navegación del carrusel">
        {Array.from({ length: count }).map((_, index) => {
          const isActive = index === current;
          return (
            <button
              key={index}
              role="tab"
              aria-selected={isActive}
              aria-label={`Ir al testimonio ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                isActive 
                  ? "bg-primary w-6 dark:bg-primary" 
                  : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700"
              )}
            />
          );
        })}
      </div>

      {/* Anunciador en vivo invisible para lectores de pantalla */}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Testimonio {current + 1} de {count} visible
      </span>
    </div>
  );
}
