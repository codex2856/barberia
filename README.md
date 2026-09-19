# The Barber

Web premium para una barbería, construida como experiencia inmersiva 3D: una
silla de barbería en Three.js/React Three Fiber como pieza central del Hero,
reserva de citas integrada y todo el contenido comercial (servicios, horarios,
reseñas, ubicación) en HTML semántico y accesible.

**"The Barber" es un nombre provisional** — ver `src/data/barbershop.ts` para
cambiarlo, junto con el resto de datos del negocio (horarios, dirección,
teléfono, redes sociales), sin tocar ningún componente.

## Stack

- React 19 + Vite + TypeScript
- Three.js + React Three Fiber + @react-three/drei
- GSAP + ScrollTrigger para animaciones de scroll
- Lenis para smooth scrolling
- Tailwind CSS v4

## Estructura

```
src/
  3d/           escena 3D del Hero (silla, luces, cámara, interacción)
  components/   componentes de UI y de la reserva
  data/         contenido editable: servicios, horarios, reseñas, redes…
  hooks/        hooks de dispositivo, media queries, scroll
  sections/     secciones de la landing (Hero, Servicios, Galería…)
  utils/        heurísticas de rendimiento/capacidad del dispositivo
```

## La silla 3D

Hoy es un modelo procedural (primitivas de Three.js) pensado como
placeholder: reproduce la silueta de una silla de barbería sin depender de
un archivo externo. Cuando haya un modelo GLB/GLTF real, basta con:

1. Colocarlo en `public/models/barber-chair.glb`.
2. Definir `CHAIR_MODEL_URL` en `src/3d/BarberChair.tsx`.

El resto de la interacción (rotación por cursor/drag, reacción al scroll,
iluminación) no cambia.

## Reserva de citas

El flujo de reserva (`src/components/booking`) usa una capa de
disponibilidad mock (`src/data/availability.ts`) separada de la UI mediante
la interfaz `AvailabilityProvider`. Conectar un backend real (Google
Calendar, base de datos propia, etc.) implica escribir un nuevo provider
con esa misma interfaz — y, para el envío final, sustituir
`submitBooking` en `src/data/bookingService.ts`.

## Contenido placeholder

Reseñas, horarios, dirección, teléfono, email y fotografías de la galería
son datos de ejemplo, marcados explícitamente como tales en sus archivos de
datos (`src/data/*.ts`). Sustituir por la información real del negocio
antes de publicar.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```
