import { useState } from "react";
import { cancelBooking, getAllBookings } from "../data/bookingStore";
import { getServiceById } from "../data/services";
import { todayIso } from "../data/availability";
import { AdminButton } from "./ui";

const dateFormatter = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long" });

export function BookingsTab() {
  const [bookings, setBookings] = useState(getAllBookings);
  const [onlyUpcoming, setOnlyUpcoming] = useState(true);
  const [confirming, setConfirming] = useState<string | null>(null);

  const today = todayIso();
  const visible = bookings.filter((b) => !onlyUpcoming || b.date >= today);
  const byDate = visible.reduce<Record<string, typeof visible>>((acc, b) => {
    (acc[b.date] ??= []).push(b);
    return acc;
  }, {});

  function handleCancel(id: string) {
    cancelBooking(id);
    setBookings(getAllBookings());
    setConfirming(null);
  }

  return (
    <section aria-labelledby="tab-bookings">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="tab-bookings" className="font-display text-2xl text-bone">
          Citas ({visible.length})
        </h2>
        <label className="flex items-center gap-2 text-sm text-bone-dim">
          <input type="checkbox" checked={onlyUpcoming} onChange={(e) => setOnlyUpcoming(e.target.checked)} />
          Solo de hoy en adelante
        </label>
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-lg border border-white/10 p-6 text-sm text-bone-dim">
          Todavía no hay citas. Cuando alguien reserve desde la web, aparecerá aquí.
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          {Object.entries(byDate).map(([date, list]) => (
            <div key={date}>
              <h3 className="font-display text-lg capitalize text-gold">
                {dateFormatter.format(new Date(`${date}T00:00:00`))}
              </h3>
              <ul className="mt-2 divide-y divide-white/10 rounded-lg border border-white/10">
                {list.map((b) => (
                  <li key={b.confirmationId} className="flex flex-wrap items-center justify-between gap-3 p-3">
                    <div>
                      <p className="text-sm text-bone">
                        <span className="font-semibold">{b.time}</span> · {getServiceById(b.serviceId)?.name ?? b.serviceId}
                      </p>
                      <p className="text-xs text-bone-faint">Código {b.confirmationId}</p>
                    </div>
                    {confirming === b.confirmationId ? (
                      <div className="flex gap-2">
                        <AdminButton tone="danger" onClick={() => handleCancel(b.confirmationId)}>
                          Sí, cancelar
                        </AdminButton>
                        <AdminButton onClick={() => setConfirming(null)}>No</AdminButton>
                      </div>
                    ) : (
                      <AdminButton onClick={() => setConfirming(b.confirmationId)}>Cancelar cita</AdminButton>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-bone-faint">
        En esta demo las citas se guardan en el navegador de quien reserva, así que aquí solo ves las hechas desde
        este mismo navegador. Con un servidor, verías las de todos los clientes.
      </p>
    </section>
  );
}
