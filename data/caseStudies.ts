export type Locale = "id" | "en";

export type LocalizedText = Record<Locale, string>;

export type CaseStudyMetric = {
  label: LocalizedText;
  value: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  impact: LocalizedText[];
  stack: string[];
  metrics: CaseStudyMetric[];
  codeSnippet: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "real-time-analytics-platform",
    title: {
      en: "Real-Time Analytics Platform",
      id: "Platform Analitik Real-Time",
    },
    summary: {
      en: "High-performance dashboard processing 10M+ events/day with sub-second latency.",
      id: "Dashboard performa tinggi untuk memproses 10M+ event/hari dengan latency sub-detik.",
    },
    challenge: {
      en: "The team needed near real-time visibility across multiple services, but existing reporting pipelines were batch-based and too slow for operational decisions.",
      id: "Tim membutuhkan visibilitas hampir real-time lintas banyak service, tetapi pipeline lama berbasis batch dan terlalu lambat untuk keputusan operasional.",
    },
    solution: {
      en: "Built an event-driven architecture with streaming ingestion, rolling aggregation, and focused dashboard rendering to keep interaction fast at high volume.",
      id: "Membangun arsitektur event-driven dengan ingestion streaming, rolling aggregation, dan rendering dashboard terfokus agar interaksi tetap cepat di volume tinggi.",
    },
    impact: [
      {
        en: "Reduced dashboard latency from minutes to sub-second updates.",
        id: "Menurunkan latency dashboard dari hitungan menit menjadi update sub-detik.",
      },
      {
        en: "Improved incident response with live operational metrics.",
        id: "Meningkatkan respons insiden lewat metrik operasional live.",
      },
      {
        en: "Scaled reliably to tens of millions of daily events.",
        id: "Skalabilitas stabil hingga puluhan juta event per hari.",
      },
    ],
    stack: ["React", "WebSocket", "Redis", "PostgreSQL"],
    metrics: [
      {
        label: { en: "Daily Events", id: "Event Harian" },
        value: "10M+",
      },
      {
        label: { en: "Latency", id: "Latency" },
        value: "< 1s",
      },
      {
        label: { en: "Uptime", id: "Uptime" },
        value: "99.95%",
      },
    ],
    codeSnippet:
      "const stream = useWebSocket()\n  .pipe(throttle(100))\n  .subscribe(updateMetrics)",
  },
  {
    id: "2",
    slug: "distributed-task-queue",
    title: {
      en: "Distributed Task Queue",
      id: "Distributed Task Queue",
    },
    summary: {
      en: "Scalable job processing system handling 500K concurrent tasks.",
      id: "Sistem pemrosesan job scalable yang menangani 500K task konkuren.",
    },
    challenge: {
      en: "Background jobs were bottlenecked by a monolithic worker process and could not absorb traffic spikes safely.",
      id: "Background job terhambat oleh worker monolitik dan tidak mampu menyerap lonjakan traffic secara aman.",
    },
    solution: {
      en: "Designed queue partitioning, idempotent processors, and retry semantics with visibility tooling for failure isolation.",
      id: "Merancang queue partitioning, processor idempotent, serta retry semantics dengan tooling observabilitas untuk isolasi kegagalan.",
    },
    impact: [
      {
        en: "Improved throughput under peak load without timeouts.",
        id: "Throughput meningkat saat beban puncak tanpa timeout.",
      },
      {
        en: "Reduced duplicate processing through idempotency strategy.",
        id: "Mengurangi proses duplikat melalui strategi idempotency.",
      },
      {
        en: "Enabled safer releases with queue-level monitoring.",
        id: "Rilis lebih aman berkat monitoring per queue.",
      },
    ],
    stack: ["Node.js", "RabbitMQ", "Docker", "Kubernetes"],
    metrics: [
      {
        label: { en: "Concurrent Tasks", id: "Task Konkuren" },
        value: "500K",
      },
      {
        label: { en: "Failure Recovery", id: "Recovery Error" },
        value: "< 30s",
      },
      {
        label: { en: "Retries", id: "Retry Policy" },
        value: "Automated",
      },
    ],
    codeSnippet:
      "queue.process('heavy', async (job) => {\n  return await processTask(job.data)\n})",
  },
  {
    id: "3",
    slug: "edge-computing-network",
    title: {
      en: "Edge Computing Network",
      id: "Edge Computing Network",
    },
    summary: {
      en: "Global CDN layer serving 50TB/month with strong reliability.",
      id: "Layer CDN global yang melayani 50TB/bulan dengan reliabilitas tinggi.",
    },
    challenge: {
      en: "Users in distant regions experienced inconsistent response times and cache miss penalties.",
      id: "Pengguna di region jauh mengalami response time tidak konsisten dan penalti cache miss.",
    },
    solution: {
      en: "Implemented edge routing, smart cache strategy, and compute-at-edge handlers for latency-sensitive requests.",
      id: "Mengimplementasikan edge routing, strategi cache cerdas, dan handler compute-at-edge untuk request sensitif latency.",
    },
    impact: [
      {
        en: "Lowered global response time variance significantly.",
        id: "Mengurangi variasi response time global secara signifikan.",
      },
      {
        en: "Improved delivery consistency during traffic bursts.",
        id: "Konsistensi delivery meningkat saat traffic melonjak.",
      },
      {
        en: "Reduced origin load through better edge cache hit rates.",
        id: "Beban origin berkurang lewat cache hit rate edge yang lebih baik.",
      },
    ],
    stack: ["Cloudflare Workers", "Next.js", "Vercel"],
    metrics: [
      {
        label: { en: "Monthly Traffic", id: "Traffic Bulanan" },
        value: "50TB",
      },
      {
        label: { en: "Uptime", id: "Uptime" },
        value: "99.99%",
      },
      {
        label: { en: "Regions", id: "Region" },
        value: "Global",
      },
    ],
    codeSnippet:
      "export default {\n  async fetch(request, env) {\n    return handleEdge(request)\n  }\n}",
  },
  {
    id: "4",
    slug: "ai-model-pipeline",
    title: {
      en: "AI Model Pipeline",
      id: "Pipeline Model AI",
    },
    summary: {
      en: "Inference API serving predictions at low p95 latency.",
      id: "API inference yang melayani prediksi dengan p95 latency rendah.",
    },
    challenge: {
      en: "Model serving quality degraded as request volume increased and payload variability grew.",
      id: "Kualitas serving model menurun saat volume request naik dan variasi payload meningkat.",
    },
    solution: {
      en: "Established robust preprocessing, model optimization, and predictable API contracts with observability around inference quality.",
      id: "Membangun preprocessing yang robust, optimisasi model, dan kontrak API yang konsisten dengan observabilitas kualitas inference.",
    },
    impact: [
      {
        en: "Maintained low p95 latency under sustained demand.",
        id: "Menjaga p95 latency rendah saat beban berkelanjutan.",
      },
      {
        en: "Increased model response consistency across payload variants.",
        id: "Konsistensi respon model meningkat di berbagai variasi payload.",
      },
      {
        en: "Improved developer confidence with clearer inference contracts.",
        id: "Kepercayaan developer meningkat berkat kontrak inference yang lebih jelas.",
      },
    ],
    stack: ["Python", "FastAPI", "TensorFlow", "ONNX"],
    metrics: [
      {
        label: { en: "P95 Latency", id: "Latency P95" },
        value: "20ms",
      },
      {
        label: { en: "Model Versioning", id: "Versioning Model" },
        value: "Tracked",
      },
      {
        label: { en: "SLA", id: "SLA" },
        value: "99.9%",
      },
    ],
    codeSnippet:
      "async def predict(data):\n  tensor = preprocess(data)\n  return model.run(tensor)",
  },
];

export function findCaseStudyBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug) ?? null;
}
