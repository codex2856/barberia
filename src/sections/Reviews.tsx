import { reviews } from "../data/reviews";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { ReviewCard } from "../components/ReviewCard";
import { AnimatedNumber } from "../components/ui/AnimatedNumber";

const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

export function Reviews() {
  return (
    <section id="resenas" className="bg-charcoal py-24 sm:py-32" aria-labelledby="resenas-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center">
          <SectionHeading
            id="resenas-heading"
            eyebrow="Reseñas"
            title="LO QUE DICEN NUESTROS CLIENTES"
            description="Reseñas de ejemplo — se sustituirán por opiniones reales (Google Reviews) en cuanto estén disponibles."
          />
          <p className="mt-2 font-display text-3xl text-gold">
            <AnimatedNumber value={averageRating} decimals={1} /> / 5
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review, i) => (
            <RevealOnScroll key={review.id} delay={(i % 4) * 0.08}>
              <ReviewCard review={review} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
