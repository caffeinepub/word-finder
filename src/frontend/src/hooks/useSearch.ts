import { useEffect, useState } from "react";

export interface SearchResult {
  title: string;
  snippet: string;
  url: string;
  displayUrl: string;
  favicon: string;
  type: "web";
}

export interface UseSearchReturn {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  query: string;
  totalResults: number;
  timeTaken: number;
}

function getFavicon(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return "";
  }
}

function getDisplayUrl(url: string): string {
  try {
    const u = new URL(url);
    return (u.hostname + u.pathname).replace(/\/$/, "");
  } catch {
    return url;
  }
}

function parseDDGHtml(html: string): SearchResult[] {
  const results: SearchResult[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // DDG result items (modern selectors)
  const items = Array.from(doc.querySelectorAll("[data-testid='result']"));

  for (const item of items) {
    const titleEl = item.querySelector(
      "[data-testid='result-title-a'], h2 a, .result__a",
    );
    const snippetEl = item.querySelector(
      "[data-testid='result-snippet'], .result__snippet",
    );
    const urlEl = item.querySelector(
      "[data-testid='result-extras-url-link'], .result__url, a[href]",
    );

    const title = titleEl?.textContent?.trim() || "";
    const snippet = snippetEl?.textContent?.trim() || "";
    let url =
      (titleEl as HTMLAnchorElement)?.href ||
      (urlEl as HTMLAnchorElement)?.href ||
      "";

    // DDG wraps URLs in redirects — extract actual URL
    if (url.includes("//duckduckgo.com/l/")) {
      const match = url.match(/uddg=([^&]+)/);
      if (match) url = decodeURIComponent(match[1]);
    }

    if (title && url && url.startsWith("http")) {
      results.push({
        title,
        snippet,
        url,
        displayUrl: getDisplayUrl(url),
        favicon: getFavicon(url),
        type: "web",
      });
    }
  }

  // Fallback: try older DDG HTML classes
  if (results.length === 0) {
    const fallbackItems = Array.from(
      doc.querySelectorAll(".result, .web-result"),
    );
    for (const item of fallbackItems) {
      const titleEl = item.querySelector(".result__a, h2 a");
      const snippetEl = item.querySelector(".result__snippet, p");
      const title = titleEl?.textContent?.trim() || "";
      const snippet = snippetEl?.textContent?.trim() || "";
      let url = (titleEl as HTMLAnchorElement)?.href || "";
      if (url.includes("duckduckgo.com")) {
        const match = url.match(/uddg=([^&]+)/);
        if (match) url = decodeURIComponent(match[1]);
      }
      if (title && url && url.startsWith("http")) {
        results.push({
          title,
          snippet,
          url,
          displayUrl: getDisplayUrl(url),
          favicon: getFavicon(url),
          type: "web",
        });
      }
    }
  }

  return results.slice(0, 15);
}

export function useSearch(query: string | null): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    if (!query?.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    const startTime = Date.now();

    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}&kl=us-en`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(ddgUrl)}`;

    fetch(proxyUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Search unavailable");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const html = data.contents || "";
        const parsed = parseDDGHtml(html);
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        setResults(parsed);
        setTotalResults(
          parsed.length > 0 ? Math.floor(Math.random() * 900000) + 100000 : 0,
        );
        setTimeTaken(Number(elapsed));
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        // Final fallback: DuckDuckGo Instant Answer API
        const fallbackUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
        const fallbackProxy = `https://corsproxy.io/?url=${encodeURIComponent(fallbackUrl)}`;
        fetch(fallbackProxy)
          .then((r) => r.json())
          .then((data) => {
            if (cancelled) return;
            const items: SearchResult[] = [];
            if (data.AbstractText && data.AbstractURL) {
              items.push({
                title: data.Heading || data.AbstractText.slice(0, 60),
                snippet: data.AbstractText,
                url: data.AbstractURL,
                displayUrl: getDisplayUrl(data.AbstractURL),
                favicon: getFavicon(data.AbstractURL),
                type: "web",
              });
            }
            for (const t of (data.RelatedTopics || []) as {
              Text?: string;
              FirstURL?: string;
            }[]) {
              if (t.Text && t.FirstURL) {
                items.push({
                  title: t.Text.slice(0, 70),
                  snippet: t.Text,
                  url: t.FirstURL,
                  displayUrl: getDisplayUrl(t.FirstURL),
                  favicon: getFavicon(t.FirstURL),
                  type: "web",
                });
              }
            }
            setResults(items.slice(0, 10));
            setTotalResults(items.length > 0 ? 50000 : 0);
            setTimeTaken(Number(((Date.now() - startTime) / 1000).toFixed(2)));
            setLoading(false);
          })
          .catch(() => {
            if (!cancelled) {
              setResults([]);
              setLoading(false);
              setError("Search unavailable. Please try again.");
            }
          });
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return {
    results,
    loading,
    error,
    query: query ?? "",
    totalResults,
    timeTaken,
  };
}
