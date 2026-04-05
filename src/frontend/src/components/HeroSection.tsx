import { TRENDING_SEARCHES } from "@/data/catData";
import { useWeather } from "@/hooks/useWeather";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const FILTER_TABS = ["All", "Images", "News", "Videos", "Maps"] as const;

const CAT_BG =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1920&q=80";

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement>(null);
  const [now, setNow] = useState(new Date());
  const weather = useWeather();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

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
        height: "100vh",
        minHeight: "600px",
        backgroundImage: `url(${CAT_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Top bar: Logo */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 sm:px-10 py-5">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5"
        >
          <span className="text-2xl">🐱</span>
          <span
            className="font-bold text-xl tracking-tight"
            style={{ color: "white", fontFamily: "var(--font-display)" }}
          >
            BeCat<span style={{ color: "#f4a261" }}>.Tech</span>
          </span>
        </motion.div>
      </div>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10"
        style={{ paddingTop: "80px", paddingBottom: "80px" }}
      >
        {/* Brand heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="font-bold mb-3"
            style={{
              color: "white",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontFamily: "var(--font-display)",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            BeCat.Tech
          </h1>
          <p
            className="text-lg sm:text-xl"
            style={{
              color: "rgba(255,255,255,0.88)",
              textShadow: "0 1px 6px rgba(0,0,0,0.4)",
            }}
          >
            Search the world, discover every cat 🐾
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            className="hero-search-bar flex items-center rounded-full bg-white pl-5 pr-2 py-2"
            style={{
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
              height: "58px",
            }}
          >
            <Search
              size={20}
              className="mr-3 flex-shrink-0"
              style={{ color: "#777" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything…"
              className="flex-1 bg-transparent outline-none"
              style={{
                color: "#1a1a1a",
                fontSize: "17px",
                fontFamily: "var(--font-body)",
              }}
              data-ocid="search.input"
            />
            <button
              type="button"
              onClick={handleFeelPawsome}
              className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium mr-1 transition-all hover:bg-orange-50 active:scale-95"
              style={{
                color: "var(--becat-accent)",
                whiteSpace: "nowrap",
                fontSize: "13px",
              }}
              data-ocid="search.secondary_button"
            >
              🐾 Feeling Pawsome
            </button>
            <button
              type="submit"
              className="flex-shrink-0 h-10 px-5 rounded-full text-white text-sm font-semibold flex items-center gap-2 transition-all hover:opacity-90 active:scale-95"
              style={{ background: "var(--becat-accent)" }}
              aria-label="Search"
              data-ocid="search.submit_button"
            >
              <Search size={15} />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </motion.form>

        {/* Filter tabs */}
        <motion.div
          className="flex items-center gap-2 mb-5 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background:
                  activeFilter === tab
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.15)",
                color:
                  activeFilter === tab ? "#1a1a1a" : "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                border:
                  activeFilter === tab
                    ? "1.5px solid rgba(255,255,255,0.8)"
                    : "1.5px solid rgba(255,255,255,0.3)",
              }}
              data-ocid="search.tab"
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Trending searches */}
        <motion.div
          className="flex flex-wrap gap-2 justify-center items-center max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span
            className="text-xs font-medium"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Trending:
          </span>
          {TRENDING_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleTrending(term)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all hover:bg-white/30 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              data-ocid="search.tab"
            >
              {term}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Bottom-left: clock + date */}
      <motion.div
        className="absolute bottom-6 left-6 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p
          className="text-3xl font-bold leading-none mb-0.5"
          style={{
            color: "white",
            fontFamily: "var(--font-display)",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}
        >
          {timeStr}
        </p>
        <p
          className="text-sm"
          style={{
            color: "rgba(255,255,255,0.7)",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          {dateStr}
        </p>
      </motion.div>

      {/* Bottom-right: weather widget */}
      <motion.div
        className="absolute bottom-6 right-6 z-10 text-right"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        {weather.loading ? (
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
            Loading weather…
          </div>
        ) : (
          <>
            <div className="flex items-center justify-end gap-2 mb-0.5">
              <span className="text-2xl">{weather.catEmoji}</span>
              <span
                className="text-3xl font-bold leading-none"
                style={{
                  color: "white",
                  fontFamily: "var(--font-display)",
                  textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                }}
              >
                {weather.temp}°C
              </span>
            </div>
            <p
              className="text-sm"
              style={{
                color: "rgba(255,255,255,0.8)",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              {weather.condition}
            </p>
            <p
              className="text-xs"
              style={{
                color: "rgba(255,255,255,0.6)",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              {weather.cityName}
            </p>
          </>
        )}
      </motion.div>
    </section>
  );
}
