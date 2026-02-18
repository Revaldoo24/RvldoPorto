"use client";

import { useState } from "react";
import { usePreloadImages } from "@/hooks/usePreloadImages";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import TechStack from "@/components/TechStack";
import LiveConsole from "@/components/LiveConsole";
import PromptShowcase from "@/components/PromptShowcase";
import BentoGrid from "@/components/BentoGrid";
import CertificationSection from "@/components/CertificationSection";
import StatsSection from "@/components/StatsSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTASection from "@/components/CTASection";
import AIChat from "@/components/AIChat";
import { useLanguage } from "@/contexts/LanguageContext";

const copy = {
  en: {
    footerLineOne: "(c) 2026 Revaldo Putra Anggara. Engineered with precision.",
    footerLineTwo: "Built with Next.js | Motion | Lenis",
  },
  id: {
    footerLineOne: "(c) 2026 Revaldo Putra Anggara. Dibangun dengan presisi.",
    footerLineTwo: "Dibangun menggunakan Next.js | Motion | Lenis",
  },
} as const;

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const { locale } = useLanguage();
  const t = copy[locale];

  const { progress, isLoaded, images } = usePreloadImages("/sequence", 121, "png");

  useSmoothScroll();

  const handlePreloaderComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      <Preloader
        progress={progress}
        isLoaded={isLoaded}
        onComplete={handlePreloaderComplete}
      />

      {showContent && (
        <main className="min-h-screen">
          <Navbar />
          <SequenceScroll images={images} />
          <TechStack />
          <LiveConsole />
          <PromptShowcase />
          <BentoGrid />
          <CertificationSection />
          <StatsSection />
          <TestimonialSlider />
          <CTASection />
          <AIChat />

          <footer className="bg-terminal-black border-t border-steel/10 py-8 px-6">
            <div className="max-w-7xl mx-auto text-center text-steel text-sm">
              <p>{t.footerLineOne}</p>
              <p className="mt-2 text-xs">{t.footerLineTwo}</p>
            </div>
          </footer>
        </main>
      )}
    </>
  );
}
