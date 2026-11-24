import type { Metadata } from "next";
import Link from "next/link";
import { PropertyArt } from "@/components/PropertyArt";
import { listings } from "@/data/listings";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About us",
  description: site.about.intro,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const art = listings.find((l) => l.type === "Townhouse") ?? listings[0];
  return (
    <div className="container-x py-12">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">About {site.shortName}</p>
          <h1 className="mt-2 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">{site.about.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{site.about.intro}</p>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-[0_8px_24px_rgba(28,36,32,0.08)]">
          <PropertyArt listing={art} className="aspect-[4/3] w-full" label="Illustration of a row of brick townhouses in Old Harbor" />
        </div>
      </div>

      <section aria-labelledby="values-heading" className="mt-20">
        <h2 id="values-heading" className="font-display text-3xl font-medium tracking-tight">
          How we work
        </h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {site.about.values.map((v, i) => (
            <li key={v.title} className="rounded-2xl border border-line bg-white p-6">
              <span className="font-display text-sm text-brass">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-medium">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="story-heading" className="mt-20 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 id="story-heading" className="font-display text-3xl font-medium tracking-tight">
          Our story
        </h2>
        <div className="space-y-5 text-lg leading-relaxed text-ink/85">
          {site.about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className="flex flex-wrap gap-3 pt-3">
            <Link href="/agents/" className="btn-primary">
              Meet the agents
            </Link>
            <Link href="/contact/" className="btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
