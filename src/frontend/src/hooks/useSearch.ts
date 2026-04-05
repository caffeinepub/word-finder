import { useEffect, useState } from "react";

export interface SearchResult {
  title: string;
  snippet: string;
  url: string;
  type: "web";
}

export interface UseSearchReturn {
  results: SearchResult[];
  loading: boolean;
  error: string | null;
  query: string;
}

function extractTitle(text: string): string {
  if (!text) return "";
  const firstSentence = text.split(/[.!?]\s/)[0];
  if (firstSentence.length <= 80) return firstSentence;
  return `${text.slice(0, 60)}…`;
}

function parseResults(data: any): SearchResult[] {
  const results: SearchResult[] = [];

  // Add abstract/main result first
  if (data.AbstractText && data.AbstractURL) {
    results.push({
      title: data.Heading || extractTitle(data.AbstractText),
      snippet: data.AbstractText,
      url: data.AbstractURL,
      type: "web",
    });
  }

  // Add direct results
  if (Array.isArray(data.Results)) {
    for (const r of data.Results) {
      if (r.Text && r.FirstURL) {
        results.push({
          title: extractTitle(r.Text),
          snippet: r.Text,
          url: r.FirstURL,
          type: "web",
        });
      }
    }
  }

  // Flatten and add related topics
  if (Array.isArray(data.RelatedTopics)) {
    for (const topic of data.RelatedTopics) {
      if (topic.Text && topic.FirstURL) {
        results.push({
          title: extractTitle(topic.Text),
          snippet: topic.Text,
          url: topic.FirstURL,
          type: "web",
        });
      } else if (Array.isArray(topic.Topics)) {
        for (const sub of topic.Topics) {
          if (sub.Text && sub.FirstURL) {
            results.push({
              title: extractTitle(sub.Text),
              snippet: sub.Text,
              url: sub.FirstURL,
              type: "web",
            });
          }
        }
      }
    }
  }

  return results.filter((r) => r.title && r.url).slice(0, 12);
}

export function useSearch(query: string | null): UseSearchReturn {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || !query.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(ddgUrl)}`;

    fetch(proxyUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Search unavailable");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const parsed = parseResults(data);
        setResults(parsed);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setResults([]);
          setLoading(false);
          setError("Could not load web results right now");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { results, loading, error, query: query ?? "" };
}
