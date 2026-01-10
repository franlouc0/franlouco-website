"use client";

import * as React from "react";
import { Article } from "@/lib/articles";
import { Breadcrumb } from "./breadcrumb";
import { Share2 } from "lucide-react";

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
  const [copied, setCopied] = React.useState(false);

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

  // Helper function to calculate reading time (average 200 words per minute)
  const calculateReadingTime = (content: string): number => {
    const words = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // 200 words per minute
    return Math.max(1, readingTime); // At least 1 minute
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

  // Enhanced markdown-like content parser with visual enhancements
  const formatContent = (content: string) => {
    if (!content || typeof content !== 'string') {
      return [];
    }
    
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let listKey = 0;
    let isFirstParagraph = true;
    let isInQuickContext = false;
    let isInIDOResults = false;
    let contextItems: Array<{key: string, value: string}> = [];
    let metricsItems: Array<{key: string, value?: string, subItems?: string[]}> = [];
    let previousWasHeader = false;

    // Helper to add section divider
    const addSectionDivider = () => {
      if (previousWasHeader) {
        elements.push(
          <div key={`divider-${listKey++}`} className="my-6 flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-400/30 to-transparent"></div>
            <div className="h-1 w-1 rounded-full bg-green-400"></div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-400/30 to-transparent"></div>
          </div>
        );
        previousWasHeader = false;
      }
    };

    // Helper to process inline formatting
    const processInlineFormatting = (text: string): React.ReactNode[] => {
      if (!text || text.trim() === '') {
        return [];
      }
      
      const parts: React.ReactNode[] = [];
      // Handle bold first
      const boldRegex = /\*\*([^*]+)\*\*/g;
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          const beforeText = text.substring(lastIndex, match.index);
          if (beforeText) {
            parts.push(beforeText);
          }
        }
        parts.push(<strong key={`bold-${match.index}`} className="font-semibold text-zinc-900 dark:text-zinc-50">{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < text.length) {
        const remainingText = text.substring(lastIndex);
        if (remainingText) {
          parts.push(remainingText);
        }
      }

      return parts.length > 0 ? parts : [text];
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Headers
      if (trimmedLine.startsWith('# ')) {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="space-y-3 my-6">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        elements.push(<h1 key={index} className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-8 mb-4 first:mt-0">{trimmedLine.substring(2)}</h1>);
        return;
      }
      
      if (trimmedLine.startsWith('## ')) {
        // Close any open sections
        if (isInQuickContext && contextItems.length > 0) {
          elements.push(
            <div key={`context-${listKey++}`} className="my-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4 uppercase tracking-wider">Quick context</h3>
              <div className="space-y-2 text-[14px]">
                {contextItems.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{item.key}:</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
          contextItems = [];
          isInQuickContext = false;
        }

        if (isInIDOResults && metricsItems.length > 0) {
          elements.push(
            <div key={`metrics-${listKey++}`} className="my-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {metricsItems.map((item, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                  <div className="text-xl font-bold text-green-400">{item.key}</div>
                  {item.value && (
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{item.value}</div>
                  )}
                  {item.subItems && item.subItems.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {item.subItems.map((sub, j) => (
                        <div key={j} className="text-[10px] text-zinc-500 dark:text-zinc-500">{sub}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
          metricsItems = [];
          isInIDOResults = false;
        }

        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="space-y-3 my-6">
              {listItems}
            </ul>
          );
          listItems = [];
        }

        addSectionDivider();

        const sectionTitle = trimmedLine.substring(3);
        
        // Special handling for "Quick context" section
        if (sectionTitle === "Quick context") {
          isInQuickContext = true;
          previousWasHeader = true;
          return;
        }

        // Special handling for "The IDO results" section
        if (sectionTitle === "The IDO results") {
          isInIDOResults = true;
        }

        elements.push(
          <h2 key={index} className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-8 mb-4 flex items-center gap-3">
            <span className="h-0.5 flex-1 bg-gradient-to-r from-green-400/50 to-transparent"></span>
            <span>{sectionTitle}</span>
            <span className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-green-400/50"></span>
          </h2>
        );
        previousWasHeader = true;
        return;
      }

      if (trimmedLine.startsWith('### ')) {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="space-y-3 my-6">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        addSectionDivider();
        elements.push(<h3 key={index} className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-3">{trimmedLine.substring(4)}</h3>);
        previousWasHeader = true;
        return;
      }

      // Handle Quick Context section items
      if (isInQuickContext && trimmedLine.includes(':')) {
        const [key, ...valueParts] = trimmedLine.split(':');
        const value = valueParts.join(':').trim();
        contextItems.push({ key: key.trim(), value });
        return;
      }

      // Handle IDO Results metrics (only list items that look like metrics)
      if (isInIDOResults) {
        // Check if it's a nested item (starts with ~, or indented without -/*)
        if (trimmedLine.startsWith('~') || (trimmedLine.startsWith(' ') && !trimmedLine.match(/^\s+[-*]/))) {
          const lastMetric = metricsItems[metricsItems.length - 1];
          if (lastMetric) {
            if (!lastMetric.subItems) lastMetric.subItems = [];
            lastMetric.subItems.push(trimmedLine.trim().replace(/^[-~]\s*/, ''));
          }
          return;
        }
        
        // Main metric item - must be a list item (- or *) AND contain metric indicators
        if ((trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) && 
            (trimmedLine.includes('$') || trimmedLine.match(/\d+/) || trimmedLine.startsWith('Top') || trimmedLine.match(/\d+x/))) {
          const metricText = trimmedLine.substring(2).trim();
          metricsItems.push({ key: metricText });
          return;
        }
        
        // If it's a list item but not a metric, fall through to normal list processing
        // If it's a regular paragraph, fall through to paragraph processing
      }

      // List items with enhanced styling
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        const content = trimmedLine.substring(2);
        const formattedContent = processInlineFormatting(content);
        listItems.push(
          <li key={`item-${index}`} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
            <span className="text-zinc-600 dark:text-zinc-400">{formattedContent}</span>
          </li>
        );
        return;
      }

      // Numbered lists
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s(.+)$/);
      if (numberedMatch) {
        const formattedContent = processInlineFormatting(numberedMatch[2]);
        listItems.push(
          <li key={`item-${index}`} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
            <span className="text-zinc-600 dark:text-zinc-400">{formattedContent}</span>
          </li>
        );
        return;
      }

      // Empty line - close list if open, close sections if needed
      if (trimmedLine === '') {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="space-y-3 my-6">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        // Check if we should close Quick Context or IDO Results
        if (isInQuickContext && contextItems.length > 0 && index > 0) {
          const nextNonEmptyLine = lines.slice(index + 1).find(l => l.trim());
          if (nextNonEmptyLine && nextNonEmptyLine.trim().startsWith('##')) {
            // Next line is a header, so close the context box
            isInQuickContext = false;
          }
        }
        if (isInIDOResults && metricsItems.length > 0 && index > 0) {
          const nextNonEmptyLine = lines.slice(index + 1).find(l => l.trim());
          if (nextNonEmptyLine && nextNonEmptyLine.trim().startsWith('##')) {
            // Next line is a header, so close the metrics
            isInIDOResults = false;
          }
        }
        return;
      }

      // Close list if open before adding paragraph
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="space-y-3 my-6">
            {listItems}
          </ul>
        );
        listItems = [];
      }

      // Close IDO Results metrics section if we encounter a paragraph (not a metric) AFTER we have metrics
      if (isInIDOResults && metricsItems.length > 0) {
        // Check if this line is NOT a metric and NOT empty (is a regular paragraph)
        const isNotAMetric = trimmedLine !== '' && 
                            !trimmedLine.startsWith('- ') && 
                            !trimmedLine.startsWith('* ') && 
                            !trimmedLine.startsWith('~') &&
                            !trimmedLine.match(/^\s+/);
        
        if (isNotAMetric) {
          elements.push(
            <div key={`metrics-para-${listKey++}`} className="my-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {metricsItems.map((item, i) => (
                <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
                  <div className="text-xl font-bold text-green-400">{item.key}</div>
                  {item.value && (
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{item.value}</div>
                  )}
                  {item.subItems && item.subItems.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {item.subItems.map((sub, j) => (
                        <div key={j} className="text-[10px] text-zinc-500 dark:text-zinc-500">{sub}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
          metricsItems = [];
          isInIDOResults = false;
        }
      }

      // Process paragraphs
      const formattedParts = processInlineFormatting(trimmedLine);
      
      // Check if this is a bold-only line (quote/pullquote)
      // Match lines that are entirely bold (no other text outside bold markers)
      const allBoldMatch = trimmedLine.match(/^\*\*([^*]+)\*\*$/);
      if (allBoldMatch) {
        const quoteText = allBoldMatch[1];
        elements.push(
          <div key={index} className="my-8 pl-4 border-l-4 border-green-400 bg-zinc-50 dark:bg-zinc-900/50 py-4 rounded-r-lg">
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 italic leading-relaxed">
              "{quoteText}"
            </p>
          </div>
        );
        previousWasHeader = false;
      } else if (isFirstParagraph) {
        // First paragraph gets special larger styling
        elements.push(
          <p key={index} className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed mb-6 mt-2">
            {formattedParts}
          </p>
        );
        isFirstParagraph = false;
      } else {
        // Regular paragraphs
        elements.push(
          <p key={index} className="text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed text-[15px]">
            {formattedParts}
          </p>
        );
      }
      previousWasHeader = false;
    });

    // Close any remaining sections
    if (isInQuickContext && contextItems.length > 0) {
      elements.push(
        <div key={`context-final-${listKey++}`} className="my-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-4 uppercase tracking-wider">Quick context</h3>
          <div className="space-y-2 text-[14px]">
            {contextItems.map((item, i) => (
              <div key={i} className="flex gap-2">
                <span className="font-medium text-zinc-900 dark:text-zinc-50">{item.key}:</span>
                <span className="text-zinc-600 dark:text-zinc-400">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isInIDOResults && metricsItems.length > 0) {
      elements.push(
        <div key={`metrics-final-${listKey++}`} className="my-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {metricsItems.map((item, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
              <div className="text-xl font-bold text-green-400">{item.key}</div>
              {item.value && (
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">{item.value}</div>
              )}
              {item.subItems && item.subItems.length > 0 && (
                <div className="mt-2 space-y-1">
                  {item.subItems.map((sub, j) => (
                    <div key={j} className="text-[10px] text-zinc-500 dark:text-zinc-500">{sub}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    // Close any remaining list
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-final-${listKey}`} className="space-y-3 my-6">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  return (
    <article className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
        <Breadcrumb
          items={[
            { label: "Home", onClick: onBack },
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

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
          {/* Title Container - No box, 3/4 width */}
          <div className="flex-[3]">
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {article.title}
            </h1>
            {/* Tags - Below title */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex h-4 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[10px] text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Date, Reading Time, Characters & Images Container - Grey badge style, 1/4 width */}
          <div className="flex-1 flex items-center gap-1.5 rounded-md border border-zinc-300 bg-zinc-100 px-2 py-1.5 sm:px-3 sm:py-2 whitespace-nowrap dark:border-zinc-700/50 dark:bg-zinc-800/50">
            <time 
              dateTime={article.date}
              className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400"
            >
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </time>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
              {calculateReadingTime(article.content)} min read
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
              {countCharacters(article.content).toLocaleString()} chars
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
              {countImages(article.content)} images
            </span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none flex-1 overflow-y-auto pb-8">
        <div className="text-[15px] leading-relaxed">
          {(() => {
            try {
              return formatContent(article.content);
            } catch (error) {
              console.error('Error formatting article content:', error);
              return <p className="text-red-500">Error loading article content. Please refresh the page.</p>;
            }
          })()}
        </div>
      </div>
    </article>
  );
}
