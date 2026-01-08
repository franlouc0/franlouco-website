"use client";

import * as React from "react";

interface ExperienceCardProps {
  role: string;
  company: string;
  years: string;
}

export const ExperienceCard = React.memo(function ExperienceCard({
  role,
  company,
  years,
}: ExperienceCardProps) {
  return (
    <div className="flex-1 min-w-0">
      <h3 className="text-[10px] font-semibold leading-tight text-zinc-900 truncate dark:text-zinc-50">
        {role}
      </h3>
      <div className="mt-0.5 flex items-center gap-1.5 text-[9px] leading-tight">
        <p className="text-zinc-600 truncate dark:text-zinc-400">
          {company}
        </p>
        <span className="text-zinc-400 dark:text-zinc-600">•</span>
        <p className="text-zinc-500 truncate dark:text-zinc-500">
          {years}
        </p>
      </div>
    </div>
  );
});
