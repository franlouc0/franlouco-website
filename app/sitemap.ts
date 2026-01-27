import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getAllArticleIds, getArticleById } from '@/lib/articles'
import { getAllWorkIds } from '@/lib/work'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  
  // Get all articles for sitemap (sorted for stable output)
  const articleIds = getAllArticleIds().sort()
  const articleEntries = articleIds.map((id) => {
    const article = getArticleById(id)
    return {
      url: `${baseUrl}/articles/${id}`,
      lastModified: article ? new Date(article.date) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })

  // Get all work pages for sitemap (sorted for stable output)
  const workIds = getAllWorkIds().sort()
  const workEntries = workIds.map((id) => ({
    url: `${baseUrl}/work/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...workEntries,
    ...articleEntries,
  ]
}
