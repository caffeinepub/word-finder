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
import { WidgetsSection } from "@/components/WidgetsSection";
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
      {/* Hero is full-screen and handles its own branding */}
      <HeroSection onSearch={handleSearch} />

      {/* Below-the-fold sections get the sticky header for nav */}
      <Header />

      <main className="flex-1">
        <WidgetsSection />
        <ExploreSection />
        <GallerySection />
        <NewsSection />
        <MarketplaceSection />
        <AestheticSection />
        <BreedsSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
