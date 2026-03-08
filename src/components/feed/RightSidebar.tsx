/**
 * Aura Dashboard - Right Sidebar Component
 * 
 * This component displays the right sidebar content on larger screens, showing
 * trending topics and suggested users to follow. It provides additional content
 * beyond the main feed without cluttering the primary view.
 * 
 * @component
 * 
 * @requires trendingTopics - Mock data for trending topic hashtags
 * @requires suggestedUsers - Mock data for suggested users to follow
 * @requires framer-motion - For smooth entry animations
 * @requires lucide-react - For icons (TrendingUp, UserPlus)
 */

import { TrendingUp, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { trendingTopics, suggestedUsers } from "@/data/mockData";

export function RightSidebar() {
  return (
    <aside className="hidden xl:block w-80 shrink-0 p-4 space-y-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-auto">
      {/* Trending */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl shadow-card border border-border/30 p-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm">Trending</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, i) => (
            <motion.div
              key={topic.tag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="group cursor-pointer"
            >
              <p className="text-sm font-medium group-hover:text-primary transition-colors">{topic.tag}</p>
              <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Suggested */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl shadow-card border border-border/30 p-4"
      >
        <h3 className="font-semibold text-sm mb-3">Suggested for you</h3>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.username}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="h-7 px-3 rounded-lg gradient-secondary text-secondary-foreground text-xs font-medium glow-secondary"
              >
                <UserPlus className="h-3.5 w-3.5" />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </aside>
  );
}
