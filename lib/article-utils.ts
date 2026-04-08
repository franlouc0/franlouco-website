import { Article } from "./articles";

/**
 * Calculate reading time in minutes (average 200 words per minute)
 */
export function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / 200); // 200 words per minute
  return Math.max(1, readingTime); // At least 1 minute
}

const OG_DESCRIPTION_MAX_LENGTH = 160;

function truncateForOg(text: string): string {
  if (text.length <= OG_DESCRIPTION_MAX_LENGTH) return text;
  return text.slice(0, OG_DESCRIPTION_MAX_LENGTH - 3).trim() + "...";
}

/**
 * Generate article description from content (≤160 chars for OG).
 * Extracts first paragraph or creates a summary.
 */
export function generateArticleDescription(content: string, title: string): string {
  // Try to extract first meaningful paragraph (at least 50 chars)
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip headers, lists, and very short lines
    if (!trimmed.startsWith('#') && !trimmed.startsWith('-') && !trimmed.startsWith('*') && trimmed.length > 50) {
      // Remove markdown formatting
      const clean = trimmed
        .replace(/^#+\s+/, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .trim();
      if (clean.length > 100 && clean.length < 300) {
        return truncateForOg(clean);
      }
    }
  }
  
  // Fallback: create description from title and first sentence
  const firstSentence = content.split(/[.!?]/)[0]?.trim() || '';
  if (firstSentence.length > 50) {
    return truncateForOg(firstSentence.length > 200 ? `${firstSentence.substring(0, 200)}...` : firstSentence);
  }
  
  // Last resort: generic description
  return `Read ${title} by Francisco Lourenço. Article about product, growth, and Web3.`;
}
