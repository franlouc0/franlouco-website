"use client";

import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { ExperienceCard } from "./experience-card";

interface Experience {
  role: string;
  company: string;
  years: string;
  logo?: string;
  emoji?: string;
  isActive?: boolean;
}

const experiences: Experience[] = [
  {
    role: "Web3 Marketing Growth Manager",
    company: "IBC Group",
    years: "2025 - Present",
    logo: "/ibcgroup.png",
    isActive: true,
  },
  {
    role: "CMO & Co-Founder",
    company: "Coompass",
    years: "2023 - Present",
    logo: "/coompass.jpg",
    isActive: true,
  },
  {
    role: "Partner",
    company: "Broadpath",
    years: "2025 - Present",
    logo: "/broadpath.png",
    isActive: true,
  },
  {
    role: "Founding Mentor",
    company: "Builders Camp",
    years: "2025 - Present",
    logo: "/builders.jpeg",
    isActive: true,
  },
  {
    role: "Advisor",
    company: "Predik",
    years: "2025 - Present",
    logo: "/predik.jpg",
    isActive: true,
  },
  {
    role: "Web3 Marketing Consultant",
    company: "Lympid",
    years: "2024 - 2024",
    logo: "/lympid.png",
  },
  {
    role: "CMO & Co-Founder",
    company: "Polkamarkets",
    years: "2021 - 2023",
    logo: "/polkamarkets.jpg",
  },
  {
    role: "Web3 Marketing & BD Consultant",
    company: "Polkastarter, Lympid",
    years: "2020 - Present",
    logo: "/polkastarter.jpg",
  },
  {
    role: "Head of Sales & Partnerships",
    company: "BEPRO Network",
    years: "2020 - 2021",
    logo: "/bepronetwork.jpg",
  },
  {
    role: "Digital Marketing & E-Business Manager",
    company: "Würth Portugal",
    years: "2016 - 2020",
    logo: "/wuerth.jpg",
  },
  {
    role: "Digital Marketing Analyst",
    company: "AKI Portugal",
    years: "2015 - 2016",
    logo: "/aki.jpeg",
  },
  {
    role: "Digital Marketing Manager",
    company: "Home Hunting",
    years: "2014 - 2015",
    logo: "/hh.jpg",
  },
  {
    role: "SEM & Performance Assistant",
    company: "Havas Media Portugal",
    years: "2014 - 2014",
    logo: "/havas.jpeg",
  },
  {
    role: "Content Manager",
    company: "ZON Optimus",
    years: "2012 - 2014",
    logo: "/zon.jpeg",
  },
];

const ITEMS_PER_PAGE = 5;

export function ExperienceSection() {
  const [startIndex, setStartIndex] = React.useState(0);

  const visibleExperiences = experiences.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const canGoUp = startIndex > 0;
  const canGoDown = startIndex + ITEMS_PER_PAGE < experiences.length;

  const handleUp = () => {
    if (canGoUp) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleDown = () => {
    if (canGoDown) {
      setStartIndex((prev) =>
        Math.min(experiences.length - ITEMS_PER_PAGE, prev + 1)
      );
    }
  };

  return (
    <div className="mt-10 lg:mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Experience
          </h2>
          <span className="inline-flex h-4 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[10px] text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400">
            {experiences.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleUp}
            disabled={!canGoUp}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
            aria-label="Previous experience"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handleDown}
            disabled={!canGoDown}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 transition-colors hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50"
            aria-label="Next experience"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {visibleExperiences.map((exp, index) => (
          <ExperienceCard
            key={startIndex + index}
            role={exp.role}
            company={exp.company}
            years={exp.years}
            logo={exp.logo}
            isActive={exp.isActive}
            {...(exp.emoji && { emoji: exp.emoji })}
          />
        ))}
      </div>
    </div>
  );
}
