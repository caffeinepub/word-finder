export const TRENDING_SEARCHES = [
  "Persian cats",
  "Maine Coon",
  "cat toys",
  "cat food",
  "cat memes",
  "cute kittens",
  "cat breeds",
  "cat care",
];

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: "Breeds" | "News" | "Marketplace" | "Gallery" | "Community";
  link: string;
  emoji: string;
}

export const SEARCH_RESULTS: SearchResult[] = [
  {
    id: 1,
    title: "Persian Cat — The Ultimate Guide",
    description:
      "Discover everything about Persian cats: grooming tips, temperament, diet, and how to keep your fluffy friend healthy and happy.",
    category: "Breeds",
    link: "#breeds",
    emoji: "🐱",
  },
  {
    id: 2,
    title: "Maine Coon: Giant of the Cat World",
    description:
      "Maine Coons are the gentle giants of the feline world. Learn about their playful nature, thick coats, and why they make amazing companions.",
    category: "Breeds",
    link: "#breeds",
    emoji: "🐈",
  },
  {
    id: 3,
    title: "Study Shows Cats Recognize Their Names",
    description:
      "Japanese researchers have confirmed that cats can distinguish their names from other words — they just choose when to respond!",
    category: "News",
    link: "#news",
    emoji: "📰",
  },
  {
    id: 4,
    title: "New Cat Café Opens in Tokyo",
    description:
      "A stunning new cat café has opened in Shibuya, Tokyo, featuring 30 rescued cats in a beautifully designed zen-inspired space.",
    category: "News",
    link: "#news",
    emoji: "☕",
  },
  {
    id: 5,
    title: "Premium Cat Food Bundle — $45.99",
    description:
      "A curated selection of high-protein, grain-free cat food for all life stages. Vet-approved and loved by cats worldwide.",
    category: "Marketplace",
    link: "#marketplace",
    emoji: "🛒",
  },
  {
    id: 6,
    title: "Interactive Cat Toy Set — $24.99",
    description:
      "Keep your cat entertained for hours with this 8-piece interactive toy set including feather wands, tunnels, and puzzle feeders.",
    category: "Marketplace",
    link: "#marketplace",
    emoji: "🎯",
  },
  {
    id: 7,
    title: "Fluffy Persian Kitten Photo Series",
    description:
      "A breathtaking series of professional photos capturing Persian kittens in their most adorable moments.",
    category: "Gallery",
    link: "#gallery",
    emoji: "📸",
  },
  {
    id: 8,
    title: "Scottish Fold: Calm & Loving Companion",
    description:
      "Scottish Folds are known for their distinctive folded ears and owl-like appearance. They're incredibly calm and form deep bonds.",
    category: "Breeds",
    link: "#breeds",
    emoji: "🦉",
  },
  {
    id: 9,
    title: "Understanding Your Cat's Purring",
    description:
      "Purring isn't just contentment — cats purr when stressed, healing, or communicating. Science reveals the fascinating truth.",
    category: "News",
    link: "#news",
    emoji: "💤",
  },
  {
    id: 10,
    title: "Cozy Cat Bed Premium Edition — $59.99",
    description:
      "Orthopedic memory foam cat bed with removable washable cover. Extra plush bolster sides for cats who love to curl up.",
    category: "Marketplace",
    link: "#marketplace",
    emoji: "🛏️",
  },
  {
    id: 11,
    title: "Maine Coon in Snow — Winter Collection",
    description:
      "Stunning winter photography featuring Maine Coons in their natural glory, with their thick snow-resistant coats on display.",
    category: "Gallery",
    link: "#gallery",
    emoji: "❄️",
  },
  {
    id: 12,
    title: "My Persian Finally Lets Me Pet Her Belly!",
    description:
      "After 2 years of gentle patience, my Persian cat Luna finally rolled over for belly rubs! Sharing my journey and tips.",
    category: "Community",
    link: "#community",
    emoji: "❤️",
  },
  {
    id: 13,
    title: "Siamese Cat: Vocal & Social",
    description:
      "Siamese cats are among the most vocal breeds — they'll hold full conversations with you! Learn about their unique personality.",
    category: "Breeds",
    link: "#breeds",
    emoji: "🗣️",
  },
  {
    id: 14,
    title: "Cat Wins International Photo Contest",
    description:
      "A ginger tabby named Mochi from Seoul has won the 2026 World Cat Photography Award with a stunning portrait.",
    category: "News",
    link: "#news",
    emoji: "🏆",
  },
  {
    id: 15,
    title: "Best Cat Food for Senior Cats?",
    description:
      "Community discussion on the best nutrition options for cats aged 10+. Share your experiences and vet recommendations.",
    category: "Community",
    link: "#community",
    emoji: "💬",
  },
  {
    id: 16,
    title: "Automatic Pet Feeder Smart — $89.99",
    description:
      "WiFi-enabled automatic cat feeder with portion control, scheduling app, and HD camera to watch your cat eat remotely.",
    category: "Marketplace",
    link: "#marketplace",
    emoji: "📱",
  },
  {
    id: 17,
    title: "Bengal Cat: Active & Wild at Heart",
    description:
      "Bengals look like miniature leopards and act like it too! These high-energy cats need lots of stimulation and adventure.",
    category: "Breeds",
    link: "#breeds",
    emoji: "🐆",
  },
  {
    id: 18,
    title: "Monthly Cat Photo Thread — April 2026",
    description:
      "Share your best cat photos of the month! All breeds, all ages, all adorable. Community favorites get featured on our homepage.",
    category: "Community",
    link: "#community",
    emoji: "📷",
  },
];

export interface CatBreed {
  name: string;
  origin: string;
  temperament: string;
  size: "Small" | "Medium" | "Large";
  traits: string[];
  color: string;
  emoji: string;
}

export const CAT_BREEDS: CatBreed[] = [
  {
    name: "Persian",
    origin: "Iran",
    temperament: "Gentle & Quiet",
    size: "Medium",
    traits: ["Gentle", "Quiet", "Indoor", "Affectionate"],
    color: "bg-amber-100 border-amber-300",
    emoji: "🐱",
  },
  {
    name: "Maine Coon",
    origin: "USA",
    temperament: "Friendly & Playful",
    size: "Large",
    traits: ["Playful", "Friendly", "Dog-like", "Social"],
    color: "bg-orange-100 border-orange-300",
    emoji: "🐈",
  },
  {
    name: "Siamese",
    origin: "Thailand",
    temperament: "Vocal & Social",
    size: "Medium",
    traits: ["Vocal", "Social", "Intelligent", "Active"],
    color: "bg-slate-100 border-slate-300",
    emoji: "😺",
  },
  {
    name: "Scottish Fold",
    origin: "Scotland",
    temperament: "Calm & Loving",
    size: "Medium",
    traits: ["Calm", "Loving", "Curious", "Adaptable"],
    color: "bg-stone-100 border-stone-300",
    emoji: "🦉",
  },
  {
    name: "British Shorthair",
    origin: "UK",
    temperament: "Easy-going",
    size: "Large",
    traits: ["Calm", "Reserved", "Easy-going", "Independent"],
    color: "bg-blue-100 border-blue-300",
    emoji: "🐾",
  },
  {
    name: "Ragdoll",
    origin: "USA",
    temperament: "Docile & Affectionate",
    size: "Large",
    traits: ["Docile", "Affectionate", "Patient", "Gentle"],
    color: "bg-purple-100 border-purple-300",
    emoji: "💙",
  },
  {
    name: "Bengal",
    origin: "USA",
    temperament: "Active & Wild",
    size: "Medium",
    traits: ["Active", "Wild", "Athletic", "Playful"],
    color: "bg-yellow-100 border-yellow-400",
    emoji: "🐆",
  },
  {
    name: "Sphynx",
    origin: "Canada",
    temperament: "Energetic & Social",
    size: "Medium",
    traits: ["Energetic", "Social", "Warm", "Extroverted"],
    color: "bg-pink-100 border-pink-300",
    emoji: "✨",
  },
];

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  emoji: string;
}

export const CAT_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Study Shows Cats Recognize Their Names",
    summary:
      "Researchers at Sophia University in Tokyo have confirmed that domestic cats can distinguish their own names from other words — even when spoken by strangers.",
    date: "March 28, 2026",
    category: "Science",
    emoji: "🔬",
  },
  {
    id: 2,
    title: "Top 10 Cat Breeds of 2026",
    summary:
      "The Cat Fanciers' Association has released their annual report. Maine Coon climbs to #1 for the third year running, while the Ragdoll and British Shorthair round out the top three.",
    date: "March 15, 2026",
    category: "Breeds",
    emoji: "🏆",
  },
  {
    id: 3,
    title: "New Cat Café Opens in Tokyo",
    summary:
      "Neko no Yume (Cat's Dream) has opened its doors in Shibuya, featuring 30 rescued cats in a zen-inspired space. All cats are available for adoption.",
    date: "March 10, 2026",
    category: "Lifestyle",
    emoji: "☕",
  },
  {
    id: 4,
    title: "Understanding Your Cat's Purring",
    summary:
      "Cats purr at frequencies between 25-150Hz — a range scientifically proven to promote bone density and tissue healing. Your cat may be self-medicating!",
    date: "February 28, 2026",
    category: "Health",
    emoji: "💤",
  },
  {
    id: 5,
    title: "Cat Wins International Photo Contest",
    summary:
      "Mochi, a ginger tabby from Seoul, has won the 2026 World Cat Photography Award. The winning portrait captures a single perfect whisker backlit by golden-hour light.",
    date: "February 14, 2026",
    category: "Art",
    emoji: "📸",
  },
  {
    id: 6,
    title: "Scientists Discover New Facts About Cat Vision",
    summary:
      "New research reveals cats can see colors far more vividly than previously thought — their vision in twilight conditions is 6 times more sensitive than human eyesight.",
    date: "January 30, 2026",
    category: "Science",
    emoji: "👁️",
  },
];

export interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  emoji: string;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Premium Cat Food Bundle",
    price: "$45.99",
    category: "Nutrition",
    description:
      "High-protein, grain-free formula for all life stages. Vet-approved and adored by cats worldwide.",
    emoji: "🍖",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Interactive Cat Toy Set",
    price: "$24.99",
    category: "Toys",
    description:
      "8-piece set with feather wands, crinkle tunnels, and treat-dispensing puzzle toys to keep your cat engaged.",
    emoji: "🎯",
  },
  {
    id: 3,
    name: "Cozy Cat Bed",
    price: "$59.99",
    category: "Comfort",
    description:
      "Orthopedic memory foam with removable washable cover and plush bolster sides. Every nap is a luxury.",
    emoji: "🛏️",
    badge: "Editor's Pick",
  },
  {
    id: 4,
    name: "Cat Grooming Kit",
    price: "$32.99",
    category: "Grooming",
    description:
      "Complete 7-piece grooming set with deshedding brush, nail clippers, and conditioning spray.",
    emoji: "✂️",
  },
  {
    id: 5,
    name: "Automatic Smart Feeder",
    price: "$89.99",
    category: "Tech",
    description:
      "WiFi-enabled feeder with portion control app, HD camera, and voice messaging. Never miss a meal!",
    emoji: "📱",
    badge: "New",
  },
  {
    id: 6,
    name: "Cat Tree Tower",
    price: "$129.99",
    category: "Furniture",
    description:
      "5-level activity center with scratching posts, hammock, and cozy condos. Sisal-wrapped for natural scratching.",
    emoji: "🌳",
  },
  {
    id: 7,
    name: "Catnip Garden Kit",
    price: "$18.99",
    category: "Wellness",
    description:
      "Grow your own organic catnip, cat grass, and valerian at home. Includes pots, soil, and seeds.",
    emoji: "🌿",
  },
  {
    id: 8,
    name: "Stylish Cat Carrier",
    price: "$49.99",
    category: "Travel",
    description:
      "Airline-approved, ventilated carrier with removable fleece pad and front/top access. Travels in style.",
    emoji: "🧳",
  },
];

export interface GalleryItem {
  id: number;
  label: string;
  gradient: string;
  emoji: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    label: "Fluffy Persian Kitten",
    gradient: "linear-gradient(135deg, #f9e4b7 0%, #f4a261 100%)",
    emoji: "🐱",
  },
  {
    id: 2,
    label: "Maine Coon in Snow",
    gradient: "linear-gradient(135deg, #e8f4f8 0%, #b8d4e8 100%)",
    emoji: "❄️",
  },
  {
    id: 3,
    label: "Tabby Cat Sunbathing",
    gradient: "linear-gradient(135deg, #fff3cd 0%, #ffc107 50%, #ff8c00 100%)",
    emoji: "☀️",
  },
  {
    id: 4,
    label: "Siamese Kittens",
    gradient: "linear-gradient(135deg, #f0e6ff 0%, #c9b1d9 100%)",
    emoji: "🐾",
  },
  {
    id: 5,
    label: "Black Cat Mystery",
    gradient: "linear-gradient(135deg, #2c1a4a 0%, #6b21a8 50%, #3b0764 100%)",
    emoji: "🌙",
  },
  {
    id: 6,
    label: "Ginger Tom",
    gradient: "linear-gradient(135deg, #fed7aa 0%, #ea580c 100%)",
    emoji: "🧡",
  },
  {
    id: 7,
    label: "Calico Cat",
    gradient:
      "linear-gradient(135deg, #fde68a 0%, #f97316 33%, #e11d48 66%, #7c3aed 100%)",
    emoji: "🎨",
  },
  {
    id: 8,
    label: "Scottish Fold",
    gradient: "linear-gradient(135deg, #d1fae5 0%, #6ee7b7 50%, #059669 100%)",
    emoji: "🦉",
  },
];

export interface AestheticItem {
  id: number;
  label: string;
  gradient: string;
  emoji: string;
}

export const AESTHETIC_ITEMS: AestheticItem[] = [
  {
    id: 1,
    label: "Dreamy Pastel Cats",
    gradient: "linear-gradient(135deg, #fce4ec 0%, #e8eaf6 50%, #e0f2fe 100%)",
    emoji: "🌸",
  },
  {
    id: 2,
    label: "Minimalist Cat Art",
    gradient: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
    emoji: "⬛",
  },
  {
    id: 3,
    label: "Watercolor Felines",
    gradient: "linear-gradient(135deg, #b3e5fc 0%, #f8bbd0 50%, #dcedc8 100%)",
    emoji: "🎨",
  },
  {
    id: 4,
    label: "Vintage Cat Posters",
    gradient: "linear-gradient(135deg, #f3e5ab 0%, #c8a97e 50%, #8b6914 100%)",
    emoji: "🗺️",
  },
  {
    id: 5,
    label: "Neon Cat Vibes",
    gradient: "linear-gradient(135deg, #0d1117 0%, #7c3aed 50%, #db2777 100%)",
    emoji: "⚡",
  },
  {
    id: 6,
    label: "Cozy Cat Corner",
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 50%, #d97706 100%)",
    emoji: "🕯️",
  },
];

export interface CommunityPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  likes: number;
  date: string;
  emoji: string;
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 1,
    title: "My Persian finally lets me pet her belly!",
    excerpt:
      "After 2 years of gentle patience and trust-building, my Persian cat Luna finally rolled over for belly rubs! Here's everything I learned about gaining a reserved cat's trust.",
    author: "LunasMom",
    likes: 284,
    date: "2 hours ago",
    emoji: "❤️",
  },
  {
    id: 2,
    title: "Best cat food for senior cats?",
    excerpt:
      "My boy Chester just turned 11 and the vet suggested transitioning to senior formula. Has anyone found a brand that picky older cats actually love? Willing to try wet or dry.",
    author: "ChesterDad",
    likes: 97,
    date: "5 hours ago",
    emoji: "💬",
  },
  {
    id: 3,
    title: "Look at my kitten's first vet visit!",
    excerpt:
      "Brought home 8-week-old Mochi yesterday and today was her first vet visit. She was so brave! Sharing photos and vet's top tips for new kitten owners.",
    author: "MochiMama",
    likes: 521,
    date: "1 day ago",
    emoji: "📸",
  },
  {
    id: 4,
    title: "Tips for introducing cats to dogs",
    excerpt:
      "We adopted a rescue dog last month and our two cats were NOT happy. After lots of research and patience, they're now napping together! Here's our step-by-step introduction guide.",
    author: "PetHarmony",
    likes: 342,
    date: "2 days ago",
    emoji: "🐶",
  },
  {
    id: 5,
    title: "Monthly cat photo thread — share yours!",
    excerpt:
      "It's April! Time to share your best cat photos from this month. All breeds, all ages, all adorable moments welcome. My favorite gets featured on the BeCat.Tech homepage!",
    author: "BeCatAdmin",
    likes: 1204,
    date: "3 days ago",
    emoji: "📷",
  },
];
