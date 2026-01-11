import type { Metadata } from "next";
import { SITE_URL, AUTHOR_NAME } from "@/lib/constants";
import { getArticleById } from "@/lib/articles";
import { generateArticleDescription } from "@/lib/article-utils";

interface ArticleLayoutProps {
  params: {
    slug: string;
  };
  children: React.ReactNode;
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
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/articles/${article.id}`,
    },
  };
}

export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return <>{children}</>;
}
