"use client";

import { useState, useEffect } from "react";
import { usePreloadImages } from "@/hooks/usePreloadImages";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import TechStack from "@/components/TechStack";
import LiveConsole from "@/components/LiveConsole";
import PromptShowcase from "@/components/PromptShowcase";
import BentoGrid from "@/components/BentoGrid";
import StatsSection from "@/components/StatsSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import CTASection from "@/components/CTASection";
import AIChat from "@/components/AIChat";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  
  // Preload image sequence (121 frames)
  const { progress, isLoaded, images } = usePreloadImages("/sequence", 121, "png");

  // Initialize smooth scroll
  useSmoothScroll();

  const handlePreloaderComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      {/* Preloader */}
      <Preloader
        progress={progress}
        isLoaded={isLoaded}
        onComplete={handlePreloaderComplete}
      />

      {/* Main content */}
      {showContent && (
        <main className="min-h-screen">
          {/* Navigation */}
          <Navbar />

          {/* Hero section with image sequence and interactive grid */}
          <SequenceScroll images={images} />

          {/* Tech Stack Arsenal */}
          <TechStack />

          {/* Live system console */}
          <LiveConsole />

          {/* Prompt Engineering Showcase */}
          <PromptShowcase />

          {/* Project showcase */}
          <BentoGrid />

          {/* Stats */}
          <StatsSection />

          {/* Testimonials */}
          <TestimonialSlider />

          {/* Call to action */}
          <CTASection />

          {/* AI Chat Assistant (Floating) */}
          <AIChat />

          {/* Footer */}
          <footer className="bg-terminal-black border-t border-steel/10 py-8 px-6">
            <div className="max-w-7xl mx-auto text-center text-steel text-sm">
              <p>© 2026 Revaldo Putra Anggara. Engineered with precision.</p>
              <p className="mt-2 text-xs">
                Built with Next.js · Motion · Lenis
              </p>
            </div>
          </footer>
        </main>
      )}
    </>
  );
}
