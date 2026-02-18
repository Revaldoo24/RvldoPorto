"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { caseStudies } from "@/data/caseStudies";

const copy = {
  en: {
    title: "Selected Work",
    subtitle: "Systems engineered for scale, precision, and reliability.",
    viewCaseStudy: "View case study",
  },
  id: {
    title: "Karya Pilihan",
    subtitle:
      "Sistem yang dirancang untuk skala besar, presisi, dan keandalan.",
    viewCaseStudy: "Lihat studi kasus",
  },
} as const;

export default function BentoGrid() {
  const { locale } = useLanguage();
  const t = copy[locale];

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="work" className="min-h-screen bg-terminal-gray py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-steel text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {caseStudies.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative bg-terminal-black p-6 rounded-lg border border-steel/20 overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(0, 255, 148, 0.05), transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-green transition-colors">
                  {project.title[locale]}
                </h3>
                <p className="text-steel mb-4">{project.summary[locale]}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-terminal-gray rounded-full text-xs text-neon-cyan border border-neon-cyan/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {hoveredId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-sm text-neon-green bg-terminal-gray/50 p-4 rounded border border-neon-green/30 overflow-hidden mb-4"
                    >
                      <pre className="whitespace-pre-wrap break-words">
                        {project.codeSnippet}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-mono text-neon-cyan hover:text-neon-green transition-colors"
                >
                  {t.viewCaseStudy}
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="md:hidden space-y-4">
          {caseStudies.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full text-left bg-terminal-black p-6 rounded-lg border border-steel/20"
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === project.id ? null : project.id)
                }
                className="w-full text-left"
              >
                <h3 className="text-xl font-bold mb-2">{project.title[locale]}</h3>
                <p className="text-steel text-sm mb-3">{project.summary[locale]}</p>

                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-terminal-gray rounded-full text-xs text-neon-cyan border border-neon-cyan/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {expandedId === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 font-mono text-xs text-neon-green bg-terminal-gray p-3 rounded border border-neon-green/30"
                    >
                      <pre className="whitespace-pre-wrap break-words">
                        {project.codeSnippet}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-2 mt-4 text-sm font-mono text-neon-cyan hover:text-neon-green transition-colors"
              >
                {t.viewCaseStudy}
                <span aria-hidden="true">-&gt;</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
