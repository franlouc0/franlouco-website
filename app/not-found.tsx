import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          404
        </h1>
        <h2 className="mb-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Page not found
        </h2>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-green-400 bg-green-400 px-4 py-2 text-sm font-semibold text-zinc-900 transition-all hover:border-green-500 hover:bg-green-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Go home
        </Link>
      </div>
    </div>
  );
}
