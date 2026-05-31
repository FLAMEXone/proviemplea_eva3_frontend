import { EEstado } from "../enums/contacto.enum";
import { IEmpresa } from "./empresa.interface";
import { IPersona } from "./persona.interface";

export interface IContactoSolicitado {
  id: string;
  empresa_id: string;
  persona_id: string;
  notas_admin?: string | null;
  estado: EEstado;
  fecha_contacto?: string | null;
  fecha_entrevista?: string | null;
  fecha_resultado?: string | null;
  created_at: string;
  empresa?: IEmpresa;
  persona?: IPersona;
}
