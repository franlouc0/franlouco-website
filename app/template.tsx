"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);
  const [isSlidingOut, setIsSlidingOut] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isMobile, setIsMobile] = useState(false);
  const previousPathname = useRef(pathname);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only animate if pathname actually changed
    if (previousPathname.current !== pathname) {
      // Detect navigation direction
      const isNavigatingBack = pathname === "/" && (previousPathname.current?.startsWith("/articles") || previousPathname.current?.startsWith("/work"));
      const isNavigatingForward = previousPathname.current === "/" && (pathname?.startsWith("/articles") || pathname?.startsWith("/work"));
      const isNavigatingBetweenArticles = previousPathname.current?.startsWith("/articles") && pathname?.startsWith("/articles");
      const isNavigatingBetweenWork = previousPathname.current?.startsWith("/work") && pathname?.startsWith("/work");
      
      if (isNavigatingBetweenArticles || isNavigatingBetweenWork) {
        // No transition when navigating between articles or work pages - instant update
        setDisplayChildren(children);
        setIsAnimating(true);
        setIsSlidingOut(false);
        previousPathname.current = pathname;
      } else if (isNavigatingBack) {
        // Slide out when going back to home
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
      } else if (isNavigatingForward) {
        // Slide in for forward navigation (fade on desktop, slide from bottom on mobile)
        setIsSlidingOut(false);
        setIsAnimating(false);
        
        // Wait for full exit animation (700ms), then update children and slide in
        const timer = setTimeout(() => {
          setDisplayChildren(children);
          // Small delay before starting entrance animation, like contact modal
          setTimeout(() => setIsAnimating(true), 50);
          previousPathname.current = pathname;
        }, 700); // Full 700ms duration like contact modal

        return () => clearTimeout(timer);
      } else {
        // Other navigation - use fade
        setIsSlidingOut(false);
        setIsAnimating(false);
        
        const timer = setTimeout(() => {
          setDisplayChildren(children);
          setTimeout(() => setIsAnimating(true), 50);
          previousPathname.current = pathname;
        }, 700);

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

  // Determine transform classes based on mobile and direction
  const getTransformClasses = () => {
    if (isAnimating) {
      return "opacity-100 translate-x-0 translate-y-0";
    } else if (isSlidingOut) {
      // Slide out: right on desktop, down (top to bottom) on mobile
      return isMobile ? "opacity-0 translate-y-full" : "opacity-0 translate-x-full";
    } else {
      // Starting position: center on desktop, below on mobile (for forward navigation)
      return isMobile ? "opacity-0 translate-y-full" : "opacity-0 translate-x-0";
    }
  };

  return (
    <div
      className={`transition-all duration-700 ease-page ${getTransformClasses()}`}
    >
      {displayChildren}
    </div>
  );
}
