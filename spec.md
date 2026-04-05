# BeCat.Tech

## Current State
BeCat.Tech is a cat-themed search engine with a full-screen hero, sticky header, and multiple content sections (Gallery, News, Marketplace, Breeds, Community). The existing UI uses small text, tight spacing, small buttons, and a compact layout that makes everything feel cramped and hard to read.

## Requested Changes (Diff)

### Add
- Larger font sizes across all headings, body text, and labels (bump base body from 15px to 16-17px, headings from text-3xl to text-4xl/5xl)
- More generous padding and spacing throughout every section
- Bigger, more prominent buttons with larger text and taller hit areas
- Merge BeCat.Tech brand + all nav links (Search, Gallery, News, Marketplace, Breeds, Community) into a single unified header bar with proper spacing

### Modify
- Header: merge brand logo + nav into one horizontal bar; make nav links larger (text-base/text-lg), add more px/py padding, bigger logo text
- HeroSection: larger h1, larger subtitle, bigger search bar (taller), bigger filter tab buttons, bigger trending chips
- All section headers (Gallery, News, Marketplace, Breeds, Community): increase heading size to text-4xl, increase badge/label text, more top/bottom padding
- GallerySection: bigger gallery items, larger emoji, larger caption text
- NewsSection: larger card padding, bigger title text, bigger article emoji, bigger category badge text, bigger "Learn More" button
- MarketplaceSection: taller product image area, bigger product name/price, bigger Add to Cart button with more padding
- BreedsSection: bigger breed cards, larger emoji avatar, larger breed name, bigger trait tags
- CommunitySection: bigger post cards, larger author avatar, bigger title and body text, bigger Like/Reply buttons, bigger CTA button
- Footer: larger text, more spacing between links
- All small text labels (xs → sm), all button padding increased, all card internal padding increased

### Remove
- Nothing removed

## Implementation Plan
1. Rework Header to merge BeCat.Tech brand + nav links into one unified bar with text-base nav links, larger logo, more padding
2. Bump HeroSection search bar height, font sizes, filter tab and trending button padding
3. Increase all section py from py-16 to py-24, mb-10 to mb-14 in section headers
4. Increase all h2 headings from text-3xl to text-4xl
5. Increase all card internal padding (p-4→p-6, p-5→p-7, p-6→p-8)
6. Increase all button padding and font sizes
7. Bump body text from text-sm to text-base, and xs labels to text-sm throughout
8. Make gallery items taller, emoji bigger
9. Bigger Marketplace product image area (h-36→h-48), bigger Add button
10. Bigger Breeds card avatar (w-16→w-20), bigger name text
11. Community posts: bigger avatar, bigger text, bigger action buttons
12. Footer: bigger text, more link spacing
