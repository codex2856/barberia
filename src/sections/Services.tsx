import { otherServices, popularServices } from "../data/services";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { ServiceCard } from "../components/ServiceCard";
import { OtherServiceRow } from "../components/OtherServiceRow";

export function Services() {
  return (
    <section id="servicios" className="relative bg-charcoal py-24 sm:py-32" aria-labelledby="servicios-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center">
          <SectionHeading id="servicios-heading" eyebrow="Servicios" title="SERVICIOS MÁS POPULARES" />
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularServices.map((service, i) => (
            <RevealOnScroll key={service.id} delay={i * 0.1}>
              <ServiceCard service={service} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mx-auto mt-24 max-w-2xl">
          <h3 className="text-center font-display text-3xl text-bone sm:text-4xl">OTROS SERVICIOS</h3>
          <ul className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] px-6 sm:px-8">
            {otherServices.map((service) => (
              <OtherServiceRow key={service.id} service={service} />
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
