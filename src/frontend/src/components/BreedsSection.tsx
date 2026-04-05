import { CAT_BREEDS } from "@/data/catData";
import { useInView } from "@/hooks/useInView";
import { motion } from "motion/react";

const SIZE_COLORS: Record<string, string> = {
  Small: "bg-green-100 text-green-700",
  Medium: "bg-blue-100 text-blue-700",
  Large: "bg-orange-100 text-orange-700",
};

export function BreedsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="breeds"
      ref={ref}
      className="py-16"
      style={{ background: "var(--becat-section-bg)" }}
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
            🐈 Breeds Guide
          </span>
          <h2
            className="text-3xl font-bold font-display"
            style={{ color: "var(--becat-text)" }}
          >
            Cat Breeds Guide
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Discover the world&apos;s most beloved cat breeds
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAT_BREEDS.map((breed, i) => (
            <motion.div
              key={breed.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group bg-white rounded-2xl p-5 border-2 flex flex-col gap-3 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-card ${breed.color}`}
              style={{ boxShadow: "0 2px 12px rgba(58,42,34,0.07)" }}
              data-ocid={`breeds.item.${i + 1}`}
            >
              {/* Cat avatar placeholder */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto ${breed.color}`}
              >
                {breed.emoji}
              </div>

              <div className="text-center">
                <h3
                  className="text-base font-bold font-display"
                  style={{ color: "var(--becat-text)" }}
                >
                  {breed.name}
                </h3>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  {breed.origin}
                </p>
              </div>

              <p
                className="text-xs text-center font-medium"
                style={{ color: "var(--becat-text-muted)" }}
              >
                {breed.temperament}
              </p>

              <div className="flex items-center justify-center gap-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${SIZE_COLORS[breed.size]}`}
                >
                  {breed.size}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 justify-center">
                {breed.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{
                      background: "var(--becat-accent-light)",
                      color: "var(--becat-accent)",
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
