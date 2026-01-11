import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getAllArticleIds, getArticleById } from '@/lib/articles'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  
  // Get all articles for sitemap
  const articleIds = getAllArticleIds()
  const articleEntries = articleIds.map((id) => {
    const article = getArticleById(id)
    return {
      url: `${baseUrl}/articles/${id}`,
      lastModified: article ? new Date(article.date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...articleEntries,
  ]
}
