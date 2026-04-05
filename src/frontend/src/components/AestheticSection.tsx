import { AESTHETIC_ITEMS } from "@/data/catData";
import { useInView } from "@/hooks/useInView";
import { motion } from "motion/react";

export function AestheticSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="aesthetic"
      ref={ref}
      className="py-16"
      style={{ background: "var(--becat-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
            style={{
              background: "var(--becat-accent-light)",
              color: "var(--becat-accent)",
            }}
          >
            🎨 Cat Aesthetic
          </span>
          <h2
            className="text-3xl font-bold font-display"
            style={{ color: "var(--becat-text)" }}
          >
            Artistic Cat Inspiration
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Design inspiration and artistic cat content for the creative soul
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AESTHETIC_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ boxShadow: "0 4px 16px rgba(58,42,34,0.09)" }}
              data-ocid={`aesthetic.item.${i + 1}`}
            >
              <div
                className="h-48 flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105"
                style={{ background: item.gradient }}
              >
                <span className="text-5xl">{item.emoji}</span>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-center"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
                }}
              >
                <span className="text-white font-semibold text-sm">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
