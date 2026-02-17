"use client";

import { motion } from "framer-motion";
import { 
  SiNextdotjs, SiReact, SiPython, SiTypescript, SiTailwindcss, SiNodedotjs, SiVercel,
  SiOpenai, SiPytorch, SiTensorflow, SiHuggingface,
  SiFigma, SiAdobepremierepro, SiAdobeaftereffects, SiBlender, SiUnrealengine 
} from "react-icons/si";
import { FaRobot, FaBolt } from "react-icons/fa";

// Define tech groups
const techGroups = [
  {
    name: "Engineering",
    speed: 40,
    direction: 1, // Left to right
    items: [
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "React", icon: SiReact, color: "text-blue-400" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
      { name: "Python", icon: SiPython, color: "text-yellow-300" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
    ]
  },
  {
    name: "AI & Data",
    speed: 50,
    direction: -1, // Right to left
    items: [
      { name: "OpenAI", icon: SiOpenai, color: "text-green-400" },
      { name: "PyTorch", icon: SiPytorch, color: "text-orange-500" },
      { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-400" },
      { name: "HuggingFace", icon: SiHuggingface, color: "text-yellow-400" },
      { name: "Gen AI", icon: FaRobot, color: "text-white" },
      { name: "Diffusion", icon: FaBolt, color: "text-purple-400" },
    ]
  },
  {
    name: "Creative",
    speed: 30,
    direction: 1, // Left to right
    items: [
      { name: "Figma", icon: SiFigma, color: "text-pink-400" },
      { name: "Premiere", icon: SiAdobepremierepro, color: "text-purple-600" },
      { name: "After Effects", icon: SiAdobeaftereffects, color: "text-purple-800" },
      { name: "Blender", icon: SiBlender, color: "text-orange-500" },
      { name: "Unreal", icon: SiUnrealengine, color: "text-white" },
    ]
  }
];

const MarqueeRow = ({ items, speed, direction }: { items: any[], speed: number, direction: number }) => {
  return (
    <div className="flex overflow-hidden relative w-full py-4 group">
      {/* Gradient masks for smooth fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-terminal-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-terminal-black to-transparent pointer-events-none" />
      
      <motion.div
        className="flex gap-8 whitespace-nowrap min-w-max"
        animate={{
          x: direction === 1 ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        }}
      >
        {/* Duplicate items multiple times to ensure seamless loop */}
        {[...Array(6)].flatMap(() => items).map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm hover:border-neon-cyan/50 hover:bg-white/10 transition-all cursor-default group/item shrink-0"
            >
              <Icon className={`w-6 h-6 ${item.color} opacity-70 group-hover/item:opacity-100 transition-opacity`} />
              <span className="text-steel font-mono text-sm group-hover/item:text-white transition-colors">
                {item.name}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default function TechStack() {
  return (
    <section className="py-24 bg-terminal-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The <span className="text-neon-cyan">Arsenal</span>
          </h2>
          <p className="text-steel text-lg max-w-2xl mx-auto">
            Powering ideas with a blend of engineering precision and creative flow.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {techGroups.map((group, idx) => (
          <MarqueeRow 
            key={idx} 
            items={group.items} 
            speed={group.speed} 
            direction={group.direction} 
          />
        ))}
      </div>
    </section>
  );
}
