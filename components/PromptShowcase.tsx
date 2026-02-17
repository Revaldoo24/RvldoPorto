"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaCopy, FaCheck, FaMagic } from "react-icons/fa";

interface PromptItem {
  id: number;
  title: string;
  image: string;
  prompt: string;
  model: string;
}

const prompts: PromptItem[] = [
  {
    id: 1,
    title: "Neon Cybernetic Cortex",
    image: "/sequence/ezgif-frame-060.png", // Using one of our hero frames
    model: "Midjourney v6",
    prompt: "/imagine prompt: volumetric lighting, cyberpunk interface, neural network visualization, glowing neon nodes, emerald green and cyan color palette, 8k resolution, cinematic composition --ar 16:9 --v 6.0"
  },
  {
    id: 2,
    title: "Abstract Data Flow",
    image: "/sequence/ezgif-frame-090.png", // Using another hero frame
    model: "Stable Diffusion XL",
    prompt: "abstract data stream, digital information flow, matrix code rain aesthetic, high contrast, dark background, bioluminescent particles, depth of field, macro photography style"
  }
];

export default function PromptShowcase() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-24 bg-terminal-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple mb-6">
            <FaMagic className="w-4 h-4" />
            <span className="text-sm font-mono tracking-wider">PROMPT ENGINEERING</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Commanding <span className="text-neon-purple">Intelligence</span>
          </h2>
          <p className="text-steel text-lg max-w-2xl mx-auto">
            Translating human intent into machine creativity. Hover to reveal the source code of imagination.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prompts.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-terminal-gray"
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-sm"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-neon-purple text-xs font-mono uppercase tracking-widest border border-neon-purple/30 px-2 py-1 rounded">
                      {item.model}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(item.prompt, item.id);
                      }}
                      className="text-steel hover:text-white transition-colors"
                      title="Copy Prompt"
                    >
                      {copiedId === item.id ? <FaCheck className="text-green-400" /> : <FaCopy />}
                    </button>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-sm text-gray-300 relative overflow-hidden">
                    <p className="line-clamp-4 italic">
                      &quot;{item.prompt}&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Default Label (Visible when not hovering) */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <div className="bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                  <span className="text-white font-medium">{item.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
