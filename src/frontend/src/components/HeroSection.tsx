import { Badge } from "@/components/ui/badge";
import { TRENDING_SEARCHES } from "@/data/catData";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  }

  function handleTrending(term: string) {
    setQuery(term);
    onSearch(term);
  }

  function handleFeelPawsome() {
    const random =
      TRENDING_SEARCHES[Math.floor(Math.random() * TRENDING_SEARCHES.length)];
    setQuery(random);
    onSearch(random);
  }

  return (
    <section
      id="search"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #fff 0%, var(--becat-section-bg) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="flex items-center justify-center gap-8 lg:gap-16">
          {/* Left: Text + Search */}
          <motion.div
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "var(--becat-accent-light)",
                  color: "var(--becat-accent)",
                }}
              >
                🐾 The Cat Lover's Search Engine
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-4"
              style={{ color: "var(--becat-text)" }}
            >
              Welcome to{" "}
              <span style={{ color: "var(--becat-accent)" }}>BeCat.Tech</span>{" "}
              🐱
            </h1>

            <p
              className="text-lg mb-8 max-w-md"
              style={{ color: "var(--becat-text-muted)" }}
            >
              Your purr-fect search destination for everything cats
            </p>

            {/* Search bar */}
            <form onSubmit={handleSubmit} className="w-full max-w-xl mb-5">
              <div
                className="flex items-center rounded-full bg-white pl-5 pr-2 py-2"
                style={{
                  border: "2px solid var(--becat-border)",
                  boxShadow: "0 4px 20px rgba(58,42,34,0.10)",
                  height: "56px",
                }}
              >
                <Search
                  size={20}
                  style={{ color: "var(--becat-text-muted)" }}
                  className="mr-3 flex-shrink-0"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for everything cat…"
                  className="flex-1 bg-transparent outline-none text-base"
                  style={{ color: "var(--becat-text)", fontSize: "16px" }}
                  data-ocid="search.input"
                />
                <button
                  type="submit"
                  className="ml-2 flex-shrink-0 w-10 h-10 rounded-full text-white text-sm font-semibold flex items-center justify-center transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "var(--becat-accent)" }}
                  aria-label="Search"
                  data-ocid="search.submit_button"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>

            {/* CTA buttons */}
            <div className="flex items-center gap-3 mb-6 flex-wrap justify-center lg:justify-start">
              <button
                type="button"
                onClick={handleSubmit as unknown as React.MouseEventHandler}
                className="px-6 py-2.5 rounded-full font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: "var(--becat-accent)" }}
                data-ocid="search.primary_button"
              >
                Search Cats
              </button>
              <button
                type="button"
                onClick={handleFeelPawsome}
                className="px-6 py-2.5 rounded-full font-semibold text-sm border-2 transition-all hover:bg-secondary active:scale-95"
                style={{
                  borderColor: "var(--becat-accent)",
                  color: "var(--becat-accent)",
                  background: "white",
                }}
                data-ocid="search.secondary_button"
              >
                Feeling Pawsome 🐾
              </button>
            </div>

            {/* Trending chips */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span
                className="text-xs font-medium"
                style={{ color: "var(--becat-text-muted)" }}
              >
                Trending:
              </span>
              {TRENDING_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleTrending(term)}
                  className="px-3 py-1 rounded-full text-xs font-medium border transition-all hover:border-opacity-60 hover:shadow-sm"
                  style={{
                    background: "white",
                    borderColor: "var(--becat-border)",
                    color: "var(--becat-text-muted)",
                  }}
                  data-ocid="search.tab"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right: Cat illustration */}
          <motion.div
            className="hidden lg:block flex-shrink-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(circle, #f4a261 0%, transparent 70%)",
                }}
              />
              <img
                src="/assets/generated/hero-cat-transparent.dim_400x400.png"
                alt="Cute sitting cat illustration"
                className="relative w-72 h-72 object-contain animate-float"
                style={{
                  filter: "drop-shadow(0 8px 24px rgba(58,42,34,0.12))",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
