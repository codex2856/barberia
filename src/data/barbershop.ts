/**
 * Datos generales de la barbería.
 * TODO: sustituir por la información real del negocio cuando esté disponible.
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
  // Placeholders — reemplazar por los datos reales del negocio.
  phonePlaceholder: "+34 600 000 000",
  emailPlaceholder: "hola@thebarber.example",
  addressPlaceholder: "Calle Ejemplo 123, Local 1",
  cityPlaceholder: "Ciudad, España",
  mapEmbedUrl: null,
};
