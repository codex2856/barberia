import { useMemo } from "react";
import { getServiceById, getServiceName, formatPrice } from "../../../data/services";
import { useBooking } from "../BookingContext";
import { Button } from "../../ui/Button";
import { CheckIcon } from "../../ui/icons";
import { useLanguage } from "../../../i18n/LanguageContext";
import { strings } from "../../../i18n/strings";

const LOCALE: Record<"es" | "en", string> = { es: "es-ES", en: "en-US" };

export function StepConfirm() {
  const { serviceId, date, time, confirmationId, closeBooking, reset } = useBooking();
  const { language } = useLanguage();
  const service = serviceId ? getServiceById(serviceId) : undefined;

  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(LOCALE[language], { weekday: "long", day: "numeric", month: "long" }),
    [language],
  );

  function handleClose() {
    closeBooking();
    setTimeout(reset, 400);
  }

  return (
    <div className="flex flex-col items-center gap-5 py-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
        <CheckIcon className="h-7 w-7" />
      </span>
      <h3 className="font-display text-3xl text-bone">{strings.booking.stepConfirm.title[language]}</h3>
      <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left text-sm text-bone-dim">
        <p>
          <span className="text-bone-faint">{strings.booking.stepConfirm.service[language]}: </span>
          <span className="text-bone">{service && getServiceName(service, language)}</span>
        </p>
        <p className="mt-1">
          <span className="text-bone-faint">{strings.booking.stepConfirm.price[language]}: </span>
          <span className="text-gold">{service ? formatPrice(service.price, language) : ""}</span>
        </p>
        <p className="mt-1">
          <span className="text-bone-faint">{strings.booking.stepConfirm.date[language]}: </span>
          <span className="text-bone capitalize">{date && dateFormatter.format(new Date(`${date}T00:00:00`))}</span>
        </p>
        <p className="mt-1">
          <span className="text-bone-faint">{strings.booking.stepConfirm.time[language]}: </span>
          <span className="text-bone">{time}</span>
        </p>
        {confirmationId && (
          <p className="mt-3 text-xs text-bone-faint">
            {strings.booking.stepConfirm.confirmationNumber[language]}: {confirmationId}
          </p>
        )}
      </div>
      <p className="text-xs text-bone-faint">{strings.booking.stepConfirm.footerNote[language]}</p>
      <Button onClick={handleClose} className="w-full">
        {strings.booking.stepConfirm.done[language]}
      </Button>
    </div>
  );
}
