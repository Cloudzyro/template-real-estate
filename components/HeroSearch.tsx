"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [area, setArea] = useState("");
  const [max, setMax] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (area) p.set("area", area);
    if (max) p.set("max", max);
    const qs = p.toString();
    router.push(`/listings/${qs ? `?${qs}` : ""}`);
  }

  return (
    <form
      role="search"
      aria-label="Search homes"
      onSubmit={submit}
      action="/listings/"
      className="grid gap-2 rounded-2xl bg-white p-2 shadow-[0_8px_24px_rgba(28,36,32,0.08)] ring-1 ring-line sm:grid-cols-[1.4fr_1fr_1fr_auto]"
    >
      <div className="rounded-lg px-4 py-2 transition-colors hover:bg-paper">
        <label htmlFor="hs-q" className="block text-xs font-medium text-muted">
          Where
        </label>
        <input
          id="hs-q"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Street or keyword"
          className="w-full bg-transparent py-1 text-sm text-ink placeholder:text-muted/70 focus:outline-none"
        />
      </div>
      <div className="rounded-lg px-4 py-2 transition-colors hover:bg-paper">
        <label htmlFor="hs-area" className="block text-xs font-medium text-muted">
          Neighborhood
        </label>
        <select id="hs-area" name="area" value={area} onChange={(e) => setArea(e.target.value)} className="w-full bg-transparent py-1 text-sm text-ink focus:outline-none">
          <option value="">Anywhere</option>
          {site.neighborhoods.map((n) => (
            <option key={n.name}>{n.name}</option>
          ))}
        </select>
      </div>
      <div className="rounded-lg px-4 py-2 transition-colors hover:bg-paper">
        <label htmlFor="hs-max" className="block text-xs font-medium text-muted">
          Max price
        </label>
        <select id="hs-max" name="max" value={max} onChange={(e) => setMax(e.target.value)} className="w-full bg-transparent py-1 text-sm text-ink focus:outline-none">
          <option value="">No limit</option>
          <option value="500000">$500k</option>
          <option value="750000">$750k</option>
          <option value="1000000">$1M</option>
          <option value="1500000">$1.5M</option>
        </select>
      </div>
      <button type="submit" className="btn-primary h-full min-h-12 rounded-lg px-6 text-base">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        Search
      </button>
    </form>
  );
}
