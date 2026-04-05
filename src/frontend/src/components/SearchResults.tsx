import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/useSearch";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

type FilterType = "All" | "Images" | "News" | "Videos";

const FILTERS: FilterType[] = ["All", "Images", "News", "Videos"];

interface SearchResultsProps {
  query: string;
  onBack: () => void;
  onSearch?: (q: string) => void;
}

export function SearchResults({ query, onBack, onSearch }: SearchResultsProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [searchInput, setSearchInput] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const { results, loading, error, totalResults, timeTaken } = useSearch(query);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (!trimmed) return;
    if (onSearch) {
      onSearch(trimmed);
    } else {
      onBack();
    }
  }

  const formattedTotal = totalResults.toLocaleString();

  return (
    <div
      className="min-h-screen"
      style={{ background: "#fff" }}
      data-ocid="search.section"
    >
      {/* ─── Sticky top bar ─── */}
      <header
        className="sticky top-0 z-50 bg-white border-b"
        style={{ borderColor: "#e0e0e0" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Row 1: Logo + Search bar */}
          <div className="flex items-center gap-3 py-3">
            {/* Logo */}
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 flex-shrink-0 mr-1 transition-opacity hover:opacity-80"
              aria-label="Go back to home"
              data-ocid="search.back_button"
            >
              <span className="text-xl">🐱</span>
              <span
                className="font-bold text-lg hidden sm:block"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--becat-accent)",
                }}
              >
                BeCat<span style={{ color: "#f4a261" }}>.Tech</span>
              </span>
            </button>

            {/* Inline search bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1">
              <div
                className="flex items-center rounded-full border bg-white"
                style={{
                  borderColor: "#dfe1e5",
                  boxShadow: "0 1px 6px rgba(32,33,36,.18)",
                  height: "44px",
                  padding: "0 4px 0 16px",
                  maxWidth: "580px",
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search anything…"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: "#1a1a1a", fontSize: "16px" }}
                  data-ocid="search.input"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-gray-100 active:scale-95"
                  aria-label="Search"
                  data-ocid="search.submit_button"
                >
                  <Search size={18} style={{ color: "#4285f4" }} />
                </button>
              </div>
            </form>
          </div>

          {/* Row 2: Filter tabs */}
          <div
            className="flex items-center gap-0 overflow-x-auto pb-0"
            style={{ scrollbarWidth: "none" }}
            role="tablist"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={activeFilter === f}
                onClick={() => setActiveFilter(f)}
                className="px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
                style={{
                  color: activeFilter === f ? "#1558d6" : "#5f6368",
                  borderColor: activeFilter === f ? "#1558d6" : "transparent",
                  background: "transparent",
                }}
                data-ocid="search.tab"
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Results area ─── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        {/* Back button (mobile-friendly) */}
        <button
          type="button"
          onClick={onBack}
          className="flex sm:hidden items-center gap-1.5 text-sm font-medium mb-4 transition-opacity hover:opacity-70"
          style={{ color: "var(--becat-accent)" }}
          data-ocid="search.back_button"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>

        {/* Results count */}
        {!loading && results.length > 0 && (
          <p className="text-sm mb-4" style={{ color: "#70757a" }}>
            About {formattedTotal} results ({timeTaken} seconds)
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="flex flex-col gap-6" data-ocid="search.loading_state">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-3 w-48 rounded" />
                </div>
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-5/6 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-16" data-ocid="search.error_state">
            <div className="text-5xl mb-4">😿</div>
            <p
              className="text-base font-medium mb-1"
              style={{ color: "#3c4043" }}
            >
              Search ran into a problem
            </p>
            <p className="text-sm" style={{ color: "#70757a" }}>
              {error}
            </p>
          </div>
        )}

        {/* Results list */}
        {!loading && !error && results.length > 0 && (
          <div className="flex flex-col">
            {results.map((result, i) => (
              <motion.div
                key={result.url}
                className="py-5"
                style={{
                  borderBottom:
                    i < results.length - 1 ? "1px solid #f0f0f0" : "none",
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                data-ocid={`search.item.${i + 1}`}
              >
                {/* Row 1: Favicon + Display URL */}
                <div className="flex items-center gap-2 mb-1">
                  {result.favicon ? (
                    <img
                      src={result.favicon}
                      alt=""
                      width={16}
                      height={16}
                      className="flex-shrink-0"
                      style={{ borderRadius: "2px" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span
                      className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs"
                      style={{
                        background: "var(--becat-accent)",
                        fontSize: "8px",
                      }}
                    >
                      🌐
                    </span>
                  )}
                  <span className="result-url truncate max-w-md">
                    {result.displayUrl}
                  </span>
                </div>

                {/* Row 2: Title link */}
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="result-title block text-xl font-normal leading-snug mb-1 hover:underline"
                >
                  {result.title}
                </a>

                {/* Row 3: Snippet */}
                {result.snippet && (
                  <p className="result-snippet line-clamp-3">
                    {result.snippet}
                  </p>
                )}
              </motion.div>
            ))}

            {/* Next page placeholder */}
            <div className="flex justify-center py-8">
              <button
                type="button"
                onClick={() => inputRef.current?.focus()}
                className="px-8 py-2.5 rounded-full text-sm font-medium border transition-all hover:bg-gray-50 active:scale-95"
                style={{
                  borderColor: "#dfe1e5",
                  color: "#1558d6",
                }}
                data-ocid="search.pagination_next"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && results.length === 0 && (
          <div className="text-center py-20" data-ocid="search.empty_state">
            <div className="text-6xl mb-4">😿</div>
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: "#3c4043" }}
            >
              No results found for &ldquo;{query}&rdquo;
            </h3>
            <p className="text-sm" style={{ color: "#70757a" }}>
              Try different keywords or check your spelling
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
