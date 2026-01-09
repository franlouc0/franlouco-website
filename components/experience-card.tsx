"use client";

import * as React from "react";
import Image from "next/image";
import { SuitcaseSimple } from "@phosphor-icons/react";

interface ExperienceCardProps {
  role: string;
  company: string;
  years: string;
  logo?: string;
  emoji?: string;
  isActive?: boolean;
}

export const ExperienceCard = React.memo(function ExperienceCard({
  role,
  company,
  years,
  logo,
  emoji,
  isActive = false,
}: ExperienceCardProps) {
  return (
    <div className="flex items-start gap-2">
      <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded bg-zinc-200/60 dark:bg-zinc-800/60 flex items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={company}
            width={24}
            height={24}
            className="object-cover"
          />
        ) : emoji ? (
          <span className="text-xs">{emoji}</span>
        ) : (
          <SuitcaseSimple size={14} weight="regular" className="text-zinc-500 dark:text-zinc-400" />
        )}
      </div>
      
      <div className="flex flex-1 min-w-0 items-center gap-2">
        {/* Status indicator bullet - vertically centered */}
        <div className={`h-1.5 w-1.5 shrink-0 rounded-full ${
          isActive 
            ? 'bg-green-400 shadow-[0_0_4px_rgba(74,222,128,0.6)]' 
            : 'bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.6)]'
        }`} />
        
        <div className="flex-1 min-w-0">
        <h3 className="text-[11px] font-semibold leading-tight text-zinc-900 truncate dark:text-zinc-50">
          {role}
        </h3>
        <div className="mt-0.5 flex items-center gap-1.5 text-[10px] leading-tight">
          <p className="text-zinc-600 truncate dark:text-zinc-400">
            {company}
          </p>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <p className="text-zinc-500 truncate dark:text-zinc-500">
            {years}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
});
