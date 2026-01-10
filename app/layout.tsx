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
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
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
        url: `${siteUrl}/opengraph-image.png`,
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
    images: [`${siteUrl}/opengraph-image.png`],
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
  image: {
    "@type": "ImageObject",
    url: `${siteUrl}/opengraph-image.png`,
    width: 1200,
    height: 630,
    caption: "Francisco Lourenço - Product, Growth, AI & Web3 Expert",
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* JSON-LD Structured Data - Person schema only (removed ProfessionalService to avoid LocalBusiness detection) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
