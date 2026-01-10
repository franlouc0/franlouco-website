"use client";

import * as React from "react";
import { Article } from "@/lib/articles";
import { Breadcrumb } from "./breadcrumb";

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export function ArticleView({ article, onBack }: ArticleViewProps) {
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
          {/* Title Container */}
          <div className="flex-1 rounded-md border border-green-400 bg-green-400 px-4 py-3 sm:px-6">
            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-900 sm:text-3xl">
              {article.title}
            </h1>
          </div>
          
          {/* Author & Date Container */}
          <div className="flex items-center gap-4 rounded-md border border-green-400 bg-green-400 px-4 py-3 sm:px-6 whitespace-nowrap">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-900">
              {article.author}
            </span>
            <span className="text-zinc-900 dark:text-zinc-900">•</span>
            <time 
              dateTime={article.date}
              className="text-sm font-semibold text-zinc-900 dark:text-zinc-900"
            >
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
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
