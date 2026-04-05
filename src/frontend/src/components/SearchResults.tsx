import { SEARCH_RESULTS, type SearchResult } from "@/data/catData";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type FilterType =
  | "All"
  | "Breeds"
  | "News"
  | "Marketplace"
  | "Gallery"
  | "Community";
const FILTERS: FilterType[] = [
  "All",
  "Breeds",
  "News",
  "Marketplace",
  "Gallery",
  "Community",
];

const CATEGORY_COLORS: Record<string, string> = {
  Breeds: "bg-orange-100 text-orange-700",
  News: "bg-blue-100 text-blue-700",
  Marketplace: "bg-green-100 text-green-700",
  Gallery: "bg-purple-100 text-purple-700",
  Community: "bg-pink-100 text-pink-700",
};

interface SearchResultsProps {
  query: string;
  onBack: () => void;
}

function filterResults(
  results: SearchResult[],
  query: string,
  filter: FilterType,
): SearchResult[] {
  const q = query.toLowerCase();
  return results.filter((r) => {
    const matchesFilter = filter === "All" || r.category === filter;
    const matchesQuery =
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });
}

export function SearchResults({ query, onBack }: SearchResultsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const results = filterResults(SEARCH_RESULTS, query, activeFilter);

  return (
    <section
      className="min-h-screen py-8"
      style={{ background: "var(--becat-bg)" }}
      data-ocid="search.section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back & heading */}
        <div className="mb-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:opacity-80"
            style={{ color: "var(--becat-accent)" }}
            data-ocid="search.back_button"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          <h2
            className="text-2xl font-bold font-display mb-1"
            style={{ color: "var(--becat-text)" }}
          >
            Results for &ldquo;{query}&rdquo;
          </h2>
          <p className="text-sm" style={{ color: "var(--becat-text-muted)" }}>
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap gap-2 mb-6"
          role="tablist"
          data-ocid="search.tab"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={activeFilter === f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
              style={{
                background:
                  activeFilter === f ? "var(--becat-accent)" : "white",
                color: activeFilter === f ? "white" : "var(--becat-text-muted)",
                borderColor:
                  activeFilter === f
                    ? "var(--becat-accent)"
                    : "var(--becat-border)",
              }}
              data-ocid="search.tab"
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results grid */}
        {results.length === 0 ? (
          <div
            className="text-center py-16 rounded-2xl"
            style={{ background: "var(--becat-section-bg)" }}
            data-ocid="search.empty_state"
          >
            <div className="text-5xl mb-4">😿</div>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--becat-text)" }}
            >
              No results found
            </h3>
            <p className="text-sm" style={{ color: "var(--becat-text-muted)" }}>
              Try a different search term or category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((result, i) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group bg-white rounded-2xl p-5 border transition-all hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer"
                style={{
                  borderColor: "var(--becat-border)",
                  boxShadow: "0 2px 12px rgba(58,42,34,0.07)",
                }}
                data-ocid={`search.item.${i + 1}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl flex-shrink-0">{result.emoji}</span>
                  <div className="min-w-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2 ${CATEGORY_COLORS[result.category]}`}
                    >
                      {result.category}
                    </span>
                    <h3
                      className="text-base font-bold font-display leading-snug"
                      style={{ color: "var(--becat-text)" }}
                    >
                      {result.title}
                    </h3>
                  </div>
                </div>
                <p
                  className="text-sm line-clamp-3 mb-3"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  {result.description}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onBack();
                    setTimeout(() => {
                      document
                        .querySelector(result.link)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="text-sm font-semibold transition-colors hover:opacity-70"
                  style={{ color: "var(--becat-accent)" }}
                >
                  View More →
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
