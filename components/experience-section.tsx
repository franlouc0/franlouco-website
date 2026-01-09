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
}

const experiences: Experience[] = [
  {
    role: "Web3 Marketing Growth Manager",
    company: "IBC Group",
    years: "2025 - Present",
    logo: "/ibcgroup.png",
  },
  {
    role: "CMO & Co-Founder",
    company: "Coompass",
    years: "2023 - Present",
    logo: "/coompass.jpg",
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
  },
  {
    role: "Digital Marketing Analyst",
    company: "AKI Portugal",
    years: "2015 - 2016",
  },
  {
    role: "Digital Marketing Manager",
    company: "Digital Marketing Manager",
    years: "2014 - 2015",
  },
  {
    role: "SEM & Performance Assistant",
    company: "Havas Media Portugal",
    years: "2014 - 2014",
  },
  {
    role: "Content Manager",
    company: "ZON Optimus",
    years: "2012 - 2014",
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
    <div className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-50">
            Experience & Achievements
          </h2>
          <span className="inline-flex h-4 items-center rounded-md border border-zinc-300 bg-zinc-100 px-1.5 text-[9px] text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-400">
            {experiences.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleUp}
            disabled={!canGoUp}
            className="flex h-5 w-5 items-center justify-center rounded text-zinc-400 transition-colors hover:text-zinc-600 disabled:opacity-30 disabled:hover:text-zinc-400 dark:hover:text-zinc-300 dark:disabled:hover:text-zinc-400"
            aria-label="Previous experience"
          >
            <ChevronUp className="h-3 w-3" />
          </button>
          <button
            onClick={handleDown}
            disabled={!canGoDown}
            className="flex h-5 w-5 items-center justify-center rounded text-zinc-400 transition-colors hover:text-zinc-600 disabled:opacity-30 disabled:hover:text-zinc-400 dark:hover:text-zinc-300 dark:disabled:hover:text-zinc-400"
            aria-label="Next experience"
          >
            <ChevronDown className="h-3 w-3" />
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
            {...(exp.emoji && { emoji: exp.emoji })}
          />
        ))}
      </div>
    </div>
  );
}
