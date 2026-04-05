import { PRODUCTS } from "@/data/catData";
import { useInView } from "@/hooks/useInView";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function MarketplaceSection() {
  const { ref, inView } = useInView();
  const [added, setAdded] = useState<number[]>([]);

  function handleAddToCart(id: number) {
    setAdded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <section
      id="marketplace"
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
            🛒 Cat Marketplace
          </span>
          <h2
            className="text-3xl font-bold font-display"
            style={{ color: "var(--becat-text)" }}
          >
            Shop for Your Cat
          </h2>
          <p
            className="mt-2 text-sm"
            style={{ color: "var(--becat-text-muted)" }}
          >
            Premium products curated for discerning cat owners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-white rounded-2xl overflow-hidden border flex flex-col transition-all hover:-translate-y-0.5"
              style={{
                borderColor: "var(--becat-border)",
                boxShadow: "0 2px 12px rgba(58,42,34,0.07)",
              }}
              data-ocid={`marketplace.item.${i + 1}`}
            >
              {/* Product image placeholder */}
              <div
                className="h-36 flex items-center justify-center text-5xl relative"
                style={{ background: "var(--becat-section-bg)" }}
              >
                {product.emoji}
                {product.badge && (
                  <span
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ background: "var(--becat-accent)" }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1 gap-2">
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full self-start"
                  style={{
                    background: "var(--becat-accent-light)",
                    color: "var(--becat-accent)",
                  }}
                >
                  {product.category}
                </span>
                <h3
                  className="text-sm font-bold font-display leading-snug"
                  style={{ color: "var(--becat-text)" }}
                >
                  {product.name}
                </h3>
                <p
                  className="text-xs line-clamp-2 flex-1"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--becat-text)" }}
                  >
                    {product.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95"
                    style={{
                      background: added.includes(product.id)
                        ? "var(--becat-accent)"
                        : "var(--becat-accent-light)",
                      color: added.includes(product.id)
                        ? "white"
                        : "var(--becat-accent)",
                    }}
                    data-ocid={`marketplace.button.${i + 1}`}
                  >
                    <ShoppingCart size={12} />
                    {added.includes(product.id) ? "Added!" : "Add"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
