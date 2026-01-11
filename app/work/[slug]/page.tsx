"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Info, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExperienceSection } from "@/components/experience-section";
import { FeaturedWorkSection } from "@/components/featured-work-section";
import { ContactModal } from "@/components/contact-modal";
import { useState } from "react";
import { getWorkById } from "@/lib/work";

interface WorkPageProps {
  params: {
    slug: string;
  };
}

export default function WorkPage({ params }: WorkPageProps) {
  const work = getWorkById(params.slug);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Always use dark mode header image
  const getHeaderImage = () => {
    return "/dark-mode-header-image.jpg";
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
      </aside>

      {/* Main Content Area - Visual Showcase */}
      <div className="relative flex flex-1 flex-col overflow-hidden w-full">
        {/* Header Image with Title and Info Card */}
        <div className="relative w-full h-[45vh] min-h-[300px] lg:h-[50vh] overflow-hidden">
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
          
          {/* Back Button - Top Left */}
          <Link
            href="/"
            className="absolute top-6 left-6 lg:top-8 lg:left-8 z-30 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/90 backdrop-blur-sm px-3 py-2 text-xs text-zinc-900 transition-all hover:bg-white dark:border-zinc-700/50 dark:bg-zinc-900/90 dark:text-zinc-50 dark:hover:bg-zinc-900 shadow-lg"
          >
            <ArrowLeft className="h-3 w-3" />
            Back
          </Link>

          {/* Title and Subtitle - 3/4 width, left-aligned */}
          <div className="absolute inset-0 flex items-center z-20 px-6 lg:px-8">
            <div className="w-3/4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-left drop-shadow-2xl mb-2">
                {work.title}
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white/90 drop-shadow-lg">
                {work.subtitle}
              </p>
            </div>
          </div>

          {/* Info Card - Top Right */}
          <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-10">
            <div className="relative rounded-lg border border-white/20 bg-white/90 backdrop-blur-sm p-4 shadow-xl dark:border-zinc-700/50 dark:bg-zinc-900/90 max-w-[280px]">
              {/* Company Logo */}
              <div className="flex items-start gap-3 mb-3">
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
                <div className="mb-3 border-b border-zinc-100 dark:border-zinc-800" />
              )}

              {/* Numbers Block - Key credibility signals */}
              {work.numbers && work.numbers.length > 0 && (
                <div className="mb-3">
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
                <div className="mb-3 border-b border-zinc-100 dark:border-zinc-800" />
              )}

              {/* Scope Block - What I owned */}
              {work.scope && work.scope.length > 0 && (
                <div className="space-y-1">
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

        {/* Content Section Below Header */}
        <section
          className="flex-1 overflow-y-auto px-6 pt-8 pb-6 lg:p-8"
          aria-label="Work details"
        >
          {/* Optional: Image Gallery */}
          {work.images && work.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {work.images.map((image, idx) => (
                <div
                  key={idx}
                  className="relative aspect-video rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800"
                >
                  <Image
                    src={image}
                    alt={`${work.company} showcase ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
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
