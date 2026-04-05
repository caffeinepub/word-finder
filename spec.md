# BeCat.Tech

## Current State
A cat-themed search engine with:
- HeroSection: split layout (text left, cat illustration right), warm cream background
- SearchResults: mixed web results (from DDG Instant Answer API — very limited) + local cat content cards
- useSearch hook: calls DuckDuckGo Instant Answer API via corsproxy.io — returns almost no results for most queries
- Header: sticky nav with cat links
- Footer: Shahed credit
- Weather widget, news, gallery, breeds, etc.

## Requested Changes (Diff)

### Add
- Full-screen Bing-style hero with a beautiful daily cat/nature background image, centered search bar, date/time overlay, weather mini-widget overlaid on hero
- Rich real web search results using DDG HTML scraping via allorigins.win proxy (returns 10+ real blue-link results for ANY query)
- Search suggestions/autocomplete dropdown as user types
- Search result page: Bing/Google style — full blue link title, green URL, snippet, favicon, sponsored-like layout
- Info bar in results: "About X results" count + time taken
- Image creator / video creator / text creator glassmorphism buttons on hero (Bing-style)

### Modify
- useSearch hook: replace DDG Instant Answer API with DDG HTML parsing via allorigins.win proxy for richer results on ANY topic
- HeroSection: full-screen background (cat/nature photo), centered pill search bar, transparent header overlay
- SearchResults: full Bing/Google-style result cards (blue title link, green URL breadcrumb, snippet text, favicon)
- Header: becomes transparent overlay on hero, turns white on scroll

### Remove
- Split hero layout (text-left, cat-right)
- Local cat content cards in search results (replace with real web results)
- Separate "Web" vs local filter (simplify to type filters: All, Images, News, Videos)

## Implementation Plan
1. Upgrade useSearch hook with DDG HTML parsing via allorigins proxy for real results
2. Rebuild HeroSection as full-screen Bing-style with background image, centered search
3. Redesign SearchResults to Google/Bing style (blue links, green URLs, snippets, favicons)
4. Update Header to be transparent over hero, white on scroll
5. Validate and deploy
