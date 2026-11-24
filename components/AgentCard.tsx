import type { Agent } from "@/data/agents";

export function AgentPortrait({ agent, className }: { agent: Agent; className?: string }) {
  const [a] = agent.colors;
  const initials = agent.name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return (
    <svg viewBox="0 0 200 200" role="img" aria-label={`Portrait placeholder for ${agent.name}`} className={className}>
      <rect width="200" height="200" fill={a} />
      <circle cx="100" cy="82" r="38" fill="#ffffff" opacity="0.22" />
      <path d="M30 200 C 40 140, 160 140, 170 200 Z" fill="#ffffff" opacity="0.22" />
      <text x="100" y="98" textAnchor="middle" fontFamily="Georgia, serif" fontSize="34" fontWeight="500" fill="#ffffff">
        {initials}
      </text>
    </svg>
  );
}

export function AgentCard({ agent, compact = false }: { agent: Agent; compact?: boolean }) {
  return (
    <div className={`flex ${compact ? "items-center gap-4" : "flex-col gap-4 sm:flex-row"}`}>
      <AgentPortrait agent={agent} className={`${compact ? "h-16 w-16" : "h-24 w-24"} shrink-0 rounded-2xl`} />
      <div className="min-w-0">
        <p className="font-display text-xl font-medium">{agent.name}</p>
        <p className="text-sm text-muted">{agent.role}</p>
        <p className="mt-2 flex flex-col text-sm">
          <a className="font-medium text-pine underline-offset-4 hover:underline" href={`tel:${agent.phone.replace(/[^0-9+]/g, "")}`}>
            {agent.phone}
          </a>
          <a className="break-all font-medium text-pine underline-offset-4 hover:underline" href={`mailto:${agent.email}`}>
            {agent.email}
          </a>
        </p>
      </div>
    </div>
  );
}
