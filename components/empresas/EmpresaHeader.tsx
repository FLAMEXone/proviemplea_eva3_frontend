"use client";

import * as React from "react";
import { Building2 } from "lucide-react";
import PageHeader from "@/components/custom/PageHeader";

export default function EmpresaHeader() {
  return (
    <PageHeader
      backHref="/"
      backText="Volver a la Vitrina de Talentos"
      badge={{
        text: "Convenios de Empleo de Providencia",
        color: "blue",
        icon: <Building2 className="w-3.5 h-3.5" />,
      }}
      title="Portal Corporativo y Empresas Aliadas"
      description="Explora las organizaciones con convenios activos de intermediación laboral o registra tu empresa para comenzar a solicitar reclutamiento inclusivo mediante nuestro formato de CV Ciego."
    />
  );
}
