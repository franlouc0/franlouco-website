"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="h-3 w-3 text-zinc-400 dark:text-zinc-600" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-200 transition-colors"
            >
              {index === 0 ? (
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  {item.label}
                </span>
              ) : (
                item.label
              )}
            </Link>
          ) : item.onClick ? (
            <button
              onClick={item.onClick}
              className="hover:text-zinc-900 hover:underline dark:hover:text-zinc-200 transition-colors text-left"
            >
              {index === 0 ? (
                <span className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  {item.label}
                </span>
              ) : (
                item.label
              )}
            </button>
          ) : (
            <span className={index === items.length - 1 ? "text-zinc-900 dark:text-zinc-50 font-medium" : ""}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
