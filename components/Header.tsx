"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 rounded-md" aria-label={`${site.name} home`}>
          <Logo className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => {
              const active = pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                      active ? "bg-sand text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden md:block">
          <a href={`tel:${site.contact.phone.replace(/[^0-9+]/g, "")}`} className="btn-primary">
            {site.contact.phone}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-paper md:hidden">
          <ul className="container-x flex flex-col py-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block rounded-lg px-2 py-3 text-base font-medium">
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a href={`tel:${site.contact.phone.replace(/[^0-9+]/g, "")}`} className="btn-primary w-full">
                Call {site.contact.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
