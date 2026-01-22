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
    partnerships?: Array<{
      logo: string;
      name: string;
      description: string;
    }>; // Array of partnership cards for marquee section
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
        images: ["/work/app-animated-gif.gif", "/work/market-page2.png"]
      },
      {
        description: '<span class="underline decoration-green-400 decoration-2">Co-led and executed a $625K strategic investment round</span> with Moonrock Capital, Morningstar Ventures, NGC Ventures, and Astronaut Capital, covering investor outreach, positioning, and closing.',
        image: "/work/strategic-investors.jpeg"
      },
      {
        description: "Led the creation of the “What is Polkamarkets?” explainer video as a core educational asset. Owned the process end to end, from concept and scriptwriting to visual direction and voice-over tone, keeping the message clear and accessible.<br /><br />Coordinated a five-person creative and production team at Hypercube, and handled rollout communications to ensure strong community and new user reach.",
        video: "https://www.youtube.com/watch?v=8L5oZd0Yup4",
        imageLeft: true, // Video on left, text on right
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
        partnerships: [
          {
            logo: "/partnerships/bepro-network.png",
            name: "BEPRO Network",
            description: "Backend tech and code for on-chain prediction markets"
          },
          {
            logo: "/partnerships/orion-protocol.png",
            name: "Orion Protocol",
            description: "Provides decentralised liquidity provisioning for prediction markets"
          },
          {
            logo: "/partnerships/bridge-mutual.png",
            name: "Bridge Mutual",
            description: "Liquidity aggregation and risk management for prediction markets"
          },
          {
            logo: "/partnerships/polygon.png",
            name: "Polygon",
            description: "Reduces transaction costs and speeds up trade confirmations"
          },
          {
            logo: "/partnerships/shyft-network.png",
            name: "Shyft Network",
            description: "Adds opt-in compliance tools for regulatory readiness and optional compliance features"
          },
          {
            logo: "/partnerships/exeedme.png",
            name: "Exeedme",
            description: "Helps us curate and gamify our Esports prediction markets experience"
          },
          {
            logo: "/partnerships/elrond.png",
            name: "Elrond",
            description: "To expand prediction markets onto Elrond’s blockchain network"
          },
          {
            logo: "/partnerships/moonbeam.png",
            name: "Moonbeam Network",
            description: "Bringing prediction markets from Ethereum-style chains into the Polkadot ecosystem"
          },
          {
            logo: "/partnerships/dafi-protocol.png",
            name: "DAFI Protocol",
            description: "Use synthetic tokens to reward long-term users and incentivise participation"
          },
          {
            logo: "/partnerships/kleros.png",
            name: "Kleros",
            description: "To bring on-chain dispute resolution systems to our prediction markets"
          },
          {
            logo: "/partnerships/dotmoovs.png",
            name: "Dotmoovs",
            description: "To predict outcomes of mobile peer-to-peer sports and competitive events"
          },
          {
            logo: "/partnerships/meter.png",
            name: "Meter",
            description: "To securely bridge POLK tokens from Ethereum Network into Moonriver and Moonbeam"
          },
          {
            logo: "/partnerships/transak.png",
            name: "Transak",
            description: "To add a fiat-to-crypto payment gateway in a compliant way"
          },
          {
            logo: "/partnerships/subquery.png",
            name: "SubQuery",
            description: "To enable a reliable data aggregator for protocol analytics"
          },
          {
            logo: "/partnerships/uniswap.png",
            name: "Uniswap",
            description: "POLK rewards program launches for Uniswap liquidity providers"
          },
        ]
      },
      {
        images: ["/work/private-beta-whitelist-addresses.png", "/work/visual-portfolio-user-forecast.png", "/work/visual-portfolio-user-forecast2.png"]
      },
      {
        images: ["/work/app-animated-gif2.gif", "/work/market-page.png"]
      }
    ],
  },
  "how-we-achieved-166-mom-ngo-growth": {
    id: "how-we-achieved-166-mom-ngo-growth",
    title: "How we achieved 166% MoM NGO growth in an ESG marketplace",
    subtitle: "Connecting corporations with impact organizations in 6 months",
    company: "Coompass",
    role: "CMO & Co-Founder",
    period: "2023 - Present",
    logo: "/coompass.jpg",
    numbers: [
      { value: "150+", label: "NGOs onboarded" },
      { value: "10+", label: "corporate & university partners" },
      { value: "70+", label: "active volunteering missions" },
      { value: "100+", label: "active volunteers" }
    ],
    scope: [
      "GTM strategy & positioning",
      "Product and adoption alignment",
      "Narrative iteration & pitching",
      "NGO and partner onboarding",
      "Corporate & university pilots",
      "Market entry strategy (Portugal)"
    ],
    metrics: [
      { label: "NGO Growth", value: "166%" },
      { label: "Period", value: "MoM" }
    ],
    impact: "ESG marketplace connecting corporations with NGOs. Achieved rapid NGO network expansion.",
    visuals: [
      {
        images: ["/work/landing1.png", "/work/landing2.png", "/work/landing3.png"],
        caption: "Early concept and positioning when exploring a Web3-first approach"
      },
      {
        description: "Early concept <span class=\"underline decoration-green-400 decoration-2\">focused on a mission marketplace connecting companies and NGOs</span>, with built-in recognition and verifiable ESG contributions.<br /><br />This phase helped <span class=\"underline decoration-green-400 decoration-2\">validate demand and reveal adoption friction</span>, which later shaped the platform pivot.",
        image: "/work/early-concept.png",
        imageLeft: true // Image on left, text on right
      },
      {
        cards: [
          "Built the GTM and adoption strategy, designed around participation and proximity. Achieved <span class=\"underline decoration-green-400 decoration-2\">166% MoM NGO growth</span> and <span class=\"underline decoration-green-400 decoration-2\">178% MoM mission activation</span> by focusing on real usage.",
          "<span class=\"underline decoration-green-400 decoration-2\">Created onboarding narratives</span> that helped NGOs and companies understand participation, <span class=\"underline decoration-green-400 decoration-2\">reducing friction and increasing engagement</span>.",
          "Scaled the marketplace by onboarding <span class=\"underline decoration-green-400 decoration-2\">150+ NGOs</span> and <span class=\"underline decoration-green-400 decoration-2\">10 corporate and university partners</span>, ensuring live, relevant opportunities.",
          "Acted as <span class=\"underline decoration-green-400 decoration-2\">the bridge between teams</span>, maintaining clarity and trust while reinforcing feedback loops for continuous activation."
        ]
      },
      {
        images: ["/work/coompass-marketplace.png"],
        caption: "Marketplace with live and active volunteering opportunities"
      },
      {
        images: ["/work/coompass-dashboards.png"],
        caption: "Real-time dashboards tracking participation and impact"
      }
    ],
    insight: "Removed blockchain to reduce friction and accelerate adoption in a non-technical, highly bureaucratic market.",
    softClose: "Happy to share more context on the journey and decisions."
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
