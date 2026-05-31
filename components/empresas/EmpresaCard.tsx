"use client";

import * as React from "react";
import { ShieldCheck, User, Mail } from "lucide-react";
import { IEmpresa } from "@/lib/domain/interfaces/empresa.interface";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CustomBadge } from "@/components/custom/CustomBadge";

interface EmpresaCardProps {
  empresa: IEmpresa;
}

export default function EmpresaCard({ empresa }: EmpresaCardProps) {
  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-all duration-300 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-primary/20 dark:hover:border-primary/20 rounded-3xl">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3 mb-2">
          <Avatar className="h-10 w-10 rounded-xl">
            <AvatarFallback className="bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 font-bold rounded-xl">
              {empresa.nombre_empresa.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-end gap-1">
            <CustomBadge 
              color="emerald" 
              size="sm" 
              text="Validado" 
              icon={<ShieldCheck className="w-3 h-3" />} 
            />
            {empresa.id.includes("mock") && (
              <CustomBadge 
                color="blue" 
                size="sm" 
                text="En Memoria" 
              />
            )}
          </div>
        </div>
        
        <CardTitle className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
          {empresa.nombre_empresa}
        </CardTitle>
        <CardDescription className="font-mono text-[10px] text-slate-400 mt-0.5">
          RUT: {empresa.rut_empresa}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2 pb-0">
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-[10px] text-slate-500 dark:text-slate-400">
          <div>
            <span className="block font-semibold text-slate-400 dark:text-slate-500">Rubro</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{empresa.rubro || "General"}</span>
          </div>
          <div>
            <span className="block font-semibold text-slate-400 dark:text-slate-500">Tipo de Alianza</span>
            <span className="font-medium text-slate-700 dark:text-slate-300 capitalize">{empresa.tipo_empresa.replace("-", " ")}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 pb-5">
        <div className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl text-[9px] space-y-1.5 text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1.5">
            <User className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate"><strong>Representante:</strong> {empresa.contacto_nombre}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate"><strong>Email:</strong> {empresa.contacto_email}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
