// Helper function to create URL-friendly slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\$/g, '') // Remove dollar signs
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

export interface Work {
  id: string;
  title: string; // Engaging title for featured work section
  subtitle: string; // One short context line
  company: string;
  role: string;
  period: string;
  logo: string;
  headerImage?: string; // Header image that fills the container
  numbers: {
    value: string;
    label: string;
  }[]; // Key credibility numbers - large numbers, minimal labels
  scope: string[]; // What I owned - short, scannable list
  metrics: {
    label: string;
    value: string;
  }[];
  impact: string; // 1-2 line max
  images?: string[]; // Optional showcase images
  color?: string; // Optional accent color
}

export const works: Record<string, Work> = {
  "how-we-raised-715k-ido": {
    id: "how-we-raised-715k-ido",
    title: "How we raised $715K in an IDO without relying on hype",
    subtitle: "Building a prediction market protocol from zero to $80M+ open interest in 48 hours",
    company: "Polkamarkets",
    role: "CMO & Co-Founder",
    period: "2021 - 2023",
    logo: "/polkamarkets.jpg",
    numbers: [
      { value: "$715K", label: "raised" },
      { value: "100K+", label: "community" },
      { value: "$80M+", label: "open interest" },
      { value: "120x", label: "post-IDO ATH" }
    ],
    scope: [
      "GTM strategy",
      "Launch execution",
      "Partnerships",
      "KOL coordination",
      "Community systems",
      "Product + marketing alignment"
    ],
    metrics: [
      { label: "IDO Raised", value: "$715K" },
      { label: "Peak Volume", value: "$2M" },
      { label: "Timeframe", value: "48h" }
    ],
    impact: "Built prediction market protocol from zero. Led token launch strategy and community growth.",
  },
  "how-we-achieved-166-mom-ngo-growth": {
    id: "how-we-achieved-166-mom-ngo-growth",
    title: "How we achieved 166% MoM NGO growth in an ESG marketplace",
    subtitle: "Connecting corporations with impact organizations",
    company: "Coompass",
    role: "CMO & Co-Founder",
    period: "2023 - Present",
    logo: "/coompass.jpg",
    numbers: [
      { value: "166%", label: "MoM growth" },
      { value: "500+", label: "NGOs" },
      { value: "50+", label: "corporations" }
    ],
    scope: [
      "GTM strategy",
      "NGO network growth",
      "Partnership development",
      "Brand positioning"
    ],
    metrics: [
      { label: "NGO Growth", value: "166%" },
      { label: "Period", value: "MoM" }
    ],
    impact: "ESG marketplace connecting corporations with NGOs. Achieved rapid NGO network expansion.",
  },
  "building-web3-marketing-strategies": {
    id: "building-web3-marketing-strategies",
    title: "Building Web3 marketing strategies for token launches",
    subtitle: "Strategic marketing and business development for Web3 projects",
    company: "Polkastarter",
    role: "Web3 Marketing & BD Consultant",
    period: "2020 - Present",
    logo: "/polkastarter.jpg",
    numbers: [
      { value: "5+", label: "years" },
      { value: "50+", label: "projects" }
    ],
    scope: [
      "Marketing strategy",
      "Token launch support",
      "Business development",
      "Partnership coordination"
    ],
    metrics: [
      { label: "Years", value: "5+" },
      { label: "Role", value: "Consultant" }
    ],
    impact: "Strategic marketing and business development for Web3 projects and token launches.",
  },
  "scaling-sales-partnerships-blockchain": {
    id: "scaling-sales-partnerships-blockchain",
    title: "Scaling sales and partnerships for blockchain infrastructure",
    subtitle: "Leading sales and partnership strategy for development platform",
    company: "BEPRO Network",
    role: "Head of Sales & Partnerships",
    period: "2020 - 2021",
    logo: "/bepronetwork.jpg",
    numbers: [
      { value: "20+", label: "partnerships" },
      { value: "$5M+", label: "revenue" }
    ],
    scope: [
      "Sales strategy",
      "Partnership development",
      "Business development",
      "Revenue growth"
    ],
    metrics: [
      { label: "Years", value: "1" },
      { label: "Role", value: "Head" }
    ],
    impact: "Led sales and partnership strategy for blockchain development platform.",
  },
  "driving-growth-web3-blockchain": {
    id: "driving-growth-web3-blockchain",
    title: "Driving growth for Web3 projects and blockchain initiatives",
    subtitle: "Marketing growth strategies for Web3 and blockchain",
    company: "IBC Group",
    role: "Web3 Marketing Growth Manager",
    period: "2025 - Present",
    logo: "/ibcgroup.png",
    numbers: [
      { value: "10+", label: "projects" },
      { value: "200%+", label: "avg growth" }
    ],
    scope: [
      "Growth strategy",
      "Marketing execution",
      "Project management",
      "Performance optimization"
    ],
    metrics: [
      { label: "Status", value: "Active" },
      { label: "Focus", value: "Growth" }
    ],
    impact: "Driving marketing growth strategies for Web3 projects and blockchain initiatives.",
  },
  "strategic-partnerships-web3-digital-marketing": {
    id: "strategic-partnerships-web3-digital-marketing",
    title: "Strategic partnerships in Web3 and digital marketing",
    subtitle: "Business development and strategic partnerships",
    company: "Broadpath",
    role: "Partner",
    period: "2025 - Present",
    logo: "/broadpath.png",
    numbers: [
      { value: "15+", label: "partners" },
      { value: "$10M+", label: "portfolio value" }
    ],
    scope: [
      "Strategic partnerships",
      "Business development",
      "Portfolio management",
      "Market expansion"
    ],
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
