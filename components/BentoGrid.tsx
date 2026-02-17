import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  codeSnippet?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Real-Time Analytics Platform",
    description: "High-performance dashboard processing 10M+ events/day with sub-second latency",
    tech: ["React", "WebSocket", "Redis", "PostgreSQL"],
    codeSnippet: "const stream = useWebSocket()\n  .pipe(throttle(100))\n  .subscribe(updateMetrics)",
  },
  {
    id: "2",
    title: "Distributed Task Queue",
    description: "Scalable job processing system handling 500K concurrent tasks",
    tech: ["Node.js", "RabbitMQ", "Docker", "Kubernetes"],
    codeSnippet: "queue.process('heavy', async (job) => {\n  return await processTask(job.data)\n})",
  },
  {
    id: "3",
    title: "Edge Computing Network",
    description: "Global CDN serving 50TB/month with 99.99% uptime",
    tech: ["CloudFlare Workers", "Next.js", "Vercel"],
    codeSnippet: "export default {\n  async fetch(request, env) {\n    return handleEdge(request)\n  }\n}",
  },
  {
    id: "4",
    title: "AI Model Pipeline",
    description: "ML inference API serving predictions at 20ms p95 latency",
    tech: ["Python", "FastAPI", "TensorFlow", "ONNX"],
    codeSnippet: "async def predict(data):\n  tensor = preprocess(data)\n  return model.run(tensor)",
  },
];

export default function BentoGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="work" className="min-h-screen bg-terminal-gray py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Selected Work
          </h2>
          <p className="text-steel text-lg">
            Systems engineered for scale, precision, and reliability.
          </p>
        </motion.div>

        {/* Desktop: Multi-column grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative bg-terminal-black p-6 rounded-lg border border-steel/20 overflow-hidden group cursor-pointer"
            >
              {/* Subtle glow on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(0, 255, 148, 0.05), transparent 70%)",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-green transition-colors">
                  {project.title}
                </h3>
                <p className="text-steel mb-4">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-terminal-gray rounded-full text-xs text-neon-cyan border border-neon-cyan/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Code snippet slide-in */}
                <AnimatePresence>
                  {hoveredId === project.id && project.codeSnippet && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-sm text-neon-green bg-terminal-gray/50 p-4 rounded border border-neon-green/30 overflow-hidden"
                    >
                      <pre className="whitespace-pre-wrap break-words">
                        {project.codeSnippet}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Single column with tap expansion */}
        <div className="md:hidden space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() =>
                  setExpandedId(expandedId === project.id ? null : project.id)
                }
                className="w-full text-left bg-terminal-black p-6 rounded-lg border border-steel/20"
              >
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-steel text-sm mb-3">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-terminal-gray rounded-full text-xs text-neon-cyan border border-neon-cyan/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <AnimatePresence>
                  {expandedId === project.id && project.codeSnippet && (
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
