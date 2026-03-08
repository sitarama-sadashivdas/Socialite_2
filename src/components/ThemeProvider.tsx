/**
 * Aura Dashboard - Theme Provider
 * 
 * This component provides dark/light theme support using next-themes.
 * It enables class-based dark mode and handles system preference detection.
 * 
 * @component
 * @requires next-themes - Theme management library
 */

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

