"use client";

import * as React from "react";
import { Article } from "@/lib/articles";
import { Breadcrumb } from "./breadcrumb";

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
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
            <ul key={`list-${listKey++}`} className="list-disc list-inside mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        elements.push(<h1 key={index} className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-8 mb-4 first:mt-0">{trimmedLine.substring(2)}</h1>);
        return;
      }
      if (trimmedLine.startsWith('## ')) {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-disc list-inside mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        elements.push(<h2 key={index} className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mt-6 mb-3">{trimmedLine.substring(3)}</h2>);
        return;
      }
      if (trimmedLine.startsWith('### ')) {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-disc list-inside mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
              {listItems}
            </ul>
          );
          listItems = [];
        }
        elements.push(<h3 key={index} className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mt-4 mb-2">{trimmedLine.substring(4)}</h3>);
        return;
      }

      // List items
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        listItems.push(<li key={`item-${index}`}>{trimmedLine.substring(2)}</li>);
        return;
      }

      // Numbered lists
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s(.+)$/);
      if (numberedMatch) {
        listItems.push(<li key={`item-${index}`}>{numberedMatch[2]}</li>);
        return;
      }

      // Empty line - close list if open
      if (trimmedLine === '') {
        if (listItems.length > 0) {
          elements.push(
            <ul key={`list-${listKey++}`} className="list-disc list-inside mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
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
          <ul key={`list-${listKey++}`} className="list-disc list-inside mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
            {listItems}
          </ul>
        );
        listItems = [];
      }

      // Simple inline formatting - handle bold and italic
      let processedLine: React.ReactNode = trimmedLine;
      
      // Split by bold first, then process italic in each part
      const boldParts = trimmedLine.split(/(\*\*[^*]+\*\*)/);
      const formattedParts = boldParts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={`bold-${partIndex}`} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        // Process italic in non-bold parts
        const italicParts = part.split(/(?<!\*)\*[^*]+\*(?!\*)/);
        if (italicParts.length > 1) {
          const finalParts: React.ReactNode[] = [];
          let italicIndex = 0;
          const italicMatches = part.match(/(?<!\*)\*([^*]+)\*(?!\*)/g) || [];
          part.split(/(?<!\*)\*[^*]+\*(?!\*)/).forEach((segment, segIndex) => {
            if (segment) finalParts.push(segment);
            if (italicMatches[segIndex]) {
              finalParts.push(<em key={`italic-${partIndex}-${segIndex}`} className="italic">{italicMatches[segIndex].slice(1, -1)}</em>);
            }
          });
          return finalParts.length > 0 ? finalParts : part;
        }
        return part;
      });
      
      elements.push(<p key={index} className="text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed">{formattedParts}</p>);
    });

    // Close any remaining list
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${listKey}`} className="list-disc list-inside mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  return (
    <article className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <Breadcrumb
          items={[
            { label: "Home", onClick: onBack },
            { label: article.title },
          ]}
        />
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
          {formatContent(article.content)}
        </div>
      </div>
    </article>
  );
}
