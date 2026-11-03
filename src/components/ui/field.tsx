import type { ComponentProps, ReactNode } from "react";

const control =
  "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-gada outline-none transition placeholder:text-muted/70 focus:border-gada focus:ring-4 focus:ring-gada-100";

function borderFor(error?: string) {
  return error ? "border-red-400" : "border-line";
}

type FieldProps = {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
};

export function Field({ id, label, hint, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gada">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput({ error, className = "", ...props }: ComponentProps<"input"> & { error?: string }) {
  return (
    <input
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${props.id}-error` : undefined}
      className={`${control} ${borderFor(error)} ${className}`}
      {...props}
    />
  );
}

export function TextArea({ error, className = "", ...props }: ComponentProps<"textarea"> & { error?: string }) {
  return (
    <textarea
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${props.id}-error` : undefined}
      className={`${control} ${borderFor(error)} min-h-32 resize-y ${className}`}
      {...props}
    />
  );
}

export function Select({
  error,
  className = "",
  options,
  placeholder,
  ...props
}: ComponentProps<"select"> & { error?: string; options: readonly string[]; placeholder?: string }) {
  return (
    <select
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${props.id}-error` : undefined}
      className={`${control} ${borderFor(error)} ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
