/**
 * Aura Dashboard - Messages Page
 * 
 * This page displays the messaging interface with a conversation list on the left
 * and a chat area on the right. Users can select conversations, send messages,
 * and see unread message counts. It features a responsive layout for mobile.
 * 
 * @component
 * @requires initialMessages - Mock message data for conversations
 * @requires users - Mock user data for conversation participants
 * @requires framer-motion - For animations
 * @requires lucide-react - For icons (Send, Loader2)
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { initialMessages, users } from "@/data/mockData";
import type { Message } from "@/data/mockData";

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(initialMessages);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const selectedConvo = messages.find((m) => m.id === selected);
  const selectedUser = selectedConvo ? users[selectedConvo.userId] : null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim() || !selected) return;
    setMessages((prev) =>
      prev.map((m) =>
        m.id === selected
          ? {
              ...m,
              messages: [...m.messages, { text: newMsg.trim(), fromMe: true, time: "Just now" }],
              lastMessage: newMsg.trim(),
            }
          : m
      )
    );
    setNewMsg("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Conversation List */}
      <div className={`${selected ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 border-r border-border/30`}>
        <div className="p-4 border-b border-border/30">
          <h1 className="text-lg font-bold">Messages</h1>
        </div>
        <div className="flex-1 overflow-auto">
          {messages.map((msg, i) => {
            const user = users[msg.userId];
            return (
              <motion.button
                key={msg.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(msg.id)}
                className={`w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left ${
                  selected === msg.id ? "bg-muted/70" : ""
                }`}
              >
                <div className="relative">
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  {msg.unread > 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {msg.unread}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{msg.lastMessage}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${selected ? "flex" : "hidden md:flex"} flex-col flex-1`}>
        {selectedConvo && selectedUser ? (
          <>
            <div className="flex items-center gap-3 p-4 border-b border-border/30 glass">
              <button onClick={() => setSelected(null)} className="md:hidden text-muted-foreground hover:text-foreground p-1">
                ←
              </button>
              <img src={selectedUser.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{selectedUser.name}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {selectedConvo.messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
                      msg.fromMe
                        ? "gradient-primary text-primary-foreground rounded-br-md"
                        : "bg-muted rounded-bl-md"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.fromMe ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-border/30 flex gap-2">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 h-10 px-4 rounded-xl bg-muted/60 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                type="submit"
                disabled={!newMsg.trim()}
                className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground glow-primary disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto mb-4 flex items-center justify-center animate-float">
                <Send className="h-7 w-7 text-primary-foreground" />
              </div>
              <p className="font-semibold">Your Messages</p>
              <p className="text-sm text-muted-foreground mt-1">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
