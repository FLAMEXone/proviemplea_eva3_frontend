import { z } from "zod";
import { EModalidad, ENivelEducacional, ETipoJornada } from "@/lib/domain/enums/personas.enum";

export const talentoSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio.")
    .email("Ingresa un correo electrónico válido."),
  telefono: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[0-9\s-]{7,15}$/.test(val.trim()), {
      message: "Ingresa un formato de teléfono válido (Ej: +56912345678).",
    }),
  titulo_carrera: z.string().min(1, "El título profesional o carrera es obligatorio."),
  nivel_educacional: z.nativeEnum(ENivelEducacional),
  anio_egreso: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const anio = Number(val);
      return !isNaN(anio) && anio >= 1950 && anio <= 2026;
    }, { message: "Ingresa un año de egreso válido entre 1950 y 2026." }),
  anios_experiencia: z
    .string()
    .min(1, "Los años de experiencia son requeridos.")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Ingresa una cantidad de años válida (mínimo 0).",
    }),
  areas_experiencia: z.string().optional(),
  competencias: z.string().min(1, "Ingresa al menos una competencia clave."),
  rango_renta: z.string().optional(),
  tipo_jornada: z.nativeEnum(ETipoJornada),
  modalidad: z.nativeEnum(EModalidad),
  cursos: z.string().optional(),
  idiomas: z.string().optional(),
  portafolio_url: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      const trimmed = val.trim();
      const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `http://${trimmed}`;
      try { new URL(withProtocol); return true; } catch { return false; }
    }, { message: "Ingresa un enlace o sitio web válido (Ej: https://github.com/usuario)." }),
  resumen: z.string().min(15, "El resumen debe contener al menos 15 caracteres."),
  persona_discapacidad: z.boolean(),
  bot_trap: z.string().optional(),
});

export type TalentoFormValues = z.infer<typeof talentoSchema>;
