/**
 * Aura Dashboard - Mock Data
 * 
 * This file contains mock data for the social media dashboard application.
 * Includes user profiles, posts, notifications, messages, and trending topics.
 * Used for development and testing purposes.
 * 
 * @module data/mockData
 * @types User, Comment, Post, Notification, Message
 */

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  image?: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention";
  userId: string;
  postId?: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface Message {
  id: string;
  userId: string;
  messages: { text: string; fromMe: boolean; time: string }[];
  lastMessage: string;
  unread: number;
}

export const currentUser: User = {
  id: "me",
  name: "Alex Rivera",
  username: "@alexrivera",
  avatar: "https://i.pravatar.cc/150?img=12",
  bio: "Designer & Developer 🎨 Building beautiful things",
  followers: 2847,
  following: 412,
  posts: 186,
};

export const users: Record<string, User> = {
  me: currentUser,
  u1: { id: "u1", name: "Sarah Chen", username: "@sarahchen", avatar: "https://i.pravatar.cc/150?img=5", bio: "UX Designer at Meta", followers: 12400, following: 890, posts: 342 },
  u2: { id: "u2", name: "Marcus Johnson", username: "@marcusj", avatar: "https://i.pravatar.cc/150?img=8", bio: "Full-stack dev | Coffee lover", followers: 5600, following: 320, posts: 156 },
  u3: { id: "u3", name: "Priya Sharma", username: "@priyasharma", avatar: "https://i.pravatar.cc/150?img=9", bio: "Product Manager @Google", followers: 8900, following: 450, posts: 231 },
  u4: { id: "u4", name: "Jordan Lee", username: "@jordanlee", avatar: "https://i.pravatar.cc/150?img=11", bio: "Photographer 📷 Travel enthusiast", followers: 34200, following: 210, posts: 892 },
  u5: { id: "u5", name: "Emma Wilson", username: "@emmawilson", avatar: "https://i.pravatar.cc/150?img=1", bio: "Art Director | Creative Mind", followers: 18700, following: 670, posts: 445 },
};

export const initialPosts: Post[] = [
  {
    id: "p1", userId: "u1", content: "Just shipped a new design system for our team! 🚀 The power of consistent tokens and reusable components is incredible.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop", likes: 247, liked: false,
    comments: [
      { id: "c1", userId: "u2", text: "This looks amazing! Would love to see a breakdown.", createdAt: "2h ago" },
      { id: "c2", userId: "u3", text: "Design systems are the future 🙌", createdAt: "1h ago" },
    ],
    createdAt: "3h ago",
  },
  {
    id: "p2", userId: "u4", content: "Golden hour at the mountains. Sometimes you just need to disconnect and breathe. 🏔️✨", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop", likes: 1832, liked: true,
    comments: [{ id: "c3", userId: "u5", text: "Absolutely breathtaking! Where is this?", createdAt: "30m ago" }],
    createdAt: "5h ago",
  },
  {
    id: "p3", userId: "u2", content: "Hot take: TypeScript is not just a type system, it's a thinking framework. It forces you to model your domain properly before writing logic. 💡", likes: 89, liked: false,
    comments: [],
    createdAt: "8h ago",
  },
  {
    id: "p4", userId: "u5", content: "New art direction project for a sustainable fashion brand. Earthy tones meet bold typography. What do you think? 🎨", image: "https://thumbs.dreamstime.com/z/minimalist-representation-sustainable-fashion-earthy-tones-natural-textures-view-minimalist-representation-351218258.jpg?ct=jpeg?w=600&h=400&fit=crop", likes: 421, liked: false,
    comments: [
      { id: "c4", userId: "u1", text: "The color palette is stunning!", createdAt: "2h ago" },
    ],
    createdAt: "12h ago",
  },
  {
    id: "p5", userId: "u3", content: "Lessons from shipping to 1M users:\n\n1. Start simple\n2. Listen obsessively\n3. Iterate fast\n4. Celebrate small wins\n5. Never stop learning\n\nWhat would you add? 👇", likes: 567, liked: false,
    comments: [
      { id: "c5", userId: "u2", text: "6. Build a great team!", createdAt: "4h ago" },
      { id: "c6", userId: "u4", text: "7. Document everything 📝", createdAt: "3h ago" },
    ],
    createdAt: "1d ago",
  },
];

export const initialNotifications: Notification[] = [
  { id: "n1", type: "like", userId: "u1", postId: "p2", text: "liked your post", createdAt: "5m ago", read: false },
  { id: "n2", type: "comment", userId: "u3", postId: "p1", text: "commented on your post", createdAt: "15m ago", read: false },
  { id: "n3", type: "follow", userId: "u4", text: "started following you", createdAt: "1h ago", read: false },
  { id: "n4", type: "mention", userId: "u5", postId: "p3", text: "mentioned you in a post", createdAt: "2h ago", read: true },
  { id: "n5", type: "like", userId: "u2", postId: "p4", text: "liked your post", createdAt: "3h ago", read: true },
  { id: "n6", type: "follow", userId: "u1", text: "started following you", createdAt: "5h ago", read: true },
  { id: "n7", type: "comment", userId: "u4", postId: "p5", text: "commented on your post", createdAt: "8h ago", read: true },
];

export const initialMessages: Message[] = [
  { id: "m1", userId: "u1", messages: [
    { text: "Hey! Love your latest design work 🔥", fromMe: false, time: "10:30 AM" },
    { text: "Thanks Sarah! Means a lot coming from you", fromMe: true, time: "10:32 AM" },
    { text: "We should collab sometime!", fromMe: false, time: "10:33 AM" },
  ], lastMessage: "We should collab sometime!", unread: 1 },
  { id: "m2", userId: "u2", messages: [
    { text: "That TypeScript thread was fire 🔥", fromMe: true, time: "9:00 AM" },
    { text: "Haha thanks! Got some spicy replies", fromMe: false, time: "9:15 AM" },
  ], lastMessage: "Haha thanks! Got some spicy replies", unread: 0 },
  { id: "m3", userId: "u4", messages: [
    { text: "Can I use your mountain photo for my portfolio?", fromMe: true, time: "Yesterday" },
    { text: "Of course! I'll send you the high-res version", fromMe: false, time: "Yesterday" },
    { text: "You're the best! 🙏", fromMe: true, time: "Yesterday" },
  ], lastMessage: "You're the best! 🙏", unread: 0 },
  { id: "m4", userId: "u5", messages: [
    { text: "Meeting tomorrow at 3pm?", fromMe: false, time: "Yesterday" },
    { text: "Works for me! See you then", fromMe: true, time: "Yesterday" },
  ], lastMessage: "Works for me! See you then", unread: 0 },
];

export const trendingTopics = [
  { tag: "#DesignSystems", posts: "12.4K" },
  { tag: "#TypeScript", posts: "8.9K" },
  { tag: "#WebDev", posts: "45.2K" },
  { tag: "#AIArt", posts: "23.1K" },
  { tag: "#Sustainability", posts: "6.7K" },
];

export const suggestedUsers = [
  users.u1,
  users.u3,
  users.u5,
];
