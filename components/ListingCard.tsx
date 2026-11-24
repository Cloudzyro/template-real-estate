import Link from "next/link";
import { formatPrice, type Listing } from "@/data/listings";
import { PropertyArt } from "./PropertyArt";

export function Facts({ listing, className = "" }: { listing: Listing; className?: string }) {
  return (
    <dl className={`flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted ${className}`}>
      <div className="flex gap-1">
        <dt className="sr-only">Bedrooms</dt>
        <dd>
          <strong className="font-semibold text-ink">{listing.beds}</strong> bd
        </dd>
      </div>
      <div className="flex gap-1">
        <dt className="sr-only">Bathrooms</dt>
        <dd>
          <strong className="font-semibold text-ink">{listing.baths}</strong> ba
        </dd>
      </div>
      <div className="flex gap-1">
        <dt className="sr-only">Square feet</dt>
        <dd>
          <strong className="font-semibold text-ink">{listing.sqft.toLocaleString("en-US")}</strong> sq ft
        </dd>
      </div>
    </dl>
  );
}

export function StatusBadge({ status }: { status: Listing["status"] }) {
  const styles =
    status === "New"
      ? "bg-brass text-white"
      : status === "Pending"
        ? "bg-ink/80 text-white"
        : "bg-white/90 text-ink";
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${styles}`}>{status}</span>;
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-shadow hover:shadow-xl hover:shadow-pine/10 focus-within:ring-3 focus-within:ring-brass">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <PropertyArt
          listing={listing}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
          label={`Illustration of ${listing.address}`}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusBadge status={listing.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-2xl font-semibold tracking-tight">{formatPrice(listing.price)}</p>
        <h3 className="mt-1 text-base font-semibold">
          <Link href={`/listings/${listing.slug}/`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {listing.address}
          </Link>
        </h3>
        <p className="text-sm text-muted">
          {listing.neighborhood} &middot; {listing.type}
        </p>
        <Facts listing={listing} className="mt-4 border-t border-line pt-4" />
      </div>
    </article>
  );
}
