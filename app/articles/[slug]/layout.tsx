import type { Metadata } from "next";
import { SITE_URL, AUTHOR_NAME } from "@/lib/constants";
import { getArticleById, getAllArticleIds } from "@/lib/articles";
import { generateArticleDescription } from "@/lib/article-utils";

const OG_IMAGE = `${SITE_URL}/opengraph-image2.png`;

interface ArticleLayoutProps {
  params: {
    slug: string;
  };
  children: React.ReactNode;
}

export function generateStaticParams() {
  return getAllArticleIds().sort().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticleLayoutProps): Promise<Metadata> {
  const article = getArticleById(params.slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const description = generateArticleDescription(article.content, article.title);

  return {
    title: article.title,
    description,
    keywords: article.tags,
    authors: [{ name: AUTHOR_NAME }],
    openGraph: {
      title: article.title,
      description,
      type: "article",
      publishedTime: article.date,
      authors: [AUTHOR_NAME],
      tags: article.tags,
      url: `${SITE_URL}/articles/${article.id}`,
      images: [
        { url: OG_IMAGE, width: 1200, height: 800, alt: article.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: `${SITE_URL}/articles/${article.id}`,
    },
  };
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return <>{children}</>;
}
