/**
 * Aura Dashboard - Profile Page
 * 
 * This page displays the current user's profile information including their avatar,
 * bio, stats (followers, following, posts), and their liked posts. It features
 * a hero cover with gradient and animated stat cards.
 * 
 * @component
 * @requires currentUser - Mock data for the current user's profile
 * @requires initialPosts - Mock post data for displaying user's posts and liked posts
 * @requires users - Mock user data for displaying post authors
 * @requires framer-motion - For animations
 * @requires lucide-react - For icons (MapPin, LinkIcon, Calendar, Grid3X3, Heart)
 */

import { motion } from "framer-motion";
import { MapPin, LinkIcon, Calendar, Grid3X3, Heart } from "lucide-react";
import { currentUser, initialPosts, users } from "@/data/mockData";

const Profile = () => {
  const myPosts = initialPosts.filter((p) => p.userId === "me");
  const likedPosts = initialPosts.filter((p) => p.liked);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Cover */}
      <div className="h-44 gradient-hero rounded-b-3xl relative">
        <div className="absolute -bottom-12 left-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-card shadow-elevated"
          />
        </div>
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-16 px-6 pb-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold">{currentUser.name}</h1>
            <p className="text-sm text-muted-foreground">{currentUser.username}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-4 h-9 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            Edit Profile
          </motion.button>
        </div>

        <p className="mt-3 text-sm">{currentUser.bio}</p>

        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> San Francisco</span>
          <span className="flex items-center gap-1"><LinkIcon className="h-3.5 w-3.5" /> alexrivera.dev</span>
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined Jan 2024</span>
        </div>

        <div className="flex gap-5 mt-4">
          <div><span className="font-bold text-sm">{currentUser.followers.toLocaleString()}</span> <span className="text-xs text-muted-foreground">Followers</span></div>
          <div><span className="font-bold text-sm">{currentUser.following.toLocaleString()}</span> <span className="text-xs text-muted-foreground">Following</span></div>
          <div><span className="font-bold text-sm">{currentUser.posts}</span> <span className="text-xs text-muted-foreground">Posts</span></div>
        </div>
      </motion.div>

      {/* Stats cards */}
      <div className="px-6 grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Posts", value: currentUser.posts, color: "gradient-primary" },
          { label: "Likes", value: "4.2K", color: "gradient-secondary" },
          { label: "Views", value: "18K", color: "gradient-accent" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={`${stat.color} rounded-xl p-3 text-center text-primary-foreground`}
          >
            <p className="text-lg font-bold">{stat.value}</p>
            <p className="text-xs opacity-80">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-8">
        <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Heart className="h-4 w-4 text-primary" /> Liked Posts
        </h2>
        {likedPosts.length > 0 ? (
          <div className="space-y-3">
            {likedPosts.map((post) => {
              const user = users[post.userId];
              return (
                <div key={post.id} className="bg-card rounded-xl p-3 border border-border/30 shadow-soft">
                  <div className="flex items-center gap-2 mb-1">
                    <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-xs font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">· {post.createdAt}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{post.content}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No liked posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
