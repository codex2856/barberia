/**
 * Heurísticas de capacidad del dispositivo para decidir cuánta
 * complejidad 3D/animada ofrecer sin sacrificar rendimiento.
 */

export function supportsWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  return cores <= 4 || memory <= 4;
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function getDprCap(isMobile: boolean, lowEnd: boolean): [number, number] {
  if (lowEnd) return [1, 1];
  if (isMobile) return [1, 1.5];
  return [1, 2];
}
