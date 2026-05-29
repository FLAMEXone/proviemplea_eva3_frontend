import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ProviEmplea — Portal de Búsqueda Inversa de Talentos",
  description: "Vitrina digital de empleo y CV Ciego para vecinas y vecinos de la Municipalidad de Providencia. Conexión directa, transparencia y selección sin sesgos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("min-h-screen font-sans antialiased", inter.variable)}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
