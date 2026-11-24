import Link from "next/link";
import { site } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-pine-dark text-white/80">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <span className="font-display text-xl font-semibold text-white">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{site.tagline}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">Visit</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {site.contact.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="mt-3 text-sm">
            <a href={`mailto:${site.contact.email}`} className="underline-offset-4 hover:text-white hover:underline">
              {site.contact.email}
            </a>
            <br />
            <a href={`tel:${site.contact.phone.replace(/[^0-9+]/g, "")}`} className="underline-offset-4 hover:text-white hover:underline">
              {site.contact.phone}
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-soft">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="underline-offset-4 hover:text-white hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>{site.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
