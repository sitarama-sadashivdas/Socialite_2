/**
 * Aura Dashboard - Utility Functions
 * 
 * A collection of utility functions for className manipulation and merging.
 * Provides a cn function that combines clsx and tailwind-merge for efficient
 * Tailwind CSS className management.
 * 
 * @function cn - Merges multiple class values into a single class string
 * @requires clsx - For conditional className merging
 * @requires tailwind-merge - For Tailwind CSS className merging
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
