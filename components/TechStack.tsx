"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiPython,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiVercel,
  SiOpenai,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiFigma,
  SiCanva,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiNotion,
  SiTrello,
  SiWordpress,
  SiGoogleads,
  SiGoogleanalytics,
  SiGooglesearchconsole,
  SiMeta,
  SiMailchimp,
  SiSemrush,
  SiGrammarly,
  SiZapier,
  SiSlack,
  SiAsana,
} from "react-icons/si";
import { FaRobot, FaBolt } from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";

type TechItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

type TechGroup = {
  name: string;
  direction: 1 | -1;
  items: TechItem[];
};

const ROW_SPEED_PX_PER_SEC = 42;

const copy = {
  en: {
    title: "The Arsenal",
    subtitle:
      "Powering ideas with a blend of engineering precision and creative flow.",
  },
  id: {
    title: "Arsenal",
    subtitle:
      "Mewujudkan ide lewat perpaduan presisi engineering dan alur kreatif.",
  },
} as const;

const techGroups: TechGroup[] = [
  {
    name: "Build & Product",
    direction: 1,
    items: [
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "React", icon: SiReact, color: "text-blue-400" },
      { name: "React Native", icon: SiReact, color: "text-blue-300" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
      { name: "Python", icon: SiPython, color: "text-yellow-300" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
      { name: "WordPress", icon: SiWordpress, color: "text-blue-500" },
      { name: "Zapier", icon: SiZapier, color: "text-orange-400" },
      { name: "Vercel", icon: SiVercel, color: "text-white" },
    ],
  },
  {
    name: "Creative & Content",
    direction: -1,
    items: [
      { name: "Figma", icon: SiFigma, color: "text-pink-400" },
      { name: "Canva", icon: SiCanva, color: "text-cyan-300" },
      { name: "Photoshop", icon: SiAdobephotoshop, color: "text-blue-500" },
      { name: "Premiere", icon: SiAdobepremierepro, color: "text-purple-600" },
      { name: "After Effects", icon: SiAdobeaftereffects, color: "text-purple-700" },
      { name: "Notion", icon: SiNotion, color: "text-white" },
      { name: "Grammarly", icon: SiGrammarly, color: "text-green-500" },
      { name: "Mailchimp", icon: SiMailchimp, color: "text-yellow-400" },
      { name: "Trello", icon: SiTrello, color: "text-blue-400" },
      { name: "Asana", icon: SiAsana, color: "text-pink-400" },
    ],
  },
  {
    name: "AI, Marketing & Ops",
    direction: 1,
    items: [
      { name: "OpenAI", icon: SiOpenai, color: "text-green-400" },
      { name: "GPT-4o", icon: SiOpenai, color: "text-green-400" },
      { name: "Sora", icon: SiOpenai, color: "text-green-300" },
      { name: "HuggingFace", icon: SiHuggingface, color: "text-yellow-400" },
      { name: "PyTorch", icon: SiPytorch, color: "text-orange-500" },
      { name: "TensorFlow", icon: SiTensorflow, color: "text-orange-400" },
      { name: "Gen AI", icon: FaRobot, color: "text-white" },
      { name: "Diffusion", icon: FaBolt, color: "text-purple-400" },
      { name: "Meta Ads", icon: SiMeta, color: "text-blue-500" },
      { name: "Google Ads", icon: SiGoogleads, color: "text-blue-400" },
      { name: "Analytics", icon: SiGoogleanalytics, color: "text-orange-400" },
      { name: "Search Console", icon: SiGooglesearchconsole, color: "text-green-500" },
      { name: "SEMrush", icon: SiSemrush, color: "text-orange-500" },
      { name: "Slack", icon: SiSlack, color: "text-purple-400" },
    ],
  },
];

const MarqueeRow = ({
  items,
  direction,
}: {
  items: TechItem[];
  direction: 1 | -1;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let lastTime = performance.now();
    const loopWidth = track.scrollWidth / 2;
    let x = direction === 1 ? -loopWidth : 0;

    const animate = (time: number) => {
      const deltaSec = (time - lastTime) / 1000;
      lastTime = time;

      x += ROW_SPEED_PX_PER_SEC * deltaSec * direction;

      if (direction === 1 && x >= 0) {
        x -= loopWidth;
      } else if (direction === -1 && x <= -loopWidth) {
        x += loopWidth;
      }

      track.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [direction, items]);

  return (
    <div className="flex overflow-hidden relative w-full py-4 group">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-terminal-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-terminal-black to-transparent pointer-events-none" />

      <div
        ref={trackRef}
        className="flex gap-8 whitespace-nowrap min-w-max will-change-transform"
      >
        {[...items, ...items].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm hover:border-neon-cyan/50 hover:bg-white/10 transition-all cursor-default group/item shrink-0"
            >
              <Icon
                className={`w-6 h-6 ${item.color} opacity-70 group-hover/item:opacity-100 transition-opacity`}
              />
              <span className="text-steel font-mono text-sm group-hover/item:text-white transition-colors">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function TechStack() {
  const { locale } = useLanguage();
  const t = copy[locale];

  return (
    <section className="py-24 bg-terminal-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {locale === "en" ? "The " : ""}
            <span className="text-neon-cyan">{t.title}</span>
          </h2>
          <p className="text-steel text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 relative z-10">
        {techGroups.map((group) => (
          <MarqueeRow
            key={group.name}
            items={group.items}
            direction={group.direction}
          />
        ))}
      </div>
    </section>
  );
}
