import { z } from "zod";
import { ETipoEmpresa } from "@/lib/domain/enums/empresa.enum";
import { validarRutChileno } from "@/lib/utils";

export const empresaSchema = z.object({
  nombre_empresa: z.string().min(1, "El nombre de la empresa es obligatorio."),
  rut_empresa: z
    .string()
    .min(1, "El RUT es obligatorio.")
    .refine((val) => validarRutChileno(val), {
      message: "El RUT no es válido. Escríbelo sin puntos, con guion (ej: 76123456-1).",
    }),
  email: z
    .string()
    .min(1, "El correo de la empresa es obligatorio.")
    .email("El correo no tiene un formato válido."),
  rubro: z.string().min(1, "El rubro es obligatorio."),
  tipo_empresa: z.nativeEnum(ETipoEmpresa),
  contacto_nombre: z.string().min(1, "El nombre del representante es obligatorio."),
  contacto_email: z
    .string()
    .min(1, "El correo del representante es obligatorio.")
    .email("El correo del representante no es válido."),
  contacto_telefono: z.string().optional(),
  presentacion: z.string().optional(),
  bot_trap: z.string().optional(),
});

export type EmpresaFormValues = z.infer<typeof empresaSchema>;
