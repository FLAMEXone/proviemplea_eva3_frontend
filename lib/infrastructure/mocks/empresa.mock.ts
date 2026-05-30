import { ETipoEmpresa } from "@/lib/domain/enums/empresa.enum";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";
 
export const MOCK_EMPRESAS: IEmpresa[] = [
  {
    id: "emp-001",
    nombre_empresa: "Tecnologías Providencia SpA",
    rut_empresa: "76123456-7",
    email: "contacto@techprov.cl",
    tipo_empresa: ETipoEmpresa.EST,
    contacto_nombre: "María Jesús Ovalle",
    contacto_email: "m.ovalle@techprov.cl",
    activo: true,
    validado: true
  },
  {
    id: "emp-002",
    nombre_empresa: "Consultores y Outsourcing Santiago",
    rut_empresa: "77987654-3",
    email: "rrhh@outsourcingsantiago.cl",
    tipo_empresa: ETipoEmpresa.OUTSOURCING,
    contacto_nombre: "Carlos Valenzuela",
    contacto_email: "cvalenzuela@outsourcingsantiago.cl",
    activo: true,
    validado: true
  },
  {
    id: "emp-003",
    nombre_empresa: "Clínica Dental Santa María de Providencia",
    rut_empresa: "78456123-K",
    email: "info@dentalsantamaria.cl",
    tipo_empresa: ETipoEmpresa.CONTRATACION_DIRECTA,
    contacto_nombre: "Dr. Andrés Larraín",
    contacto_email: "alarrain@dentalsantamaria.cl",
    activo: true,
    validado: true
  }
];