import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { SearchResults } from "@/components/SearchResults";
import { useState } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  function handleSearch(query: string) {
    setSearchQuery(query);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setSearchQuery(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (searchQuery) {
    return (
      <SearchResults
        query={searchQuery}
        onBack={handleBack}
        onSearch={handleSearch}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection onSearch={handleSearch} />
      <Footer />
    </div>
  );
}
