import type { ReactNode } from "react";
import type { Listing } from "@/data/listings";

// Illustrated placeholders drawn in SVG, so the template ships with no photos.
// Swap these for real photography when you have it (see README).

export type ArtView = "exterior" | "living" | "kitchen" | "bedroom" | "outdoor";

export const galleryViews: { view: ArtView; label: string }[] = [
  { view: "exterior", label: "Front exterior" },
  { view: "living", label: "Living room" },
  { view: "kitchen", label: "Kitchen" },
  { view: "bedroom", label: "Primary bedroom" },
  { view: "outdoor", label: "Outdoor space" },
];

type Props = {
  listing: Pick<Listing, "slug" | "type" | "palette" | "title">;
  view?: ArtView;
  className?: string;
  label?: string;
};

function mix(hex: string, amount: number): string {
  // Lighten (amount > 0) or darken (amount < 0) a hex color.
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const t = amount > 0 ? 255 : 0;
    return Math.round(c + (t - c) * Math.abs(amount));
  });
  return `#${ch.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

export function PropertyArt({ listing, view = "exterior", className, label }: Props) {
  const [sky, body, accent] = listing.palette;
  const id = `${listing.slug}-${view}`.replace(/[^a-z0-9-]/gi, "");
  const alt =
    label ??
    `Illustration of the ${galleryViews.find((g) => g.view === view)?.label.toLowerCase() ?? "home"}: ${listing.title}`;

  return (
    <svg
      viewBox="0 0 800 600"
      {...(label === "" ? { "aria-hidden": true } : { role: "img", "aria-label": alt })}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={mix(sky, 0.35)} />
          <stop offset="1" stopColor={sky} />
        </linearGradient>
        <linearGradient id={`wall-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={mix(sky, 0.6)} />
          <stop offset="1" stopColor={mix(sky, 0.15)} />
        </linearGradient>
        <linearGradient id={`floor-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={mix(accent, 0.35)} />
          <stop offset="1" stopColor={mix(accent, 0.05)} />
        </linearGradient>
      </defs>
      {view === "exterior" && <Exterior id={id} type={listing.type} sky={sky} body={body} accent={accent} />}
      {view === "living" && <Living id={id} body={body} accent={accent} sky={sky} />}
      {view === "kitchen" && <Kitchen id={id} body={body} accent={accent} sky={sky} />}
      {view === "bedroom" && <Bedroom id={id} body={body} accent={accent} sky={sky} />}
      {view === "outdoor" && <Outdoor id={id} body={body} accent={accent} sky={sky} />}
    </svg>
  );
}

type SceneProps = { id: string; sky: string; body: string; accent: string };

function Window({ x, y, w, h, frame, glass }: { x: number; y: number; w: number; h: number; frame: string; glass: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={glass} stroke={frame} strokeWidth="6" />
      <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y + h} stroke={frame} strokeWidth="4" />
      <line x1={x} y1={y + h / 2} x2={x + w} y2={y + h / 2} stroke={frame} strokeWidth="4" />
    </g>
  );
}

function Tree({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return (
    <g>
      <rect x={x - 4 * s} y={y} width={8 * s} height={40 * s} fill={mix(color, -0.4)} />
      <circle cx={x} cy={y - 10 * s} r={34 * s} fill={color} />
      <circle cx={x - 22 * s} cy={y + 6 * s} r={24 * s} fill={mix(color, 0.08)} />
      <circle cx={x + 22 * s} cy={y + 4 * s} r={26 * s} fill={mix(color, -0.08)} />
    </g>
  );
}

function Exterior({ id, type, sky, body, accent }: SceneProps & { type: Listing["type"] }) {
  const trim = mix(body, -0.55);
  const glass = mix(sky, 0.25);
  const roof = mix(accent, -0.35);
  const green = "#5f7f5a";
  return (
    <g>
      <rect width="800" height="600" fill={`url(#sky-${id})`} />
      <circle cx="600" cy="120" r="56" fill="#f4d29c" opacity="0.85" />
      <path d="M0 400 Q 200 330 400 380 T 800 360 V 600 H 0 Z" fill={mix(green, 0.35)} />
      <path d="M0 460 Q 260 420 520 450 T 800 440 V 600 H 0 Z" fill={mix(green, 0.15)} />
      {type === "House" && (
        <g>
          <rect x="230" y="270" width="340" height="210" fill={body} />
          <polygon points="210,275 400,150 590,275" fill={roof} />
          <rect x="500" y="150" width="34" height="80" fill={mix(roof, -0.2)} />
          <Window x={260} y={300} w={70} h={60} frame={trim} glass={glass} />
          <Window x={470} y={300} w={70} h={60} frame={trim} glass={glass} />
          <Window x={260} y={390} w={70} h={60} frame={trim} glass={glass} />
          <Window x={470} y={390} w={70} h={60} frame={trim} glass={glass} />
          <rect x="370" y="380" width="60" height="100" rx="4" fill={mix(accent, -0.2)} />
          <circle cx="420" cy="432" r="4" fill={mix(accent, 0.6)} />
          <rect x="350" y="470" width="100" height="12" fill={mix(body, -0.25)} />
          <Tree x={140} y={420} s={1.2} color={green} />
          <Tree x={670} y={430} s={1} color={mix(green, -0.1)} />
        </g>
      )}
      {type === "Cottage" && (
        <g>
          <rect x="270" y="310" width="260" height="170" fill={body} />
          <polygon points="250,320 400,190 550,320" fill={roof} />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={280 + i * 18} y1={300 - i * 24} x2={520 - i * 18} y2={300 - i * 24} stroke={mix(roof, 0.15)} strokeWidth="3" />
          ))}
          <Window x={300} y={350} w={64} h={56} frame={trim} glass={glass} />
          <Window x={440} y={350} w={64} h={56} frame={trim} glass={glass} />
          <rect x="378" y="390" width="46" height="90" rx="23" fill={mix(accent, -0.15)} />
          <path d="M240 480 h320" stroke={mix(green, -0.3)} strokeWidth="6" />
          <Tree x={170} y={430} s={1} color={green} />
          <g fill={accent}>
            <circle cx="300" cy="470" r="6" />
            <circle cx="320" cy="466" r="5" />
            <circle cx="480" cy="470" r="6" />
            <circle cx="500" cy="466" r="5" />
          </g>
        </g>
      )}
      {type === "Townhouse" && (
        <g>
          {[0, 1, 2].map((i) => {
            const x = 190 + i * 140;
            const c = i === 1 ? body : mix(body, i === 0 ? 0.2 : -0.15);
            return (
              <g key={i}>
                <rect x={x} y={200} width="140" height="280" fill={c} />
                <rect x={x - 4} y={192} width="148" height="14" fill={trim} />
                <Window x={x + 22} y={230} w={40} h={60} frame={trim} glass={glass} />
                <Window x={x + 78} y={230} w={40} h={60} frame={trim} glass={glass} />
                <Window x={x + 22} y={320} w={40} h={60} frame={trim} glass={glass} />
                <Window x={x + 78} y={320} w={40} h={60} frame={trim} glass={glass} />
                <rect x={x + 50} y={400} width="40" height="80" rx="20" fill={mix(accent, -0.25)} />
              </g>
            );
          })}
          <rect x="120" y="478" width="560" height="10" fill={mix(body, -0.4)} />
          <line x1="140" y1="480" x2="140" y2="380" stroke={trim} strokeWidth="5" />
          <circle cx="140" cy="372" r="12" fill={mix(accent, 0.6)} />
        </g>
      )}
      {type === "Condo" && (
        <g>
          <rect x="250" y="130" width="300" height="350" fill={body} />
          <rect x="240" y="120" width="320" height="16" fill={trim} />
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 4 }).map((__, c) => (
              <rect
                key={`${r}-${c}`}
                x={272 + c * 68}
                y={160 + r * 60}
                width="52"
                height="40"
                fill={(r + c) % 3 === 0 ? mix(accent, 0.55) : glass}
                stroke={trim}
                strokeWidth="3"
              />
            )),
          )}
          <rect x="360" y="420" width="80" height="60" fill={mix(trim, 0.2)} />
          <rect x="120" y="300" width="110" height="180" fill={mix(body, -0.2)} />
          <rect x="570" y="260" width="120" height="220" fill={mix(body, 0.25)} />
          <path d="M0 500 Q 400 470 800 500 V 600 H 0 Z" fill={mix(sky, -0.15)} />
          <path d="M0 520 Q 400 500 800 520" stroke={mix(sky, 0.4)} strokeWidth="3" fill="none" />
        </g>
      )}
      <rect y="480" width="800" height="120" fill={mix(green, -0.05)} opacity="0.25" />
    </g>
  );
}

function Room({ id, sky, children }: { id: string; sky: string; children: ReactNode }) {
  return (
    <g>
      <rect width="800" height="600" fill={`url(#wall-${id})`} />
      <rect y="440" width="800" height="160" fill={`url(#floor-${id})`} />
      <line x1="0" y1="440" x2="800" y2="440" stroke={mix(sky, -0.3)} strokeWidth="3" />
      {children}
    </g>
  );
}

function Living({ id, sky, body, accent }: SceneProps) {
  return (
    <Room id={id} sky={sky}>
      <rect x="470" y="90" width="230" height="250" fill={mix(sky, 0.2)} stroke={mix(body, -0.5)} strokeWidth="8" />
      <path d="M470 280 Q 585 230 700 270 V 340 H 470 Z" fill={mix("#5f7f5a", 0.3)} />
      <line x1="585" y1="90" x2="585" y2="340" stroke={mix(body, -0.5)} strokeWidth="5" />
      <ellipse cx="330" cy="520" rx="280" ry="40" fill={mix(accent, 0.45)} />
      <rect x="110" y="330" width="400" height="70" rx="20" fill={mix(body, -0.1)} />
      <rect x="90" y="380" width="440" height="80" rx="24" fill={body} />
      <rect x="130" y="350" width="110" height="60" rx="16" fill={mix(accent, 0.2)} />
      <rect x="250" y="355" width="100" height="55" rx="16" fill={mix(body, 0.3)} />
      <rect x="120" y="455" width="12" height="30" fill={mix(body, -0.6)} />
      <rect x="490" y="455" width="12" height="30" fill={mix(body, -0.6)} />
      <line x1="640" y1="470" x2="640" y2="250" stroke={mix(accent, -0.5)} strokeWidth="5" />
      <path d="M600 250 h80 l-20 -60 h-40 Z" fill={mix(accent, 0.55)} />
      <rect x="610" y="468" width="60" height="10" rx="5" fill={mix(accent, -0.5)} />
      <circle cx="200" cy="200" r="54" fill="none" stroke={mix(accent, -0.2)} strokeWidth="6" />
      <rect x="290" y="160" width="90" height="110" fill={mix(accent, 0.3)} stroke={mix(body, -0.4)} strokeWidth="5" />
    </Room>
  );
}

function Kitchen({ id, sky, body, accent }: SceneProps) {
  const cab = mix(body, -0.05);
  return (
    <Room id={id} sky={sky}>
      <rect x="60" y="110" width="680" height="120" fill={cab} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={70 + i * 112} y={120} width="100" height="100" fill={mix(cab, 0.1)} />
          <rect x={112 + i * 112} y={200} width="16" height="4" rx="2" fill={mix(accent, -0.4)} />
        </g>
      ))}
      <rect x="60" y="260" width="680" height="180" fill={mix(sky, 0.5)} />
      <rect x="300" y="270" width="200" height="120" fill={mix(sky, 0.1)} stroke={mix(body, -0.5)} strokeWidth="6" />
      <rect x="60" y="400" width="680" height="16" fill={mix(accent, 0.2)} />
      <rect x="60" y="416" width="680" height="70" fill={cab} />
      <rect x="180" y="470" width="440" height="20" fill={mix(accent, 0.1)} />
      <rect x="200" y="490" width="400" height="80" fill={mix(body, -0.25)} />
      {[260, 400, 540].map((x) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2="250" stroke={mix(accent, -0.5)} strokeWidth="3" />
          <path d={`M${x - 26} 250 h52 l-10 -30 h-32 Z`} fill={accent} />
        </g>
      ))}
      <circle cx="560" cy="380" r="18" fill="#6f8f66" />
      <rect x="548" y="388" width="24" height="14" fill={mix(accent, -0.3)} />
    </Room>
  );
}

function Bedroom({ id, sky, body, accent }: SceneProps) {
  return (
    <Room id={id} sky={sky}>
      <rect x="80" y="100" width="180" height="230" fill={mix(sky, 0.15)} stroke={mix(body, -0.5)} strokeWidth="8" />
      <path d="M80 100 h40 v230 h-40 Z" fill={mix(accent, 0.4)} opacity="0.8" />
      <rect x="300" y="230" width="380" height="140" rx="18" fill={mix(body, -0.25)} />
      <rect x="290" y="350" width="400" height="110" rx="14" fill={mix(body, 0.55)} />
      <rect x="290" y="400" width="400" height="60" rx="10" fill={mix(accent, 0.25)} />
      <rect x="320" y="315" width="120" height="50" rx="20" fill="#ffffff" opacity="0.9" />
      <rect x="460" y="315" width="120" height="50" rx="20" fill="#ffffff" opacity="0.9" />
      <rect x="700" y="340" width="70" height="100" fill={mix(body, -0.35)} />
      <path d="M715 340 l20 -60 l20 60 Z" fill={mix(accent, 0.5)} />
      <rect x="380" y="120" width="220" height="80" fill="none" stroke={mix(accent, -0.3)} strokeWidth="5" />
      <path d="M390 190 l60 -50 l40 30 l40 -40 l60 60" fill="none" stroke={mix(accent, -0.3)} strokeWidth="5" />
    </Room>
  );
}

function Outdoor({ id, sky, body, accent }: SceneProps) {
  const green = "#5f7f5a";
  return (
    <g>
      <rect width="800" height="600" fill={`url(#sky-${id})`} />
      <circle cx="160" cy="150" r="50" fill="#f4d29c" opacity="0.85" />
      <path d="M0 330 Q 400 280 800 330 V 600 H 0 Z" fill={mix(sky, -0.2)} />
      <path d="M0 360 Q 400 320 800 360" stroke={mix(sky, 0.5)} strokeWidth="3" fill="none" />
      <path d="M0 400 H 800 V 600 H 0 Z" fill={mix(green, 0.2)} />
      <rect x="0" y="420" width="800" height="180" fill={mix(body, -0.3)} />
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1={i * 80} y1="420" x2={i * 80 - 60} y2="600" stroke={mix(body, -0.45)} strokeWidth="3" />
      ))}
      <rect x="0" y="380" width="800" height="12" fill={mix(body, -0.5)} />
      {Array.from({ length: 17 }).map((_, i) => (
        <rect key={i} x={i * 50} y="330" width="8" height="60" fill={mix(body, -0.5)} />
      ))}
      <rect x="0" y="326" width="800" height="10" fill={mix(body, -0.5)} />
      <ellipse cx="420" cy="500" rx="110" ry="26" fill={mix(accent, 0.2)} />
      <rect x="410" y="500" width="20" height="60" fill={mix(accent, -0.4)} />
      <rect x="250" y="470" width="80" height="60" rx="10" fill={mix(accent, 0.45)} />
      <rect x="510" y="470" width="80" height="60" rx="10" fill={mix(accent, 0.45)} />
      <Tree x={700} y={300} s={1.1} color={green} />
    </g>
  );
}
