import type { Metadata } from "next";
import Link from "next/link";
import { AgentPortrait } from "@/components/AgentCard";
import { agents } from "@/data/agents";
import { listings } from "@/data/listings";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our agents",
  description: `Meet the local agents at ${site.name}.`,
  alternates: { canonical: "/agents/" },
};

export default function AgentsPage() {
  return (
    <div className="container-x py-12">
      <p className="eyebrow">The team</p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight sm:text-5xl">Our agents</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Every one of us lives in town. Call, text or email any agent directly, or send a note through the contact page and we will match you with the right person.
      </p>
      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {agents.map((a) => {
          const theirs = listings.filter((l) => l.agentId === a.id);
          return (
            <li key={a.id} className="flex flex-col gap-6 rounded-3xl border border-line bg-white p-6 sm:flex-row">
              <AgentPortrait agent={a} className="aspect-square w-full shrink-0 rounded-2xl sm:w-40" />
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-2xl font-semibold">{a.name}</h2>
                <p className="text-sm text-muted">{a.role}</p>
                <p className="mt-3 text-sm leading-relaxed">{a.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Specialties">
                  {a.specialties.map((s) => (
                    <li key={s} className="rounded-full bg-sand px-3 py-1 text-xs font-medium">
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={`tel:${a.phone.replace(/[^0-9+]/g, "")}`} className="btn-primary">
                    Call {a.name.split(" ")[0]}
                  </a>
                  <a href={`mailto:${a.email}`} className="btn-ghost">
                    Email
                  </a>
                </div>
                {theirs.length > 0 && (
                  <p className="mt-5 text-sm text-muted">
                    Current listings:{" "}
                    {theirs.map((l, i) => (
                      <span key={l.slug}>
                        <Link href={`/listings/${l.slug}/`} className="font-medium text-pine underline-offset-4 hover:underline">
                          {l.address}
                        </Link>
                        {i < theirs.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
