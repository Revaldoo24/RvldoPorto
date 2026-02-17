"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
}

const stats: Stat[] = [
  { label: "Projects Delivered", value: 50, suffix: "+" },
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Client Satisfaction", value: 99, suffix: "%", prefix: "" },
  { label: "Code Commits", value: 10000, suffix: "+" },
];

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
            Impact By Numbers
          </h2>
          <p className="text-steel text-lg">
            Measurable results, engineered precision.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
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
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
