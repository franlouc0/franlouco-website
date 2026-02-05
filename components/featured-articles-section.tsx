"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown } from "lucide-react";
import { getArticleById } from "@/lib/articles";

const PLACEHOLDER_TITLES = [
  "Product-led growth for Web3 teams",
  "Building community before the token",
  "IDO and token launch: what actually moves the needle",
  "From hype to systems: marketing that scales",
  "When to use Web3 (and when not to)",
  "GTM and positioning for early-stage protocols",
] as const;

// First item is the real article; rest are placeholders
const FEATURED_ARTICLE_IDS = ["imagining-ai-powered-fundraising-nonprofits"] as const;

const ITEMS: Array<{ slug?: string; title: string }> = [
  ...FEATURED_ARTICLE_IDS.map((slug) => {
    const article = getArticleById(slug);
    return { slug, title: article?.title ?? slug };
  }),
  ...PLACEHOLDER_TITLES.map((title) => ({ title })),
];

const ITEMS_PER_PAGE = 6;

export function FeaturedArticlesSection() {
  const [startIndex, setStartIndex] = React.useState(0);
  const visible = ITEMS.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + ITEMS_PER_PAGE < ITEMS.length;

  const handleArticleLinkClick = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (typeof window === "undefined" || window.innerWidth >= 1024) return;
      e.preventDefault();
      window.location.href = href;
    },
    []
  );

  const handleUp = () => {
    if (canGoUp) setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleDown = () => {
    if (canGoDown)
      setStartIndex((prev) =>
        Math.min(ITEMS.length - ITEMS_PER_PAGE, prev + 1)
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
            {ITEMS.length}
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
        {visible.map((item, index) => {
          if (item.slug) {
            const href = `/articles/${item.slug}`;
            return (
              <Link
                key={startIndex + index}
                href={href}
                onClick={(e) => handleArticleLinkClick(e, href)}
                className="flex items-center gap-1 text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200 w-full text-left"
              >
                <span className="truncate">{item.title}</span>
                <span className="shrink-0">→</span>
              </Link>
            );
          }
          return (
            <div
              key={startIndex + index}
              className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-600 w-full text-left cursor-default"
            >
              <span className="truncate">{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
