import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AgentCard } from "@/components/AgentCard";
import { InquiryForm } from "@/components/InquiryForm";
import { ListingCard } from "@/components/ListingCard";
import { ListingGallery } from "@/components/ListingGallery";
import { getAgent } from "@/data/agents";
import { formatPrice, getListing, listings } from "@/data/listings";
import { site } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return listings.map((l) => ({ slug: l.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const l = getListing(slug);
  if (!l) return {};
  const title = `${l.address}, ${l.neighborhood}`;
  const description = `${formatPrice(l.price)}. ${l.beds} bed, ${l.baths} bath, ${l.sqft.toLocaleString("en-US")} sq ft ${l.type.toLowerCase()}. ${l.summary}`;
  return {
    title,
    description,
    alternates: { canonical: `/listings/${l.slug}/` },
    openGraph: { title, description, type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: title }] },
  };
}

export default async function ListingPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();
  const agent = getAgent(listing.agentId);
  const mapQuery = encodeURIComponent(`${listing.address}, ${site.city}`);
  const mapUrl = `https://www.openstreetmap.org/search?query=${mapQuery}`;
  const similar = listings
    .filter((l) => l.slug !== listing.slug && (l.neighborhood === listing.neighborhood || l.type === listing.type))
    .slice(0, 3);

  const facts: [string, string][] = [
    ["Price", formatPrice(listing.price)],
    ["Bedrooms", String(listing.beds)],
    ["Bathrooms", String(listing.baths)],
    ["Living area", `${listing.sqft.toLocaleString("en-US")} sq ft`],
    ["Home type", listing.type],
    ["Year built", String(listing.yearBuilt)],
    ...(listing.lotAcres ? ([["Lot size", `${listing.lotAcres} acres`]] as [string, string][]) : []),
    ...(listing.garage ? ([["Parking", listing.garage]] as [string, string][]) : []),
    ["Price per sq ft", formatPrice(Math.round(listing.price / listing.sqft))],
  ];

  return (
    <div className="container-x py-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/listings/" className="underline-offset-4 hover:text-ink hover:underline">
              Listings
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/listings/?area=${encodeURIComponent(listing.neighborhood)}`} className="underline-offset-4 hover:text-ink hover:underline">
              {listing.neighborhood}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {listing.address}
          </li>
        </ol>
      </nav>

      <ListingGallery listing={listing} />

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <article>
          <header>
            <p className="eyebrow">
              {listing.neighborhood} &middot; {listing.type}
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">{listing.address}</h1>
            <p className="mt-2 text-lg text-muted">{listing.title}</p>
            <p className="mt-5 font-display text-4xl font-semibold text-pine">{formatPrice(listing.price)}</p>
          </header>

          <section aria-labelledby="facts-heading" className="mt-10">
            <h2 id="facts-heading" className="font-display text-2xl font-medium">
              Key facts
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-white p-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="about-heading" className="mt-10">
            <h2 id="about-heading" className="font-display text-2xl font-medium">
              About this home
            </h2>
            <div className="mt-4 space-y-4 leading-relaxed text-ink/85">
              {listing.description.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {listing.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-2xl bg-sand/60 px-4 py-3 text-sm">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-pine" fill="currentColor" aria-hidden="true">
                    <path d="M7.6 13.6 4 10l-1.4 1.4 5 5L17.4 6.6 16 5.2z" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="map-heading" className="mt-10">
            <h2 id="map-heading" className="font-display text-2xl font-medium">
              Location
            </h2>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mt-4 block overflow-hidden rounded-3xl border border-line"
            >
              <svg viewBox="0 0 800 320" className="h-56 w-full sm:h-72" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <rect width="800" height="320" fill="#e6ece2" />
                <path d="M0 230 C 160 200, 260 300, 420 260 S 680 200, 800 240 V 320 H 0 Z" fill="#cfe1e6" />
                <g stroke="#ffffff" strokeWidth="14" fill="none" strokeLinecap="round">
                  <path d="M-20 90 H 820" />
                  <path d="M180 -20 V 340" />
                  <path d="M520 -20 L 600 340" />
                  <path d="M-20 180 Q 300 150 820 120" />
                </g>
                <g stroke="#ffffff" strokeWidth="6" fill="none" opacity="0.8">
                  <path d="M340 -20 V 230" />
                  <path d="M0 40 H 800" />
                  <path d="M680 -20 V 220" />
                </g>
                <rect x="40" y="110" width="110" height="50" rx="8" fill="#d6e2cf" />
                <rect x="220" y="20" width="90" height="56" rx="8" fill="#d6e2cf" />
                <g transform="translate(400 150)">
                  <circle r="34" fill="#1f4d3a" opacity="0.15" />
                  <path d="M0 18 C -14 0, -16 -6, -16 -12 a16 16 0 1 1 32 0 c 0 6 -2 12 -16 30 Z" fill="#1f4d3a" />
                  <circle cy="-12" r="6" fill="#f1e4cc" />
                </g>
              </svg>
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-pine shadow group-hover:bg-brass-soft">
                Open {listing.address} in a map (new tab)
              </span>
            </a>
          </section>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit" aria-label="Contact the listing agent">
          {agent && (
            <div className="rounded-3xl border border-line bg-white p-6">
              <p className="eyebrow mb-4">Listing agent</p>
              <AgentCard agent={agent} compact />
            </div>
          )}
          <div className="rounded-3xl border border-line bg-white p-6">
            <h2 className="font-display text-2xl font-medium">Ask about this home</h2>
            <p className="mb-5 mt-1 text-sm text-muted">Book a tour or ask a question. {agent ? agent.name.split(" ")[0] : "We"} will reply within a day.</p>
            <InquiryForm
              compact
              showInterest
              to={agent?.email}
              subject={`Inquiry: ${listing.address}`}
              defaultMessage={`Hi, I am interested in ${listing.address}. Could we arrange a time to see it?`}
            />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="similar-heading" className="mt-20">
          <h2 id="similar-heading" className="font-display text-3xl font-medium tracking-tight">
            You might also like
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((l) => (
              <li key={l.slug} className="flex">
                <ListingCard listing={l} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
