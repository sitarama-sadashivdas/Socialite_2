/**
 * Aura Dashboard - App Navbar Component
 * 
 * This component renders the top navigation bar with a sidebar toggle button,
 * an expandable search input, and a theme toggle switch. It features a 
 * glass-morphism effect and includes a dropdown search results panel.
 * 
 * @component
 * @requires useSidebar - Hook from sidebar component for toggle functionality
 * @requires useTheme - Hook from next-themes for theme management
 * @requires framer-motion - For search dropdown animations
 * @requires lucide-react - For icons (Search, SidebarIcon, Sun, Moon)
 */

import { Search, SidebarIcon, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function AppNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleSidebar } = useSidebar();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 glass border-b border-border/40">
      <div className="flex items-center h-14 px-4 gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
        >
          <SidebarIcon className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              className="w-full h-9 pl-9 pr-4 rounded-xl bg-muted/60 border-0 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-card transition-all"
            />
          </div>
          <AnimatePresence>
            {searchOpen && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl shadow-elevated border border-border/50 p-3 z-50"
              >
                <p className="text-xs text-muted-foreground mb-2">Results for "{searchQuery}"</p>
                <div className="space-y-2">
                  {["Posts", "People", "Tags"].map((cat) => (
                    <div key={cat} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer transition-colors">
                      <Search className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">{searchQuery} in {cat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-muted transition-colors relative overflow-hidden"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </header>
  );
}
