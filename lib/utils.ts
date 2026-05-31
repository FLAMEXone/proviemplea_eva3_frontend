import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Validador de RUT Chileno sin puntos, con guion y dígito verificador (ej: 76123456-1)
export function validarRutChileno(rut: string): boolean {
  const cleanedInput = rut.trim();
  // 1. Validar que no contenga puntos
  if (cleanedInput.includes(".")) return false;

  // 2. Validar formato estricto: números, un guion y dígito verificador (ej: 76123456-1)
  const regexFormat = /^[0-9]+-[0-9kK]$/;
  if (!regexFormat.test(cleanedInput)) return false;

  // Limpiar para el cálculo matemático
  const cleanRut = cleanedInput.replace(/[^0-9kK]/g, "");
  if (cleanRut.length < 2) return false;
  
  const cuerpo = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1).toUpperCase();
  
  let suma = 0;
  let multiplo = 2;
  
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo.charAt(i), 10);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }
  
  const dvEsperado = 11 - (suma % 11);
  let dvCalc = "";
  if (dvEsperado === 11) dvCalc = "0";
  else if (dvEsperado === 10) dvCalc = "K";
  else dvCalc = dvEsperado.toString();
  
  return dvCalc === dv;
}

