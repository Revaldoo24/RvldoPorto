"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface Stat {
  key: "projects" | "experience" | "satisfaction" | "commits";
  value: number;
  suffix: string;
  prefix?: string;
}

const stats: Stat[] = [
  { key: "projects", value: 50, suffix: "+" },
  { key: "experience", value: 5, suffix: "+" },
  { key: "satisfaction", value: 99, suffix: "%", prefix: "" },
  { key: "commits", value: 10000, suffix: "+" },
];

const copy = {
  en: {
    title: "Impact By Numbers",
    subtitle: "Measurable results, engineered precision.",
    labels: {
      projects: "Projects Delivered",
      experience: "Years Experience",
      satisfaction: "Client Satisfaction",
      commits: "Code Commits",
    },
  },
  id: {
    title: "Dampak Dalam Angka",
    subtitle: "Hasil terukur, dengan presisi engineering.",
    labels: {
      projects: "Proyek Selesai",
      experience: "Tahun Pengalaman",
      satisfaction: "Kepuasan Klien",
      commits: "Commit Kode",
    },
  },
} as const;

function CountUpAnimation({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-5xl md:text-7xl font-bold tracking-tight neon-glow-green whitespace-nowrap">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export default function StatsSection() {
  const { locale } = useLanguage();
  const t = copy[locale];

  return (
    <section className="min-h-screen bg-terminal-black py-20 px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-steel text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <CountUpAnimation
                value={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
              <div className="mt-4 text-steel text-lg tracking-wide">
                {t.labels[stat.key]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
