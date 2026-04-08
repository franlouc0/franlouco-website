"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Something went wrong!
        </h1>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          {error.message || "An unexpected error occurred"}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-md border border-green-400 bg-green-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition-all hover:border-green-500 hover:bg-green-500"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-200 bg-zinc-100 px-4 py-2 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
