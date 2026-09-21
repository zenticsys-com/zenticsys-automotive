"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Something interrupted the route
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
          Let&apos;s try that again.
        </h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-muted">
          The page could not be rendered. Retry the request, or return later if
          the issue continues.
        </p>
        <button
          type="button"
          onClick={retry}
          className="mt-8 rounded-md border border-border px-5 py-3 font-medium"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
