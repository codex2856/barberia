/**
 * Fallback estático para navegadores/dispositivos sin soporte WebGL.
 * Silueta ilustrativa en el mismo lenguaje visual (dorado sobre charcoal).
 */
export function ChairFallback() {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      role="img"
      aria-label="Ilustración de una silla de barbería"
    >
      <svg
        viewBox="0 0 200 240"
        className="h-[70%] max-h-[420px] w-auto opacity-90 drop-shadow-[0_0_40px_rgba(201,162,75,0.25)]"
        fill="none"
      >
        <ellipse cx="100" cy="225" rx="70" ry="8" fill="#c9a24b" opacity="0.12" />
        <rect x="60" y="70" width="80" height="70" rx="10" fill="#1a1214" stroke="#c9a24b" strokeWidth="1.5" />
        <rect x="66" y="10" width="68" height="66" rx="10" fill="#1a1214" stroke="#c9a24b" strokeWidth="1.5" />
        <rect x="46" y="88" width="16" height="40" rx="6" fill="#1a1214" stroke="#c9a24b" strokeWidth="1.2" />
        <rect x="138" y="88" width="16" height="40" rx="6" fill="#1a1214" stroke="#c9a24b" strokeWidth="1.2" />
        <rect x="92" y="140" width="16" height="50" fill="#c9cbd2" opacity="0.7" />
        <ellipse cx="100" cy="196" rx="46" ry="10" fill="#c9cbd2" opacity="0.7" />
        <ellipse cx="100" cy="196" rx="46" ry="10" stroke="#c9a24b" strokeWidth="1" />
        <circle cx="100" cy="168" r="18" fill="none" stroke="#c9a24b" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
}
