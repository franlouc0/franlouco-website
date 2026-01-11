"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const previousPathname = useRef(pathname);

  useEffect(() => {
    // Only animate if pathname actually changed
    if (previousPathname.current !== pathname) {
      // Detect navigation direction
      const isNavigatingBack = pathname === "/" && previousPathname.current?.startsWith("/articles");
      const isNavigatingForward = previousPathname.current === "/" && pathname?.startsWith("/articles");
      
      if (isNavigatingBack) {
        // Slide out to the right when going back to home
        setIsSlidingOut(true);
        setIsAnimating(false);
        
        // Wait for full slide-out animation (700ms), then update children and slide in
        const timer = setTimeout(() => {
          setDisplayChildren(children);
          setIsSlidingOut(false);
          // Small delay before starting entrance animation, like contact modal
          setTimeout(() => setIsAnimating(true), 50);
          previousPathname.current = pathname;
        }, 700); // Full 700ms duration like contact modal

        return () => clearTimeout(timer);
      } else {
        // Fade transition for forward navigation
        setIsSlidingOut(false);
        setIsAnimating(false);
        
        // Wait for full fade-out animation (700ms), then update children and fade in
        const timer = setTimeout(() => {
          setDisplayChildren(children);
          // Small delay before starting entrance animation, like contact modal
          setTimeout(() => setIsAnimating(true), 50);
          previousPathname.current = pathname;
        }, 700); // Full 700ms duration like contact modal

        return () => clearTimeout(timer);
      }
    } else {
      // Initial render - ensure it's visible
      setDisplayChildren(children);
      setIsAnimating(true);
      setIsSlidingOut(false);
      previousPathname.current = pathname;
    }
  }, [pathname, children]);

  return (
    <div
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isAnimating 
          ? "opacity-100 translate-x-0" 
          : isSlidingOut 
            ? "opacity-0 translate-x-full" 
            : "opacity-0 translate-x-0"
      }`}
    >
      {displayChildren}
    </div>
  );
}
