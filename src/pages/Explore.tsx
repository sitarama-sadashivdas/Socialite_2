/**
 * Aura Dashboard - Explore Page
 * 
 * This page displays trending hashtags/topics and popular posts with images.
 * Users can explore content beyond their feed and discover new posts and users.
 * 
 * @component
 * @requires trendingTopics - Mock data for trending hashtags
 * @requires initialPosts - Mock post data for displaying popular posts
 * @requires users - Mock user data for post authors
 * @requires framer-motion - For animations
 * @requires lucide-react - For icons (TrendingUp, Hash)
 */

import { motion } from "framer-motion";
import { TrendingUp, Hash } from "lucide-react";
import { trendingTopics, initialPosts, users } from "@/data/mockData";

const Explore = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> Explore
        </h1>
      </motion.div>

      {/* Trending Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {trendingTopics.map((topic, i) => (
          <motion.button
            key={topic.tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-card border border-border/30 shadow-soft hover:shadow-card transition-all text-sm font-medium flex items-center gap-1.5 hover:border-primary/30"
          >
            <Hash className="h-3.5 w-3.5 text-primary" />
            {topic.tag}
            <span className="text-xs text-muted-foreground ml-1">{topic.posts}</span>
          </motion.button>
        ))}
      </div>

      {/* Popular Posts */}
      <h2 className="font-semibold text-sm mb-3">Popular this week</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {initialPosts.filter((p) => p.image).map((post, i) => {
          const user = users[post.userId];
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/30 hover:shadow-elevated transition-shadow cursor-pointer group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <img src={user.avatar} alt="" className="w-6 h-6 rounded-full ring-2 ring-card" />
                  <span className="text-xs font-medium text-card">{user.name}</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs line-clamp-2">{post.content}</p>
                <p className="text-xs text-muted-foreground mt-1">❤️ {post.likes}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;
