import Link from "next/link";
import { Info } from "lucide-react";
import { Circle } from "@phosphor-icons/react/dist/ssr";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExperienceSection } from "@/components/experience-section";

export default function Home() {
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
