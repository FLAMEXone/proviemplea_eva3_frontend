"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import PageHeader from "@/components/custom/PageHeader";

export default function ContactoHeader() {
  return (
    <PageHeader
      badge={{
        text: "Bolsa de Empleo Municipal de Providencia",
        color: "blue",
        icon: <Sparkles className="w-3.5 h-3.5" />,
      }}
      title="Intermediación Laboral Inclusiva"
      description="Formulario seguro de vinculación corporativa. Registra tu postulación confidencial directamente con la oficina de empleo de la Comuna de Providencia."
      align="center"
    />
  );
}
