"use client";

import { Check } from "lucide-react";

type ChipSelectProps = {
  label: string;
  hint?: string;
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
};

/** A group of toggle buttons for picking several options, e.g. skills or languages */
export function ChipSelect({ label, hint, options, value, onChange, error }: ChipSelectProps) {
  function toggle(option: string) {
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
  }

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gada">{label}</legend>
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(option)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bridge ${
                selected
                  ? "border-gada bg-gada text-white"
                  : "border-line bg-white text-gada hover:border-gada-300"
              }`}
            >
              {selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              {option}
            </button>
          );
        })}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}
