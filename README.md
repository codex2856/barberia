# The Barber

Web premium para una barbería: imagen de portada en el Hero, reserva de
citas integrada y todo el contenido comercial (servicios, horarios, reseñas,
ubicación) en HTML semántico y accesible.

**"The Barber" es un nombre provisional** — ver `src/data/barbershop.ts` para
cambiarlo, junto con el resto de datos del negocio (horarios, dirección,
teléfono, redes sociales), sin tocar ningún componente.

## Stack

- React 19 + Vite + TypeScript
- GSAP + ScrollTrigger para animaciones de scroll
- Lenis para smooth scrolling
- Tailwind CSS v4

## Estructura

```
src/
  components/   componentes de UI y de la reserva
  data/         contenido editable: servicios, horarios, reseñas, redes…
  hooks/        hooks de media queries, scroll, reduced motion
  sections/     secciones de la landing (Hero, Servicios, Galería…)
```

## Imagen del Hero

`Hero.tsx` espera el archivo `public/hero/barbershop.jpg` (portada del
Hero). Mientras no exista, el `<img>` simplemente no se pinta (hay un
`onError` que lo oculta) y queda el fondo sólido de la sección — nada se
rompe, solo falta la foto.

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
