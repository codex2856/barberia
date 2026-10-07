/**
 * Datos generales de la barbería. Esta web es una plantilla de
 * portfolio — "THE BARBER" no es un negocio real; para reutilizarla con
 * un cliente real, sustituir estos valores por los suyos.
 */
export interface BarbershopInfo {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  cityPlaceholder: string;
  mapEmbedUrl: string | null;
}

export const barbershop: BarbershopInfo = {
  name: "THE BARBER",
  shortName: "TB",
  tagline: "TU ESTILO. TU BARBERÍA.",
  description:
    "Barbería premium especializada en cortes de precisión, arreglo de barba y una experiencia de cliente cuidada al detalle.",
  // Ficticios a propósito — es una plantilla de portfolio, no un negocio
  // real. El teléfono usa el patrón "000 000" y la calle es inventada
  // para que no haya ninguna duda de que no corresponden a nadie.
  phonePlaceholder: "+34 911 000 000",
  emailPlaceholder: "hola@thebarber.example",
  addressPlaceholder: "Calle del Barbero 8, Local 2",
  cityPlaceholder: "Madrid, España",
  mapEmbedUrl: null,
};
