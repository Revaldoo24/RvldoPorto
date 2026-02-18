"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const copy = {
  en: {
    work: "Work",
    certification: "Certification",
    about: "About",
    contact: "Contact",
    role: "System Architect. Precision Developer.",
  },
  id: {
    work: "Karya",
    certification: "Sertifikasi",
    about: "Tentang",
    contact: "Kontak",
    role: "Arsitek Sistem. Precision Developer.",
  },
} as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { locale, setLocale } = useLanguage();
  const t = copy[locale];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent background scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const menuItems = [
    { label: t.work, href: "#work" },
    { label: t.certification, href: "#certification" },
    { label: t.about, href: "#about" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-terminal-black/80 backdrop-blur-md border-b border-steel/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-white">RPA</span>
            <span className="text-neon-green">.</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-steel hover:text-neon-green transition-colors text-sm tracking-wide"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Language Toggle */}
            <div className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1">
              <button
                onClick={() => setLocale("id")}
                className={`px-2 py-1 text-xs font-mono rounded-full transition-colors ${
                  locale === "id"
                    ? "bg-neon-green text-terminal-black"
                    : "text-steel hover:text-white"
                }`}
                aria-label="Switch language to Indonesian"
              >
                ID
              </button>
              <button
                onClick={() => setLocale("en")}
                className={`px-2 py-1 text-xs font-mono rounded-full transition-colors ${
                  locale === "en"
                    ? "bg-neon-green text-terminal-black"
                    : "text-steel hover:text-white"
                }`}
                aria-label="Switch language to English"
              >
                EN
              </button>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center group"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col space-y-1.5">
                <motion.span
                  animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-full bg-neon-green"
                />
                <motion.span
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-0.5 w-full bg-neon-green"
                />
                <motion.span
                  animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block h-0.5 w-full bg-neon-green"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-steel/10">
          <motion.div
            className="h-full bg-neon-green"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-terminal-black/95 backdrop-blur-xl"
          >
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              <div className="w-6 flex flex-col space-y-1.5">
                <motion.span
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: 45, y: 6 }}
                  className="block h-0.5 w-full bg-neon-green"
                />
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  className="block h-0.5 w-full bg-neon-green"
                />
                <motion.span
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: -45, y: -6 }}
                  className="block h-0.5 w-full bg-neon-green"
                />
              </div>
            </button>

            {/* Menu content */}
            <div className="h-full flex items-center justify-center">
              <div className="space-y-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-6xl md:text-8xl font-bold tracking-tight hover:text-neon-green transition-colors text-center"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-8 right-8 text-center text-steel text-sm"
            >
              <p>Revaldo Putra Anggara</p>
              <p className="text-xs mt-2">{t.role}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
