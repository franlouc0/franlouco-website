"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Only animate if pathname actually changed
    if (previousPathname.current !== pathname) {
      // Start exit animation
      setIsAnimating(false);
      
      // After exit animation, start entrance animation
      const timer = setTimeout(() => {
        setIsAnimating(true);
        previousPathname.current = pathname;
      }, 350); // Half of 700ms for smoother transition

      return () => clearTimeout(timer);
    } else {
      // Initial render - ensure it's visible
      setIsAnimating(true);
      previousPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <div
      className={`transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
