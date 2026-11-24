export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#1f4d3a" />
      <path d="M14 36 L32 18 L50 36" fill="none" stroke="#f1e4cc" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 30 L24 44 h16 Z" fill="#b88a4a" />
      <rect x="30.5" y="44" width="3" height="5" fill="#b88a4a" />
    </svg>
  );
}
