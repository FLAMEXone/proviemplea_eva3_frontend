"use client";

import * as React from "react";
import { UserPlus } from "lucide-react";
import PageHeader from "@/components/custom/PageHeader";

export default function RegistroTalentoHeader() {
  return (
    <PageHeader
      backHref="/"
      backText="Volver al Inicio"
      badge={{
        text: "Registro de Talentos de Providencia",
        color: "blue",
        icon: <UserPlus className="w-3.5 h-3.5" />,
      }}
      title="Inscribe tu Perfil en Formato de CV Ciego"
      description="Ingresa tus competencias, experiencia y educación de forma anónima. Nuestro formato ciego protege tu identidad de sesgos discriminatorios visuales y sociodemográficos, garantizando una intermediación laboral inclusiva."
    />
  );
}
