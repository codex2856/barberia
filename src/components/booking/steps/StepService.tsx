import { services, getServiceName, formatPrice, formatDuration } from "../../../data/services";
import { useBooking } from "../BookingContext";
import { useLanguage } from "../../../i18n/LanguageContext";
import { strings } from "../../../i18n/strings";

export function StepService() {
  const { serviceId, setService } = useBooking();
  const { language } = useLanguage();

  return (
    <div>
      <h3 className="font-display text-2xl text-bone">{strings.booking.stepService.title[language]}</h3>
      <ul className="mt-5 flex flex-col gap-2.5">
        {services.map((service) => {
          const selected = service.id === serviceId;
          return (
            <li key={service.id}>
              <button
                type="button"
                onClick={() => setService(service.id)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left transition-colors ${
                  selected
                    ? "border-gold bg-gold/10"
                    : "border-white/10 bg-white/[0.02] hover:border-gold/40"
                }`}
              >
                <span>
                  <span className="block font-semibold text-bone">{getServiceName(service, language)}</span>
                  <span className="block text-sm text-bone-faint">{formatDuration(service.duration, language)}</span>
                </span>
                <span className="font-display text-lg text-gold">{formatPrice(service.price, language)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
