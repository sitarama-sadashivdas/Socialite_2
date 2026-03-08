/**
 * Aura Dashboard - Feed Page
 * 
 * This is the main feed page component that displays posts, allows creating new posts,
 * and provides interaction options like likes and comments. It uses mock data to simulate
 * an API response with loading state.
 * 
 * @component
 * @requires PostCard - Component for displaying individual posts
 * @requires CreatePost - Component for creating new posts
 * @requires RightSidebar - Sidebar with trending topics and suggested users
 * @requires initialPosts - Mock post data
 * @requires currentUser - Mock current user data
 * @requires framer-motion - For loading spinner animation
 * @requires lucide-react - For icons (Loader2)
 */

import { useState, useEffect } from "react";
import { PostCard } from "@/components/feed/PostCard";
import { CreatePost } from "@/components/feed/CreatePost";
import { RightSidebar } from "@/components/feed/RightSidebar";
import { initialPosts, currentUser } from "@/data/mockData";
import type { Post } from "@/data/mockData";
import { Loader2 } from "lucide-react";

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setPosts(initialPosts);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleComment = (postId: string, text: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `c-${Date.now()}`, userId: "me", text, createdAt: "Just now" },
              ],
            }
          : p
      )
    );
  };

  const handlePost = (content: string) => {
    const newPost: Post = {
      id: `p-${Date.now()}`,
      userId: "me",
      content,
      likes: 0,
      liked: false,
      comments: [],
      createdAt: "Just now",
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="flex">
      <div className="flex-1 max-w-2xl mx-auto p-4 space-y-4">
        <CreatePost onPost={handlePost} />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} onLike={handleLike} onComment={handleComment} />
            ))}
          </div>
        )}
      </div>
      <RightSidebar />
    </div>
  );
};

export default Feed;
