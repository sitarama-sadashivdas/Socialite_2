/**
 * Aura Dashboard - Comment Section Component
 * 
 * This component displays a list of comments for a post and provides a form
 * for adding new comments. It uses Framer Motion for smooth animations.
 * 
 * @component
 * @prop {Comment[]} comments - Array of comment objects to display
 * @prop {(text: string) => void} onComment - Callback function when a new comment is submitted
 * 
 * @requires users - Mock user data for displaying comment authors
 * @requires framer-motion - For smooth animations
 * @requires lucide-react - For icons
 */

import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { Comment, users } from "@/data/mockData";

interface CommentSectionProps {
  comments: Comment[];
  onComment: (text: string) => void;
}

export function CommentSection({ comments, onComment }: CommentSectionProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onComment(text.trim());
      setText("");
    }
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="border-t border-border/30 mx-4 overflow-hidden"
    >
      {/* Existing comments */}
      <div className="py-3 space-y-3">
        {comments.map((comment) => {
          const commentUser = users[comment.userId];
          return (
            <div key={comment.id} className="flex gap-2.5">
              <img src={commentUser?.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
              <div className="bg-muted/50 rounded-xl px-3 py-2 flex-1">
                <p className="text-xs font-semibold">{commentUser?.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{comment.text}</p>
              </div>
            </div>
          );
        })}
        {comments.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-2">No comments yet. Be the first!</p>
        )}
      </div>

      {/* Add comment */}
      <form onSubmit={handleSubmit} className="flex gap-2 pb-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 h-8 px-3 rounded-lg bg-muted/50 text-xs border-0 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={!text.trim()}
          className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground disabled:opacity-40 glow-primary transition-all"
        >
          <Send className="h-3.5 w-3.5" />
        </motion.button>
      </form>
    </motion.div>
  );
}
