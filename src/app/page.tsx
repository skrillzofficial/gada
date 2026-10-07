import Image from "next/image";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-4">
      <Image src="/brand/gada-logo-primary.svg" alt="Gada" width={220} height={58} priority />

      <h1 className="text-5xl font-bold">Bridging talent & teams</h1>
      <p className="text-lg text-muted">
        Hire skilled, verified annotators, or find real AI-training work under your own name.
      </p>

      <div className="flex flex-wrap gap-3">
        <button className="rounded-xl bg-gada px-6 py-3 font-semibold text-white hover:bg-gada-600">
          Find work
        </button>
        <button className="rounded-xl border border-line px-6 py-3 font-semibold text-gada hover:bg-surface">
          Hire annotators
        </button>
        <span className="inline-flex items-center rounded-full bg-bridge px-3 py-1 text-sm font-semibold text-gada">
          ✓ Verified
        </span>
      </div>
    </main>
  );
}