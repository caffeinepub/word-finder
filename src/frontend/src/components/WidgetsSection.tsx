import { Skeleton } from "@/components/ui/skeleton";
import { CAT_NEWS } from "@/data/catData";
import { useInView } from "@/hooks/useInView";
import { useWeather } from "@/hooks/useWeather";
import { motion } from "motion/react";

function getPurrMessage(condition: string): string {
  switch (condition) {
    case "Clear Sky":
      return "Purr-fect day for a sunbath! ☀️";
    case "Partly Cloudy":
      return "Ideal for window watching 🪟";
    case "Foggy":
      return "Mysterious vibes, stay cozy 🌫️";
    case "Rainy":
      return "Curl up and purr 🌧️";
    case "Snowy":
      return "Snow paws! Stay warm indoors ❄️";
    case "Showers":
      return "Perfect nap weather 💤";
    case "Thunderstorm":
      return "Hide under the blanket! ⛈️";
    default:
      return "A good day for cat things 🐾";
  }
}

export function WidgetsSection() {
  const weather = useWeather();
  const { ref, inView } = useInView();

  const newsItems = CAT_NEWS.slice(0, 3);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="widgets"
      className="py-10"
      style={{ background: "var(--becat-section-bg)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col lg:flex-row gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* ── Weather Card ── */}
          <div
            className="w-full lg:w-2/5 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, oklch(96% 0.035 60) 0%, oklch(93% 0.05 55) 100%)",
              border: "1px solid var(--becat-border)",
              boxShadow: "0 4px 18px rgba(58,42,34,0.10)",
              minHeight: "200px",
            }}
            data-ocid="widgets.card"
          >
            {weather.loading ? (
              <div className="flex flex-col gap-3">
                <Skeleton className="h-5 w-32 rounded-full" />
                <Skeleton className="h-12 w-24 rounded-xl" />
                <Skeleton className="h-4 w-28 rounded-full" />
                <Skeleton className="h-4 w-full rounded-full" />
              </div>
            ) : (
              <>
                {/* City + emoji */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--becat-text-muted)" }}
                    >
                      📍 {weather.cityName}
                    </p>
                  </div>
                  <span className="text-3xl">{weather.catEmoji}</span>
                </div>

                {/* Temp */}
                <div className="mb-1">
                  <span
                    className="text-5xl font-bold leading-none"
                    style={{ color: "var(--becat-text)" }}
                  >
                    {weather.temp}°C
                  </span>
                </div>

                {/* Condition */}
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "var(--becat-accent)" }}
                >
                  {weather.condition}
                </p>

                {/* Details row */}
                <p
                  className="text-xs mb-3"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  Feels like {weather.feelsLike}°C&nbsp;&nbsp; 💧{" "}
                  {weather.humidity}%&nbsp;&nbsp; 🌬️ {weather.windSpeed} km/h
                </p>

                {/* Purr message */}
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    color: "var(--becat-text)",
                  }}
                >
                  <img
                    src="/assets/generated/hero-cat-transparent.dim_400x400.png"
                    alt="cat"
                    className="w-7 h-7 object-contain flex-shrink-0"
                  />
                  <span>{getPurrMessage(weather.condition)}</span>
                </div>
              </>
            )}
          </div>

          {/* ── Cat News Cards ── */}
          <div className="flex-1 flex flex-col gap-3">
            <h2
              className="text-base font-bold font-display flex items-center gap-2"
              style={{ color: "var(--becat-text)" }}
            >
              <span className="text-xl">📰</span> Today's Cat News
            </h2>

            {newsItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-xl px-4 py-3 flex items-start gap-3 border hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
                style={{
                  borderColor: "var(--becat-border)",
                  boxShadow: "0 2px 8px rgba(58,42,34,0.06)",
                }}
                data-ocid={`widgets.item.${i + 1}`}
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">
                  {item.emoji}
                </span>
                <div className="min-w-0">
                  <h3
                    className="text-sm font-semibold leading-snug line-clamp-2 mb-1"
                    style={{ color: "var(--becat-text)" }}
                  >
                    {item.title}
                  </h3>
                  <div
                    className="flex items-center gap-2 text-xs"
                    style={{ color: "var(--becat-text-muted)" }}
                  >
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: "var(--becat-accent-light)",
                        color: "var(--becat-accent)",
                      }}
                    >
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Use button instead of anchor for same-page scroll */}
            <button
              type="button"
              onClick={() =>
                document
                  .querySelector("#news")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm font-semibold self-start transition-colors hover:opacity-70"
              style={{ color: "var(--becat-accent)" }}
              data-ocid="widgets.button"
            >
              See all news ↓
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
