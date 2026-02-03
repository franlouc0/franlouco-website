"use client";

import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const PLACEHOLDER_ARTICLES = [
  "Product-led growth for Web3 teams",
  "Building community before the token",
  "IDO and token launch: what actually moves the needle",
  "From hype to systems: marketing that scales",
  "When to use Web3 (and when not to)",
  "GTM and positioning for early-stage protocols",
] as const;

export function FeaturedArticlesSection() {
  const [startIndex, setStartIndex] = React.useState(0);
  const ITEMS_PER_PAGE = 6;
  const visible = PLACEHOLDER_ARTICLES.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + ITEMS_PER_PAGE < PLACEHOLDER_ARTICLES.length;

  const handleUp = () => {
    if (canGoUp) setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleDown = () => {
    if (canGoDown)
      setStartIndex((prev) =>
        Math.min(PLACEHOLDER_ARTICLES.length - ITEMS_PER_PAGE, prev + 1)
      );
  };

  return (
    <div className="mt-10 lg:mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Featured Articles
          </h2>
          <span className="inline-flex h-4 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[10px] text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400">
            {PLACEHOLDER_ARTICLES.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleUp}
            disabled={!canGoUp}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
            aria-label="Previous article"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDown}
            disabled={!canGoDown}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
            aria-label="Next article"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="space-y-2">
        {visible.map((title, index) => (
          <div
            key={startIndex + index}
            className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600 w-full text-left cursor-default"
          >
            <span className="truncate">{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
