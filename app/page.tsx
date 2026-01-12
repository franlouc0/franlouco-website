"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExperienceSection } from "@/components/experience-section";
import { FeaturedWorkSection } from "@/components/featured-work-section";
import { ContactModal } from "@/components/contact-modal";

// Sample projects data - replace with your actual projects
const projects = [
  { 
    id: 1, 
    title: "How we raised $715K in an IDO without relying on hype", 
    description: "Building a prediction market protocol from zero to $80M+ open interest in 48 hours", 
    image: "/grid/grid-polkamarkets.png", 
    span: "row-span-2",
    href: "/work/how-we-raised-715k-ido"
  },
  { 
    id: 2, 
    title: "Mobile App", 
    description: "iOS & Android experience", 
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80", 
    span: "row-span-1" 
  },
  { 
    id: 3, 
    title: "Web3 Platform", 
    description: "Blockchain integration", 
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80", 
    span: "row-span-1" 
  },
  { 
    id: 4, 
    title: "SaaS Dashboard", 
    description: "Analytics & insights", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", 
    span: "row-span-2" 
  },
  { 
    id: 5, 
    title: "E-commerce", 
    description: "Digital marketplace", 
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", 
    span: "row-span-1" 
  },
  { 
    id: 6, 
    title: "Design System", 
    description: "Component library", 
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80", 
    span: "row-span-1" 
  },
  { 
    id: 7, 
    title: "Space Tech", 
    description: "Aerospace innovation", 
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=800&q=80", 
    span: "row-span-2" 
  },
  { 
    id: 8, 
    title: "Fintech App", 
    description: "Financial services", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80", 
    span: "row-span-1" 
  },
  { 
    id: 9, 
    title: "IoT Platform", 
    description: "Connected devices", 
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&q=80", 
    span: "row-span-1" 
  },
];

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  return (
    <main className="flex flex-col h-auto min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 lg:flex-row lg:h-screen lg:overflow-hidden">
      {/* Sidebar */}
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
          <button
            type="button"
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

      {/* Mobile Scroll Indicator - between experience and grid */}
      <div className="flex justify-center mt-2 mb-0 lg:hidden">
        <div className="flex flex-col items-center gap-2">
          <ChevronDown 
            className="h-6 w-6 text-green-400 animate-bounce" 
            aria-hidden="true"
          />
          <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
            Scroll to view work
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden w-full">
          <section
            className="flex-1 overflow-y-auto px-6 pt-10 pb-6 lg:p-8"
            aria-label="Projects gallery"
          >
            {/* Projects Gallery - Masonry Grid */}
            <div className="grid auto-rows-[200px] grid-cols-1 gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:pb-24">
              {projects.map((project) => {
                const articleContent = (
                  <article
                    className={`group relative overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800 ${project.span} ${project.href ? 'cursor-pointer' : ''}`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.description}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-sm font-semibold text-white">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-xs text-white/80">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );

                return project.href ? (
                  <Link key={project.id} href={project.href} className="block h-full">
                    {articleContent}
                  </Link>
                ) : (
                  <div key={project.id} className="h-full">
                    {articleContent}
                  </div>
                );
              })}
            </div>
          </section>

        {/* Fixed CTA Button - positioned inside main padding area, desktop only */}
          <div className="pointer-events-none absolute inset-x-6 bottom-6 hidden justify-center lg:flex lg:inset-x-8 lg:bottom-8">
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="pointer-events-auto flex h-12 items-center gap-2 rounded-md border border-green-400 bg-green-400 px-6 text-sm font-semibold text-zinc-900 transition-all hover:border-green-500 hover:bg-green-500 dark:border-green-400 dark:bg-green-400 dark:text-zinc-900 dark:hover:border-green-500 dark:hover:bg-green-500"
            aria-label="Open contact form to work together"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-900 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-zinc-900"></span>
            </span>
            Let&apos;s work together
          </button>
        </div>
      </div>

      {/* Mobile Footer - visible only on mobile, after grid */}
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
        <button
          type="button"
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

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
