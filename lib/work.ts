export interface Work {
  id: string;
  company: string;
  role: string;
  period: string;
  logo: string;
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
    company: "Polkamarkets",
    role: "CMO & Co-Founder",
    period: "2021 - 2023",
    logo: "/polkamarkets.jpg",
    metrics: [
      { label: "IDO Raised", value: "$715K" },
      { label: "Peak Volume", value: "$2M" },
      { label: "Timeframe", value: "48h" }
    ],
    impact: "Built prediction market protocol from zero. Led token launch strategy and community growth.",
  },
  "coompass": {
    id: "coompass",
    company: "Coompass",
    role: "CMO & Co-Founder",
    period: "2023 - Present",
    logo: "/coompass.jpg",
    metrics: [
      { label: "NGO Growth", value: "166%" },
      { label: "Period", value: "MoM" }
    ],
    impact: "ESG marketplace connecting corporations with NGOs. Achieved rapid NGO network expansion.",
  },
  "polkastarter": {
    id: "polkastarter",
    company: "Polkastarter",
    role: "Web3 Marketing & BD Consultant",
    period: "2020 - Present",
    logo: "/polkastarter.jpg",
    metrics: [
      { label: "Years", value: "5+" },
      { label: "Role", value: "Consultant" }
    ],
    impact: "Strategic marketing and business development for Web3 projects and token launches.",
  },
  "bepro-network": {
    id: "bepro-network",
    company: "BEPRO Network",
    role: "Head of Sales & Partnerships",
    period: "2020 - 2021",
    logo: "/bepronetwork.jpg",
    metrics: [
      { label: "Years", value: "1" },
      { label: "Role", value: "Head" }
    ],
    impact: "Led sales and partnership strategy for blockchain development platform.",
  },
  "ibc-group": {
    id: "ibc-group",
    company: "IBC Group",
    role: "Web3 Marketing Growth Manager",
    period: "2025 - Present",
    logo: "/ibcgroup.png",
    metrics: [
      { label: "Status", value: "Active" },
      { label: "Focus", value: "Growth" }
    ],
    impact: "Driving marketing growth strategies for Web3 projects and blockchain initiatives.",
  },
  "broadpath": {
    id: "broadpath",
    company: "Broadpath",
    role: "Partner",
    period: "2025 - Present",
    logo: "/broadpath.png",
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
