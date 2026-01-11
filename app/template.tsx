"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
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
        
        // After slide-out animation, start entrance animation
        const timer = setTimeout(() => {
          setIsSlidingOut(false);
          setIsAnimating(true);
          previousPathname.current = pathname;
        }, 350); // Half of 700ms for smoother transition

        return () => clearTimeout(timer);
      } else {
        // Fade transition for forward navigation
        setIsSlidingOut(false);
        setIsAnimating(false);
        
        // After exit animation, start entrance animation
        const timer = setTimeout(() => {
          setIsAnimating(true);
          previousPathname.current = pathname;
        }, 350); // Half of 700ms for smoother transition

        return () => clearTimeout(timer);
      }
    } else {
      // Initial render - ensure it's visible
      setIsAnimating(true);
      setIsSlidingOut(false);
      previousPathname.current = pathname;
    }
  }, [pathname]);

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
      {children}
    </div>
  );
}
