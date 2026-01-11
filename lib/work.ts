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
  // Content section - supports mixed content (images and text) for masonry grid
  content?: Array<
    | {
        type: "image";
        image: string;
        caption?: string; // Optional one-line caption
        span?: "row-span-1" | "row-span-2"; // Optional row span for masonry
      }
    | {
        type: "text";
        content: string; // Paragraph text
        span?: "row-span-1" | "row-span-2"; // Optional row span
      }
  >;
  // Visual proof section - backward compatibility
  visuals?: {
    image?: string; // Single image (use images array for multiple)
    images?: string[]; // Multiple images to display side by side
    caption?: string; // Optional one-line caption
    description?: string; // Optional text description before the image
    imageLeft?: boolean; // If true, image on left, text on right. If false or undefined, text on left, image on right
    video?: string; // YouTube video URL
    videoTitle?: string; // Title for the video section
    videoTooltip?: string; // Tooltip text for the info icon
    cards?: string[]; // Array of card content text for 4-card grid
  }[];
  insight?: string; // Optional: One short sentence showing judgment
  softClose?: string; // Optional: Very light ending (e.g., "Happy to share details on request")
  images?: string[]; // Keep for backward compatibility, but prefer visuals or content
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
    visuals: [
      {
        image: "/work/polkamarkets-community-growth.png"
      },
      {
        description: '<span class="underline decoration-green-400 decoration-2">Co-led and executed a $625K strategic investment round</span> with Moonrock Capital, Morningstar Ventures, NGC Ventures, and Astronaut Capital, covering investor outreach, positioning, and closing.',
        image: "/work/strategic-investors.jpeg"
      },
      {
        video: "https://www.youtube.com/watch?v=8L5oZd0Yup4",
        videoTitle: "What is Polkamarkets? Explainer Video",
        videoTooltip: "The \"What is Polkamarkets?\" explainer video was developed from scratch as a core educational asset for the project.<br /><br />I drove the concept from early ideation to final delivery. This included writing and refining the script, defining the visual direction, and setting the voice over tone to clearly explain the product without overcomplicating it.<br /><br />Working with the agency Hypercube, I coordinated a five-person team across creative and production, ensuring tight alignment with product and messaging.<br /><br />I also managed the rollout communications so the video landed clearly with the community and new users."
      },
      {
        cards: [
          "Launched the interest form while coordinating VCs, angels, KOLs, community, and MVP development, resulting in <span class=\"underline decoration-green-400 decoration-2\">10,000+ participants</span> and <span class=\"underline decoration-green-400 decoration-2\">$80M+ in pledged open interest</span>.",
          "Managed investor and community communications, including <span class=\"underline decoration-green-400 decoration-2\">incentives for whitelisted addresses and early supporters</span>.",
          "<span class=\"underline decoration-green-400 decoration-2\">Released a simulated, gamified prediction markets</span> experience to educate users ahead of launch.",
          "Scaled the community to <span class=\"underline decoration-green-400 decoration-2\">100,000+ members</span> across Telegram and Twitter."
        ]
      },
      {
        images: ["/work/open-interest.png", "/work/community-members.png"],
      },
      {
        description: "Following a successful community build (<span class=\"underline decoration-green-400 decoration-2\">100K+ members</span>) and IDO on Polkastarter (<span class=\"underline decoration-green-400 decoration-2\">120x post-IDO ATH</span>), Polkamarkets launched its MVP testnet.<br /><br />I supported coordination across product, development, and communications, helping <span class=\"underline decoration-green-400 decoration-2\">deliver the first live version</span> of the gamified prediction markets platform and managing the community rollout.",
        video: "https://www.youtube.com/watch?v=Qlg4ldiu6VY",
        imageLeft: false, // Text on left, video on right
      },
      {
        description: "Co-led <span class=\"underline decoration-green-400 decoration-2\">Polkamarkets' multi-chain rollout</span>, coordinating partnerships, product, and development.<br /><br />Supported deployments across <span class=\"underline decoration-green-400 decoration-2\">Ethereum environments, Polygon, Moonriver, and Moonbeam</span>, while handling partner alignment and community communications to enable early cross-chain growth and scalability.",
        image: "/work/deployed-chains.png",
        imageLeft: true, // Image on left, text on right
      },
      {
        image: "/work/polkamarkets-ido-announcement.png"
      }
    ],
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
