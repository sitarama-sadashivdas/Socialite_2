/**
 * Aura Dashboard - Notifications Page
 * 
 * This page displays all notifications for the current user including likes, comments,
 * follows, and mentions. It provides functionality to mark all notifications as read
 * and displays different icons and colors for each notification type.
 * 
 * @component
 * @requires initialNotifications - Mock notification data
 * @requires users - Mock user data for notification authors
 * @requires framer-motion - For animations
 * @requires lucide-react - For icons (Heart, MessageCircle, UserPlus, AtSign, CheckCheck, Loader2)
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, UserPlus, AtSign, CheckCheck, Loader2 } from "lucide-react";
import { initialNotifications, users } from "@/data/mockData";
import type { Notification } from "@/data/mockData";

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  mention: AtSign,
};

const colorMap = {
  like: "text-destructive bg-destructive/10",
  comment: "text-secondary bg-secondary/10",
  follow: "text-primary bg-primary/10",
  mention: "text-accent bg-accent/10",
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(initialNotifications);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-lg font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </motion.button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notif, i) => {
          const user = users[notif.userId];
          const Icon = iconMap[notif.type];
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer ${
                notif.read ? "bg-card" : "bg-primary/5 border border-primary/10"
              } hover:bg-muted/50 shadow-soft`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorMap[notif.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <img src={user.avatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold">{user.name}</span>{" "}
                  <span className="text-muted-foreground">{notif.text}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{notif.createdAt}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full gradient-primary shrink-0" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
