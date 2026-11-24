import type { MetadataRoute } from "next";
import { listings } from "@/data/listings";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/listings/", "/agents/", "/about/", "/contact/"];
  return [
    ...pages.map((p) => ({ url: new URL(p, site.url).toString(), changeFrequency: "weekly" as const })),
    ...listings.map((l) => ({ url: new URL(`/listings/${l.slug}/`, site.url).toString(), changeFrequency: "weekly" as const })),
  ];
}
