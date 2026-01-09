"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";
import { Circle } from "@phosphor-icons/react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExperienceSection } from "@/components/experience-section";
import { ContactModal } from "@/components/contact-modal";

// Sample projects data - replace with your actual projects
const projects = [
  { id: 1, title: "Polkamarkets", description: "Decentralized prediction market", image: "/polkamarkets.jpg", span: "row-span-2" },
  { id: 2, title: "Coompass", description: "Web3 platform", image: "/coompass.jpg", span: "row-span-1" },
  { id: 3, title: "IBC Group", description: "Web3 marketing", image: "/ibcgroup.png", span: "row-span-1" },
  { id: 4, title: "BEPRO Network", description: "DeFi protocol", image: "/bepronetwork.jpg", span: "row-span-2" },
  { id: 5, title: "Polkastarter", description: "IDO platform", image: "/polkastarter.jpg", span: "row-span-1" },
  { id: 6, title: "Broadpath", description: "Partnership venture", image: "/broadpath.png", span: "row-span-1" },
  { id: 7, title: "Builders Camp", description: "Mentorship program", image: "/builders.jpeg", span: "row-span-2" },
  { id: 8, title: "Predik", description: "Advisory project", image: "/predik.jpg", span: "row-span-1" },
  { id: 9, title: "Lympid", description: "Web3 consulting", image: "/lympid.png", span: "row-span-1" },
];

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <main className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      {/* Sidebar */}
      <aside className="flex w-full flex-col border-r border-zinc-200 p-6 dark:border-zinc-800 lg:w-80 lg:p-8">
        {/* Profile section */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            <div>FRANCISCO</div>
             <div className="flex items-center gap-0 pl-12 sm:pl-16">
               <span>LOURENÇ</span>
               <Circle weight="fill" className="h-[1em] w-[1em] text-green-400" />
             </div>
          </h1>

          {/* About me */}
          <div className="mt-8">
            <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              A crossover of <span className="inline-flex h-5 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[12px] dark:border-zinc-700/50 dark:bg-zinc-800/50">product</span>, <span className="inline-flex h-5 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[12px] dark:border-zinc-700/50 dark:bg-zinc-800/50">growth</span>, and <span className="inline-flex h-5 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[12px] dark:border-zinc-700/50 dark:bg-zinc-800/50">tech</span>. Building and shipping ideas{" "}
              <span className="group relative inline-block">
                <Info className="inline h-3 w-3 cursor-help text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" />
                <div className="pointer-events-none absolute left-full top-0 z-50 ml-2 w-72 rounded-lg border border-zinc-200 bg-white p-3 text-[12px] leading-relaxed text-zinc-600 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                  Data-driven marketing leader with 10+ years of experience in Web3, blockchain, and digital marketing including hands-on leadership of multiple IDO token launches.<br/><br/>I&apos;ve built and executed GTM plans that align tokenomics, messaging, and timing. Developed strong partnerships with KOLs and influencers.<br/><br/>Grown vibrant communities that fueled pre-sale fundraising and drove smooth token sales.<br/><br/>I&apos;m good at brand positioning, user acquisition, viral campaigns, and performance marketing to power business expansion.
                </div>
              </span>
            </p>
          </div>

          {/* Experience & Achievements */}
          <ExperienceSection />
        </div>

        {/* Navigation Links */}
        <nav className="mt-auto flex items-center gap-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <Link
            href="https://github.com/franlouc0"
            className="text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
          <span className="text-[8px] text-zinc-300 dark:text-zinc-800">|</span>
          <Link
            href="https://www.linkedin.com/in/franlouco/"
            className="text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
          <span className="text-[8px] text-zinc-300 dark:text-zinc-800">|</span>
          <a
            href="mailto:hello@franlou.co"
            className="text-[10px] text-zinc-600 transition-colors hover:text-zinc-900 hover:underline dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Email
          </a>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8" role="main">
          <div className="mx-auto max-w-6xl pb-24">
            {/* Projects Gallery - Masonry Grid */}
            <div className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`group relative overflow-hidden rounded-lg bg-zinc-200 dark:bg-zinc-800 ${project.span}`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Fixed CTA Button */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-6">
          <button
            onClick={() => setIsContactOpen(true)}
            className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Let&apos;s work together
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
