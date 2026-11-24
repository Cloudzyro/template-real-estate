# Unslop pass (November 24, 2026)

Done with the unslop skill by Damir Sokolovsky (@heydamir), CC BY 4.0.

## Audit

Light slop: a designed site with a real palette (paper, pine, brass), Fraunces and Instrument Sans, and illustrated homes. Signs found:

- Uppercase tracked eyebrow labels on every section (`eyebrow` utility in `app/globals.css`, used on home, listings, listing, agents, about, contact, 404)
- Uppercase tracked form labels (`label` utility, `HeroSearch.tsx`, listing key facts, footer headings)
- Radial color washes behind the hero (`app/page.tsx`) and a blurred brass blob in the sell call to action
- Colored shadows: `shadow-2xl shadow-pine/20` on the hero art, hero search and about art; `hover:shadow-pine/10` on listing cards
- `hover:scale` on listing card images, `hover:-translate-y` on the "Just listed" card, catch-all `transition` on several elements
- Five equal neighborhood cards side by side (home)
- 600 weights on display headings, prices, agent names and stats
- Everything a pill: buttons, nav items, status badges with shadows, filter chips, specialty tags, map link
- 40px radii on the hero and call to action panels, 24px on every card
- Two-hue gradient agent portrait placeholders
- Trailing periods on the hero headline, the tagline, the sell heading and the 404 headline
- Hero headline that would fit any brokerage ("Find the home that fits the way you live.")

## Direction

- Product: a small Larkspur Bay brokerage that lists homes, lets people filter them and connects them with a local agent
- Character: neighborly, grounded, unhurried
- World: a Maine harbor town; shingle, pine, brass house numbers, printed listing sheets
- Moments: the illustrated homes (hero and listing gallery), each one its own little scene
- Signature: brass numerals; the five neighborhoods are numbered 01 to 05 in brass, like house numbers

## Changes

- Spacing and details: cards 16px radius, panels 24px, buttons 10px, tags 6px; status badges are quiet tags without shadows
- Color: washes, blob and colored shadows removed; neutral soft shadows only; new `brass-ink` (#86602c) so brass text reads on paper
- Copy: hero headline now says what this brokerage is ("Homes in Larkspur Bay, from agents who live here"), eyebrow names a fact from the page; trailing periods dropped on headings
- Type: sentence-case labels and eyebrows, display weights 500, tabular figures for prices and facts
- Layout: neighborhoods became a ruled list with brass numerals, name, blurb and count, instead of five equal cards
- Visuals: agent portraits are a single solid tone
- Motion: no image zoom or lift on hover; named transitions only

screenshot-2: Listing page (88 Summit Road), gallery and key details
screenshot-3: Listings page with filters
