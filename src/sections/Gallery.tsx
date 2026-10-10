import { galleryItems } from "../data/gallery";
import { SectionHeading } from "../components/ui/SectionHeading";
import { RevealOnScroll } from "../components/ui/RevealOnScroll";
import { GalleryTile } from "../components/GalleryTile";
import { useLanguage } from "../i18n/LanguageContext";
import { strings } from "../i18n/strings";

export function Gallery() {
  const { language } = useLanguage();

  return (
    <section id="cortes" className="bg-void py-24 sm:py-32" aria-labelledby="cortes-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center">
          <SectionHeading
            id="cortes-heading"
            eyebrow={strings.gallery.eyebrow[language]}
            title={strings.gallery.title[language]}
            description={strings.gallery.description[language]}
          />
        </RevealOnScroll>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
          {galleryItems.map((item, i) => (
            <RevealOnScroll key={item.id} delay={(i % 3) * 0.08}>
              <GalleryTile item={item} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
