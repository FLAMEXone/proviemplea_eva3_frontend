"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CustomBadge } from "@/components/custom/CustomBadge";
import { CustomButton } from "@/components/custom/CustomButton";

interface PageHeaderBadge {
  text: string;
  color: React.ComponentProps<typeof CustomBadge>["color"];
  icon?: React.ReactNode;
}

interface PageHeaderProps {
  badge: PageHeaderBadge;
  title: string;
  description: string;
  backHref?: string;
  backText?: string;
  align?: "left" | "center";
}

export default function PageHeader({
  badge,
  title,
  description,
  backHref,
  backText = "Volver",
  align = "left",
}: PageHeaderProps) {
  const alignClass = align === "center" ? "text-center md:text-left" : "";

  return (
    <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 py-12 w-full">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${alignClass}`}>
        {backHref && (
          <div className="mb-4">
            <Link href={backHref}>
              <CustomButton theme="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} className="px-0 hover:bg-transparent text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">
                {backText}
              </CustomButton>
            </Link>
          </div>
        )}
        <CustomBadge
          color={badge.color}
          size="md"
          text={badge.text}
          icon={badge.icon}
          className="uppercase tracking-wide"
        />
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-4xl mt-3 tracking-tight">
          {title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-3xl text-xs md:text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
