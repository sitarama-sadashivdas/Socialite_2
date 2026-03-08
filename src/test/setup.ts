/**
 * Aura Dashboard - Test Setup Configuration
 * 
 * This file sets up the testing environment for the application. It imports
 * Jest DOM matchers from Testing Library and provides a mock implementation
 * of window.matchMedia for tests that rely on media queries.
 * 
 * @module test/setup
 * @requires @testing-library/jest-dom - For Jest DOM matchers
 * 
 * @see https://testing-library.com/docs/ecosystem-jest-dom/
 * @see https://vitest.dev/ - Vitest configuration
 */

import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
