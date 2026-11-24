// Everything about the brokerage itself lives here: name, contact details,
// menu, page copy. Listings are in data/listings.ts, agents in data/agents.ts.

export const site = {
  name: "Harbor & Pine Realty",
  shortName: "Harbor & Pine",
  tagline: "Homes with a sense of place in Larkspur Bay.",
  description:
    "Harbor & Pine Realty helps buyers and sellers find homes across Larkspur Bay, from waterfront cottages in Old Harbor to modern lofts in Riverside Flats.",
  // Used for the sitemap, canonical links and social cards. Change it to your domain.
  url: "https://example.com",
  // Added to each listing address for the map link.
  city: "Larkspur Bay, ME",
  locale: "en_US",
  currency: "USD",

  contact: {
    email: "hello@harborandpine.example",
    phone: "(555) 014-2290",
    address: ["418 Wharf Street, Suite 200", "Larkspur Bay, ME 04011"],
    hours: ["Monday to Friday, 9 am to 6 pm", "Saturday, 10 am to 4 pm"],
  },

  nav: [
    { label: "Listings", href: "/listings/" },
    { label: "Agents", href: "/agents/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  hero: {
    eyebrow: "Larkspur Bay real estate",
    title: "Find the home that fits the way you live.",
    text: "Browse every listing from our team, filter by the things that matter, and talk to a local agent who knows the street, not just the square footage.",
  },

  stats: [
    { value: "340+", label: "Homes sold since 2014" },
    { value: "21 days", label: "Median time to accepted offer" },
    { value: "4.9 of 5", label: "Average client rating" },
  ],

  about: {
    title: "A small team that knows every street in town",
    intro:
      "Harbor & Pine started in 2014 with two agents and a borrowed office above a bakery on Wharf Street. We still work the same way: fewer clients at a time, more attention for each one, and honest advice even when it means waiting for the right house.",
    values: [
      {
        title: "Local first",
        text: "Every agent on our team lives in Larkspur Bay. We know which streets flood in spring, which schools have new programs and where the morning light is best.",
      },
      {
        title: "Plain answers",
        text: "We explain pricing, offers and inspections in plain language, with the numbers in front of you, so every decision is your own.",
      },
      {
        title: "Fewer, better listings",
        text: "We take on a limited number of homes each season so each one gets proper photography, a real marketing plan and an agent who answers the phone.",
      },
    ],
    story: [
      "Our founders, Dana Whitcombe and Marcus Lee, met while restoring a shingled cottage near the old ferry landing. The project taught them that a house is never just a list of features. It is the walk to the coffee shop, the neighbors, the view from the kitchen sink.",
      "Today the team has seven agents and a full-time transaction coordinator, but the approach has not changed. We would rather tell you a house is wrong for you than sell you one you will want to leave in two years.",
    ],
  },

  contactPage: {
    title: "Let's talk about your next move",
    text: "Tell us a little about what you are looking for, or the home you are thinking of selling. A local agent will get back to you within one business day.",
  },

  neighborhoodsHeading: "Five corners of Larkspur Bay, each with its own pace",

  // Neighborhoods power the "area" filter and the home page cards.
  neighborhoods: [
    {
      name: "Old Harbor",
      blurb: "Shingled cottages, working docks and the best chowder in town.",
    },
    {
      name: "Pinecrest",
      blurb: "Quiet wooded lots, big yards and trails right from the back door.",
    },
    {
      name: "Riverside Flats",
      blurb: "Converted mills and lofts a short walk from the arts district.",
    },
    {
      name: "Eastwick Heights",
      blurb: "Hilltop streets with harbor views and classic colonials.",
    },
    {
      name: "Maple Commons",
      blurb: "Family friendly, close to schools, parks and the Saturday market.",
    },
  ],

  footerNote: "Listings and agents on this site are fictional examples.",
} as const;

export type Site = typeof site;
