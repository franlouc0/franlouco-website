import type { Metadata } from "next";
import { SITE_URL, AUTHOR_NAME } from "@/lib/constants";
import { getWorkOgImage } from "@/lib/og-images";
import { getWorkById, getAllWorkIds } from "@/lib/work";

interface WorkLayoutProps {
  params: { slug: string };
  children: React.ReactNode;
}

export function generateStaticParams() {
  return getAllWorkIds().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkLayoutProps): Promise<Metadata> {
  const work = getWorkById(params.slug);
  if (!work) {
    return { title: "Work Not Found" };
  }

  const title = work.title;
  const rawDescription =
    work.subtitle ||
    `${work.company} — ${work.role} (${work.period}). ${work.impact}`;
  const description =
    rawDescription.length > 160
      ? rawDescription.slice(0, 157).trim() + "..."
      : rawDescription;
  const ogImage = getWorkOgImage(work.id);

  return {
    title,
    description,
    authors: [{ name: AUTHOR_NAME }],
    openGraph: {
      title: `${title} | Francisco Lourenço`,
      description,
      type: "article",
      url: `${SITE_URL}/work/${work.id}`,
      siteName: "Francisco Lourenço",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 800,
          alt: `${work.company} — ${work.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Francisco Lourenço`,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/work/${work.id}`,
    },
  };
}

export default function WorkLayout({ children }: WorkLayoutProps) {
  return <>{children}</>;
}
