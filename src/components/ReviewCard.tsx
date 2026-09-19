import type { Review } from "../data/reviews";
import { StarIcon } from "./ui/icons";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-gold/40">
      <div>
        <div className="flex gap-0.5 text-gold" aria-hidden>
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className={`h-4 w-4 ${i < review.rating ? "opacity-100" : "opacity-20"}`} />
          ))}
        </div>
        <span className="sr-only">{review.rating} de 5 estrellas</span>
        <blockquote className="mt-4 font-accent text-lg italic leading-relaxed text-bone-dim">
          “{review.text}”
        </blockquote>
      </div>
      <figcaption className="mt-6 text-sm font-semibold uppercase tracking-wide text-bone">
        {review.author}
      </figcaption>
    </figure>
  );
}
