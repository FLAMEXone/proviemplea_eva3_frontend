"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { RefreshCw, ServerCrash } from "lucide-react";
import { checkHealth } from "@/lib/infrastructure/api";

export function ApiStatusMonitor() {
  const pathname = usePathname();
  const lastCheckedPath = React.useRef<string | null>(null);

  React.useEffect(() => {
    // Una sola llamada por ruta — ignora el doble-disparo de StrictMode
    if (lastCheckedPath.current === pathname) return;
    lastCheckedPath.current = pathname;

    async function check() {
      const isOnline = await checkHealth();
      if (!isOnline) {
        toast.warning(
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Servidor Municipal Offline — Modo Demostración
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              No hay conexión con el backend Laravel de ProviEmplea. Todos los datos visibles
              provienen de{" "}
              <strong>mocks locales</strong>. Los formularios simulan registros
              exitosos sin persistir datos reales. Asegurate de tener encendido el backend.
            </span>
            <button
              onClick={() => window.location.reload()}
              className="mt-1 self-start flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-200 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reintentar conexión
            </button>
          </div>,
          {
            id: "api-status",
            duration: Infinity,
            closeButton: true,
            icon: <ServerCrash className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
            classNames: {
              toast: "!items-start",
            },
          }
        );
      } else {
        // Si el servidor volvió a estar online, cerramos el toast si aún está visible
        toast.dismiss("api-status");
      }
    }

    check();
  }, [pathname]);

  return null;
}
