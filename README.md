# The Barber

Sitio web para una barbería: una landing page completa (portada, servicios,
galería, reseñas, horarios, ubicación y contacto) con un sistema de reserva
de citas online integrado, para que un cliente pueda elegir servicio, fecha
y hora disponibles y reservar en menos de un minuto sin llamar por teléfono.

Es un proyecto de portfolio/demo — el contenido (nombre del negocio,
dirección, teléfono, reseñas, fotos) es todo de ejemplo, listo para
sustituirse por los datos reales de una barbería antes de publicarse como
sitio de producción.

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
Hero): una foto fija, sin animación de rotación ni parallax — solo la
imagen con los degradados de legibilidad encima del texto.

## Reserva de citas

El flujo de reserva (`src/components/booking`) usa una capa de
disponibilidad mock (`src/data/availability.ts`) separada de la UI mediante
la interfaz `AvailabilityProvider`. Conectar un backend real (Google
Calendar, base de datos propia, etc.) implica escribir un nuevo provider
con esa misma interfaz — y, para el envío final, sustituir
`submitBooking` en `src/data/bookingService.ts`.

**A propósito, hoy NO pide datos personales** (nombre, teléfono, email):
solo servicio, fecha y hora. El sitio todavía no tiene banner de cookies ni
política de privacidad, así que se retiró ese paso para no recoger datos de
contacto sin el aviso legal correspondiente. En cuanto haya un backend real
y ese aviso, es el momento de reintroducir un paso de contacto (existía
antes en `StepDetails.tsx`, ver el historial de git).

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
