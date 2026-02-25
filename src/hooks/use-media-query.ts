"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the given CSS media query matches.
 * Handles SSR safely by returning `false` until mounted.
 *
 * @example
 * const isMobile = useMediaQuery("(max-width: 767px)");
 * const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Set initial value
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mql.matches);

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};
