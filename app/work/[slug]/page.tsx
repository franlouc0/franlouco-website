"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Info, X, Share2, Check, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExperienceSection } from "@/components/experience-section";
import { FeaturedWorkSection } from "@/components/featured-work-section";
import { ContactModal } from "@/components/contact-modal";
import { useState, useEffect, useRef } from "react";
import { getWorkById } from "@/lib/work";

interface WorkPageProps {
  params: {
    slug: string;
  };
}

interface VideoSectionProps {
  video: string;
  title?: string;
  tooltip?: string;
  company: string;
}

function VideoSection({ video, title, tooltip, company }: VideoSectionProps) {
  // Extract YouTube video ID
  const getVideoId = (url: string): string => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    return '';
  };

  const videoId = getVideoId(video);

  return (
    <div className="w-full">
      {title && (
        <div className="mb-4 flex items-center gap-2">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {title}
          </h3>
          {tooltip && (
            <div className="group relative inline-block">
              <div
                className="lg:cursor-help"
                aria-label="More information about this video"
              >
                <Info
                  className="h-3.5 w-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  aria-hidden="true"
                />
              </div>
              
              {/* Tooltip - hover only */}
              <div
                className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-80 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white p-3 text-[12px] leading-relaxed text-zinc-600 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 lg:block"
                role="tooltip"
                dangerouslySetInnerHTML={{ __html: tooltip }}
              />
            </div>
          )}
        </div>
      )}
      <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || `${company} video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default function WorkPage({ params }: WorkPageProps) {
  const work = getWorkById(params.slug);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isShareCopied, setIsShareCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Always use dark mode header image
  const getHeaderImage = () => {
    return "/dark-mode-header-image.jpg";
  };

  // Scroll tracking for header animation
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const header = headerRef.current;
    if (!scrollContainer || typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      // Use initial header height as reference (45vh or 50vh on desktop)
      const isDesktop = window.innerWidth >= 1024;
      const initialHeaderHeight = isDesktop 
        ? window.innerHeight * 0.5 
        : window.innerHeight * 0.45;
      // Calculate progress: 0 (at top) to 1 (scrolled past header)
      const progress = Math.min(scrollTop / initialHeaderHeight, 1);
      setScrollProgress(progress);
    };

    const handleResize = () => {
      handleScroll();
    };

    // Forward wheel events from header to scroll container
    const handleWheel = (e: WheelEvent) => {
      if (header && scrollContainer) {
        e.preventDefault();
        scrollContainer.scrollBy({
          top: e.deltaY,
          behavior: 'auto'
        });
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    if (header) {
      header.addEventListener('wheel', handleWheel, { passive: false });
    }
    handleScroll(); // Initial check
    
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (header) {
        header.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Share functionality - copy URL to clipboard
  const handleShare = async () => {
    if (!work) return;
    const url = `${window.location.origin}/work/${work.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setIsShareCopied(true);
      setTimeout(() => setIsShareCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  if (!work) {
    notFound();
  }

  return (
    <main className="flex flex-col h-auto min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 lg:flex-row lg:h-screen lg:overflow-hidden">
      {/* Sidebar - Same as homepage */}
      <aside
        className="flex w-full flex-col p-6 pb-0 dark:border-zinc-800 lg:w-80 lg:border-r lg:p-8 lg:pb-8"
        aria-label="Profile and experience"
      >
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

          {/* Experience & Achievements */}
          <ExperienceSection />
        </header>

        {/* Navigation Links - Desktop only */}
        <nav
          className="hidden mt-auto items-center gap-2 border-t border-zinc-200 pt-6 dark:border-zinc-800 lg:flex"
          aria-label="Social links and navigation"
        >
          <Link
            href="https://github.com/franlouc0"
            className="relative inline-block text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
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
            className="text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
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
            onClick={() => setIsContactOpen(true)}
            className="text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            aria-label="Open contact form"
          >
            Contact
          </button>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </nav>
      </aside>

      {/* Main Content Area - Visual Showcase */}
      <div className="relative flex flex-1 flex-col overflow-hidden w-full">
        {/* Header Image with Title and Info Card */}
        <div 
          ref={headerRef}
          className="relative w-full overflow-hidden"
          style={{
            height: typeof window !== 'undefined' && window.innerWidth >= 1024
              ? scrollProgress < 1 
                ? `${50 * (1 - scrollProgress * 0.5)}vh` 
                : '25vh'
              : scrollProgress < 1 
                ? `${45 * (1 - scrollProgress * 0.5)}vh` 
                : '22.5vh',
            minHeight: scrollProgress < 1 
              ? `${300 * (1 - scrollProgress * 0.5)}px` 
              : '150px',
            transition: 'height 0.1s ease-out, min-height 0.1s ease-out',
          }}
        >
          {/* Header Image - Full width */}
          <Image
            src={getHeaderImage()}
            alt={work.company}
            fill
            className="object-cover"
            priority
          />
          
          {/* Overlay for text readability - stronger on top and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          
          {/* Action Buttons - Top Left */}
          <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-30 flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-zinc-900 transition-all hover:bg-white dark:border-zinc-700/50 dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-900 shadow-lg"
            >
              <ArrowLeft className="h-3 w-3" />
              Back
            </Link>

            {work && (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-zinc-900 transition-all hover:bg-white dark:border-zinc-700/50 dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-900 shadow-lg"
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
            )}
          </div>

          {/* Title and Subtitle - 3/4 width, left-aligned */}
          <div 
            className="absolute inset-0 flex z-20 px-6 lg:px-8"
            style={{
              alignItems: scrollProgress > 0.3 ? 'flex-start' : 'center',
              paddingTop: scrollProgress > 0.3 
                ? `${5 + scrollProgress * 1}rem` 
                : '7rem',
              transition: 'align-items 0.1s ease-out, padding-top 0.1s ease-out',
            }}
          >
            <div className="w-3/4">
              <h1 
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-left drop-shadow-2xl mb-2"
                style={{
                  fontSize: typeof window !== 'undefined'
                    ? (() => {
                        const isDesktop = window.innerWidth >= 1024;
                        const isTablet = window.innerWidth >= 640;
                        const baseSize = isDesktop ? 3 : isTablet ? 2.25 : 1.875; // rem
                        const scale = 1 - scrollProgress * 0.4;
                        return `${baseSize * scale}rem`;
                      })()
                    : undefined,
                  transition: 'font-size 0.1s ease-out',
                }}
              >
                {work.title}
              </h1>
              <p 
                className="text-sm sm:text-base lg:text-lg text-white/90 drop-shadow-lg"
                style={{
                  fontSize: typeof window !== 'undefined'
                    ? (() => {
                        const isDesktop = window.innerWidth >= 1024;
                        const isTablet = window.innerWidth >= 640;
                        const baseSize = isDesktop ? 1.125 : isTablet ? 1 : 0.875; // rem
                        const scale = 1 - scrollProgress * 0.25;
                        return `${baseSize * scale}rem`;
                      })()
                    : undefined,
                  transition: 'font-size 0.1s ease-out',
                }}
              >
                {work.subtitle}
              </p>
            </div>
          </div>

          {/* Info Card - Top Right */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10">
            <div 
              className="relative rounded-lg border border-white/20 bg-white/90 backdrop-blur-sm shadow-xl dark:border-zinc-700/50 dark:bg-zinc-900/90 max-w-[280px] transition-all duration-300 ease-out"
              style={{
                padding: '1rem',
              }}
            >
              {/* Company Logo */}
              <div 
                className="flex items-start gap-3 transition-all duration-300 ease-out"
                style={{
                  marginBottom: scrollProgress > 0.5 ? 0 : '12px',
                }}
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={work.logo}
                    alt={work.company}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate">
                      {work.company}
                    </h3>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-500 shrink-0">
                      {work.period}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-400">
                    {work.role}
                  </p>
                </div>
              </div>

              {/* Divider above numbers */}
              {work.numbers && work.numbers.length > 0 && (
                <div 
                  className="border-b border-zinc-100 dark:border-zinc-800 transition-all duration-300 ease-out overflow-hidden"
                  style={{
                    opacity: scrollProgress > 0.5 ? 0 : 1,
                    maxHeight: scrollProgress > 0.5 ? 0 : '12px',
                    marginBottom: scrollProgress > 0.5 ? 0 : '12px',
                  }}
                />
              )}

              {/* Numbers Block - Key credibility signals */}
              {work.numbers && work.numbers.length > 0 && (
                <div 
                  className="transition-all duration-300 ease-out overflow-hidden"
                  style={{
                    opacity: scrollProgress > 0.5 ? 0 : 1,
                    maxHeight: scrollProgress > 0.5 ? 0 : '200px',
                    marginBottom: scrollProgress > 0.5 ? 0 : '12px',
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {work.numbers.map((number, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-xs font-bold text-green-400 dark:text-green-400 leading-none">
                          {number.value}
                        </span>
                        <span className="text-[9px] text-zinc-500 dark:text-zinc-500 uppercase tracking-wide mt-1">
                          {number.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Divider between numbers and scope */}
              {work.scope && work.scope.length > 0 && (
                <div 
                  className="border-b border-zinc-100 dark:border-zinc-800 transition-all duration-300 ease-out overflow-hidden"
                  style={{
                    opacity: scrollProgress > 0.3 ? 0 : 1,
                    maxHeight: scrollProgress > 0.3 ? 0 : '12px',
                    marginBottom: scrollProgress > 0.3 ? 0 : '12px',
                  }}
                />
              )}

              {/* Scope Block - What I owned */}
              {work.scope && work.scope.length > 0 && (
                <div 
                  className="space-y-1 transition-all duration-300 ease-out overflow-hidden"
                  style={{
                    opacity: scrollProgress > 0.3 ? 0 : 1,
                    maxHeight: scrollProgress > 0.3 ? 0 : '200px',
                  }}
                >
                  {work.scope.map((item, idx) => (
                    <p key={idx} className="text-[10px] text-zinc-600 dark:text-zinc-400">
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section Below Header - Visual Proof */}
        <section
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 pb-6 lg:p-8"
          style={{
            paddingTop: scrollProgress > 0 
              ? `${2 + scrollProgress * 1}rem` 
              : '2rem',
            transition: 'padding-top 0.1s ease-out',
          }}
          aria-label="Work details"
        >
          {/* Visual Proof Section - Seamless Gallery */}
          {work.visuals && work.visuals.length > 0 && (
            <div className="space-y-6">
              {work.visuals.map((visual, idx) => {
                // Slider component for description + images array
                const DashboardSlider = ({ images, captions, description, imageLeft }: { images: string[], captions?: string[], description: string, imageLeft?: boolean }) => {
                  const [currentIndex, setCurrentIndex] = useState(0);
                  
                  const goToSlide = (index: number) => {
                    setCurrentIndex(index);
                  };
                  
                  return (
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                      {imageLeft ? (
                        <>
                          <div className="flex-1 lg:w-1/2">
                            <div className="relative w-full">
                              <div className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                                {images.map((image, idx) => (
                                  <div
                                    key={idx}
                                    className={`transition-opacity duration-500 ease-in-out ${
                                      idx === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 z-0 pointer-events-none'
                                    }`}
                                  >
                                    <Image
                                      src={image}
                                      alt={captions?.[idx] || `${work.company} dashboard ${idx + 1}`}
                                      width={1920}
                                      height={1080}
                                      className="w-full h-auto object-contain"
                                      loading={idx === 0 ? "lazy" : "lazy"}
                                    />
                                  </div>
                                ))}
                              </div>
                              {images.length > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                  {images.map((_, slideIdx) => (
                                    <button
                                      key={slideIdx}
                                      onClick={() => goToSlide(slideIdx)}
                                      className={`h-2 rounded-full transition-all duration-300 ${
                                        slideIdx === currentIndex
                                          ? 'w-8 bg-green-400'
                                          : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                                      }`}
                                      aria-label={`Go to slide ${slideIdx + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex-1 lg:w-1/2">
                            <p 
                              className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 mb-4"
                              dangerouslySetInnerHTML={{ __html: description }}
                            />
                            {captions && captions[currentIndex] && (
                              <p 
                                className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 transition-opacity duration-500"
                                dangerouslySetInnerHTML={{ __html: captions[currentIndex] }}
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-1 lg:w-1/2">
                            <p 
                              className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 mb-4"
                              dangerouslySetInnerHTML={{ __html: description }}
                            />
                            {captions && captions[currentIndex] && (
                              <p 
                                className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 transition-opacity duration-500"
                                dangerouslySetInnerHTML={{ __html: captions[currentIndex] }}
                              />
                            )}
                          </div>
                          <div className="flex-1 lg:w-1/2">
                            <div className="relative w-full">
                              <div className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                                {images.map((image, idx) => (
                                  <div
                                    key={idx}
                                    className={`transition-opacity duration-500 ease-in-out ${
                                      idx === currentIndex ? 'opacity-100 relative z-10' : 'opacity-0 absolute inset-0 z-0 pointer-events-none'
                                    }`}
                                  >
                                    <Image
                                      src={image}
                                      alt={captions?.[idx] || `${work.company} dashboard ${idx + 1}`}
                                      width={1920}
                                      height={1080}
                                      className="w-full h-auto object-contain"
                                      loading={idx === 0 ? "lazy" : "lazy"}
                                    />
                                  </div>
                                ))}
                              </div>
                              {images.length > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                  {images.map((_, slideIdx) => (
                                    <button
                                      key={slideIdx}
                                      onClick={() => goToSlide(slideIdx)}
                                      className={`h-2 rounded-full transition-all duration-300 ${
                                        slideIdx === currentIndex
                                          ? 'w-8 bg-green-400'
                                          : 'w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                                      }`}
                                      aria-label={`Go to slide ${slideIdx + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                };
                
                return (
                <div key={idx} className="group">
                  {visual.description && visual.images && visual.images.length > 0 ? (
                    <DashboardSlider
                      images={visual.images}
                      captions={visual.imageCaptions}
                      description={visual.description}
                      imageLeft={visual.imageLeft}
                    />
                  ) : visual.description && visual.video && !visual.image ? (
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                      {visual.imageLeft ? (
                        <>
                          <div className="flex-1 lg:w-1/2">
                            <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900" style={{ paddingBottom: '56.25%' }}>
                              <iframe
                                className="absolute left-0 top-0 h-full w-full"
                                src={`https://www.youtube.com/embed/${visual.video.includes('youtube.com/watch?v=') ? visual.video.split('v=')[1]?.split('&')[0] : visual.video.includes('youtu.be/') ? visual.video.split('youtu.be/')[1]?.split('?')[0] : ''}`}
                                title={`${work.company} video ${idx + 1}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                          <div className="flex-1 lg:w-1/2">
                            <p 
                              className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                              dangerouslySetInnerHTML={{ __html: visual.description }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-1 lg:w-1/2">
                            <p 
                              className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                              dangerouslySetInnerHTML={{ __html: visual.description }}
                            />
                          </div>
                          <div className="flex-1 lg:w-1/2">
                            <div className="relative w-full overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900" style={{ paddingBottom: '56.25%' }}>
                              <iframe
                                className="absolute left-0 top-0 h-full w-full"
                                src={`https://www.youtube.com/embed/${visual.video.includes('youtube.com/watch?v=') ? visual.video.split('v=')[1]?.split('&')[0] : visual.video.includes('youtu.be/') ? visual.video.split('youtu.be/')[1]?.split('?')[0] : ''}`}
                                title={`${work.company} video ${idx + 1}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ) : visual.description && visual.image ? (
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                      {visual.imageLeft ? (
                        <>
                          <figure className="flex-1 lg:w-1/2">
                            <div className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                              <Image
                                src={visual.image}
                                alt={visual.caption || `${work.company} visual ${idx + 1}`}
                                width={1920}
                                height={1080}
                                className="w-full h-auto object-contain"
                                loading="lazy"
                              />
                            </div>
                            {visual.caption && (
                              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-500 text-center">
                                {visual.caption}
                              </figcaption>
                            )}
                          </figure>
                          <div className="flex-1 lg:w-1/2">
                            <p 
                              className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                              dangerouslySetInnerHTML={{ __html: visual.description }}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex-1 lg:w-1/2">
                            <p 
                              className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                              dangerouslySetInnerHTML={{ __html: visual.description }}
                            />
                          </div>
                          <figure className="flex-1 lg:w-1/2">
                            <div className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                              <Image
                                src={visual.image}
                                alt={visual.caption || `${work.company} visual ${idx + 1}`}
                                width={1920}
                                height={1080}
                                className="w-full h-auto object-contain"
                                loading="lazy"
                              />
                            </div>
                            {visual.caption && (
                              <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-500 text-center">
                                {visual.caption}
                              </figcaption>
                            )}
                          </figure>
                        </>
                      )}
                    </div>
                  ) : visual.video ? (
                    <VideoSection
                      video={visual.video}
                      title={visual.videoTitle}
                      tooltip={visual.videoTooltip}
                      company={work.company}
                    />
                  ) : visual.cards && visual.cards.length > 0 ? (
                    <div className="relative w-full py-8">
                      {/* Progress line */}
                      <div className="absolute top-12 left-0 right-0 h-0.5 bg-green-400/30 hidden sm:block" />
                      
                      {/* Cards/Timeline items */}
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-4">
                        {visual.cards.map((cardText, cardIdx) => (
                          <div
                            key={cardIdx}
                            className="relative flex flex-col items-center text-center"
                          >
                            {/* Checkmark circle */}
                            <div className="relative z-10 flex h-8 w-8 items-center justify-center">
                              <CheckCircle2 className="h-8 w-8 text-green-400 fill-green-400" />
                            </div>
                            
                            {/* Text below */}
                            <p 
                              className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300"
                              dangerouslySetInnerHTML={{ __html: cardText }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : visual.partnerships && visual.partnerships.length > 0 ? (
                    <div className="w-full py-8 overflow-hidden">
                      <div className="flex animate-marquee gap-6" style={{ width: 'max-content' }}>
                        {/* First set */}
                        {visual.partnerships.map((partner, partnerIdx) => {
                          const hasDescription = partner.description;
                          return (
                            <div
                              key={partnerIdx}
                              className={`flex-shrink-0 w-64 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 ${hasDescription ? 'flex flex-col' : 'flex items-center justify-center'}`}
                            >
                              <div className={`relative h-12 w-full ${hasDescription ? 'mb-4' : ''}`}>
                                <div className="relative h-full w-full rounded-lg p-3">
                                  <Image
                                    src={partner.logo}
                                    alt={partner.name || `Partner ${partnerIdx + 1}`}
                                    fill
                                    className="object-contain object-center rounded-lg"
                                  />
                                </div>
                              </div>
                              {hasDescription && (
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">
                                  {partner.description}
                                </p>
                              )}
                            </div>
                          );
                        })}
                        {/* Duplicate set for seamless loop */}
                        {visual.partnerships.map((partner, partnerIdx) => {
                          const hasDescription = partner.description;
                          return (
                            <div
                              key={`duplicate-${partnerIdx}`}
                              className={`flex-shrink-0 w-64 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 ${hasDescription ? 'flex flex-col' : 'flex items-center justify-center'}`}
                            >
                              <div className={`relative h-12 w-full ${hasDescription ? 'mb-4' : ''}`}>
                                <div className="relative h-full w-full rounded-lg p-3">
                                  <Image
                                    src={partner.logo}
                                    alt={partner.name || `Partner ${partnerIdx + 1}`}
                                    fill
                                    className="object-contain object-center rounded-lg"
                                  />
                                </div>
                              </div>
                              {hasDescription && (
                                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed text-center">
                                  {partner.description}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : visual.images && visual.images.length > 0 ? (
                    <figure>
                      <div className={`grid grid-cols-1 sm:grid-cols-2 ${visual.images.length >= 3 ? 'lg:grid-cols-3' : ''} gap-4`}>
                        {visual.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                            <Image
                              src={img}
                              alt={`${work.company} visual ${idx + 1} - ${imgIdx + 1}`}
                              width={1920}
                              height={1080}
                              className="w-full h-auto object-contain"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                      {visual.caption && (
                        <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-500 text-center">
                          {visual.caption}
                        </figcaption>
                      )}
                    </figure>
                  ) : visual.image ? (
                    <figure>
                      <div className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={visual.image}
                          alt={visual.caption || `${work.company} visual ${idx + 1}`}
                          width={1920}
                          height={1080}
                          className="w-full h-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                      {visual.caption && (
                        <figcaption className="mt-2 text-xs text-zinc-500 dark:text-zinc-500 text-center">
                          {visual.caption}
                        </figcaption>
                      )}
                    </figure>
                  ) : null}
                </div>
                );
              })}
            </div>
          )}

          {/* Fallback to old images format for backward compatibility */}
          {(!work.visuals || work.visuals.length === 0) && work.images && work.images.length > 0 && (
            <div className="space-y-6">
              {work.images.map((image, idx) => (
                <figure key={idx} className="group">
                  <div className="relative w-full rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={image}
                      alt={`${work.company} showcase ${idx + 1}`}
                      width={1920}
                      height={1080}
                      className="w-full h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                </figure>
              ))}
            </div>
          )}

          {/* Insight or Decision Block - Optional */}
          {work.insight && (
            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-sm text-zinc-700 dark:text-zinc-300 italic">
                {work.insight}
              </p>
            </div>
          )}

          {/* Soft Close - Optional */}
          {work.softClose && (
            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500 dark:text-zinc-500 text-center">
                {work.softClose}
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Mobile Footer - visible only on mobile, after content */}
      <nav
        className="flex items-center gap-2 border-t border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden"
        aria-label="Social links and navigation"
      >
        <Link
          href="https://github.com/franlouc0"
          className="relative inline-block text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
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
          className="text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
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
        <a
          href="mailto:hello@franlou.co"
          className="text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
          aria-label="Email Francisco Lourenço"
        >
          Email
        </a>
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
