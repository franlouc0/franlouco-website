import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://franlou.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Francisco Lourenço | Product, Growth, AI & Web3 Expert",
    template: "%s | Francisco Lourenço",
  },
  description:
    "Francisco Lourenço - Product and Growth expert specializing in AI, Software, and Web3. CMO & Co-Founder at Coompass. 10+ years of experience in digital marketing, IDO launches, token sales, and community building. Building and shipping ideas at the intersection of product, growth, and tech.",
  keywords: [
    "Francisco Lourenço",
    "Product Manager",
    "Growth Marketing",
    "Web3 Marketing",
    "CMO",
    "IDO Launch",
    "Token Sales",
    "Community Building",
    "Digital Marketing",
    "AI Marketing",
    "Blockchain Marketing",
    "Coompass",
    "Polkamarkets",
    "Polkastarter",
    "Product Strategy",
    "Growth Strategy",
    "Web3 Consultant",
    "Marketing Consultant",
    "Portugal",
  ],
  authors: [{ name: "Francisco Lourenço", url: siteUrl }],
  creator: "Francisco Lourenço",
  publisher: "Francisco Lourenço",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Francisco Lourenço",
    title: "Francisco Lourenço | Product, Growth, AI & Web3 Expert",
    description:
      "Product and Growth expert specializing in AI, Software, and Web3. CMO & Co-Founder at Coompass. 10+ years of experience in digital marketing, IDO launches, token sales, and community building.",
    images: [
      {
        url: `${siteUrl}/profile.jpg`,
        width: 1200,
        height: 630,
        alt: "Francisco Lourenço - Product, Growth, AI & Web3 Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Francisco Lourenço | Product, Growth, AI & Web3 Expert",
    description:
      "Product and Growth expert specializing in AI, Software, and Web3. CMO & Co-Founder at Coompass. 10+ years of experience.",
    images: [`${siteUrl}/profile.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Professional Portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

// JSON-LD Structured Data - defined outside component for better performance
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Francisco Lourenço",
  jobTitle: "Product & Growth Expert | CMO & Co-Founder",
  description:
    "Product and Growth expert specializing in AI, Software, and Web3. CMO & Co-Founder at Coompass.",
  url: siteUrl,
  image: `${siteUrl}/profile.jpg`,
  email: "hello@franlou.co",
  sameAs: [
    "https://www.linkedin.com/in/franlouco/",
    "https://github.com/franlouc0",
  ],
  alumniOf: [
    {
      "@type": "Organization",
      name: "Würth Portugal",
    },
    {
      "@type": "Organization",
      name: "AKI Portugal",
    },
    {
      "@type": "Organization",
      name: "Havas Media Portugal",
    },
    {
      "@type": "Organization",
      name: "ZON Optimus",
    },
  ],
  worksFor: [
    {
      "@type": "Organization",
      name: "IBC Group",
      jobTitle: "Web3 Marketing Growth Manager",
    },
    {
      "@type": "Organization",
      name: "Coompass",
      jobTitle: "CMO & Co-Founder",
    },
    {
      "@type": "Organization",
      name: "Broadpath",
      jobTitle: "Partner",
    },
    {
      "@type": "Organization",
      name: "Builders Camp",
      jobTitle: "Founding Mentor",
    },
    {
      "@type": "Organization",
      name: "Predik",
      jobTitle: "Advisor",
    },
  ],
  knowsAbout: [
    "Product Management",
    "Growth Marketing",
    "Web3 Marketing",
    "IDO Launch",
    "Token Sales",
    "Community Building",
    "Digital Marketing",
    "AI Marketing",
    "Blockchain",
    "Blockchain Marketing",
    "Product Strategy",
    "Growth Strategy",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "PT",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Francisco Lourenço - Product & Growth Consulting",
  description:
    "Product and Growth consulting services specializing in AI, Software, and Web3. Expert in IDO launches, token sales, community building, and digital marketing strategy.",
  url: siteUrl,
  provider: {
    "@type": "Person",
    name: "Francisco Lourenço",
    email: "hello@franlou.co",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Product Strategy",
    "Growth Marketing",
    "Web3 Marketing",
    "IDO Launch Consultation",
    "Token Sales Strategy",
    "Community Building",
    "Digital Marketing Strategy",
    "AI Marketing",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* JSON-LD Structured Data - must be in body, not head in Next.js App Router */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
