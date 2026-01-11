import { notFound } from "next/navigation";
import { ArticleView } from "@/components/article-view";
import { getArticleById } from "@/lib/articles";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleById(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 overflow-hidden">
      <section
        className="flex-1 overflow-y-auto px-6 pt-10 pb-6 lg:p-8"
        aria-label="Article"
      >
        <ArticleView article={article} />
      </section>
    </main>
  );
}
