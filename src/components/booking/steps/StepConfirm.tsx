import { getServiceById, formatPrice } from "../../../data/services";
import { useBooking } from "../BookingContext";
import { Button } from "../../ui/Button";
import { CheckIcon } from "../../ui/icons";

const DATE_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export function StepConfirm() {
  const { serviceId, date, time, details, confirmationId, closeBooking, reset } = useBooking();
  const service = serviceId ? getServiceById(serviceId) : undefined;

  function handleClose() {
    closeBooking();
    setTimeout(reset, 400);
  }

  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
        <CheckIcon className="h-7 w-7" />
      </span>
      <h3 className="font-display text-3xl text-bone">CITA CONFIRMADA</h3>
      <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left text-sm text-bone-dim">
        <p>
          <span className="text-bone-faint">Servicio: </span>
          <span className="text-bone">{service?.name}</span>
        </p>
        <p className="mt-1">
          <span className="text-bone-faint">Precio: </span>
          <span className="text-gold">{service ? formatPrice(service.price) : ""}</span>
        </p>
        <p className="mt-1">
          <span className="text-bone-faint">Fecha: </span>
          <span className="text-bone capitalize">{date && DATE_FORMATTER.format(new Date(`${date}T00:00:00`))}</span>
        </p>
        <p className="mt-1">
          <span className="text-bone-faint">Hora: </span>
          <span className="text-bone">{time}</span>
        </p>
        <p className="mt-1">
          <span className="text-bone-faint">A nombre de: </span>
          <span className="text-bone">{details.name}</span>
        </p>
        {confirmationId && (
          <p className="mt-3 text-xs text-bone-faint">Nº de confirmación: {confirmationId}</p>
        )}
      </div>
      <p className="text-xs text-bone-faint">
        Recibirás la confirmación en {details.email || "tu email"}. (Simulado — sin envío real todavía.)
      </p>
      <Button onClick={handleClose} className="w-full">
        Listo
      </Button>
    </div>
  );
}
