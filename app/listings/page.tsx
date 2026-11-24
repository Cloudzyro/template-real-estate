import type { Metadata } from "next";
import { ListingsExplorer } from "@/components/ListingsExplorer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Homes for sale",
  description: `Browse every home for sale from ${site.name}. Filter by price, bedrooms, bathrooms and neighborhood.`,
  alternates: { canonical: "/listings/" },
};

export default function ListingsPage() {
  return (
    <div className="container-x py-12">
      <p className="eyebrow">Listings</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">Homes for sale</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Every home our team is selling right now. Narrow it down by price, size and neighborhood, then book a tour from any listing.
      </p>
      <div className="mt-10">
        <ListingsExplorer />
      </div>
    </div>
  );
}
