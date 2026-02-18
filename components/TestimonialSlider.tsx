"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
}

const testimonialsByLocale: Record<"en" | "id", Testimonial[]> = {
  en: [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Inc",
      content:
        "Revaldo's architectural decisions saved us months of refactoring. His systems thinking is unmatched.",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "VP Engineering",
      company: "CloudScale",
      content:
        "A rare engineer who balances technical excellence with business pragmatism. Delivered a platform handling 10M users.",
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Product Lead",
      company: "DataSync",
      content:
        "Transformed our proof-of-concept into a production system in record time. Precision meets velocity.",
    },
  ],
  id: [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Inc",
      content:
        "Keputusan arsitektur Revaldo menghemat berbulan-bulan refactor. Cara berpikir sistemnya benar-benar unggul.",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "VP Engineering",
      company: "CloudScale",
      content:
        "Engineer langka yang menyeimbangkan excellence teknis dan pragmatisme bisnis. Berhasil deliver platform untuk 10M pengguna.",
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Product Lead",
      company: "DataSync",
      content:
        "Mengubah proof-of-concept kami menjadi sistem production dalam waktu sangat cepat. Presisi bertemu kecepatan.",
    },
  ],
};

const copy = {
  en: {
    title: "Trusted By Leaders",
    subtitle: "Collaborations that drive results.",
    swipeHint: "Swipe or use arrows to navigate",
    prevLabel: "Previous testimonial",
    nextLabel: "Next testimonial",
    dotLabel: "Go to testimonial",
  },
  id: {
    title: "Dipercaya Para Leader",
    subtitle: "Kolaborasi yang menghasilkan dampak.",
    swipeHint: "Geser atau gunakan panah untuk navigasi",
    prevLabel: "Testimoni sebelumnya",
    nextLabel: "Testimoni berikutnya",
    dotLabel: "Pergi ke testimoni",
  },
} as const;

export default function TestimonialSlider() {
  const { locale } = useLanguage();
  const t = copy[locale];
  const testimonials = testimonialsByLocale[locale];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="about"
      className="min-h-[100dvh] bg-terminal-gray py-20 px-6 flex items-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-steel text-lg">{t.subtitle}</p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-terminal-black p-8 md:p-12 rounded-lg border border-neon-cyan/30"
            >
              <div className="mb-6">
                <p className="text-2xl md:text-3xl text-white leading-relaxed mb-8">
                  &quot;{testimonials[currentIndex].content}&quot;
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-neon-cyan font-semibold text-lg">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-steel text-sm">
                    {testimonials[currentIndex].role} -{" "}
                    {testimonials[currentIndex].company}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? "bg-neon-cyan w-8" : "bg-steel/30"
                      }`}
                      aria-label={`${t.dotLabel} ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-neon-cyan/30 flex items-center justify-center hover:bg-neon-cyan/10 transition-colors"
              aria-label={t.prevLabel}
            >
              <svg
                className="w-6 h-6 text-neon-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-neon-cyan/30 flex items-center justify-center hover:bg-neon-cyan/10 transition-colors"
              aria-label={t.nextLabel}
            >
              <svg
                className="w-6 h-6 text-neon-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center text-steel text-sm md:hidden">
            {t.swipeHint}
          </div>
        </div>
      </div>
    </section>
  );
}
