"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Talentos", href: "#talentos" },
    { name: "Testimonios", href: "#testimonios" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white shadow-md shadow-blue-500/20">
              PE
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Provi<span className="text-blue-600">Emplea</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md shadow-blue-500/10 rounded-xl">
              Para Empresas
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2 shadow-lg animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl">
              Para Empresas
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
