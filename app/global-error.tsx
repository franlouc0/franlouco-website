"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Something went wrong!
            </h1>
            <p className="mb-8 text-zinc-600 dark:text-zinc-400">
              {error.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={reset}
              className="rounded-md border border-green-400 bg-green-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition-all hover:border-green-500 hover:bg-green-500"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
