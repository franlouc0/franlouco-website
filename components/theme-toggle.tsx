"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <button
        className="flex h-6 items-center gap-1.5 rounded-md border border-zinc-300 bg-zinc-100 px-2 text-[10px] dark:border-zinc-700/50 dark:bg-zinc-800/50"
        disabled
      >
        ...
      </button>
    );
  }

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System";

  return (
    <button
      onClick={cycleTheme}
      className="flex h-6 items-center gap-1.5 rounded-md border border-zinc-300 bg-zinc-100 px-2 text-[10px] transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
      aria-label={`Current theme: ${label}. Click to cycle theme.`}
      title="Toggle theme"
    >
      <Icon className="h-3 w-3" />
      <span>{label}</span>
    </button>
  );
}
