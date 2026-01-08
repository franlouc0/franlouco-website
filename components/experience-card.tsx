"use client";

import * as React from "react";
import { Card, CardHeader } from "@/components/ui/card";

interface ExperienceCardProps {
  role: string;
  company: string;
  years: string;
  emoji?: string;
}

export const ExperienceCard = React.memo(function ExperienceCard({
  role,
  company,
  years,
  emoji = "💼",
}: ExperienceCardProps) {
  return (
    <Card className="group border-zinc-300/50 bg-zinc-100/80 backdrop-blur-sm transition-all hover:border-zinc-400/50 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.1),inset_0_1px_0_0_rgba(0,0,0,0.05)] dark:border-zinc-800/50 dark:bg-zinc-900/40 dark:hover:border-zinc-700/50 dark:hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <CardHeader className="flex flex-row items-center gap-2 p-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-zinc-200/60 dark:bg-zinc-800/60">
          <span className="text-lg">{emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-semibold leading-tight text-zinc-900 truncate dark:text-zinc-50">
            {role}
          </h3>
          <p className="mt-0.5 text-[10px] leading-tight text-zinc-600 truncate dark:text-zinc-400">
            {company}
          </p>
          <p className="text-[10px] leading-tight text-zinc-500 truncate dark:text-zinc-500">
            {years}
          </p>
        </div>
      </CardHeader>
    </Card>
  );
});
