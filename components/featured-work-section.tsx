"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";
import { getAllWorkIds, getWorkById } from "@/lib/work";

interface FeaturedWorkSectionProps {}

const ITEMS_PER_PAGE = 7;

export function FeaturedWorkSection({}: FeaturedWorkSectionProps = {}) {
  const [startIndex, setStartIndex] = React.useState(0);
  const workIds = React.useMemo(() => getAllWorkIds(), []);

  const visibleWorks = workIds.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + ITEMS_PER_PAGE < workIds.length;

  const handleUp = () => {
    if (canGoUp) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleDown = () => {
    if (canGoDown) {
      setStartIndex((prev) =>
        Math.min(workIds.length - ITEMS_PER_PAGE, prev + 1)
      );
    }
  };

  return (
    <div className="mt-10 lg:mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Featured Work
          </h2>
          <span className="inline-flex h-4 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[10px] text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400">
            {workIds.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleUp}
            disabled={!canGoUp}
            className="flex h-4 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 px-1 transition-colors hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
            aria-label="Previous work"
          >
            <ChevronUp className="h-2.5 w-2.5" />
          </button>
          <button
            onClick={handleDown}
            disabled={!canGoDown}
            className="flex h-4 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 px-1 transition-colors hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
            aria-label="Next work"
          >
            <ChevronDown className="h-2.5 w-2.5" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {visibleWorks.map((workId, index) => {
          const work = getWorkById(workId);
          if (!work) return null;
          
          return (
            <Link
            key={startIndex + index}
              href={`/work/${work.id}`}
            className="flex items-center gap-1 text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200 w-full text-left"
          >
            <span className="truncate">{work.title}</span>
            <span className="shrink-0">→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
