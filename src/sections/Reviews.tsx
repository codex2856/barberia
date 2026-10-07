import { reviews } from "../data/reviews";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { ReviewCard } from "../components/ReviewCard";

export function Reviews() {
  return (
    <section id="resenas" className="bg-charcoal py-24 sm:py-32" aria-labelledby="resenas-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center">
          <SectionHeading
            id="resenas-heading"
            eyebrow="Reseñas"
            title="LO QUE DICEN NUESTROS CLIENTES"
            description="Opiniones de muestra — esta web es una plantilla de portfolio, no reseñas reales de clientes."
          />
          <span className="mt-4 rounded-full border border-gold/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            Ejemplo
          </span>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, i) => (
            <RevealOnScroll key={review.id} delay={(i % 4) * 0.06}>
              <ReviewCard review={review} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
