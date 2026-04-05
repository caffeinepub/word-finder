import { GALLERY_ITEMS } from "@/data/catData";
import { useInView } from "@/hooks/useInView";
import { motion } from "motion/react";

export function GallerySection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="gallery"
      ref={ref}
      className="py-24"
      style={{ background: "var(--becat-section-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "var(--becat-accent-light)",
              color: "var(--becat-accent)",
            }}
          >
            📸 Cat Gallery
          </span>
          <h2
            className="text-4xl font-bold font-display"
            style={{ color: "var(--becat-text)" }}
          >
            Beautiful Cat Moments
          </h2>
          <p
            className="mt-3 text-base"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Curated photos and illustrations from around the cat-loving world
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ boxShadow: "0 2px 12px rgba(58,42,34,0.08)" }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <div
                className="aspect-square flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105"
                style={{ background: item.gradient }}
              >
                <span className="text-6xl mb-3">{item.emoji}</span>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-sm font-semibold text-white text-center"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
                }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
