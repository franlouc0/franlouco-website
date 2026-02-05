"use client";

import * as React from "react";
import Image from "next/image";
import { Article } from "@/lib/articles";
import { Breadcrumb } from "./breadcrumb";
import { Share2 } from "lucide-react";
import { SITE_URL, AUTHOR_NAME, AUTHOR_EMAIL } from "@/lib/constants";
import { calculateReadingTime } from "@/lib/article-utils";

interface ArticleViewProps {
  article: Article;
  /** When false, only render article body (no breadcrumb, header, or TOC). Used when page has work-like hero + info card. */
  showHeader?: boolean;
}

export function ArticleView({ article, showHeader = true }: ArticleViewProps) {
  const [copied, setCopied] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Inject Article JSON-LD schema for LLM SEO
  React.useEffect(() => {
    // Generate a clean description for the article
    const cleanContent = article.content
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const wordCount = cleanContent.split(/\s+/).length;
    const readingTime = calculateReadingTime(article.content);
    
    // Extract a good description (first 300 chars of clean content)
    const description = cleanContent.substring(0, 300).replace(/\s+\S*$/, '') + '...';
    
    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      author: {
        "@type": "Person",
        name: AUTHOR_NAME,
        email: AUTHOR_EMAIL,
        url: SITE_URL,
      },
      datePublished: article.date,
      dateModified: article.date,
      description: description,
      keywords: article.tags.join(', '),
      url: `${SITE_URL}/articles/${article.id}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${SITE_URL}/articles/${article.id}`,
      },
      publisher: {
        "@type": "Person",
        name: AUTHOR_NAME,
        url: SITE_URL,
      },
      articleSection: article.tags.join(', '),
      wordCount: wordCount,
      timeRequired: `PT${readingTime}M`,
      inLanguage: "en-US",
    };

    // Remove existing article schema if present
    const existingScript = document.querySelector('script[type="application/ld+json"][data-article-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and inject new script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-article-schema', 'true');
    script.text = JSON.stringify(articleJsonLd);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-article-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [article]);

  // Scroll to breadcrumb on mount if hash is present (for mobile anchor links)
  React.useEffect(() => {
    if (window.location.hash === '#breadcrumb') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const breadcrumbElement = document.getElementById('breadcrumb');
        if (breadcrumbElement) {
          breadcrumbElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  // Reading progress tracking
  React.useEffect(() => {
    const handleScroll = () => {
      const container = contentRef.current;
      if (!container) return;
      
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    const container = contentRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  // Share handler with Web Share API and clipboard fallback
  const handleShare = async () => {
    const url = window.location.href;
    const title = article.title;

    // Try Web Share API first (mobile/native)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        return;
      } catch (err) {
        // User cancelled or error occurred, fallback to copy
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    }

    // Fallback: Copy link to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };


  // Helper function to count characters (excluding markdown syntax)
  const countCharacters = (content: string): number => {
    // Remove markdown headers, bold, italic, list markers
    const cleanContent = content
      .replace(/^#+\s+/gm, '') // Remove headers
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
      .replace(/\*([^*]+)\*/g, '$1') // Remove italic (but not in bold)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '') // Remove image markdown
      .replace(/^[-*]\s+/gm, '') // Remove list markers
      .replace(/^\d+\.\s+/gm, '') // Remove numbered list markers
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
    return cleanContent.length;
  };

  // Helper function to count images (markdown format: ![alt](url))
  const countImages = (content: string): number => {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const matches = content.match(imageRegex);
    return matches ? matches.length : 0;
  };

  // Helper function to create slug from text
  const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  // Extract headers from content - only level 2 (##) headers that have the green bar
  const extractHeaders = React.useMemo(() => {
    const lines = article.content.split('\n');
    const headers: Array<{ text: string; level: number; id: string }> = [];
    
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      // Only include level 2 headers (##) that have the green bar marker
      if (trimmedLine.startsWith('## ')) {
        const text = trimmedLine.substring(3);
        headers.push({ text, level: 2, id: createSlug(text) });
      }
    });
    
    return headers;
  }, [article.content]);

  // Scroll to element by ID
  const scrollToHeader = React.useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      // On mobile, use normal scroll (no offset for featured work anchor links)
      // On desktop, add offset for table of contents to account for header
      const isMobile = window.innerWidth < 1024;
      const offset = isMobile ? 0 : 240; // Offset only on desktop
      const elementPosition = element.getBoundingClientRect().top;
      const containerScrollTop = contentRef.current.scrollTop;
      const offsetPosition = containerScrollTop + elementPosition - offset;
      
      contentRef.current.scrollTo({
        top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
        behavior: 'smooth'
      });
    }
  }, []);

  // Helper function to highlight metrics and numbers (e.g., $715K, 100K+, 120x, $80M+)
  const highlightMetrics = (text: string): React.ReactNode[] => {
    if (!text) return [text];
    
    // Match metrics: $ amounts (with K/M suffix), large numbers with K/M/+, multipliers (x), percentages
    const metricRegex = /(\$[\d,.]+[KMkm]?\s*\+?|[\d,]+[KMkm]\s*\+?|[\d,.]+x\b|[\d.]+%)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let matchIndex = 0;
    let match;
    
    while ((match = metricRegex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      // Add highlighted metric
      parts.push(
        <span 
          key={`metric-${matchIndex++}`} 
          className="font-bold text-green-400 dark:text-green-400"
        >
          {match[0]}
        </span>
      );
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : [text];
  };

  // Helper function to process text with metrics highlighting and formatting
  const processTextWithMetrics = (text: string): React.ReactNode => {
    const parts = highlightMetrics(text);
    return <>{parts}</>;
  };

  // Simple markdown-like content parser (basic implementation)
  // You might want to use a proper markdown library like 'react-markdown' in the future
  const formatContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let listKey = 0;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Headers
      if (trimmedLine.startsWith('# ')) {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-none mb-6 space-y-2.5 text-zinc-600 dark:text-zinc-400 my-4">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        const h1Text = trimmedLine.substring(2);
        const processedH1Text = highlightMetrics(h1Text);
        const h1Id = createSlug(h1Text);
        elements.push(<h1 key={index} id={h1Id} className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-8 mb-4 first:mt-0">{processedH1Text}</h1>);
        return;
      }
      if (trimmedLine.startsWith('## ')) {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-none mb-6 space-y-2.5 text-zinc-600 dark:text-zinc-400 my-4">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        // Three-image grids for Red Cross article (same layout as work page)
        if (article.id === "imagining-ai-powered-fundraising-nonprofits") {
          if (trimmedLine === "## Why start with objects?") {
            const articleImages = [
              "/articles/redcross-assets1.png",
              "/articles/redcross-assets2.png",
              "/articles/redcross-assets3.png",
            ];
            elements.push(
              <figure key={`img-grid-${index}`} className="mt-8 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articleImages.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                    >
                      <Image
                        src={src}
                        alt={`Red Cross product concept ${imgIdx + 1}`}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </figure>
            );
          }
          if (trimmedLine === "## What changed when I used AI to explore the idea") {
            const articleImages = [
              "/articles/redcross-assets7.png",
              "/articles/redcross-assets9.png",
              "/articles/redcross-assets10.png",
            ];
            elements.push(
              <figure key={`img-grid-ai-${index}`} className="mt-8 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articleImages.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                    >
                      <Image
                        src={src}
                        alt={`Red Cross product concept ${imgIdx + 1}`}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </figure>
            );
          }
          if (trimmedLine === "## Beyond donations: building community") {
            const articleImages = [
              "/articles/redcross-assets4.png",
              "/articles/redcross-assets6.png",
            ];
            elements.push(
              <figure key={`img-grid-community-${index}`} className="mt-8 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {articleImages.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                    >
                      <Image
                        src={src}
                        alt={`Red Cross product concept ${imgIdx + 1}`}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </figure>
            );
          }
          if (trimmedLine === "## The bigger idea") {
            const articleImages = [
              "/articles/redcross-assets4.png",
              "/articles/redcross-assets8.png",
              "/articles/redcross-assets11.png",
              "/articles/redcross-assets13.png",
            ];
            elements.push(
              <figure key={`img-grid-bigger-${index}`} className="mt-8 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {articleImages.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900"
                    >
                      <Image
                        src={src}
                        alt={`Red Cross product concept ${imgIdx + 1}`}
                        width={1920}
                        height={1080}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </figure>
            );
          }
        }
        // H2 with green accent line
        const headerText = trimmedLine.substring(3);
        const processedHeaderText = highlightMetrics(headerText);
        const h2Id = createSlug(headerText);
        elements.push(
          <div key={`h2-wrapper-${index}`} className="relative mt-8 mb-4 group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400 rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
            <h2 id={h2Id} className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 pl-4">
              {processedHeaderText}
            </h2>
          </div>
        );
        return;
      }
      if (trimmedLine.startsWith('### ')) {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-none mb-6 space-y-2.5 text-zinc-600 dark:text-zinc-400 my-4">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        const h3Text = trimmedLine.substring(4);
        const processedH3Text = highlightMetrics(h3Text);
        const h3Id = createSlug(h3Text);
        elements.push(<h3 key={index} id={h3Id} className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-4 mb-2">{processedH3Text}</h3>);
        return;
      }

      // List items with green accent marker
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        const itemText = trimmedLine.substring(2);
        const processedItemText = highlightMetrics(itemText);
        listItems.push(
          <li 
            key={`item-${index}`} 
            className="flex items-start gap-2"
          >
            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 bg-green-400 rounded-full" />
            <span className="flex-1">{processedItemText}</span>
          </li>
        );
        return;
      }

      // Numbered lists with green accent
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s(.+)$/);
      if (numberedMatch) {
        const itemText = numberedMatch[2];
        const processedItemText = highlightMetrics(itemText);
        listItems.push(
          <li 
            key={`item-${index}`}
            className="flex items-start gap-2"
          >
            <span className="mt-1.5 shrink-0 w-1.5 h-1.5 bg-green-400 rounded-full" />
            <span className="flex-1">{processedItemText}</span>
          </li>
        );
        return;
      }

      // Empty line - close list if open
      if (trimmedLine === '') {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-none mb-6 space-y-2.5 text-zinc-600 dark:text-zinc-400 my-4">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        return;
      }

      // Close list if open before adding paragraph
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="list-none mb-4 space-y-2 text-zinc-600 dark:text-zinc-400 pl-4">
            {listItems}
          </ul>
        );
        listItems = [];
      }

      // Simple inline formatting - handle bold, italic, and metrics
      // Split by bold first, then process italic and metrics in each part
      const boldParts = trimmedLine.split(/(\*\*[^*]+\*\*)/);
      const formattedParts: React.ReactNode[] = [];
      
      boldParts.forEach((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Enhanced bold statement with background card
          const boldText = part.slice(2, -2);
          const processedBoldText = highlightMetrics(boldText);
          formattedParts.push(
            <span 
              key={`bold-${partIndex}`} 
              className="inline-block font-semibold bg-green-400/10 dark:bg-green-400/15 px-1.5 py-0.5 rounded border-l-2 border-green-400/50 my-1 mx-0.5"
            >
              {processedBoldText}
            </span>
          );
        } else if (part) {
          // Process italic in non-bold parts
          const italicRegex = /(?<!\*)\*([^*]+)\*(?!\*)/g;
          const textParts: React.ReactNode[] = [];
          let lastIndex = 0;
          let italicMatch;
          let italicKey = 0;
          
          while ((italicMatch = italicRegex.exec(part)) !== null) {
            // Add text before italic
            if (italicMatch.index > lastIndex) {
              const beforeText = part.substring(lastIndex, italicMatch.index);
              const beforeParts = highlightMetrics(beforeText);
              textParts.push(...beforeParts);
            }
            // Add italic text (with metrics highlighting)
            const matchedItalicText = italicMatch[1];
            const italicParts = highlightMetrics(matchedItalicText);
            textParts.push(
              <em key={`italic-${partIndex}-${italicKey++}`} className="italic">
                {italicParts.length > 0 ? italicParts : matchedItalicText}
              </em>
            );
            lastIndex = italicMatch.index + italicMatch[0].length;
          }
          
          // Add remaining text after italic
          if (lastIndex < part.length) {
            const afterText = part.substring(lastIndex);
            const afterParts = highlightMetrics(afterText);
            textParts.push(...afterParts);
          }
          
          // If no italic found, just process metrics
          if (textParts.length === 0) {
            const metricParts = highlightMetrics(part);
            textParts.push(...metricParts);
          }
          
          // Add all text parts with a key
          formattedParts.push(
            <React.Fragment key={`text-${partIndex}`}>
              {textParts}
            </React.Fragment>
          );
        }
      });
      
      // If no formatting found, just highlight metrics
      if (formattedParts.length === 0) {
        const metricParts = highlightMetrics(trimmedLine);
        formattedParts.push(...metricParts);
      }
      
      elements.push(
        <p key={index} className="text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">
          {formattedParts}
        </p>
      );
    });

    // Close any remaining list
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${listKey}`} className="list-none mb-6 space-y-2.5 text-zinc-600 dark:text-zinc-400 my-4">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  if (!showHeader) {
    return (
      <div className="text-[15px] leading-relaxed max-w-4xl pb-8">
        {formatContent(article.content)}
      </div>
    );
  }

  return (
    <article className="flex flex-col h-full relative">
      {/* Breadcrumb */}
      <div id="breadcrumb" className="mb-6 pb-4 flex items-center justify-between">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: article.title },
          ]}
        />
        
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 rounded-md border border-zinc-300 bg-zinc-100 px-2 py-1.5 text-[10px] font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400 dark:hover:bg-zinc-700/50"
          aria-label="Share article"
        >
          <Share2 className="h-3 w-3" />
          <span>{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>

      {/* Reading Progress Indicator */}
      <div className="h-0.5 bg-zinc-200 dark:bg-zinc-800 mb-6">
        <div 
          className="h-full bg-green-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Article Header */}
      <header className="mb-8 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-start gap-3 sm:gap-4">
          {/* Title Container - No box, 3/4 width */}
          <div className="flex-[3] lg:pr-52">
            <h1 id="article-title" className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {article.title}
            </h1>
            {/* Tags - Below title */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex h-5 items-center rounded-md border border-zinc-300 bg-zinc-100 px-2 text-xs text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Author Info Box - Below tags, no table of contents */}
        <div className="lg:hidden mt-4">
          <div className="inline-flex rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2.5 shadow-sm dark:border-zinc-700/50 dark:bg-zinc-800/50">
            <div className="flex items-center gap-1.5 whitespace-nowrap flex-wrap">
              <time 
                dateTime={article.date}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
              >
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
              <span className="text-xs text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {calculateReadingTime(article.content)} min read
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {countCharacters(article.content).toLocaleString()} chars
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-600">•</span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                {countImages(article.content)} images
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Floating Author Info & Table of Contents - Positioned absolutely to not affect header height */}
        <div className="hidden lg:block absolute right-0 top-0 w-56">
          <div className="sticky top-0">
            <div className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2.5 shadow-sm dark:border-zinc-700/50 dark:bg-zinc-800/50">
              {/* Author/Info Box */}
              <div className="flex flex-col gap-1.5 mb-3 pb-3 border-b border-zinc-300 dark:border-zinc-700">
                <div className="flex items-center gap-1.5 justify-end whitespace-nowrap text-right">
                  <time 
                    dateTime={article.date}
                    className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="text-xs text-zinc-400 dark:text-zinc-600">•</span>
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {calculateReadingTime(article.content)} min read
                  </span>
                </div>
                <div className="flex items-center gap-1.5 justify-end whitespace-nowrap text-right">
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {countCharacters(article.content).toLocaleString()} chars
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-600">•</span>
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {countImages(article.content)} images
                  </span>
                </div>
              </div>

              {/* Table of Contents - Desktop only */}
              {extractHeaders.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-2 text-right">
                    Contents
                  </div>
                  <nav className="flex flex-col gap-1 max-h-[calc(100vh-12rem)] overflow-y-auto">
                    {extractHeaders.map((header, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToHeader(header.id)}
                        className={`text-right text-xs text-zinc-600 hover:text-zinc-900 hover:underline transition-colors dark:text-zinc-400 dark:hover:text-zinc-200 w-full ${
                          header.level === 1 ? 'font-medium' : header.level === 2 ? 'pr-2' : 'pr-4'
                        }`}
                      >
                        <span className="block truncate text-right">{header.text}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div 
        ref={contentRef}
        className="prose prose-zinc dark:prose-invert max-w-none flex-1 overflow-y-auto pb-8 lg:pr-52"
      >
        <div className="text-[15px] leading-relaxed max-w-4xl">
          {formatContent(article.content)}
        </div>
      </div>
    </article>
  );
}
