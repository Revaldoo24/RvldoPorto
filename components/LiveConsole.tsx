"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const copy = {
  en: {
    title: "Live System Console",
    subtitle: "Execute commands. Trigger visualizations.",
    terminalName: "system.terminal",
    commands: {
      build: "Compile and optimize system",
      optimize: "Enhance performance metrics",
      deploy: "Ship to production",
    },
    outputs: {
      buildTitle: "Project Build System",
      buildMetrics: [
        "Build time: 2.3s",
        "Bundle size: 245KB",
        "Lighthouse: 98/100",
      ],
      optimizeTitle: "Performance Optimization",
      optimizeMetrics: ["FCP: 0.8s", "LCP: 1.2s", "CLS: 0.001"],
      deployTitle: "Deployment Pipeline",
      deployMetrics: ["Status: Live", "Region: Global", "Uptime: 99.99%"],
    },
  },
  id: {
    title: "Console Sistem Langsung",
    subtitle: "Jalankan command. Tampilkan visualisasi.",
    terminalName: "sistem.terminal",
    commands: {
      build: "Kompilasi dan optimasi sistem",
      optimize: "Tingkatkan metrik performa",
      deploy: "Rilis ke production",
    },
    outputs: {
      buildTitle: "Sistem Build Proyek",
      buildMetrics: [
        "Waktu build: 2.3s",
        "Ukuran bundle: 245KB",
        "Lighthouse: 98/100",
      ],
      optimizeTitle: "Optimasi Performa",
      optimizeMetrics: ["FCP: 0.8s", "LCP: 1.2s", "CLS: 0.001"],
      deployTitle: "Pipeline Deployment",
      deployMetrics: ["Status: Live", "Region: Global", "Uptime: 99.99%"],
    },
  },
} as const;

export default function LiveConsole() {
  const { locale } = useLanguage();
  const t = copy[locale];

  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const commands = [
    { name: "build()", description: t.commands.build },
    { name: "optimize()", description: t.commands.optimize },
    { name: "deploy()", description: t.commands.deploy },
  ];

  const projectData = {
    "build()": {
      title: t.outputs.buildTitle,
      metrics: t.outputs.buildMetrics,
    },
    "optimize()": {
      title: t.outputs.optimizeTitle,
      metrics: t.outputs.optimizeMetrics,
    },
    "deploy()": {
      title: t.outputs.deployTitle,
      metrics: t.outputs.deployMetrics,
    },
  };

  const handleCommand = (cmd: string) => {
    setActiveCommand(cmd);
    setCommandHistory((prev) => [...prev, `> ${cmd}`]);
  };

  return (
    <section className="min-h-screen bg-terminal-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
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

        <div className="hidden md:block">
          <div className="bg-terminal-gray rounded-lg overflow-hidden neon-border-green">
            <div className="bg-terminal-black px-4 py-3 flex items-center space-x-2 border-b border-steel/20">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-neon-green"></div>
              <span className="ml-4 text-steel text-sm font-mono">
                {t.terminalName}
              </span>
            </div>

            <div className="p-6 font-mono text-sm h-96 overflow-auto">
              <div className="space-y-2 mb-4">
                {commandHistory.map((cmd, i) => (
                  <div key={i} className="text-neon-green">
                    {cmd}
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {commands.map((cmd) => (
                  <button
                    key={cmd.name}
                    onClick={() => handleCommand(cmd.name)}
                    className="block w-full text-left hover:text-neon-cyan transition-colors group"
                  >
                    <span className="text-neon-green">$ </span>
                    <span className="text-white group-hover:text-neon-cyan">
                      {cmd.name}
                    </span>
                    <span className="text-steel ml-4 text-xs">
                      # {cmd.description}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeCommand &&
                  projectData[activeCommand as keyof typeof projectData] && (
                    <motion.div
                      key={activeCommand}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 p-4 bg-terminal-black rounded border border-neon-green/30"
                    >
                      <div className="text-neon-cyan mb-3">
                        {
                          projectData[activeCommand as keyof typeof projectData]
                            .title
                        }
                      </div>
                      {projectData[
                        activeCommand as keyof typeof projectData
                      ].metrics.map((metric, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-steel"
                        >
                          -&gt; {metric}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="md:hidden space-y-4">
          {commands.map((cmd, index) => (
            <motion.div
              key={cmd.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() =>
                  setActiveCommand(activeCommand === cmd.name ? null : cmd.name)
                }
                className="w-full text-left p-4 bg-terminal-gray rounded-lg border border-neon-green/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-neon-green">{cmd.name}</span>
                  <span className="text-steel">
                    {activeCommand === cmd.name ? "-" : "+"}
                  </span>
                </div>
                <div className="text-steel text-sm">{cmd.description}</div>
              </button>

              <AnimatePresence>
                {activeCommand === cmd.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-4 bg-terminal-black rounded-lg"
                  >
                    {projectData[cmd.name as keyof typeof projectData].metrics.map(
                      (metric, i) => (
                        <div key={i} className="text-steel text-sm">
                          -&gt; {metric}
                        </div>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
