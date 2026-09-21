import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 text-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">
          This route ends here.
        </h1>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-muted">
          The page may have moved or the address may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-md border border-border px-5 py-3 font-medium"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
