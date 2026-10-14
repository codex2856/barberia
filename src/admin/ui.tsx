import type { InputHTMLAttributes, ReactNode } from "react";

export const inputClass =
  "w-full rounded-lg border border-white/10 bg-charcoal-light px-3 py-2 text-sm text-bone placeholder:text-bone-faint focus:border-gold focus:outline-none";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Label({ text, children }: { text: string; children: ReactNode }) {
  return (
    <label className="block text-xs uppercase tracking-[0.15em] text-bone-faint">
      {text}
      <span className="mt-1 block normal-case tracking-normal">{children}</span>
    </label>
  );
}

type Tone = "primary" | "outline" | "danger";

const tones: Record<Tone, string> = {
  primary: "bg-gold text-void hover:bg-gold-light",
  outline: "border border-gold/50 text-bone hover:border-gold hover:bg-gold/10",
  danger: "border border-wine-light text-bone hover:bg-wine",
};

export function AdminButton({
  tone = "outline",
  className = "",
  ...rest
}: { tone?: Tone } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors disabled:opacity-50 ${tones[tone]} ${className}`}
    />
  );
}

export function Notice({ kind, children }: { kind: "ok" | "error"; children: ReactNode }) {
  return (
    <p
      role={kind === "error" ? "alert" : "status"}
      className={`rounded-lg px-3 py-2 text-sm ${kind === "ok" ? "bg-gold/10 text-gold-light" : "bg-wine text-bone"}`}
    >
      {children}
    </p>
  );
}
