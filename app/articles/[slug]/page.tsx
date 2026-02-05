"use client";

import { useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Info, X, ArrowLeft, Share2, Check } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExperienceSection } from "@/components/experience-section";
import { FeaturedArticlesSection } from "@/components/featured-articles-section";
import { FeaturedWorkSection } from "@/components/featured-work-section";
import { ContactModal } from "@/components/contact-modal";
import { ArticleView } from "@/components/article-view";
import { getArticleById } from "@/lib/articles";
import { calculateReadingTime } from "@/lib/article-utils";
import type { Article } from "@/lib/articles";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

function ArticleInfoCard({
  article,
  variant,
}: {
  article: Article;
  variant: "desktop" | "mobile";
}) {
  const readTime = calculateReadingTime(article.content);
  const dateStr = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (variant === "mobile") {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/90 w-full">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
          <time dateTime={article.date} className="font-medium">
            {dateStr}
          </time>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span className="font-medium">{readTime} min read</span>
          {article.tags && article.tags.length > 0 && (
            <>
              <span className="text-zinc-400 dark:text-zinc-600">•</span>
              <span className="flex flex-wrap gap-1">
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[10px] dark:border-zinc-700/50 dark:bg-zinc-800/50"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-[220px] rounded-lg border border-zinc-200 bg-white/90 p-3 shadow-sm backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-900/90">
      <div className="mb-2 flex justify-end">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
          Article
        </span>
      </div>
      <div className="flex flex-col items-end gap-0.5 text-right">
        <time
          dateTime={article.date}
          className="text-xs font-medium text-zinc-700 dark:text-zinc-300"
        >
          {dateStr}
        </time>
        <p className="text-[10px] text-zinc-600 dark:text-zinc-400">
          {readTime} min read
        </p>
      </div>
      {article.tags && article.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-end gap-1 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          {article.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex rounded border border-zinc-300 bg-zinc-100 px-1.5 text-[9px] text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isShareCopied, setIsShareCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const article = getArticleById(params.slug);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const header = headerRef.current;
    if (!scrollContainer || typeof window === "undefined") return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const isDesktop = window.innerWidth >= 1024;
      const initialHeaderHeight = isDesktop
        ? window.innerHeight * 0.5
        : window.innerHeight * 0.45;
      const progress = Math.min(scrollTop / initialHeaderHeight, 1);
      setScrollProgress(progress);
    };

    const handleWheel = (e: WheelEvent) => {
      if (header && scrollContainer) {
        e.preventDefault();
        scrollContainer.scrollBy({ top: e.deltaY, behavior: "auto" });
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    if (header) {
      header.addEventListener("wheel", handleWheel, { passive: false });
    }
    handleScroll();
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (header) {
        header.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleShare = async () => {
    if (!article) return;
    try {
      await navigator.clipboard.writeText(
        `${typeof window !== "undefined" ? window.location.origin : ""}/articles/${article.id}`
      );
      setIsShareCopied(true);
      setTimeout(() => setIsShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  if (!article) {
    notFound();
  }

  return (
    <main className="flex flex-col h-auto min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 lg:flex-row lg:h-screen lg:overflow-hidden">
      {/* Sidebar - Hidden on mobile, visible on desktop (same as work page) */}
      <aside
        className="hidden lg:flex w-full flex-col p-6 pb-0 dark:border-zinc-800 lg:w-80 lg:min-h-0 lg:border-r lg:p-8 lg:pb-8"
        aria-label="Profile and experience"
      >
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden sidebar-scroll lg:pr-3 lg:-mr-5">
        {/* Profile section */}
        <header className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              <div>FRANCISCO</div>
              <div className="flex items-center gap-0 pl-12 sm:pl-16 relative">
                <span>LOURENÇ</span>
                <div className="relative z-10 inline-flex items-center justify-center h-[1em] w-[1em] ml-0 pointer-events-none">
                  {/* Animated morphing shape - filled with neon green */}
                  <span
                    className="absolute inset-0 pointer-events-none bg-green-400"
                    style={{
                      animation: "border-morph 6s ease-in-out infinite",
                      willChange: "border-radius, transform",
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </h1>
            
            {/* Mobile button - top right, aligned with title */}
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="pointer-events-auto flex h-10 items-center gap-2 rounded-md border border-green-400 bg-green-400 px-4 text-xs font-semibold text-zinc-900 transition-all hover:border-green-500 hover:bg-green-500 dark:border-green-400 dark:bg-green-400 dark:text-zinc-900 dark:hover:border-green-500 dark:hover:bg-green-500 lg:hidden shrink-0"
              aria-label="Open contact form to work together"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-900"></span>
              </span>
              Let&apos;s work together
            </button>
          </div>

          {/* About me */}
          <section className="mt-8" aria-labelledby="about-heading">
            <h2 id="about-heading" className="sr-only">
              About Francisco Lourenço
            </h2>
            <div className="text-[15px] font-medium leading-relaxed text-zinc-600 dark:text-zinc-400">
              A crossover of{" "}
              <span className="underline decoration-green-400 decoration-2">
                product
              </span>
              ,{" "}
              <span className="underline decoration-green-400 decoration-2">
                growth
              </span>
              , and{" "}
              <span className="underline decoration-green-400 decoration-2">
                tech
              </span>
              . Building and shipping ideas{" "}
              <span className="group relative inline-block">
                <button
                  type="button"
                  onClick={() => setIsInfoOpen(!isInfoOpen)}
                  className="lg:cursor-help"
                  aria-label="More about Francisco Lourenço's experience"
                >
                  <Info
                    className="inline h-3 w-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    aria-hidden="true"
                  />
                </button>
                
                {/* Desktop tooltip - hover only */}
                <div
                  className="pointer-events-none absolute left-full top-0 z-50 ml-2 hidden w-72 rounded-lg border border-zinc-200 bg-white p-3 text-[12px] leading-relaxed text-zinc-600 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 lg:block"
                  role="tooltip"
                >
                  Data-driven marketing leader with 10+ years of experience in
                  Web3, blockchain, and digital marketing including hands-on
                  leadership of multiple IDO token launches.
                  <br />
                  <br />
                  I&apos;ve built and executed GTM plans that align tokenomics,
                  messaging, and timing. Developed strong partnerships with KOLs
                  and influencers.
                  <br />
                  <br />
                  Grown vibrant communities that fueled pre-sale fundraising and
                  drove smooth token sales.
                  <br />
                  <br />
                  I&apos;m good at brand positioning, user acquisition, viral
                  campaigns, and performance marketing to power business
                  expansion.
                </div>

                {/* Mobile modal - click to open, centered */}
                {isInfoOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                      onClick={() => setIsInfoOpen(false)}
                      aria-hidden="true"
                    />
                    <div
                      className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white p-4 text-[12px] leading-relaxed text-zinc-600 shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 lg:hidden"
                      role="dialog"
                      aria-modal="true"
                      aria-label="More about Francisco Lourenço's experience"
                    >
                      <button
                        type="button"
                        onClick={() => setIsInfoOpen(false)}
                        className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        aria-label="Close"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      Data-driven marketing leader with 10+ years of experience in
                      Web3, blockchain, and digital marketing including hands-on
                      leadership of multiple IDO token launches.
                      <br />
                      <br />
                      I&apos;ve built and executed GTM plans that align tokenomics,
                      messaging, and timing. Developed strong partnerships with KOLs
                      and influencers.
                      <br />
                      <br />
                      Grown vibrant communities that fueled pre-sale fundraising and
                      drove smooth token sales.
                      <br />
                      <br />
                      I&apos;m good at brand positioning, user acquisition, viral
                      campaigns, and performance marketing to power business
                      expansion.
                    </div>
                  </>
                )}
              </span>
            </div>
          </section>

          {/* Featured Work */}
          <FeaturedWorkSection />

          {/* Featured Articles */}
          <FeaturedArticlesSection />

          {/* Experience & Achievements */}
          <ExperienceSection />
        </header>
        </div>

        {/* Navigation Links - Desktop only */}
        <nav
          className="hidden mt-auto items-center gap-2 border-t border-zinc-200 pt-8 mt-6 dark:border-zinc-800 lg:flex"
          aria-label="Social links and navigation"
        >
          <Link
            href="https://github.com/franlouc0"
            className="relative inline-block text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Francisco Lourenço on GitHub"
          >
            GitHub
            <span className="absolute -top-0.5 left-[calc(100%-1px)] text-[8px] font-bold text-green-400 leading-none">
              8
            </span>
          </Link>
          <span
            className="text-[8px] text-zinc-300 dark:text-zinc-800"
            aria-hidden="true"
          >
            |
          </span>
          <Link
            href="https://www.linkedin.com/in/franlouco/"
            className="text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Francisco Lourenço on LinkedIn"
          >
            LinkedIn
          </Link>
          <span
            className="text-[8px] text-zinc-300 dark:text-zinc-800"
            aria-hidden="true"
          >
            |
          </span>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            aria-label="Open contact form"
          >
            Contact
          </button>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </nav>
      </aside>

      {/* Main Content Area - same structure as work page: hero + scrollable content */}
      <div id="work-main-content" className="relative flex flex-1 flex-col overflow-hidden w-full">
        {/* Hero - same header image as featured work page */}
        <div
          ref={headerRef}
          className="relative w-full overflow-hidden"
          style={{
            height:
              typeof window !== "undefined" && window.innerWidth >= 1024
                ? scrollProgress < 1
                  ? `${50 * (1 - scrollProgress * 0.5)}vh`
                  : "25vh"
                : scrollProgress < 1
                  ? `${45 * (1 - scrollProgress * 0.5)}vh`
                  : "22.5vh",
            minHeight:
              scrollProgress < 1
                ? `${300 * (1 - scrollProgress * 0.5)}px`
                : "150px",
            transition: "height 0.1s ease-out, min-height 0.1s ease-out",
          }}
        >
          <Image
            src="/dark-mode-header-image.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />

          {/* Back + Share - top left (same style as work page) */}
          <div className="absolute top-6 left-6 z-30 flex items-center gap-2 lg:top-8 lg:left-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-zinc-900 shadow-lg transition-all hover:bg-white dark:border-zinc-700/50 dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </Link>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-zinc-900 shadow-lg transition-all hover:bg-white dark:border-zinc-700/50 dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-900"
              aria-label="Copy link to share"
            >
              {isShareCopied ? (
                <>
                  <Check className="h-3 w-3" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3 w-3" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {/* Title and subtitle - same transition as work page (font scales on scroll) */}
          <div
            className="absolute inset-0 flex z-20 px-6 lg:px-8"
            style={{
              alignItems: scrollProgress > 0.3 ? "flex-start" : "center",
              paddingTop:
                scrollProgress > 0.3
                  ? `${5 + scrollProgress * 1}rem`
                  : "7rem",
              transition:
                "align-items 0.1s ease-out, padding-top 0.1s ease-out",
            }}
          >
            <div className="w-3/4">
              <h1
                className="font-extrabold text-white tracking-tight text-left drop-shadow-2xl leading-tight"
                style={{
                  fontSize:
                    typeof window !== "undefined"
                      ? (() => {
                          const isDesktop = window.innerWidth >= 1024;
                          const isTablet = window.innerWidth >= 640;
                          const baseSize = isDesktop
                            ? 3
                            : isTablet
                              ? 2.25
                              : 1.875;
                          const scale = 1 - scrollProgress * 0.4;
                          return `${baseSize * scale}rem`;
                        })()
                      : undefined,
                  transition: "font-size 0.1s ease-out",
                }}
              >
                {article.title}
              </h1>
            </div>
          </div>

          {/* Info Card - Desktop only, top right */}
          <div className="absolute top-6 right-6 z-10 hidden lg:block lg:top-8 lg:right-8">
            <ArticleInfoCard article={article} variant="desktop" />
          </div>
        </div>

        {/* Content Section - scrollable (same as work page) */}
        <section
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 pb-6 lg:p-8"
          style={{
            paddingTop:
              scrollProgress > 0 ? `${2 + scrollProgress * 1}rem` : "2rem",
            transition: "padding-top 0.1s ease-out",
          }}
          aria-label="Article content"
        >
          {/* Info Card - Mobile only, below hero */}
          <div className="lg:hidden mb-6">
            <ArticleInfoCard article={article} variant="mobile" />
          </div>
          <ArticleView article={article} showHeader={false} />

          {/* Summary / CTA - same as featured work pages */}
          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
            <div className="min-w-0 lg:w-4/5">
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                If you&apos;d like to explore how design, technology, and purpose can work together - or turn ideas like these into reality - I&apos;d be happy to connect.
              </p>
            </div>
            <div className="shrink-0 lg:w-1/5 flex justify-start lg:justify-end">
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex h-12 items-center gap-2 rounded-md border border-green-400 bg-green-400 px-6 text-sm font-semibold text-zinc-900 transition-all hover:border-green-500 hover:bg-green-500 dark:border-green-400 dark:bg-green-400 dark:text-zinc-900 dark:hover:border-green-500 dark:hover:bg-green-500"
                aria-label="Open contact form to work together"
              >
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-zinc-900" />
                </span>
                Let&apos;s work together
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Footer - visible only on mobile, after content */}
      <nav
        className="flex items-center gap-2 border-t border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden"
        aria-label="Social links and navigation"
      >
        <Link
          href="https://github.com/franlouc0"
          className="relative inline-block text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Francisco Lourenço on GitHub"
        >
          GitHub
          <span className="absolute -top-0.5 left-[calc(100%-1px)] text-[8px] font-bold text-green-400 leading-none">
            6
          </span>
        </Link>
        <span
          className="text-[8px] text-zinc-300 dark:text-zinc-800"
          aria-hidden="true"
        >
          |
        </span>
        <Link
          href="https://www.linkedin.com/in/franlouco/"
          className="text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Francisco Lourenço on LinkedIn"
        >
          LinkedIn
        </Link>
        <span
          className="text-[8px] text-zinc-300 dark:text-zinc-800"
          aria-hidden="true"
        >
          |
        </span>
        <button
          type="button"
          onClick={() => setIsContactOpen(true)}
          className="text-xs text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
          aria-label="Open contact form"
        >
          Contact
        </button>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
