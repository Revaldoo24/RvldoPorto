"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
  progress: number;
  isLoaded: boolean;
  onComplete: () => void;
}

export default function Preloader({ progress, isLoaded, onComplete }: PreloaderProps) {
  const [showCursor, setShowCursor] = useState(true);
  const [bootText, setBootText] = useState("");
  const fullText = "INITIALIZING SYSTEM...";

  useEffect(() => {
    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    // Typewriter effect
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setBootText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 50);

    return () => {
      clearInterval(cursorInterval);
      clearInterval(typeInterval);
    };
  }, []);

  useEffect(() => {
    if (isLoaded && progress >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, progress, onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-terminal-black flex items-center justify-center"
        >
          <div className="text-center">
            {/* Boot text */}
            <div className="mb-8 font-mono text-neon-green text-sm tracking-wider">
              {bootText}
              {showCursor && <span className="inline-block w-2 h-4 ml-1 bg-neon-green"></span>}
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-terminal-gray rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-neon-green"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Progress percentage */}
            <div className="mt-4 font-mono text-steel text-xs tracking-widest">
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
