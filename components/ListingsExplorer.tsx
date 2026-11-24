"use client";

import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { listings, type PropertyType } from "@/data/listings";
import { site } from "@/data/site";
import { ListingCard } from "./ListingCard";

const priceSteps = [300000, 400000, 500000, 600000, 750000, 1000000, 1250000, 1500000, 2000000];
const types: PropertyType[] = ["House", "Condo", "Townhouse", "Cottage"];

type Filters = {
  q: string;
  area: string;
  type: string;
  min: string;
  max: string;
  beds: string;
  baths: string;
  sort: string;
};

const empty: Filters = { q: "", area: "", type: "", min: "", max: "", beds: "", baths: "", sort: "newest" };

function short(n: number) {
  return n >= 1000000 ? `$${(n / 1000000).toFixed(n % 1000000 ? 2 : 0).replace(/0$/, "")}M` : `$${n / 1000}k`;
}

export function ListingsExplorer() {
  const [f, setF] = useState<Filters>(empty);
  const [ready, setReady] = useState(false);

  // Read filters from the address (so the home page search and shared links work).
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const next = { ...empty };
    (Object.keys(empty) as (keyof Filters)[]).forEach((k) => {
      const v = p.get(k);
      if (v) next[k] = v;
    });
    setF(next);
    setReady(true);
  }, []);

  // Keep the address in sync so filtered results can be bookmarked.
  useEffect(() => {
    if (!ready) return;
    const p = new URLSearchParams();
    (Object.keys(f) as (keyof Filters)[]).forEach((k) => {
      if (f[k] && !(k === "sort" && f[k] === "newest")) p.set(k, f[k]);
    });
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [f, ready]);

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const out = listings.filter((l) => {
      if (q && !`${l.address} ${l.title} ${l.neighborhood} ${l.summary}`.toLowerCase().includes(q)) return false;
      if (f.area && l.neighborhood !== f.area) return false;
      if (f.type && l.type !== f.type) return false;
      if (f.min && l.price < Number(f.min)) return false;
      if (f.max && l.price > Number(f.max)) return false;
      if (f.beds && l.beds < Number(f.beds)) return false;
      if (f.baths && l.baths < Number(f.baths)) return false;
      return true;
    });
    if (f.sort === "price-asc") out.sort((a, b) => a.price - b.price);
    if (f.sort === "price-desc") out.sort((a, b) => b.price - a.price);
    if (f.sort === "size") out.sort((a, b) => b.sqft - a.sqft);
    return out;
  }, [f]);

  const set = (k: keyof Filters) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const active = (Object.keys(empty) as (keyof Filters)[]).some((k) => k !== "sort" && f[k]);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <form
        role="search"
        aria-label="Filter listings"
        className="h-fit space-y-5 rounded-3xl border border-line bg-white p-5 lg:sticky lg:top-24"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label htmlFor="f-q" className="label">
            Search
          </label>
          <input id="f-q" type="search" className="field" placeholder="Street, keyword" value={f.q} onChange={set("q")} />
        </div>
        <div>
          <label htmlFor="f-area" className="label">
            Neighborhood
          </label>
          <select id="f-area" className="field" value={f.area} onChange={set("area")}>
            <option value="">All neighborhoods</option>
            {site.neighborhoods.map((n) => (
              <option key={n.name} value={n.name}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="label">Price</legend>
          <div className="grid grid-cols-2 gap-2">
            <select aria-label="Minimum price" className="field" value={f.min} onChange={set("min")}>
              <option value="">No min</option>
              {priceSteps.map((p) => (
                <option key={p} value={p}>
                  {short(p)}
                </option>
              ))}
            </select>
            <select aria-label="Maximum price" className="field" value={f.max} onChange={set("max")}>
              <option value="">No max</option>
              {priceSteps.map((p) => (
                <option key={p} value={p}>
                  {short(p)}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="f-beds" className="label">
              Beds
            </label>
            <select id="f-beds" className="field" value={f.beds} onChange={set("beds")}>
              <option value="">Any</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="f-baths" className="label">
              Baths
            </label>
            <select id="f-baths" className="field" value={f.baths} onChange={set("baths")}>
              <option value="">Any</option>
              {[1, 2, 3].map((n) => (
                <option key={n} value={n}>
                  {n}+
                </option>
              ))}
            </select>
          </div>
        </div>
        <fieldset>
          <legend className="label">Home type</legend>
          <div className="flex flex-wrap gap-2">
            {["", ...types].map((t) => (
              <label key={t || "any"} className="cursor-pointer">
                <input type="radio" name="type" value={t} checked={f.type === t} onChange={set("type")} className="peer sr-only" />
                <span className="inline-block rounded-full border border-line px-3 py-1.5 text-sm transition-colors peer-checked:border-pine peer-checked:bg-pine peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass">
                  {t || "Any"}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {active && (
          <button type="button" className="text-sm font-semibold text-pine underline underline-offset-4" onClick={() => setF({ ...empty, sort: f.sort })}>
            Clear filters
          </button>
        )}
      </form>

      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted" aria-live="polite">
            <strong className="text-ink">{results.length}</strong> {results.length === 1 ? "home" : "homes"} found
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sort by</span>
            <select className="field w-auto py-2" value={f.sort} onChange={set("sort")}>
              <option value="newest">Featured</option>
              <option value="price-asc">Price, low to high</option>
              <option value="price-desc">Price, high to low</option>
              <option value="size">Largest first</option>
            </select>
          </label>
        </div>
        {results.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((l) => (
              <li key={l.slug} className="flex">
                <ListingCard listing={l} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-3xl border border-dashed border-line bg-white/60 p-10 text-center">
            <p className="font-display text-2xl">No homes match those filters yet.</p>
            <p className="mt-2 text-sm text-muted">Try a wider price range or a different neighborhood, or tell us what you need and we will keep an eye out.</p>
            <button type="button" className="btn-primary mt-5" onClick={() => setF(empty)}>
              Show all homes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
