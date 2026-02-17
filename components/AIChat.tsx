"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const ERROR_REPLY =
  "Sorry, I could not complete that request. Please try again in a moment.";

function createMessageId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm Revaldo's Digital Assistant. Ask me about his tech stack, experience, or availability."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Abort in-flight requests if component unmounts
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleToggle = () => {
    if (isOpen && abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
      setIsLoading(false);
    }

    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userContent = input.trim();

    if (!userContent || isLoading) return;

    const userMsg: Message = {
      id: createMessageId(),
      role: "user",
      content: userContent,
    };
    const assistantId = createMessageId();
    const assistantMsg: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

    const requestMessages = [...messages, userMsg].map(({ role, content }) => ({
      role,
      content,
    }));

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: requestMessages }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Request failed with status ${response.status}`);
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId ? { ...msg, content: assistantContent } : msg
          )
        );
      }

      const tailChunk = decoder.decode();
      if (tailChunk) {
        assistantContent += tailChunk;
      }

      if (!assistantContent.trim()) {
        throw new Error("Assistant returned an empty response");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      console.error(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, content: ERROR_REPLY } : msg
        )
      );
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null;
      }

      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-neon-cyan/20 backdrop-blur-md border border-neon-cyan/50 text-neon-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-shadow group"
      >
        <div className="absolute inset-0 rounded-full border border-neon-cyan opacity-50 animate-ping group-hover:opacity-100" />
        {isOpen ? <FaTimes className="text-xl" /> : <FaRobot className="text-xl" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-terminal-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-white">Revaldo AI</span>
              </div>
              <span className="text-xs text-steel font-mono">v1.0 BETA</span>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-neon-cyan/20 text-white rounded-br-none border border-neon-cyan/30"
                        : "bg-white/10 text-steel rounded-bl-none border border-white/5"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-steel rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-steel rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-steel rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-white placeholder-steel text-sm focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2 text-neon-cyan hover:text-white disabled:text-steel disabled:cursor-not-allowed transition-colors"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
