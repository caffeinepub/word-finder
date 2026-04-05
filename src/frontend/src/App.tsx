import { AestheticSection } from "@/components/AestheticSection";
import { BreedsSection } from "@/components/BreedsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { ExploreSection } from "@/components/ExploreSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { NewsSection } from "@/components/NewsSection";
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

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--becat-bg)" }}
    >
      <Header />
      <main className="flex-1">
        {searchQuery ? (
          <SearchResults query={searchQuery} onBack={handleBack} />
        ) : (
          <>
            <HeroSection onSearch={handleSearch} />
            <ExploreSection />
            <GallerySection />
            <NewsSection />
            <MarketplaceSection />
            <AestheticSection />
            <BreedsSection />
            <CommunitySection />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
