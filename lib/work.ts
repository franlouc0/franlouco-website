export interface Work {
  id: string;
  title: string; // Engaging title for featured work section
  company: string;
  role: string;
  period: string;
  logo: string;
  headerImage?: string; // Header image that fills the container
  metrics: {
    label: string;
    value: string;
  }[];
  impact: string; // 1-2 line max
  images?: string[]; // Optional showcase images
  color?: string; // Optional accent color
}

export const works: Record<string, Work> = {
  "polkamarkets": {
    id: "polkamarkets",
    title: "How we raised $715K in an IDO without relying on hype",
    company: "Polkamarkets",
    role: "CMO & Co-Founder",
    period: "2021 - 2023",
    logo: "/polkamarkets.jpg",
    headerImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop&q=80",
    metrics: [
      { label: "IDO Raised", value: "$715K" },
      { label: "Peak Volume", value: "$2M" },
      { label: "Timeframe", value: "48h" }
    ],
    impact: "Built prediction market protocol from zero. Led token launch strategy and community growth.",
  },
  "coompass": {
    id: "coompass",
    title: "How we achieved 166% MoM NGO growth in an ESG marketplace",
    company: "Coompass",
    role: "CMO & Co-Founder",
    period: "2023 - Present",
    logo: "/coompass.jpg",
    headerImage: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&h=1080&fit=crop&q=80",
    metrics: [
      { label: "NGO Growth", value: "166%" },
      { label: "Period", value: "MoM" }
    ],
    impact: "ESG marketplace connecting corporations with NGOs. Achieved rapid NGO network expansion.",
  },
  "polkastarter": {
    id: "polkastarter",
    title: "Building Web3 marketing strategies for token launches",
    company: "Polkastarter",
    role: "Web3 Marketing & BD Consultant",
    period: "2020 - Present",
    logo: "/polkastarter.jpg",
    headerImage: "https://images.unsplash.com/photo-1557683311-e804f5e3f0e1?w=1920&h=1080&fit=crop&q=80",
    metrics: [
      { label: "Years", value: "5+" },
      { label: "Role", value: "Consultant" }
    ],
    impact: "Strategic marketing and business development for Web3 projects and token launches.",
  },
  "bepro-network": {
    id: "bepro-network",
    title: "Scaling sales and partnerships for blockchain infrastructure",
    company: "BEPRO Network",
    role: "Head of Sales & Partnerships",
    period: "2020 - 2021",
    logo: "/bepronetwork.jpg",
    headerImage: "https://images.unsplash.com/photo-1557682257-2f9f37cce5bc?w=1920&h=1080&fit=crop&q=80",
    metrics: [
      { label: "Years", value: "1" },
      { label: "Role", value: "Head" }
    ],
    impact: "Led sales and partnership strategy for blockchain development platform.",
  },
  "ibc-group": {
    id: "ibc-group",
    title: "Driving growth for Web3 projects and blockchain initiatives",
    company: "IBC Group",
    role: "Web3 Marketing Growth Manager",
    period: "2025 - Present",
    logo: "/ibcgroup.png",
    headerImage: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920&h=1080&fit=crop&q=80",
    metrics: [
      { label: "Status", value: "Active" },
      { label: "Focus", value: "Growth" }
    ],
    impact: "Driving marketing growth strategies for Web3 projects and blockchain initiatives.",
  },
  "broadpath": {
    id: "broadpath",
    title: "Strategic partnerships in Web3 and digital marketing",
    company: "Broadpath",
    role: "Partner",
    period: "2025 - Present",
    logo: "/broadpath.png",
    headerImage: "https://images.unsplash.com/photo-1557682257-2f9f37cce5bc?w=1920&h=1080&fit=crop&q=80",
    metrics: [
      { label: "Status", value: "Active" },
      { label: "Role", value: "Partner" }
    ],
    impact: "Strategic partnership and business development in Web3 and digital marketing.",
  },
};

export function getWorkById(id: string): Work | undefined {
  return works[id];
}

export function getAllWorkIds(): string[] {
  return Object.keys(works);
}

export function getAllWorks(): Work[] {
  return Object.values(works);
}
