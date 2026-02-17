"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveConsole() {
  const [activeCommand, setActiveCommand] = useState<string | null>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const commands = [
    { name: "build()", description: "Compile & optimize system" },
    { name: "optimize()", description: "Enhance performance metrics" },
    { name: "deploy()", description: "Ship to production" },
  ];

  const projectData = {
    "build()": {
      title: "Project Build System",
      metrics: ["Build time: 2.3s", "Bundle size: 245KB", "Lighthouse: 98/100"],
    },
    "optimize()": {
      title: "Performance Optimization",
      metrics: ["FCP: 0.8s", "LCP: 1.2s", "CLS: 0.001"],
    },
    "deploy()": {
      title: "Deployment Pipeline",
      metrics: ["Status: Live", "Region: Global", "Uptime: 99.99%"],
    },
  };

  const handleCommand = (cmd: string) => {
    setActiveCommand(cmd);
    setCommandHistory((prev) => [...prev, `> ${cmd}`]);
  };

  return (
    <section className="min-h-screen bg-terminal-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Live System Console
          </h2>
          <p className="text-steel text-lg">
            Execute commands. Trigger visualizations.
          </p>
        </motion.div>

        {/* Desktop: Terminal UI */}
        <div className="hidden md:block">
          <div className="bg-terminal-gray rounded-lg overflow-hidden neon-border-green">
            {/* Terminal header */}
            <div className="bg-terminal-black px-4 py-3 flex items-center space-x-2 border-b border-steel/20">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-neon-green"></div>
              <span className="ml-4 text-steel text-sm font-mono">system.terminal</span>
            </div>

            {/* Terminal body */}
            <div className="p-6 font-mono text-sm h-96 overflow-auto">
              {/* Command history */}
              <div className="space-y-2 mb-4">
                {commandHistory.map((cmd, i) => (
                  <div key={i} className="text-neon-green">
                    {cmd}
                  </div>
                ))}
              </div>

              {/* Available commands */}
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

              {/* Command output */}
              <AnimatePresence mode="wait">
                {activeCommand && projectData[activeCommand as keyof typeof projectData] && (
                  <motion.div
                    key={activeCommand}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 p-4 bg-terminal-black rounded border border-neon-green/30"
                  >
                    <div className="text-neon-cyan mb-3">
                      {projectData[activeCommand as keyof typeof projectData].title}
                    </div>
                    {projectData[activeCommand as keyof typeof projectData].metrics.map(
                      (metric, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-steel"
                        >
                          → {metric}
                        </motion.div>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: Accordion */}
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
                    {activeCommand === cmd.name ? "−" : "+"}
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
                          → {metric}
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
