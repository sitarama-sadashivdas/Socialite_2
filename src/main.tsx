/**
 * Aura Dashboard - React Application Bootstrap
 * 
 * This is the entry point for the React application that mounts the App component
 * into the DOM. It creates a root using React 18's createRoot API and renders the
 * main App component with global styles.
 * 
 * @see https://react.dev/reference/react-dom/client/createRoot
 * @requires App - Main application component
 * @requires index.css - Global styles and Tailwind directives
 */

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
