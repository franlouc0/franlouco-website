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

/** Base URL for dynamic OG image (grid + logo overlay). */
export const OG_WORK_IMAGE_URL = (slug: string) => `${SITE_URL}/og/work/${slug}`;
export const OG_ARTICLE_IMAGE_URL = (slug: string) =>
  `${SITE_URL}/og/articles/${slug}`;

export function getWorkOgImage(workId: string): string {
  return WORK_GRID_IMAGES[workId]
    ? OG_WORK_IMAGE_URL(workId)
    : DEFAULT_OG_IMAGE;
}

export function getArticleOgImage(articleId: string): string {
  return ARTICLE_GRID_IMAGES[articleId]
    ? OG_ARTICLE_IMAGE_URL(articleId)
    : DEFAULT_OG_IMAGE;
}

/** Server-only: get grid path for work (for dynamic OG generation). */
export function getWorkGridPath(workId: string): string | null {
  const path = WORK_GRID_IMAGES[workId];
  return path ?? null;
}

/** Server-only: get grid path for article (for dynamic OG generation). */
export function getArticleGridPath(articleId: string): string | null {
  const path = ARTICLE_GRID_IMAGES[articleId];
  return path ?? null;
}
