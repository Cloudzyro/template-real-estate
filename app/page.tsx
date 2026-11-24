import Link from "next/link";
import { HeroSearch } from "@/components/HeroSearch";
import { ListingCard } from "@/components/ListingCard";
import { PropertyArt } from "@/components/PropertyArt";
import { AgentPortrait } from "@/components/AgentCard";
import { listings } from "@/data/listings";
import { agents } from "@/data/agents";
import { site } from "@/data/site";

export default function Home() {
  const featured = listings.filter((l) => l.featured).slice(0, 3);
  const hero = listings.find((l) => l.featured) ?? listings[0];
  const counts = Object.fromEntries(site.neighborhoods.map((n) => [n.name, listings.filter((l) => l.neighborhood === n.name).length]));

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_10%,#f1e4cc_0,transparent_45%),radial-gradient(circle_at_0%_100%,#dfe8dd_0,transparent_40%)]"
        />
        <div className="container-x grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-20">
          <div>
            <p className="eyebrow">{site.hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-[2.6rem] font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {site.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{site.hero.text}</p>
            <div className="mt-8">
              <HeroSearch />
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              {site.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="text-xs leading-snug text-muted">{s.label}</dt>
                  <dd className="order-first font-display text-2xl font-semibold text-pine sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-pine/20">
              <PropertyArt listing={hero} className="aspect-[4/5] w-full" label={`Illustration of ${hero.address}`} />
            </div>
            <Link
              href={`/listings/${hero.slug}/`}
              className="absolute -bottom-6 -left-8 w-72 rounded-3xl bg-white p-5 shadow-xl ring-1 ring-line transition hover:-translate-y-0.5"
            >
              <p className="eyebrow">Just listed</p>
              <p className="mt-1 font-display text-lg font-semibold leading-snug">{hero.title}</p>
              <p className="mt-1 text-sm text-muted">
                {hero.neighborhood} &middot; {hero.beds} bd &middot; {hero.baths} ba
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x py-16" aria-labelledby="featured-heading">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Featured homes</p>
            <h2 id="featured-heading" className="mt-2 font-display text-4xl font-medium tracking-tight">
              This season&apos;s standouts
            </h2>
          </div>
          <Link href="/listings/" className="btn-ghost">
            See all {listings.length} listings
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <li key={l.slug} className="flex">
              <ListingCard listing={l} />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-sand/70 py-20" aria-labelledby="areas-heading">
        <div className="container-x">
          <p className="eyebrow">Neighborhoods</p>
          <h2 id="areas-heading" className="mt-2 max-w-2xl font-display text-4xl font-medium tracking-tight">
            {site.neighborhoodsHeading}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {site.neighborhoods.map((n, i) => (
              <li key={n.name}>
                <Link
                  href={`/listings/?area=${encodeURIComponent(n.name)}`}
                  className="group flex h-full flex-col rounded-3xl bg-paper p-6 ring-1 ring-line transition hover:bg-white hover:shadow-lg"
                >
                  <span className="font-display text-sm text-brass">0{i + 1}</span>
                  <span className="mt-6 font-display text-2xl font-medium leading-tight">{n.name}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{n.blurb}</span>
                  <span className="mt-5 text-sm font-semibold text-pine">
                    {counts[n.name]} {counts[n.name] === 1 ? "home" : "homes"} for sale
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2" aria-labelledby="team-heading">
        <div>
          <p className="eyebrow">Our agents</p>
          <h2 id="team-heading" className="mt-2 font-display text-4xl font-medium tracking-tight">
            Local people who pick up the phone
          </h2>
          <p className="mt-4 max-w-lg leading-relaxed text-muted">{site.about.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/agents/" className="btn-primary">
              Meet the team
            </Link>
            <Link href="/about/" className="btn-ghost">
              Our story
            </Link>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-4">
          {agents.map((a, i) => (
            <li key={a.id} className={i % 2 ? "translate-y-8" : ""}>
              <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
                <AgentPortrait agent={a} className="aspect-square w-full" />
                <div className="p-4">
                  <p className="font-display text-lg font-semibold leading-tight">{a.name}</p>
                  <p className="text-xs text-muted">{a.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x pt-8" aria-labelledby="cta-heading">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-pine px-6 py-14 text-white sm:px-12">
          <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass/30 blur-2xl" />
          <div className="relative max-w-2xl">
            <h2 id="cta-heading" className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Thinking of selling? Find out what your home is worth.
            </h2>
            <p className="mt-4 text-white/80">
              Get a free, no-pressure price opinion from an agent who has sold on your street, with recent sales and a plan to match.
            </p>
            <Link href="/contact/" className="btn mt-8 bg-white text-pine hover:bg-brass-soft">
              Request a home valuation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
