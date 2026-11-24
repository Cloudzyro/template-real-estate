import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 font-display text-5xl font-medium tracking-tight">This address isn&apos;t on the market</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">The page may have moved, or the home may have sold. Try browsing current listings instead.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/listings/" className="btn-primary">
          Browse listings
        </Link>
        <Link href="/" className="btn-ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
