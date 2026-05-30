"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon, ChevronDown, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  theme?: "light" | "dark" | null;
  toggleTheme?: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  const navLinks = [
    { name: "Inicio", href: isHome ? "#inicio" : "/#inicio" },
    { name: "Nosotros", href: isHome ? "#nosotros" : "/#nosotros" },
    { name: "Vitrina Talentos", href: "/talentos" },
    { name: "Empresas Aliadas", href: "/empresas" },
    { name: "Testimonios", href: isHome ? "#testimonios" : "/#testimonios" },
    { name: "FAQs", href: isHome ? "#faqs" : "/#faqs" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 dark:border-slate-800/80 dark:bg-slate-950/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
              PE
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Provi<span className="text-blue-600">Emplea</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            {/* Botón de alternancia de tema */}
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                aria-label="Cambiar tema de color"
                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}

            {/* Desplegable de Registro (Dropdown) */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md shadow-blue-500/10 rounded-xl flex items-center gap-1.5 px-4 py-2 text-xs">
                Registro
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </Button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-52 rounded-2xl border border-slate-200/60 bg-white p-2 shadow-xl dark:border-slate-800/80 dark:bg-slate-950 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link 
                    href="/registro-talento"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                  >
                    <User className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="block">Soy Talento</span>
                      <span className="block text-[9px] text-slate-400 font-normal mt-0.5">Inscribir CV Ciego</span>
                    </div>
                  </Link>

                  <Link 
                    href="/registro-empresa"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all mt-1"
                  >
                    <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <span className="block">Soy Empresa</span>
                      <span className="block text-[9px] text-slate-400 font-normal mt-0.5">Firmar Convenio</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:text-slate-400 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              {link.name}
            </a>
          ))}

          {/* Mobile Toggle Theme & Register options */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Tema Visual</span>
              {toggleTheme && (
                <button
                  onClick={toggleTheme}
                  aria-label="Cambiar tema de color"
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-700" />
                  )}
                </button>
              )}
            </div>

            {/* Opciones de Registro para móviles */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <Link 
                href="/registro-talento" 
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-center justify-center p-3 bg-blue-50/50 hover:bg-blue-50 dark:bg-blue-950/20 dark:hover:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 rounded-2xl text-center transition-all group"
              >
                <User className="w-5 h-5 text-blue-600 mb-1 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Soy Talento</span>
                <span className="text-[9px] text-slate-400 mt-0.5">Registrar CV</span>
              </Link>

              <Link 
                href="/registro-empresa" 
                onClick={() => setIsOpen(false)}
                className="flex flex-col items-center justify-center p-3 bg-emerald-50/50 hover:bg-emerald-50 dark:bg-emerald-950/10 dark:hover:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl text-center transition-all group"
              >
                <Building className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1 transition-transform group-hover:scale-110" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Soy Empresa</span>
                <span className="text-[9px] text-slate-400 mt-0.5">Firmar Convenio</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
