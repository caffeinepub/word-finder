import { TRENDING_SEARCHES } from "@/data/catData";
import { useWeather } from "@/hooks/useWeather";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const FILTER_TABS = ["All", "Images", "News", "Videos", "Maps"] as const;

const CAT_BG = "/assets/generated/becat-hero-bg.dim_1920x1080.jpg";

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
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 sm:px-8 lg:px-12 py-5">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2.5"
        >
          <span className="text-3xl">🐱</span>
          <span
            className="font-bold text-xl sm:text-2xl tracking-tight"
            style={{ color: "white", fontFamily: "var(--font-display)" }}
          >
            BeCat<span style={{ color: "#f4a261" }}>.Tech</span>
          </span>
        </motion.div>
      </div>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 z-10"
        style={{ paddingTop: "80px", paddingBottom: "100px" }}
      >
        {/* Brand heading */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="font-bold mb-3"
            style={{
              color: "white",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontFamily: "var(--font-display)",
              textShadow: "0 2px 12px rgba(0,0,0,0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            BeCat.Tech
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl"
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
          className="w-full max-w-xl sm:max-w-2xl mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            className="hero-search-bar flex items-center rounded-full bg-white pl-5 sm:pl-6 pr-2 py-2"
            style={{
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.4), 0 2px 12px rgba(0,0,0,0.25)",
              height: "64px",
              border: "2px solid rgba(255,255,255,0.6)",
              outline: "2px solid rgba(244,162,97,0.3)",
              outlineOffset: "2px",
            }}
          >
            {/* Search icon with accent background */}
            <span
              className="flex-shrink-0 mr-3 sm:mr-4 flex items-center justify-center w-9 h-9 rounded-full"
              style={{ background: "rgba(244,162,97,0.12)" }}
            >
              <Search size={18} style={{ color: "#d4722a" }} />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anything…"
              className="flex-1 bg-transparent outline-none min-w-0"
              style={{
                color: "#1a1a1a",
                fontSize: "clamp(16px, 2.5vw, 19px)",
                fontFamily: "var(--font-body)",
              }}
              data-ocid="search.input"
            />
            <button
              type="button"
              onClick={handleFeelPawsome}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[14px] font-medium mr-2 transition-all hover:bg-orange-50 active:scale-95 whitespace-nowrap"
              style={{ color: "var(--becat-accent)" }}
              data-ocid="search.secondary_button"
            >
              🐾 Feeling Pawsome
            </button>
            <button
              type="submit"
              className="flex-shrink-0 h-11 px-5 sm:px-7 rounded-full text-white text-sm sm:text-base font-semibold flex items-center gap-2 transition-all hover:opacity-90 active:scale-95"
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
          className="flex items-center gap-2 sm:gap-2.5 mb-5 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          role="tablist"
          aria-label="Search filter tabs"
        >
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab}
              onClick={() => setActiveFilter(tab)}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 select-none"
              style={{
                background:
                  activeFilter === tab
                    ? "rgba(255,255,255,0.97)"
                    : "rgba(255,255,255,0.12)",
                color:
                  activeFilter === tab ? "#1a1a1a" : "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border:
                  activeFilter === tab
                    ? "2px solid rgba(255,255,255,0.9)"
                    : "1.5px solid rgba(255,255,255,0.28)",
                boxShadow:
                  activeFilter === tab ? "0 4px 16px rgba(0,0,0,0.18)" : "none",
              }}
              data-ocid="search.tab"
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Trending searches */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-2.5 justify-center items-center max-w-2xl px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span
            className="text-sm sm:text-base font-bold tracking-wide"
            style={{
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            Trending:
          </span>
          {TRENDING_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleTrending(term)}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 hover:bg-white/25 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.14)",
                color: "rgba(255,255,255,0.93)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1.5px solid rgba(255,255,255,0.25)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
        className="absolute bottom-5 sm:bottom-6 left-4 sm:left-6 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p
          className="text-2xl sm:text-3xl font-bold leading-none mb-0.5"
          style={{
            color: "white",
            fontFamily: "var(--font-display)",
            textShadow: "0 1px 8px rgba(0,0,0,0.5)",
          }}
        >
          {timeStr}
        </p>
        <p
          className="text-xs sm:text-sm"
          style={{
            color: "rgba(255,255,255,0.7)",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          {dateStr}
        </p>
      </motion.div>

      {/* Bottom-right: weather widget — no city name */}
      <motion.div
        className="absolute bottom-5 sm:bottom-6 right-4 sm:right-6 z-10 text-right"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        {weather.loading ? (
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
            Loading weather…
          </div>
        ) : (
          <>
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 mb-0.5">
              <span className="text-xl sm:text-2xl">{weather.catEmoji}</span>
              <span
                className="text-2xl sm:text-3xl font-bold leading-none"
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
              className="text-xs sm:text-sm"
              style={{
                color: "rgba(255,255,255,0.8)",
                textShadow: "0 1px 4px rgba(0,0,0,0.4)",
              }}
            >
              {weather.condition}
            </p>
          </>
        )}
      </motion.div>
    </section>
  );
}
