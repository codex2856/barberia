/**
 * Fallback estático para navegadores/dispositivos sin soporte WebGL.
 * Silueta ilustrativa en el mismo lenguaje visual (dorado sobre charcoal).
 */
export function HeroFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      role="img"
      aria-label="Ilustración de un poste de barbería"
    >
      <svg
        viewBox="0 0 120 240"
        className="h-[70%] max-h-[420px] w-auto opacity-90 drop-shadow-[0_0_40px_rgba(201,162,75,0.25)]"
        fill="none"
      >
        <ellipse cx="60" cy="228" rx="42" ry="8" fill="#c9a24b" opacity="0.12" />
        <rect x="40" y="200" width="40" height="16" rx="4" fill="#1a1214" stroke="#c9a24b" strokeWidth="1.5" />
        <rect x="52" y="150" width="16" height="52" rx="4" fill="#1a1214" stroke="#c9a24b" strokeWidth="1.2" />
        <rect x="30" y="36" width="60" height="118" rx="30" fill="#1a1214" stroke="#c9a24b" strokeWidth="1.5" />
        <path d="M30 50 L90 92 M30 92 L90 134 M30 134 L90 50" stroke="#c9a24b" strokeWidth="2" opacity="0.5" />
        <rect x="38" y="20" width="44" height="18" rx="6" fill="#1a1214" stroke="#c9a24b" strokeWidth="1.2" />
        <circle cx="60" cy="14" r="10" fill="none" stroke="#c9a24b" strokeWidth="1.5" />
        <circle cx="60" cy="14" r="4" fill="#c9a24b" opacity="0.6" />
      </svg>
    </div>
  );
}
