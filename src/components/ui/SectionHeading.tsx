interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ id, eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 id={id} className="font-display text-4xl leading-[0.95] text-bone sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && <p className="max-w-xl text-balance text-base text-bone-dim sm:text-lg">{description}</p>}
      <span aria-hidden className="gold-line h-px w-16" />
    </div>
  );
}
