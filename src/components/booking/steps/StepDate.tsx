import { useMemo } from "react";
import { addDaysIso, todayIso } from "../../../data/availability";
import { useBooking } from "../BookingContext";

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat("es-ES", { weekday: "short" });
const DAY_FORMATTER = new Intl.DateTimeFormat("es-ES", { day: "2-digit" });
const MONTH_FORMATTER = new Intl.DateTimeFormat("es-ES", { month: "short" });

const DAYS_AHEAD = 14;

export function StepDate() {
  const { date, setDate } = useBooking();

  const days = useMemo(() => {
    const start = todayIso();
    return Array.from({ length: DAYS_AHEAD }, (_, i) => addDaysIso(start, i));
  }, []);

  return (
    <div>
      <h3 className="font-display text-2xl text-bone">ELIGE FECHA</h3>
      <div className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
        {days.map((iso) => {
          const d = new Date(`${iso}T00:00:00`);
          const isSunday = d.getDay() === 0;
          const selected = iso === date;
          return (
            <button
              key={iso}
              type="button"
              disabled={isSunday}
              onClick={() => setDate(iso)}
              aria-pressed={selected}
              className={`flex flex-col items-center gap-0.5 rounded-xl border px-2 py-3 transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                selected ? "border-gold bg-gold/10" : "border-white/10 bg-white/[0.02] hover:border-gold/40"
              }`}
            >
              <span className="text-[11px] uppercase tracking-wide text-bone-faint">
                {WEEKDAY_FORMATTER.format(d)}
              </span>
              <span className="font-display text-xl text-bone">{DAY_FORMATTER.format(d)}</span>
              <span className="text-[11px] uppercase tracking-wide text-bone-faint">{MONTH_FORMATTER.format(d)}</span>
            </button>
          );
        })}
      </div>
      {!date && <p className="mt-4 text-sm text-bone-faint">Los domingos permanecemos cerrados.</p>}
    </div>
  );
}
