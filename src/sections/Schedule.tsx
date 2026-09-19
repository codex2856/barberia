import { isSchedulePlaceholder, schedule } from "../data/schedule";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";

export function Schedule() {
  const todayIndex = (new Date().getDay() + 6) % 7; // 0 = lunes

  return (
    <section id="horarios" className="bg-void py-24 sm:py-32" aria-labelledby="horarios-heading">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center">
          <SectionHeading
            id="horarios-heading"
            eyebrow="Horarios"
            title="HORARIOS"
            description={isSchedulePlaceholder ? "Horario orientativo, pendiente de confirmación definitiva." : undefined}
          />
        </RevealOnScroll>

        <RevealOnScroll className="mt-12">
          <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
            {schedule.map((day, i) => (
              <li
                key={day.day}
                className={`flex items-center justify-between px-6 py-4 sm:px-8 ${i === todayIndex ? "bg-gold/5" : ""}`}
              >
                <span
                  className={`text-sm font-semibold uppercase tracking-[0.2em] ${
                    i === todayIndex ? "text-gold" : "text-bone-dim"
                  }`}
                >
                  {day.day}
                </span>
                <span className={`font-display text-lg ${day.closed ? "text-bone-faint" : "text-bone"}`}>
                  {day.closed ? "Cerrado" : day.hours}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
