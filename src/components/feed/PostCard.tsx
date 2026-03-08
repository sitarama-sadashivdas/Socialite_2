/**
 * Aura Dashboard - Post Card Component
 * 
 * This component displays a single post in the feed with the author's information,
 * content, optional image, like/comment/share actions, and an expandable comment section.
 * It uses Framer Motion for staggered entry animations and interactive feedback.
 * 
 * @component
 * @prop {Post} post - The post object containing all post data
 * @prop {number} index - Index position for staggered animation
 * @prop {(postId: string) => void} onLike - Callback when a post is liked
 * @prop {(postId: string, text: string) => void} onComment - Callback when a comment is added
 * 
 * @requires users - Mock user data for displaying post authors
 * @requires CommentSection - Component for displaying and adding comments
 * @requires framer-motion - For smooth animations
 * @requires lucide-react - For icons (Heart, MessageCircle, Share2, Bookmark)
 */

import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { Post, users } from "@/data/mockData";
import { CommentSection } from "./CommentSection";

interface PostCardProps {
  post: Post;
  index: number;
  onLike: (postId: string) => void;
  onComment: (postId: string, text: string) => void;
}

export function PostCard({ post, index, onLike, onComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [justLiked, setJustLiked] = useState(false);
  const user = users[post.userId];

  const handleLike = () => {
    onLike(post.id);
    if (!post.liked) {
      setJustLiked(true);
      setTimeout(() => setJustLiked(false), 300);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="bg-card rounded-2xl shadow-card border border-border/30 overflow-hidden hover:shadow-elevated transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-border" />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.username} · {post.createdAt}</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="px-4 pb-3">
          <img src={post.image} alt="" className="w-full rounded-xl object-cover max-h-80" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 px-2 pb-2 border-t border-border/30 pt-2 mx-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            post.liked ? "text-destructive" : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          }`}
        >
          <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""} ${justLiked ? "animate-like-pop" : ""}`} />
          <span className="text-xs font-medium">{post.likes}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs font-medium">{post.comments.length}</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
        >
          <Share2 className="h-4 w-4" />
        </motion.button>

        <div className="flex-1" />

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Bookmark className="h-4 w-4" />
        </motion.button>
      </div>

      {/* Comments */}
      {showComments && (
        <CommentSection
          comments={post.comments}
          onComment={(text) => onComment(post.id, text)}
        />
      )}
    </motion.article>
  );
}
