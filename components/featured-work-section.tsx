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

  const handleWorkLinkClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (typeof window === "undefined" || window.innerWidth >= 1024) return;
      e.preventDefault();
      // On mobile: full page navigation (no transition) - treat as new page
      window.location.href = href + "?scroll=1";
    },
    []
  );

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
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
            aria-label="Previous work"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDown}
            disabled={!canGoDown}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
            aria-label="Next work"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {visibleWorks.map((workId, index) => {
          const work = getWorkById(workId);
          if (!work) return null;
          
          const featuredWorkIds = [
            "how-we-raised-715k-ido", // ID 1 - Polkamarkets
            "how-we-achieved-166-mom-ngo-growth", // ID 4 - Coompass
            "scaling-sales-partnerships-blockchain" // ID 7 - BEPRO Network
          ];
          const isActive = featuredWorkIds.includes(workId);
          
          if (isActive) {
            const href = `/work/${work.id}`;
            return (
              <Link
                key={startIndex + index}
                href={href}
                onClick={(e) => handleWorkLinkClick(e, href)}
                className="flex items-center gap-1 text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200 w-full text-left"
              >
                <span className="truncate">{work.title}</span>
                <span className="shrink-0">→</span>
              </Link>
            );
          }
          
          return (
            <div
              key={startIndex + index}
              className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600 w-full text-left cursor-default"
            >
              <span className="truncate">{work.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
