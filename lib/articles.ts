export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
}

export const articles: Record<string, Article> = {
  "how-we-raised-715k-ido": {
    id: "how-we-raised-715k-ido",
    title: "How we raised $715K in an IDO without relying on hype",
    date: "2024-01-15",
    author: "Francisco Lourenço",
    tags: ["Growth", "Polkamarkets", "Launch Judgement", "Founders", "Web3 Teams"],
    content: `
# How we raised $715K in an IDO without relying on hype

In the world of Web3 and Initial DEX Offerings (IDOs), it's easy to get caught up in the hype cycle. Many projects rely on aggressive marketing, influencer partnerships, and FOMO to drive token sales. But what if there's a better way?

## Building genuine value

Instead of chasing trends, we focused on building a product that solved real problems. Our approach was simple:

- **Authentic community building**: We engaged with users who genuinely needed our solution
- **Transparent communication**: No overpromising, just honest updates about progress
- **Sustainable tokenomics**: A model designed for long-term value, not quick pumps

## The launch strategy

Our IDO strategy centered on trust and authenticity rather than hype. We prioritized:

1. **Early adopters who believed in the vision**: Not speculators chasing quick gains
2. **Clear value proposition**: Users understood exactly what they were buying into
3. **Fair distribution**: Preventing whale manipulation and ensuring broad participation

## Results

By focusing on substance over style, we successfully raised $715K with:
- Lower marketing costs than typical IDOs
- A more engaged and committed community
- Better long-term token holder retention
- A sustainable path forward

## Key takeaways

The biggest lesson? **Quality beats hype every time**. When you build something valuable and communicate transparently, the right investors and users will find you.

*This article is a placeholder. Replace with your actual article content.*
    `.trim(),
  },
};

export function getArticleById(id: string): Article | undefined {
  return articles[id];
}

export function getArticleIdByTitle(title: string): string | undefined {
  const entry = Object.entries(articles).find(([_, article]) => article.title === title);
  return entry ? entry[0] : undefined;
}
