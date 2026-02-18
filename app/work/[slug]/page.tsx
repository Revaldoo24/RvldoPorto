"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { findCaseStudyBySlug } from "@/data/caseStudies";

const copy = {
  en: {
    back: "Back to home",
    notFoundTitle: "Case study not found",
    notFoundDescription:
      "The case study you requested is unavailable or has been renamed.",
    challenge: "Challenge",
    solution: "Solution",
    impact: "Impact",
    stack: "Tech Stack",
    metrics: "Key Metrics",
    discuss: "Discuss your project",
    codePreview: "Implementation Snapshot",
  },
  id: {
    back: "Kembali ke beranda",
    notFoundTitle: "Studi kasus tidak ditemukan",
    notFoundDescription:
      "Studi kasus yang Anda minta tidak tersedia atau sudah berubah nama.",
    challenge: "Tantangan",
    solution: "Solusi",
    impact: "Dampak",
    stack: "Tech Stack",
    metrics: "Metrik Utama",
    discuss: "Diskusikan proyek Anda",
    codePreview: "Cuplikan Implementasi",
  },
} as const;

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLanguage();
  const t = copy[locale];
  const study = findCaseStudyBySlug(slug);

  if (!study) {
    return (
      <main className="min-h-screen bg-terminal-black text-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-neon-cyan hover:text-neon-green transition-colors font-mono text-sm mb-8"
          >
            &larr; {t.back}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.notFoundTitle}</h1>
          <p className="text-steel">{t.notFoundDescription}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-terminal-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#work"
          className="inline-flex items-center text-neon-cyan hover:text-neon-green transition-colors font-mono text-sm mb-8"
        >
          &larr; {t.back}
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {study.title[locale]}
          </h1>
          <p className="text-steel text-lg max-w-3xl">{study.summary[locale]}</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {study.metrics.map((metric) => (
            <article
              key={`${study.slug}-${metric.label.en}`}
              className="rounded-xl border border-white/10 bg-terminal-gray p-4"
            >
              <p className="text-steel text-xs uppercase tracking-wider mb-2">
                {metric.label[locale]}
              </p>
              <p className="text-2xl font-bold text-neon-green">{metric.value}</p>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <article className="rounded-2xl border border-white/10 bg-terminal-gray p-6">
            <h2 className="text-2xl font-semibold mb-3">{t.challenge}</h2>
            <p className="text-steel leading-relaxed">{study.challenge[locale]}</p>
          </article>

          <article className="rounded-2xl border border-white/10 bg-terminal-gray p-6">
            <h2 className="text-2xl font-semibold mb-3">{t.solution}</h2>
            <p className="text-steel leading-relaxed">{study.solution[locale]}</p>
          </article>
        </section>

        <section className="rounded-2xl border border-white/10 bg-terminal-gray p-6 mb-10">
          <h2 className="text-2xl font-semibold mb-4">{t.impact}</h2>
          <ul className="space-y-3 text-steel">
            {study.impact.map((line, index) => (
              <li key={`${study.slug}-impact-${index}`} className="flex gap-2">
                <span className="text-neon-green mt-1.5">•</span>
                <span>{line[locale]}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <article className="rounded-2xl border border-white/10 bg-terminal-gray p-6">
            <h2 className="text-2xl font-semibold mb-4">{t.stack}</h2>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <span
                  key={`${study.slug}-${item}`}
                  className="px-3 py-1 rounded-full border border-neon-cyan/30 text-neon-cyan text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-terminal-gray p-6">
            <h2 className="text-2xl font-semibold mb-4">{t.codePreview}</h2>
            <pre className="text-xs md:text-sm text-neon-green font-mono whitespace-pre-wrap">
              {study.codeSnippet}
            </pre>
          </article>
        </section>

        <section className="rounded-2xl border border-neon-green/30 bg-neon-green/5 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">{t.discuss}</h2>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-neon-green text-terminal-black font-semibold hover:bg-neon-cyan transition-colors"
          >
            {t.discuss}
          </Link>
        </section>
      </div>
    </main>
  );
}
