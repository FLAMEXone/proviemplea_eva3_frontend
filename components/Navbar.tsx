"use client";

import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CustomDropdown } from "@/components/custom/CustomDropdown";
import { User, Building } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  theme?: "light" | "dark" | null;
  toggleTheme?: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
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
            <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-md shadow-blue-500/20 shrink-0">
              <Image
                src="/LOGO.jpg"
                alt="Municipalidad de Providencia"
                fill
                className="object-cover scale-[1.7]"
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              Provi<span className="text-blue-600">Emplea</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200`}>
                      <Link href={link.href}>{link.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>


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

            {/* Desplegable de Registro */}
            <CustomDropdown 
              triggerText="Registro"
              options={[
                {
                  label: "Soy Talento",
                  subLabel: "Inscribir CV Ciego",
                  href: "/registro-talento",
                  icon: <User className="w-4 h-4 text-blue-600" />
                },
                {
                  label: "Soy Empresa",
                  subLabel: "Firmar Convenio",
                  href: "/registro-empresa",
                  icon: <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                }
              ]}
            />
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

          {/* Mobile Registro */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1">
            <Link
              href="/registro-talento"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            >
              <User className="w-4 h-4" /> Inscribir Perfil (Talento)
            </Link>
            <Link
              href="/registro-empresa"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
            >
              <Building className="w-4 h-4" /> Registrar Empresa
            </Link>
          </div>

          {/* Mobile Toggle Theme */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between px-1 py-2">
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
          </div>
        </div>
      )}
    </nav>
  );
}
