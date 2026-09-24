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

## Imagen del Hero: spinner de producto

`HeroChairSpinner.tsx` no usa una sola foto: usa 8 fotos de la misma
silla (`public/hero/spin/frame-0.jpg` … `frame-7.jpg`), generadas todas
en una sola imagen tipo "hoja de contacto" para que coincidan
iluminación/fondo/encuadre, y luego recortadas. Al mover el cursor de
izquierda a derecha sobre el Hero cambia el frame activo, dando la
sensación de que la silla gira contigo (como un visor 360° de
producto) a lo largo de un arco de 180° (perfil izquierdo → frente →
perfil derecho). No es una rotación 3D real — son fotos fijas — así
que solo cubre ese arco, no una vuelta completa. Con
`prefers-reduced-motion` se queda fijo en el frame frontal (índice 3).

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
