import { Lock } from "lucide-react";

export function LockedOverlay({ title, text }: { title: string; text: string }) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-3xl bg-white/70 p-6 backdrop-blur-[3px]">
      <div className="max-w-xs text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gada text-bridge">
          <Lock className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 font-display text-lg font-semibold text-gada">{title}</p>
        <p className="mt-1 text-sm text-muted">{text}</p>
      </div>
    </div>
  );
}
