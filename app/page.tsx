import Link from "next/link";
import Image from "next/image";
import { Info, Github, Linkedin, Mail, Send } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExperienceCard } from "@/components/experience-card";

export default function Home() {
  return (
    <main className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      {/* Sidebar */}
      <aside className="flex w-full flex-col border-r border-zinc-200 p-6 dark:border-zinc-800 lg:w-80 lg:p-8">
        {/* Profile section */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image
                src="/profile.jpg"
                alt="Francisco Lourenço"
                fill
                className="rounded-[22%] object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="mb-1.5 text-lg font-bold text-zinc-900 dark:text-zinc-50">
                Francisco Lourenço
              </h1>
              <div className="flex flex-wrap gap-1">
                <span className="flex h-5 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[9px] dark:border-zinc-700/50 dark:bg-zinc-800/50">
                  Product
                </span>
                <span className="flex h-5 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[9px] dark:border-zinc-700/50 dark:bg-zinc-800/50">
                  Growth
                </span>
                <span className="flex h-5 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[9px] dark:border-zinc-700/50 dark:bg-zinc-800/50">
                  Marketing
                </span>
                <span className="flex h-5 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[9px] dark:border-zinc-700/50 dark:bg-zinc-800/50">
                  Operations
                </span>
              </div>
            </div>
          </div>

          {/* About me */}
          <div>
            <div className="mb-2 flex items-center gap-1.5">
              <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
                About me
              </h2>
              <div className="group relative">
                <Info className="h-3 w-3 cursor-help text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" />
                  <div className="pointer-events-none absolute left-full top-0 z-50 ml-2 w-72 rounded-lg border border-zinc-200 bg-white p-3 text-[10px] leading-relaxed text-zinc-600 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                    Data-driven marketing leader with 10+ years of experience in Web3, blockchain, and digital marketing including hands-on leadership of multiple IDO token launches.<br/><br/>I&apos;ve built and executed GTM plans that align tokenomics, messaging, and timing. Developed strong partnerships with KOLs and influencers.<br/><br/>Grown vibrant communities that fueled pre-sale fundraising and drove smooth token sales.<br/><br/>I&apos;m good at brand positioning, user acquisition, viral campaigns, and performance marketing to power business expansion.
                  </div>
              </div>
            </div>
            <p className="text-[10px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              A crossover of product, growth, and tech. Building and shipping ideas. I build products, test ideas, and document what I learn.
            </p>
          </div>

          {/* Experience & Achievements */}
          <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h2 className="mb-3 text-xs font-semibold text-zinc-900 dark:text-zinc-50">
              Experience & Achievements
            </h2>
            <div className="space-y-3">
              <ExperienceCard
                role="Web3 Marketing Growth Manager"
                company="IBC Group"
                years="2025 - Present"
                logo="/logos/ibc.png"
              />
              <ExperienceCard
                role="CMO & Co-Founder"
                company="Coompass"
                years="2023 - Present"
                logo="/logos/coompass.png"
              />
              <ExperienceCard
                role="CMO & Co-Founder"
                company="Polkamarkets"
                years="2021 - 2023"
                logo="/logos/polkamarkets.png"
              />
              <ExperienceCard
                role="Web3 Marketing & BD Consultant"
                company="Polkastarter, Lympid"
                years="2020 - Present"
                logo="/logos/polkastarter.png"
              />
              <ExperienceCard
                role="Head of Sales & Partnerships"
                company="BEPRO Network"
                years="2020 - 2021"
                logo="/logos/bepro.png"
              />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-auto flex items-center gap-2 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <div className="group relative">
            <Link
              href="https://github.com/franlouc0"
              className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-3 w-3" />
            </Link>
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-700">
              GitHub
            </div>
          </div>
          <div className="group relative">
            <Link
              href="https://www.linkedin.com/in/franlouco/"
              className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3 w-3" />
            </Link>
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-700">
              LinkedIn
            </div>
          </div>
          <div className="group relative">
            <a
              href="mailto:hello@franlou.co"
              className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
              aria-label="Email"
            >
              <Mail className="h-3 w-3" />
            </a>
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-700">
              Email
            </div>
          </div>
          <div className="group relative">
            <Link
              href="https://t.me/franlouco"
              className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <Send className="h-3 w-3" />
            </Link>
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-700">
              Telegram
            </div>
          </div>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8" role="main">
          <div className="mx-auto max-w-6xl">
            {/* Projects will go here */}
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Projects gallery coming soon
              </p>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}
