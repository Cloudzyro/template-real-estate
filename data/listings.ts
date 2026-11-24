// Every property on the site. Add, remove or edit entries here; the listings
// page, filters, home page and a detail page per property are built from it.
// `slug` becomes the page address: /listings/<slug>/

export type PropertyType = "House" | "Condo" | "Townhouse" | "Cottage";

export type Listing = {
  slug: string;
  title: string;
  address: string;
  neighborhood: string; // must match a name in site.neighborhoods
  type: PropertyType;
  status: "For sale" | "Pending" | "New";
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotAcres?: number;
  yearBuilt: number;
  garage?: string;
  featured?: boolean;
  summary: string;
  description: string[];
  highlights: string[];
  agentId: string;
  // Placeholder art palette: [sky, building, accent]. Replace the art with
  // your own photos by adding `photos` (paths in /public) and editing
  // components/ListingGallery.tsx.
  palette: [string, string, string];
};

export const listings: Listing[] = [
  {
    slug: "12-ferry-landing-lane",
    title: "Shingled cottage steps from the water",
    address: "12 Ferry Landing Lane",
    neighborhood: "Old Harbor",
    type: "Cottage",
    status: "New",
    price: 685000,
    beds: 2,
    baths: 2,
    sqft: 1240,
    lotAcres: 0.12,
    yearBuilt: 1912,
    garage: "Off-street parking for 2",
    featured: true,
    summary: "A restored 1912 cottage with harbor glimpses, wide pine floors and a sunny garden.",
    description: [
      "Set on one of Old Harbor's quietest lanes, this cottage has been carefully restored with new systems while keeping its original pine floors, beadboard ceilings and built-in window seats.",
      "The open kitchen looks out to a fenced garden with raised beds and a stone patio. Upstairs, two bedrooms tuck under the eaves, and the primary has a peek of the harbor through the maples.",
    ],
    highlights: ["Harbor views from primary bedroom", "New roof and heat pump (2024)", "Fenced cottage garden", "Two blocks to the ferry"],
    agentId: "dana-whitcombe",
    palette: ["#cfe1e6", "#5b7a8a", "#c9a46a"],
  },
  {
    slug: "88-summit-road",
    title: "Hilltop colonial with sweeping bay views",
    address: "88 Summit Road",
    neighborhood: "Eastwick Heights",
    type: "House",
    status: "For sale",
    price: 1295000,
    beds: 4,
    baths: 3.5,
    sqft: 3420,
    lotAcres: 0.48,
    yearBuilt: 1928,
    garage: "Detached 2-car garage",
    featured: true,
    summary: "A classic center-hall colonial with a wraparound porch and views across the whole bay.",
    description: [
      "This 1928 colonial sits near the top of Summit Road, with a wraparound porch that catches the sunrise over the water. Formal living and dining rooms flow to a renovated kitchen with a large island and butler's pantry.",
      "Four bedrooms upstairs include a primary suite with a soaking tub and a dressing room. A finished third floor makes a quiet office or studio.",
    ],
    highlights: ["Panoramic bay views", "Renovated chef's kitchen", "Third-floor studio", "Mature perennial gardens"],
    agentId: "dana-whitcombe",
    palette: ["#f3dcc2", "#f4f1ea", "#1f4d3a"],
  },
  {
    slug: "the-millworks-loft-4b",
    title: "Corner loft in a converted textile mill",
    address: "200 Millrace Street, Unit 4B",
    neighborhood: "Riverside Flats",
    type: "Condo",
    status: "For sale",
    price: 529000,
    beds: 1,
    baths: 1.5,
    sqft: 1080,
    yearBuilt: 1887,
    garage: "Deeded garage space",
    featured: true,
    summary: "Fourteen-foot ceilings, brick walls and oversized windows over the river.",
    description: [
      "Unit 4B is a corner loft at The Millworks with two walls of original arched windows looking out over the river and the old falls. Exposed brick and timber beams frame an open living space with a modern kitchen.",
      "A sleeping loft with a glass rail sits above the main floor, with a full bath below and a powder room off the entry. The building has a roof deck, gym and bike room.",
    ],
    highlights: ["Corner unit with river views", "14-foot timber ceilings", "Roof deck and gym", "Walk to the arts district"],
    agentId: "priya-anand",
    palette: ["#e8d5c8", "#9c4f3c", "#2e3a40"],
  },
  {
    slug: "5-hemlock-hollow",
    title: "Modern farmhouse on two wooded acres",
    address: "5 Hemlock Hollow",
    neighborhood: "Pinecrest",
    type: "House",
    status: "For sale",
    price: 949000,
    beds: 4,
    baths: 3,
    sqft: 2860,
    lotAcres: 2.1,
    yearBuilt: 2019,
    garage: "Attached 2-car garage",
    featured: true,
    summary: "Board-and-batten farmhouse with a screened porch and a trail into the town forest.",
    description: [
      "Built in 2019, this farmhouse balances clean modern lines with warm materials: white oak floors, a soapstone kitchen and a wood stove in the great room.",
      "The screened porch opens to a level lawn backed by hemlocks, with a private path that joins the Pinecrest town forest trails.",
    ],
    highlights: ["Two private wooded acres", "Screened porch", "Solar panels, owned outright", "Direct trail access"],
    agentId: "tomas-reyes",
    palette: ["#d7e3d0", "#f6f4ef", "#2f3b33"],
  },
  {
    slug: "31-orchard-street",
    title: "Updated cape near the Saturday market",
    address: "31 Orchard Street",
    neighborhood: "Maple Commons",
    type: "House",
    status: "Pending",
    price: 574000,
    beds: 3,
    baths: 2,
    sqft: 1760,
    lotAcres: 0.22,
    yearBuilt: 1954,
    garage: "Attached 1-car garage",
    summary: "A bright cape with a new kitchen, a flat backyard and a short walk to two schools.",
    description: [
      "This well-kept cape has a new kitchen with quartz counters, a dining area that opens to a deck and a flat backyard with a play set and garden shed.",
      "Two bedrooms on the main floor and a large dormered bedroom upstairs give flexible space for a growing family or a home office.",
    ],
    highlights: ["New kitchen (2023)", "Level fenced backyard", "Walk to schools and park", "Finished basement playroom"],
    agentId: "tomas-reyes",
    palette: ["#f5e6c8", "#a8433a", "#3b4a3f"],
  },
  {
    slug: "7-capstan-row",
    title: "Brick townhouse on a gaslit row",
    address: "7 Capstan Row",
    neighborhood: "Old Harbor",
    type: "Townhouse",
    status: "For sale",
    price: 815000,
    beds: 3,
    baths: 2.5,
    sqft: 1980,
    yearBuilt: 1868,
    garage: "Resident permit parking",
    summary: "A Federal-style townhouse with three fireplaces and a private walled courtyard.",
    description: [
      "One of six original brick townhouses on Capstan Row, this home keeps its tall windows, three working fireplaces and curved staircase, with updated baths and systems throughout.",
      "The garden level opens to a walled brick courtyard with a fig tree and space for dinners outside.",
    ],
    highlights: ["Three working fireplaces", "Walled brick courtyard", "Original moldings and stair", "Steps to restaurants"],
    agentId: "dana-whitcombe",
    palette: ["#e9d9cf", "#8e3b2f", "#1f2d3a"],
  },
  {
    slug: "riverwalk-residences-210",
    title: "Two-bedroom condo with a river terrace",
    address: "55 Riverwalk Drive, Unit 210",
    neighborhood: "Riverside Flats",
    type: "Condo",
    status: "New",
    price: 439000,
    beds: 2,
    baths: 2,
    sqft: 1150,
    yearBuilt: 2021,
    garage: "Heated underground space",
    summary: "A light-filled corner unit with a private terrace on the river path.",
    description: [
      "This second-floor corner unit at Riverwalk Residences has floor-to-ceiling windows, a split bedroom plan and a private terrace that steps out to the riverside path.",
      "The building has heated underground parking, storage, an elevator and a shared courtyard with grills.",
    ],
    highlights: ["Private river terrace", "Split bedroom plan", "Elevator building", "Low monthly association fee"],
    agentId: "priya-anand",
    palette: ["#dbe7ee", "#e8e4dc", "#284b63"],
  },
  {
    slug: "140-birch-hill-road",
    title: "Lakeside retreat with a private dock",
    address: "140 Birch Hill Road",
    neighborhood: "Pinecrest",
    type: "Cottage",
    status: "For sale",
    price: 729000,
    beds: 3,
    baths: 2,
    sqft: 1590,
    lotAcres: 0.9,
    yearBuilt: 1972,
    garage: "Carport",
    summary: "A year-round cottage on Birch Pond with a dock, a bunk house and long sunset views.",
    description: [
      "This year-round cottage sits on a gentle slope above Birch Pond, with a wall of windows facing west for long sunsets over the water. A stone fireplace anchors the living room.",
      "Down the path you will find a private dock and a small bunk house that sleeps four, perfect for guests in the summer.",
    ],
    highlights: ["Private dock on Birch Pond", "Guest bunk house", "Stone fireplace", "West-facing sunset views"],
    agentId: "marcus-lee",
    palette: ["#f2d4b8", "#6e4b3a", "#2c4f5c"],
  },
  {
    slug: "19-linden-court",
    title: "Family colonial on a quiet cul-de-sac",
    address: "19 Linden Court",
    neighborhood: "Maple Commons",
    type: "House",
    status: "For sale",
    price: 689000,
    beds: 4,
    baths: 2.5,
    sqft: 2410,
    lotAcres: 0.34,
    yearBuilt: 1998,
    garage: "Attached 2-car garage",
    summary: "Four bedrooms, a family room with a fireplace and a big backyard at the end of a cul-de-sac.",
    description: [
      "At the end of a quiet cul-de-sac, this colonial has room for everyone: a family room with a gas fireplace, a formal dining room, a mudroom off the garage and four bedrooms upstairs.",
      "The backyard backs onto conservation land, so the view from the deck will stay green for good.",
    ],
    highlights: ["Backs onto conservation land", "Mudroom and laundry on main floor", "Large deck", "Cul-de-sac location"],
    agentId: "marcus-lee",
    palette: ["#e3e9dc", "#c9c1b0", "#3b5249"],
  },
  {
    slug: "3-lookout-terrace",
    title: "Contemporary with glass walls and harbor views",
    address: "3 Lookout Terrace",
    neighborhood: "Eastwick Heights",
    type: "House",
    status: "For sale",
    price: 1685000,
    beds: 3,
    baths: 3.5,
    sqft: 2980,
    lotAcres: 0.41,
    yearBuilt: 2016,
    garage: "Attached 2-car garage with charger",
    summary: "An architect-designed home with walls of glass, radiant floors and a rooftop deck.",
    description: [
      "Designed by a local architect for their own family, this contemporary home steps down the hillside in three levels, each with walls of glass that frame the harbor.",
      "Radiant floors, a chef's kitchen with a scullery, and a rooftop deck with an outdoor kitchen make it as easy to live in as it is to look at.",
    ],
    highlights: ["Rooftop deck with outdoor kitchen", "Radiant heated floors", "EV charger", "Architect-designed"],
    agentId: "dana-whitcombe",
    palette: ["#d6e2ea", "#2d3436", "#c9a46a"],
  },
  {
    slug: "42-weaver-street",
    title: "Row house with a studio over the garage",
    address: "42 Weaver Street",
    neighborhood: "Riverside Flats",
    type: "Townhouse",
    status: "For sale",
    price: 612000,
    beds: 2,
    baths: 2.5,
    sqft: 1620,
    yearBuilt: 1904,
    garage: "Detached garage with studio above",
    summary: "A renovated worker's row house with a detached studio, ideal for a maker or home office.",
    description: [
      "This renovated row house keeps its original tin ceilings and adds a modern kitchen and two full baths upstairs. A small brick patio connects the house to a detached garage.",
      "Above the garage is a heated, insulated studio with skylights, ready for painting, woodworking or a quiet office.",
    ],
    highlights: ["Detached studio with skylights", "Original tin ceilings", "Two upstairs baths", "Walk to the river path"],
    agentId: "priya-anand",
    palette: ["#ecdcc8", "#4a5d6b", "#b5543b"],
  },
  {
    slug: "27-pinecone-way",
    title: "Starter ranch with a big backyard",
    address: "27 Pinecone Way",
    neighborhood: "Pinecrest",
    type: "House",
    status: "New",
    price: 419000,
    beds: 3,
    baths: 1.5,
    sqft: 1320,
    lotAcres: 0.5,
    yearBuilt: 1966,
    garage: "Attached 1-car garage",
    summary: "One-floor living with refinished hardwoods and half an acre to make your own.",
    description: [
      "This single-level ranch has refinished oak floors, fresh paint and a bright eat-in kitchen ready for your ideas. Three bedrooms sit at the quiet end of the house.",
      "The half-acre lot is level and sunny, with room for a garden, a play area or a future addition.",
    ],
    highlights: ["Single-level living", "Half-acre level lot", "Refinished oak floors", "Great first home"],
    agentId: "tomas-reyes",
    palette: ["#f0e6d2", "#7a8b6f", "#3e3a33"],
  },
];

export function getListing(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
