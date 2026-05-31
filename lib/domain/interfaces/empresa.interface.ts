import { ETipoEmpresa } from "../enums/empresa.enum";

export interface IEmpresa {
  id: string;
  nombre_empresa: string;
  rut_empresa: string;
  email: string;
  logo_url?: string | null;
  rubro?: string | null;
  tipo_empresa: ETipoEmpresa
  presentacion?: string | null;
  beneficios?: string[] | null;
  contacto_nombre: string;
  contacto_email: string;
  contacto_telefono?: string | null;
  activo: boolean;
  validado: boolean;
}
