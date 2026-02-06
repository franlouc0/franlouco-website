import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE_URL, SITE_NAME, AUTHOR_NAME, AUTHOR_EMAIL, DEFAULT_LOCALE } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Francisco Lourenço | Product, Growth, AI & Web3 Expert",
    template: "%s | Francisco Lourenço",
  },
  description:
    "Product & Growth expert. CMO & Co-Founder at Coompass. 10+ years in digital marketing, IDO launches, token sales, community building. Product, growth & tech.",
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
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  applicationName: SITE_NAME,
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
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: DEFAULT_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Francisco Lourenço | Product, Growth, AI & Web3 Expert",
    description:
      "Product & Growth expert. CMO & Co-Founder at Coompass. 10+ years in digital marketing, IDO launches, token sales, community building. Product, growth & tech.",
    images: [
      {
        url: `${SITE_URL}/opengraph-image2.png`,
        width: 1200,
        height: 800,
        alt: "Francisco Lourenço - Product, Growth, AI & Web3 Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Francisco Lourenço | Product, Growth, AI & Web3 Expert",
    description:
      "Product & Growth expert. CMO & Co-Founder at Coompass. 10+ years in digital marketing, IDO launches, token sales, community building.",
    images: [`${SITE_URL}/opengraph-image2.png`],
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
    canonical: SITE_URL,
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
  url: SITE_URL,
  image: {
    "@type": "ImageObject",
    url: `${SITE_URL}/opengraph-image2.png`,
    width: 1200,
    height: 800,
    caption: "Francisco Lourenço - Product, Growth, AI & Web3 Expert",
  },
  email: AUTHOR_EMAIL,
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
  hasOccupation: [
    {
      "@type": "Occupation",
      name: "Web3 Marketing Growth Manager",
      occupationLocation: {
        "@type": "Organization",
        name: "IBC Group",
      },
    },
    {
      "@type": "Occupation",
      name: "CMO & Co-Founder",
      occupationLocation: {
        "@type": "Organization",
        name: "Coompass",
      },
    },
    {
      "@type": "Occupation",
      name: "Partner",
      occupationLocation: {
        "@type": "Organization",
        name: "Broadpath",
      },
    },
    {
      "@type": "Occupation",
      name: "Founding Mentor",
      occupationLocation: {
        "@type": "Organization",
        name: "Builders Camp",
      },
    },
    {
      "@type": "Occupation",
      name: "Advisor",
      occupationLocation: {
        "@type": "Organization",
        name: "Predik",
      },
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
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VSBRK1TQDG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VSBRK1TQDG');
          `}
        </Script>
        {/* JSON-LD Structured Data - Person schema only (removed ProfessionalService to avoid LocalBusiness detection) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
