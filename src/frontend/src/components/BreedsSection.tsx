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
            🐈 Breeds Guide
          </span>
          <h2
            className="text-4xl font-bold font-display"
            style={{ color: "var(--becat-text)" }}
          >
            Cat Breeds Guide
          </h2>
          <p
            className="mt-3 text-base"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Discover the world&apos;s most beloved cat breeds
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAT_BREEDS.map((breed, i) => (
            <motion.div
              key={breed.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`group bg-white rounded-2xl p-7 border-2 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-card ${breed.color}`}
              style={{ boxShadow: "0 2px 12px rgba(58,42,34,0.07)" }}
              data-ocid={`breeds.item.${i + 1}`}
            >
              {/* Cat avatar */}
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto ${breed.color}`}
              >
                {breed.emoji}
              </div>

              <div className="text-center">
                <h3
                  className="text-xl font-bold font-display"
                  style={{ color: "var(--becat-text)" }}
                >
                  {breed.name}
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  {breed.origin}
                </p>
              </div>

              <p
                className="text-sm text-center font-medium"
                style={{ color: "var(--becat-text-muted)" }}
              >
                {breed.temperament}
              </p>

              <div className="flex items-center justify-center gap-1">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${SIZE_COLORS[breed.size]}`}
                >
                  {breed.size}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 justify-center">
                {breed.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 rounded-full text-sm"
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
