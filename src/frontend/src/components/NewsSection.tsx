import { CAT_NEWS } from "@/data/catData";
import { useInView } from "@/hooks/useInView";
import { motion } from "motion/react";

const CATEGORY_COLORS: Record<string, string> = {
  Science: "bg-blue-100 text-blue-700",
  Breeds: "bg-orange-100 text-orange-700",
  Lifestyle: "bg-green-100 text-green-700",
  Health: "bg-red-100 text-red-700",
  Art: "bg-purple-100 text-purple-700",
};

export function NewsSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="news"
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
            📰 Cat News
          </span>
          <h2
            className="text-3xl font-bold font-display"
            style={{ color: "var(--becat-text)" }}
          >
            Latest Cat Stories
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Stay up to date with the purr-fect world of cats
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAT_NEWS.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-2xl p-6 border flex flex-col gap-3 cursor-pointer transition-all hover:-translate-y-0.5"
              style={{
                borderColor: "var(--becat-border)",
                boxShadow: "0 2px 12px rgba(58,42,34,0.07)",
              }}
              data-ocid={`news.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-3xl">{item.emoji}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    CATEGORY_COLORS[item.category] ??
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.category}
                </span>
              </div>
              <h3
                className="text-base font-bold font-display leading-snug group-hover:opacity-80 transition-opacity"
                style={{ color: "var(--becat-text)" }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm line-clamp-3 flex-1"
                style={{ color: "var(--becat-text-muted)" }}
              >
                {item.summary}
              </p>
              <div
                className="flex items-center justify-between pt-2 border-t text-xs"
                style={{
                  borderColor: "var(--becat-border)",
                  color: "var(--becat-text-muted)",
                }}
              >
                <span>{item.date}</span>
                <button
                  type="button"
                  className="font-semibold transition-colors hover:opacity-70"
                  style={{ color: "var(--becat-accent)" }}
                >
                  Learn More
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
