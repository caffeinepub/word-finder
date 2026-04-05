import { useInView } from "@/hooks/useInView";
import { motion } from "motion/react";

const EXPLORE_CARDS = [
  {
    id: 1,
    emoji: "📸",
    title: "Cat Gallery",
    description: "Beautiful photos and illustrations from cat lovers worldwide",
    href: "#gallery",
    gradient: "linear-gradient(135deg, #fff3cd 0%, #f4a261 100%)",
  },
  {
    id: 2,
    emoji: "📰",
    title: "Cat News",
    description: "Latest stories, research, and viral cat content",
    href: "#news",
    gradient: "linear-gradient(135deg, #e8f4f8 0%, #b8d4e8 100%)",
  },
  {
    id: 3,
    emoji: "🛒",
    title: "Cat Marketplace",
    description: "Premium products curated for your beloved feline",
    href: "#marketplace",
    gradient: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)",
  },
  {
    id: 4,
    emoji: "🎨",
    title: "Cat Aesthetic",
    description: "Artistic inspiration and design content for cat lovers",
    href: "#aesthetic",
    gradient: "linear-gradient(135deg, #f0e6ff 0%, #c9b1d9 100%)",
  },
  {
    id: 5,
    emoji: "🐈",
    title: "Breeds Guide",
    description: "Comprehensive info on the world's most beloved cat breeds",
    href: "#breeds",
    gradient: "linear-gradient(135deg, #fed7aa 0%, #ea580c 50%, #c2410c 100%)",
  },
  {
    id: 6,
    emoji: "💬",
    title: "Community",
    description: "Connect with cat lovers, share stories, and get advice",
    href: "#community",
    gradient: "linear-gradient(135deg, #fce4ec 0%, #f48fb1 100%)",
  },
];

export function ExploreSection() {
  const { ref, inView } = useInView();

  function handleScrollTo(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    e.preventDefault();
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
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
          <h2
            className="text-3xl font-bold font-display"
            style={{ color: "var(--becat-text)" }}
          >
            Explore BeCat
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Everything you need as a cat lover, in one place
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXPLORE_CARDS.map((card, i) => (
            <motion.a
              key={card.id}
              href={card.href}
              onClick={(e) => handleScrollTo(e, card.href)}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white rounded-2xl overflow-hidden border flex flex-col transition-all hover:-translate-y-1 cursor-pointer no-underline"
              style={{
                borderColor: "var(--becat-border)",
                boxShadow: "0 2px 12px rgba(58,42,34,0.07)",
              }}
              data-ocid={`explore.item.${i + 1}`}
            >
              <div
                className="h-28 flex items-center justify-center text-5xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: card.gradient }}
              >
                {card.emoji}
              </div>
              <div className="p-5">
                <h3
                  className="text-base font-bold font-display mb-1"
                  style={{ color: "var(--becat-text)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  {card.description}
                </p>
                <span
                  className="text-sm font-semibold transition-colors group-hover:opacity-70"
                  style={{ color: "var(--becat-accent)" }}
                >
                  Learn More →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
