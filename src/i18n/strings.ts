import type { Bilingual } from "./LanguageContext";

/**
 * Diccionario de textos de interfaz (no de contenido de negocio — eso
 * vive en `src/data/*.ts`, con sus propios helpers bilingües). Cada
 * componente accede a `strings.seccion.clave[language]`.
 */
export const strings = {
  nav: {
    inicio: { es: "Inicio", en: "Home" } as Bilingual,
    servicios: { es: "Servicios", en: "Services" } as Bilingual,
    cortes: { es: "Cortes", en: "Gallery" } as Bilingual,
    resenas: { es: "Reseñas", en: "Reviews" } as Bilingual,
    horarios: { es: "Horarios", en: "Hours" } as Bilingual,
    contacto: { es: "Contacto", en: "Contact" } as Bilingual,
    openMenu: { es: "Abrir menú", en: "Open menu" } as Bilingual,
    closeMenu: { es: "Cerrar menú", en: "Close menu" } as Bilingual,
    langToggle: { es: "Switch to English", en: "Cambiar a español" } as Bilingual,
  },
  common: {
    tagline: { es: "TU ESTILO. TU BARBERÍA.", en: "YOUR STYLE. YOUR BARBERSHOP." } as Bilingual,
    agendarCita: { es: "Agendar cita", en: "Book appointment" } as Bilingual,
    agendar: { es: "Agendar", en: "Book" } as Bilingual,
  },
  hero: {
    eyebrow: { es: "THE BARBER", en: "THE BARBER" } as Bilingual,
    titleLine1: { es: "TU ESTILO.", en: "YOUR STYLE." } as Bilingual,
    titleLine2: { es: "TU BARBERÍA.", en: "YOUR BARBERSHOP." } as Bilingual,
    paragraph: {
      es: "Cortes de precisión, barba y una experiencia pensada al detalle. Reserva tu cita en menos de un minuto.",
      en: "Precision cuts, beard grooming, and an experience designed down to the last detail. Book your appointment in under a minute.",
    } as Bilingual,
    scrollHint: { es: "Desliza para explorar", en: "Scroll to explore" } as Bilingual,
    imageAlt: {
      es: "Silla de barbero clásica en un rincón de la barbería",
      en: "Classic barber chair in a corner of the barbershop",
    } as Bilingual,
  },
  services: {
    eyebrow: { es: "Servicios", en: "Services" } as Bilingual,
    title: { es: "SERVICIOS MÁS POPULARES", en: "MOST POPULAR SERVICES" } as Bilingual,
    otherTitle: { es: "OTROS SERVICIOS", en: "OTHER SERVICES" } as Bilingual,
  },
  gallery: {
    eyebrow: { es: "Galería", en: "Gallery" } as Bilingual,
    title: { es: "NUESTRO TRABAJO", en: "OUR WORK" } as Bilingual,
    description: {
      es: "Marcadores de ejemplo — este espacio está listo para fotografías reales de cortes.",
      en: "Sample placeholders — this space is ready for real photos of haircuts.",
    } as Bilingual,
    tileAlt: {
      es: "Marcador de ejemplo para el estilo",
      en: "Example placeholder for the",
    } as Bilingual,
    tileAltSuffix: {
      es: "— listo para sustituir por una fotografía real",
      en: "style — ready to be replaced with a real photo",
    } as Bilingual,
  },
  reviews: {
    eyebrow: { es: "Reseñas", en: "Reviews" } as Bilingual,
    title: { es: "LO QUE DICEN NUESTROS CLIENTES", en: "WHAT OUR CLIENTS SAY" } as Bilingual,
    description: {
      es: "Opiniones de muestra — esta web es una plantilla de portfolio, no reseñas reales de clientes.",
      en: "Sample opinions — this site is a portfolio template, not real client reviews.",
    } as Bilingual,
    badge: { es: "Ejemplo", en: "Example" } as Bilingual,
    ratingSrSuffix: { es: "de 5 estrellas", en: "out of 5 stars" } as Bilingual,
  },
  schedule: {
    eyebrow: { es: "Horarios", en: "Hours" } as Bilingual,
    title: { es: "HORARIOS", en: "HOURS" } as Bilingual,
    closed: { es: "Cerrado", en: "Closed" } as Bilingual,
  },
  contact: {
    eyebrow: { es: "Ubicación", en: "Location" } as Bilingual,
    title: { es: "ENCUÉNTRANOS", en: "FIND US" } as Bilingual,
    address: { es: "Dirección", en: "Address" } as Bilingual,
    contact: { es: "Contacto", en: "Contact" } as Bilingual,
    comoLlegar: { es: "Cómo llegar", en: "Get directions" } as Bilingual,
    mapAlt: {
      es: "Ilustración decorativa de mapa — plantilla de portfolio, no muestra una ubicación real",
      en: "Decorative map illustration — portfolio template, does not show a real location",
    } as Bilingual,
    mapCaption: { es: "Mapa de ejemplo — plantilla de portfolio", en: "Sample map — portfolio template" } as Bilingual,
  },
  footer: {
    demoNotice: {
      es: "Proyecto demo — plantilla de portfolio, no un negocio real.",
      en: "Demo project — portfolio template, not a real business.",
    } as Bilingual,
    linksAriaLabel: { es: "Enlaces del pie de página", en: "Footer links" } as Bilingual,
  },
  booking: {
    title: { es: "AGENDAR CITA", en: "BOOK APPOINTMENT" } as Bilingual,
    simulationNotice: {
      es: "Simulación — no se procesa ninguna cita real",
      en: "Simulation — no real appointment is processed",
    } as Bilingual,
    closeAriaLabel: { es: "Cerrar", en: "Close" } as Bilingual,
    closeReservationAriaLabel: { es: "Cerrar reserva", en: "Close booking" } as Bilingual,
    backAriaLabel: { es: "Paso anterior", en: "Previous step" } as Bilingual,
    progressAriaLabel: { es: "Progreso de la reserva", en: "Booking progress" } as Bilingual,
    stepLabels: {
      service: { es: "Servicio", en: "Service" } as Bilingual,
      date: { es: "Fecha", en: "Date" } as Bilingual,
      time: { es: "Hora", en: "Time" } as Bilingual,
      confirm: { es: "Confirmar", en: "Confirm" } as Bilingual,
    },
    stepService: {
      title: { es: "ELIGE TU SERVICIO", en: "CHOOSE YOUR SERVICE" } as Bilingual,
    },
    stepDate: {
      title: { es: "ELIGE FECHA", en: "CHOOSE A DATE" } as Bilingual,
      closedNotice: { es: "Los domingos permanecemos cerrados.", en: "We're closed on Sundays." } as Bilingual,
    },
    stepTime: {
      title: { es: "ELIGE HORA", en: "CHOOSE A TIME" } as Bilingual,
      loading: { es: "Consultando disponibilidad…", en: "Checking availability…" } as Bilingual,
      noSlots: {
        es: "No hay horario disponible ese día. Elige otra fecha.",
        en: "No availability that day. Please choose another date.",
      } as Bilingual,
      legend: {
        es: "Las horas tachadas ya están reservadas o ya pasaron.",
        en: "Crossed-out times are already booked or have passed.",
      } as Bilingual,
      slotTakenError: {
        es: "Justo se acaba de reservar esa hora. Elige otra, por favor.",
        en: "That time slot was just taken. Please choose another one.",
      } as Bilingual,
      genericError: {
        es: "No se pudo confirmar la cita. Inténtalo de nuevo.",
        en: "Couldn't confirm the appointment. Please try again.",
      } as Bilingual,
      bookAt: { es: "Reservar a las", en: "Book at" } as Bilingual,
      notAvailable: { es: "no disponible", en: "not available" } as Bilingual,
    },
    stepConfirm: {
      title: { es: "CITA CONFIRMADA", en: "APPOINTMENT CONFIRMED" } as Bilingual,
      service: { es: "Servicio", en: "Service" } as Bilingual,
      price: { es: "Precio", en: "Price" } as Bilingual,
      date: { es: "Fecha", en: "Date" } as Bilingual,
      time: { es: "Hora", en: "Time" } as Bilingual,
      confirmationNumber: { es: "Nº de confirmación", en: "Confirmation #" } as Bilingual,
      footerNote: {
        es: "Guarda tu número de confirmación. Te esperamos en la barbería a la hora reservada.",
        en: "Save your confirmation number. We'll see you at the barbershop at your reserved time.",
      } as Bilingual,
      done: { es: "Listo", en: "Done" } as Bilingual,
    },
  },
  whatsapp: {
    contact: { es: "Contactar por WhatsApp", en: "Contact via WhatsApp" } as Bilingual,
    ariaLabelPlaceholder: {
      es: "Contactar por WhatsApp (enlace de prueba, aún sin configurar)",
      en: "Contact via WhatsApp (test link, not yet configured)",
    } as Bilingual,
    titlePlaceholder: {
      es: "WhatsApp — enlace de prueba, todavía sin configurar",
      en: "WhatsApp — test link, not yet configured",
    } as Bilingual,
  },
};
