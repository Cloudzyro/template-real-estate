"use client";

import { useState } from "react";
import type { Listing } from "@/data/listings";
import { PropertyArt, galleryViews } from "./PropertyArt";
import { StatusBadge } from "./ListingCard";

export function ListingGallery({ listing }: { listing: Listing }) {
  const [index, setIndex] = useState(0);
  const current = galleryViews[index];

  return (
    <section aria-label="Photo gallery" className="grid gap-3 lg:grid-cols-[1fr_140px]">
      <div className="relative overflow-hidden rounded-3xl bg-sand">
        <PropertyArt listing={listing} view={current.view} className="aspect-[4/3] w-full sm:aspect-[16/10]" />
        <div className="absolute left-4 top-4">
          <StatusBadge status={listing.status} />
        </div>
        <p className="absolute bottom-4 right-4 rounded-md bg-ink/70 px-2 py-1 text-xs font-medium text-white" aria-live="polite">
          {current.label} &middot; {index + 1} of {galleryViews.length}
        </p>
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setIndex((i) => (i - 1 + galleryViews.length) % galleryViews.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setIndex((i) => (i + 1) % galleryViews.length)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow hover:bg-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-5 gap-2 lg:grid-cols-1">
        {galleryViews.map((g, i) => (
          <li key={g.view}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${g.label.toLowerCase()}`}
              aria-pressed={i === index}
              className={`block w-full overflow-hidden rounded-xl ring-2 transition-[opacity,box-shadow] ${i === index ? "ring-pine" : "ring-transparent opacity-75 hover:opacity-100"}`}
            >
              <PropertyArt listing={listing} view={g.view} className="aspect-[4/3] w-full" label="" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
