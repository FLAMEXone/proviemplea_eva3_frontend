"use client";

import * as React from "react";
import { Building2 } from "lucide-react";
import PageHeader from "@/components/custom/PageHeader";

export default function EmpresaHeader() {
  return (
    <PageHeader
      backHref="/"
      backText="Volver al Inicio"
      badge={{
        text: "Convenios de Empleo de Providencia",
        color: "blue",
        icon: <Building2 className="w-3.5 h-3.5" />,
      }}
      title="Registra tu Empresa en ProviEmplea"
      description="Integra tu organización al sistema municipal de intermediación laboral. Podrás acceder a la vitrina de currículums ciegos validados y solicitar entrevistas sin sesgos de selección."
    />
  );
}
