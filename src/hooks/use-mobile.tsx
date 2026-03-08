/**
 * Aura Dashboard - Mobile Detection Hook
 * 
 * A custom React hook for detecting if the current viewport is in mobile mode.
 * Uses a media query to determine the device width and responds to orientation changes.
 * 
 * @hook
 * @returns {boolean | undefined} - Returns true if viewport is mobile (< 768px), undefined during initial render
 * 
 * @requires React - For useState and useEffect hooks
 * @requires window.matchMedia - For media query detection
 */

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
