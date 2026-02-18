"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

type FormState = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  company: string;
  startedAt: number;
};

type FormStatus = "idle" | "loading" | "success" | "error";

const copy = {
  en: {
    lineOne: "Build Something",
    lineTwo: "Exceptional",
    descriptionLineOne: "Let's architect systems that scale.",
    descriptionLineTwo: "Precision engineering for your vision.",
    secondaryCta: "View Work",
    formTitle: "Project Brief",
    formSubtitle: "Share your scope and I will get back with a concrete plan.",
    labels: {
      name: "Name",
      email: "Email",
      projectType: "Project Type",
      budget: "Budget",
      timeline: "Timeline",
      message: "Project Details",
    },
    placeholders: {
      name: "Your name",
      email: "you@example.com",
      message: "What are you building, for whom, and by when?",
    },
    options: {
      projectType: [
        { value: "web_app", label: "Web Application" },
        { value: "landing_page", label: "Landing Page" },
        { value: "ecommerce", label: "E-Commerce Website" },
        { value: "mobile_app", label: "Mobile App" },
        { value: "ui_ux_design", label: "UI/UX Design" },
        { value: "graphic_design", label: "Graphic Design" },
        { value: "video_editing", label: "Video Editing" },
        { value: "social_media", label: "Social Media Management" },
        { value: "ads_management", label: "Ads Management" },
        { value: "seo", label: "SEO Optimization" },
        { value: "article_writing", label: "Article Writing" },
        { value: "copywriting", label: "Copywriting" },
        { value: "translation", label: "Translation / Localization" },
        { value: "ai_system", label: "AI System" },
        { value: "automation", label: "Automation" },
        { value: "consulting", label: "Technical Consulting" },
        { value: "other_digital", label: "Other Digital Freelance Work" },
      ],
      budget: [
        { value: "lt_1k", label: "< $1K" },
        { value: "1k_5k", label: "$1K - $5K" },
        { value: "5k_20k", label: "$5K - $20K" },
        { value: "20k_plus", label: "> $20K" },
      ],
      timeline: [
        { value: "asap", label: "ASAP" },
        { value: "2_4_weeks", label: "2 - 4 Weeks" },
        { value: "1_3_months", label: "1 - 3 Months" },
        { value: "flexible", label: "Flexible" },
      ],
    },
    submit: {
      idle: "Send Inquiry",
      loading: "Sending...",
    },
    feedback: {
      success: "Thanks. Your inquiry has been sent.",
      genericError: "Failed to send inquiry. Please try again.",
    },
    contact: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
  id: {
    lineOne: "Bangun Sesuatu",
    lineTwo: "Luar Biasa",
    descriptionLineOne: "Mari rancang sistem yang scalable.",
    descriptionLineTwo: "Engineering presisi untuk visi Anda.",
    secondaryCta: "Lihat Karya",
    formTitle: "Ringkasan Proyek",
    formSubtitle:
      "Kirim scope proyek Anda, saya akan balas dengan rencana yang jelas.",
    labels: {
      name: "Nama",
      email: "Email",
      projectType: "Tipe Proyek",
      budget: "Budget",
      timeline: "Timeline",
      message: "Detail Proyek",
    },
    placeholders: {
      name: "Nama Anda",
      email: "anda@email.com",
      message: "Apa yang ingin dibangun, untuk siapa, dan target waktunya?",
    },
    options: {
      projectType: [
        { value: "web_app", label: "Aplikasi Web" },
        { value: "landing_page", label: "Landing Page" },
        { value: "ecommerce", label: "Website E-Commerce" },
        { value: "mobile_app", label: "Aplikasi Mobile" },
        { value: "ui_ux_design", label: "Desain UI/UX" },
        { value: "graphic_design", label: "Desain Grafis" },
        { value: "video_editing", label: "Editing Video" },
        { value: "social_media", label: "Manajemen Social Media" },
        { value: "ads_management", label: "Manajemen Iklan" },
        { value: "seo", label: "Optimasi SEO" },
        { value: "article_writing", label: "Penulisan Artikel" },
        { value: "copywriting", label: "Copywriting" },
        { value: "translation", label: "Terjemahan / Lokalisasi" },
        { value: "ai_system", label: "Sistem AI" },
        { value: "automation", label: "Otomasi" },
        { value: "consulting", label: "Konsultasi Teknis" },
        { value: "other_digital", label: "Pekerjaan Freelance Digital Lainnya" },
      ],
      budget: [
        { value: "lt_1k", label: "Rp300 - 900 Ribu" },
        { value: "1k_5k", label: "Rp1 - 9 Juta" },
        { value: "5k_20k", label: "Rp10 - 19 Juta" },
        { value: "20k_plus", label: "Rp20 - 99 Juta" },
      ],
      timeline: [
        { value: "asap", label: "Secepatnya" },
        { value: "2_4_weeks", label: "2 - 4 Minggu" },
        { value: "1_3_months", label: "1 - 3 Bulan" },
        { value: "flexible", label: "Fleksibel" },
      ],
    },
    submit: {
      idle: "Kirim Inquiry",
      loading: "Mengirim...",
    },
    feedback: {
      success: "Terima kasih. Inquiry Anda sudah terkirim.",
      genericError: "Gagal mengirim inquiry. Silakan coba lagi.",
    },
    contact: {
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
  },
} as const;

const initialFormState = (): FormState => ({
  name: "",
  email: "",
  projectType: "web_app",
  budget: "1k_5k",
  timeline: "2_4_weeks",
  message: "",
  company: "",
  startedAt: Date.now(),
});

export default function CTASection() {
  const { locale } = useLanguage();
  const t = copy[locale];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const gridSize = 40;
    const lineColor = "rgba(0, 255, 148, 0.1)";
    let offset = 0;
    let animationFrameId = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      for (let x = offset; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = offset; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      offset = (offset + 0.5) % gridSize;
      animationFrameId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          locale,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; message?: string };

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message || t.feedback.genericError);
      }

      setStatus("success");
      setFeedback(payload.message || t.feedback.success);
      setForm(initialFormState());
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : t.feedback.genericError
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-terminal-black py-20 px-6 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-2"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {t.lineOne}
            <br />
            <span className="neon-glow-green">{t.lineTwo}</span>
          </h2>

          <p className="text-xl text-steel mb-10 max-w-xl">
            {t.descriptionLineOne}
            <br />
            {t.descriptionLineTwo}
          </p>

          <a
            href="#work"
            className="inline-flex items-center justify-center px-10 py-4 bg-transparent neon-border-cyan text-neon-cyan font-semibold text-lg rounded-full hover:bg-neon-cyan/10 transition-colors"
          >
            {t.secondaryCta}
          </a>

          <div className="mt-12 flex flex-col gap-4 text-steel">
            <a
              href="mailto:revaldo@example.com"
              className="hover:text-neon-green transition-colors"
            >
              {t.contact.email}: revaldo@example.com
            </a>
            <a
              href="https://github.com"
              className="hover:text-neon-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.contact.github}: github.com/Revaldoo24
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-neon-green transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.contact.linkedin}: linkedin.com
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-terminal-gray/80 backdrop-blur-sm p-6 md:p-8"
        >
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">{t.formTitle}</h3>
          <p className="text-steel mb-6">{t.formSubtitle}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <label className="text-sm">
              <span className="text-steel">{t.labels.name}</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder={t.placeholders.name}
                className="mt-1 w-full rounded-lg bg-terminal-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon-cyan"
                required
                minLength={2}
                maxLength={80}
              />
            </label>

            <label className="text-sm">
              <span className="text-steel">{t.labels.email}</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder={t.placeholders.email}
                className="mt-1 w-full rounded-lg bg-terminal-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon-cyan"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <label className="text-sm">
              <span className="text-steel">{t.labels.projectType}</span>
              <select
                value={form.projectType}
                onChange={(e) => updateField("projectType", e.target.value)}
                className="mt-1 w-full rounded-lg bg-terminal-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon-cyan"
              >
                {t.options.projectType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="text-steel">{t.labels.budget}</span>
              <select
                value={form.budget}
                onChange={(e) => updateField("budget", e.target.value)}
                className="mt-1 w-full rounded-lg bg-terminal-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon-cyan"
              >
                {t.options.budget.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm">
              <span className="text-steel">{t.labels.timeline}</span>
              <select
                value={form.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className="mt-1 w-full rounded-lg bg-terminal-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon-cyan"
              >
                {t.options.timeline.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="text-sm block mb-4">
            <span className="text-steel">{t.labels.message}</span>
            <textarea
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder={t.placeholders.message}
              className="mt-1 w-full min-h-36 rounded-lg bg-terminal-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-neon-cyan resize-y"
              required
              minLength={20}
              maxLength={2000}
            />
          </label>

          <input
            type="text"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-full bg-neon-green text-terminal-black font-bold py-3 hover:bg-neon-cyan transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "loading" ? t.submit.loading : t.submit.idle}
          </button>

          {feedback && (
            <p
              className={`mt-4 text-sm ${
                status === "success" ? "text-neon-green" : "text-red-400"
              }`}
            >
              {feedback}
            </p>
          )}
        </motion.form>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-terminal-black to-transparent pointer-events-none" />
    </section>
  );
}
