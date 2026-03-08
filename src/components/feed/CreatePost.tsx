/**
 * Aura Dashboard - Create Post Component
 * 
 * This component provides a form for creating new posts in the feed.
 * It features a text area that expands on focus, image and emoji upload buttons,
 * and a submit button with gradient styling.
 * 
 * @component
 * @prop {(content: string) => void} onPost - Callback function when a post is submitted
 * 
 * @requires currentUser - Mock current user data for avatar display
 * @requires framer-motion - For smooth animations
 * @requires lucide-react - For icons (Image, Smile, Send)
 */

import { useState } from "react";
import { Image, Smile, Send } from "lucide-react";
import { motion } from "framer-motion";
import { currentUser } from "@/data/mockData";

interface CreatePostProps {
  onPost: (content: string) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [content, setContent] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPost(content.trim());
      setContent("");
      setFocused(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card rounded-2xl shadow-card border border-border/30 p-4 transition-shadow duration-300 ${focused ? "shadow-elevated ring-1 ring-primary/20" : ""}`}
    >
      <div className="flex gap-3">
        <img src={currentUser.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-border shrink-0" />
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => !content && setFocused(false)}
            placeholder="What's on your mind?"
            rows={focused ? 3 : 1}
            className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground/50 focus:outline-none transition-all"
          />
          {focused && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="flex items-center justify-between pt-3 border-t border-border/30"
            >
              <div className="flex gap-1">
                <button type="button" className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Image className="h-4 w-4" />
                </button>
                <button type="button" className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Smile className="h-4 w-4" />
                </button>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!content.trim()}
                className="h-8 px-4 rounded-xl gradient-primary text-primary-foreground text-xs font-semibold glow-primary disabled:opacity-40 transition-all flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                Post
              </motion.button>
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
}
