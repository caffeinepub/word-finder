import { TRENDING_SEARCHES } from "@/data/catData";
import { useWeather } from "@/hooks/useWeather";
import { Mic, ScanSearch, Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const CINEMATIC_BG = "/assets/generated/cinematic-landscape.dim_1920x1080.jpg";

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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

  return (
    <section
      id="search"
      className="relative overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "600px",
        backgroundImage: `url(${CINEMATIC_BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Cinematic overlay — lighter to preserve landscape drama */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.38) 100%)",
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
            style={{
              color: "white",
              fontFamily: "var(--font-display)",
              textShadow: "0 1px 8px rgba(0,0,0,0.45)",
            }}
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
          transition={{ duration: 0.7 }}
        >
          <h1
            className="font-bold mb-3"
            style={{
              color: "white",
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              fontFamily: "var(--font-display)",
              textShadow:
                "0 2px 16px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.35)",
              letterSpacing: "-0.02em",
            }}
          >
            BeCat.Tech
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl"
            style={{
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 1px 8px rgba(0,0,0,0.45)",
            }}
          >
            Search the world, discover every cat 🐾
          </p>
        </motion.div>

        {/* Glassmorphism pill search bar */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl sm:max-w-3xl mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            transform: isFocused ? "scale(1.012)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
        >
          <div
            className="glass-search-bar flex items-center rounded-full pl-5 sm:pl-6 pr-2"
            style={{
              background: isFocused
                ? "rgba(255,255,255,0.24)"
                : "rgba(255,255,255,0.18)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
              height: "clamp(56px, 8vw, 66px)",
              transition: "background 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {/* Left: Search icon */}
            <span
              className="flex-shrink-0 mr-3 flex items-center justify-center"
              aria-hidden="true"
            >
              <Search size={20} style={{ color: "rgba(255,255,255,0.9)" }} />
            </span>

            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search anything…"
              className="glass-search-input flex-1 bg-transparent outline-none min-w-0 border-none"
              style={{
                color: "rgba(255,255,255,0.95)",
                fontSize: "clamp(16px, 2.2vw, 18px)",
                fontFamily: "var(--font-body)",
              }}
              data-ocid="search.input"
            />

            {/* Divider between input and right icons */}
            <div
              className="flex-shrink-0 self-stretch mx-2"
              style={{
                width: "1px",
                background: "rgba(255,255,255,0.3)",
                margin: "12px 8px",
              }}
              aria-hidden="true"
            />

            {/* Right icons group */}
            <div className="flex items-center gap-0.5 mr-2">
              {/* Microphone icon */}
              <button
                type="button"
                aria-label="Voice search"
                className="glass-icon-btn flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 hover:scale-105 active:scale-95"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
                data-ocid="search.secondary_button"
              >
                <Mic size={20} style={{ color: "rgba(255,255,255,0.9)" }} />
              </button>

              {/* Thin divider between mic and lens */}
              <div
                className="flex-shrink-0 self-stretch"
                style={{
                  width: "1px",
                  background: "rgba(255,255,255,0.3)",
                  margin: "10px 4px",
                }}
                aria-hidden="true"
              />

              {/* Lens / Visual search icon */}
              <button
                type="button"
                aria-label="Visual search"
                className="glass-icon-btn flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-150 hover:scale-105 active:scale-95"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                }}
                data-ocid="search.upload_button"
              >
                <ScanSearch
                  size={20}
                  style={{ color: "rgba(255,255,255,0.9)" }}
                />
              </button>
            </div>

            {/* Submit search button */}
            <button
              type="submit"
              className="flex-shrink-0 flex items-center justify-center rounded-full transition-all hover:opacity-90 active:scale-95"
              style={{
                background: "oklch(74% 0.16 55)",
                width: "44px",
                height: "44px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(244,162,97,0.4)",
              }}
              aria-label="Search"
              data-ocid="search.submit_button"
            >
              <Search size={18} style={{ color: "white" }} />
            </button>
          </div>
        </motion.form>

        {/* Trending searches */}
        <motion.div
          className="flex flex-wrap gap-2 sm:gap-2.5 justify-center items-center max-w-3xl px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
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
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1.5px solid rgba(255,255,255,0.28)",
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

      {/* Bottom-right: weather widget */}
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
