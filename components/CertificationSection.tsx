"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const copy = {
  en: {
    title: "Certifications",
    subtitle:
      "Professional certificates and credentials will be listed here.",
    note: "Certification list is being prepared.",
  },
  id: {
    title: "Sertifikasi",
    subtitle:
      "Sertifikat profesional dan kredensial akan ditampilkan di sini.",
    note: "Daftar sertifikasi sedang disiapkan.",
  },
} as const;

export default function CertificationSection() {
  const { locale } = useLanguage();
  const t = copy[locale];

  return (
    <section
      id="certification"
      className="min-h-[70vh] bg-terminal-black py-20 px-6 flex items-center"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-steel text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-neon-cyan/30 bg-terminal-gray px-6 py-8 text-center"
        >
          <p className="font-mono text-neon-cyan">{t.note}</p>
        </motion.div>
      </div>
    </section>
  );
}
