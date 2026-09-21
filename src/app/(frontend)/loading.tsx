export default function Loading() {
  return (
    <main
      className="grid min-h-screen place-items-center px-6 text-center"
      aria-busy="true"
      aria-live="polite"
    >
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
        Loading Zenticsys
      </p>
    </main>
  );
}
