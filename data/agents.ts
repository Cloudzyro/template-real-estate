// Your team. The `id` is used by listings (agentId) to show the right agent card.

export type Agent = {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  bio: string;
  specialties: string[];
  // Portrait placeholder color (the first is used; the second is kept for your own use).
  colors: [string, string];
};

export const agents: Agent[] = [
  {
    id: "dana-whitcombe",
    name: "Dana Whitcombe",
    role: "Founding broker",
    phone: "(555) 014-2291",
    email: "dana@harborandpine.example",
    bio: "Dana has sold homes in Larkspur Bay for nineteen years and still restores one old house a decade for fun. She leads our listing strategy and pricing.",
    specialties: ["Historic homes", "Waterfront", "Pricing strategy"],
    colors: ["#1f4d3a", "#c9a46a"],
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    role: "Co-founder, buyer specialist",
    phone: "(555) 014-2292",
    email: "marcus@harborandpine.example",
    bio: "A former carpenter, Marcus walks every showing with an eye for what a home will need in five years, not just what it looks like today.",
    specialties: ["First-time buyers", "Renovation projects", "Inspections"],
    colors: ["#284b63", "#e0b386"],
  },
  {
    id: "priya-anand",
    name: "Priya Anand",
    role: "Senior agent",
    phone: "(555) 014-2293",
    email: "priya@harborandpine.example",
    bio: "Priya specializes in condos and lofts in Riverside Flats and knows every building's association rules by heart.",
    specialties: ["Condos and lofts", "Relocation", "Investment property"],
    colors: ["#6b3e5a", "#f0c8a0"],
  },
  {
    id: "tomas-reyes",
    name: "Tomas Reyes",
    role: "Agent",
    phone: "(555) 014-2294",
    email: "tomas@harborandpine.example",
    bio: "Tomas grew up in Pinecrest and helps families find room to grow, from wooded acreage to homes near the best trails.",
    specialties: ["Family homes", "Land and acreage", "New construction"],
    colors: ["#3d5a3d", "#d9c27a"],
  },
];

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
