import { Skeleton } from "@/components/ui/skeleton";
import {
  type SearchResult as LocalResult,
  SEARCH_RESULTS,
} from "@/data/catData";
import { useSearch } from "@/hooks/useSearch";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

type FilterType =
  | "All"
  | "Web"
  | "Breeds"
  | "News"
  | "Marketplace"
  | "Gallery"
  | "Community";

const FILTERS: FilterType[] = [
  "All",
  "Web",
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

function filterLocalResults(
  results: LocalResult[],
  query: string,
  filter: FilterType,
): LocalResult[] {
  const q = query.toLowerCase();
  return results.filter((r) => {
    const matchesFilter =
      filter === "All" || filter === "Web" || r.category === filter;
    const matchesQuery =
      r.title.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });
}

export function SearchResults({ query, onBack }: SearchResultsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchInput, setSearchInput] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const { results: webResults, loading: webLoading } = useSearch(
    activeFilter === "All" || activeFilter === "Web" ? query : null,
  );

  const localResults = filterLocalResults(SEARCH_RESULTS, query, activeFilter);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchInput.trim() && searchInput.trim() !== query) {
      onBack();
    }
  }

  const showWebSection = activeFilter === "All" || activeFilter === "Web";
  const showLocalSection = activeFilter !== "Web";

  return (
    <section
      className="min-h-screen py-8"
      style={{ background: "var(--becat-bg)" }}
      data-ocid="search.section"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium mb-5 transition-colors hover:opacity-80"
          style={{ color: "var(--becat-accent)" }}
          data-ocid="search.back_button"
        >
          <ArrowLeft size={16} />
          Back to Home
        </button>

        {/* Inline search bar */}
        <form onSubmit={handleSearchSubmit} className="mb-6">
          <div
            className="flex items-center rounded-full bg-white pl-4 pr-2 py-1.5"
            style={{
              border: "2px solid var(--becat-border)",
              boxShadow: "0 2px 12px rgba(58,42,34,0.08)",
              maxWidth: "600px",
            }}
          >
            <Search
              size={18}
              style={{ color: "var(--becat-text-muted)" }}
              className="mr-2 flex-shrink-0"
            />
            <input
              ref={inputRef}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for anything cat…"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "var(--becat-text)", fontSize: "16px" }}
              data-ocid="search.input"
            />
            <button
              type="submit"
              className="ml-2 h-8 px-4 rounded-full text-white text-xs font-semibold flex items-center gap-1 transition-all hover:opacity-90 active:scale-95"
              style={{ background: "var(--becat-accent)" }}
              data-ocid="search.submit_button"
            >
              Search
            </button>
          </div>
        </form>

        {/* Heading */}
        <div className="mb-5">
          <h2
            className="text-2xl font-bold font-display mb-1"
            style={{ color: "var(--becat-text)" }}
          >
            Results for &ldquo;{query}&rdquo;
          </h2>
          <p className="text-sm" style={{ color: "var(--becat-text-muted)" }}>
            {webLoading ? (
              <span>Searching the web…</span>
            ) : (
              <span>
                {activeFilter === "Web"
                  ? `${webResults.length} web result${
                      webResults.length !== 1 ? "s" : ""
                    }`
                  : `${localResults.length} cat result${
                      localResults.length !== 1 ? "s" : ""
                    }${webResults.length > 0 ? ` · ${webResults.length} from the web` : ""}`}
              </span>
            )}
          </p>
        </div>

        {/* Filter tabs */}
        <div
          className="flex flex-wrap gap-2 mb-7"
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
              {f === "Web" ? "🌐 Web" : f}
            </button>
          ))}
        </div>

        {/* ── Web Results ── */}
        {showWebSection && (
          <div className="mb-8">
            {activeFilter === "All" && webResults.length > 0 && (
              <h3
                className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-1.5"
                style={{ color: "var(--becat-text-muted)" }}
              >
                <span>🌐</span> From the Web
              </h3>
            )}

            {webLoading ? (
              <div
                className="flex flex-col gap-3"
                data-ocid="search.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 border"
                    style={{ borderColor: "var(--becat-border)" }}
                  >
                    <Skeleton className="h-4 w-40 mb-2 rounded-full" />
                    <Skeleton className="h-5 w-3/4 mb-2 rounded-lg" />
                    <Skeleton className="h-3 w-full rounded-full" />
                    <Skeleton className="h-3 w-5/6 mt-1 rounded-full" />
                  </div>
                ))}
              </div>
            ) : webResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                {(activeFilter === "All"
                  ? webResults.slice(0, 3)
                  : webResults
                ).map((result, i) => (
                  <motion.a
                    key={result.url}
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group bg-white rounded-2xl p-5 border flex flex-col gap-2 hover:-translate-y-0.5 transition-all"
                    style={{
                      borderColor: "var(--becat-border)",
                      boxShadow: "0 2px 12px rgba(58,42,34,0.07)",
                    }}
                    data-ocid={`search.item.${i + 1}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🌐</span>
                      <p
                        className="text-xs truncate"
                        style={{ color: "var(--becat-text-muted)" }}
                      >
                        {result.url}
                      </p>
                    </div>
                    <h3
                      className="text-base font-bold leading-snug group-hover:underline"
                      style={{ color: "var(--becat-accent)" }}
                    >
                      {result.title}
                    </h3>
                    <p
                      className="text-sm line-clamp-2"
                      style={{ color: "var(--becat-text-muted)" }}
                    >
                      {result.snippet}
                    </p>
                  </motion.a>
                ))}
              </div>
            ) : activeFilter === "Web" ? (
              <div
                className="text-center py-10 rounded-2xl"
                style={{ background: "var(--becat-section-bg)" }}
                data-ocid="search.empty_state"
              >
                <div className="text-4xl mb-3">😿</div>
                <p
                  className="text-sm"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  No web results found for this search.
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* ── Local Cat Content ── */}
        {showLocalSection && (
          <div>
            {activeFilter === "All" && localResults.length > 0 && (
              <h3
                className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-1.5"
                style={{ color: "var(--becat-text-muted)" }}
              >
                <span>🐾</span> Cat Content
              </h3>
            )}

            {localResults.length === 0 ? (
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
                <p
                  className="text-sm"
                  style={{ color: "var(--becat-text-muted)" }}
                >
                  Try a different search term or category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {localResults.map((result, i) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group bg-white rounded-2xl p-5 border transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                    style={{
                      borderColor: "var(--becat-border)",
                      boxShadow: "0 2px 12px rgba(58,42,34,0.07)",
                    }}
                    data-ocid={`search.item.${i + 1}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl flex-shrink-0">
                        {result.emoji}
                      </span>
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
        )}
      </div>
    </section>
  );
}
