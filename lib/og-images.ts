import { SITE_URL } from "@/lib/constants";

const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image2.png`;

/** Grid images used on homepage for featured work. Used as OG image for work pages. */
const WORK_GRID_IMAGES: Record<string, string> = {
  "how-we-raised-715k-ido": "/grid/grid-polkamarkets3.png",
  "how-we-achieved-166-mom-ngo-growth": "/grid/grid-coompass.png",
  "scaling-sales-partnerships-blockchain": "/grid/grid-bepronetwork.png",
};

/** Grid images used on homepage for featured articles. Used as OG image for article pages. */
const ARTICLE_GRID_IMAGES: Record<string, string> = {
  "imagining-ai-powered-fundraising-nonprofits": "/grid/grid-redcross.png",
};

export function getWorkOgImage(workId: string): string {
  const path = WORK_GRID_IMAGES[workId];
  return path ? `${SITE_URL}${path}` : DEFAULT_OG_IMAGE;
}

export function getArticleOgImage(articleId: string): string {
  const path = ARTICLE_GRID_IMAGES[articleId];
  return path ? `${SITE_URL}${path}` : DEFAULT_OG_IMAGE;
}
