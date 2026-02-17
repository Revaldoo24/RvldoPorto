"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SequenceScrollProps {
  images: HTMLImageElement[];
}

export default function SequenceScroll({ images }: SequenceScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set canvas dimensions
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render image sequence on main canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    let rafId: number;

    const render = () => {
      const scrollProgress = scrollYProgress.get();
      const frameIndex = Math.min(
        Math.floor(scrollProgress * (images.length - 1)),
        images.length - 1
      );

      const img = images[frameIndex];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Calculate scaling to cover canvas while maintaining aspect ratio
      const canvasAspect = dimensions.width / dimensions.height;
      const imgAspect = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspect > imgAspect) {
        drawWidth = dimensions.width;
        drawHeight = dimensions.width / imgAspect;
        offsetX = 0;
        offsetY = (dimensions.height - drawHeight) / 2;
      } else {
        drawHeight = dimensions.height;
        drawWidth = dimensions.height * imgAspect;
        offsetX = (dimensions.width - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [images, dimensions, scrollYProgress]);

  // Particle Grid System
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    // Particle configuration
    const particleCount = isMobile ? 30 : 60;
    const connectionDistance = isMobile ? 120 : 150;
    const cursorInfluence = isMobile ? 80 : 120;

    interface Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
    }

    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    let rafId: number;

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Drift animation
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Return to base position
        const dx = particle.baseX - particle.x;
        const dy = particle.baseY - particle.y;
        particle.x += dx * 0.05;
        particle.y += dy * 0.05;

        // Cursor magnetic effect
        const cursorDx = cursorPosition.x - particle.x;
        const cursorDy = cursorPosition.y - particle.y;
        const cursorDist = Math.sqrt(cursorDx * cursorDx + cursorDy * cursorDy);

        if (cursorDist < cursorInfluence) {
          const force = (1 - cursorDist / cursorInfluence) * 0.3;
          particle.x += cursorDx * force;
          particle.y += cursorDy * force;
        }

        // Boundary check
        if (particle.x < 0 || particle.x > dimensions.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > dimensions.height) particle.vy *= -1;

        // Draw particle
        const glowIntensity = cursorDist < cursorInfluence ? 1 : 0.6;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 148, ${glowIntensity})`;
        ctx.fill();

        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i >= j) return;

          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.3;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 255, 148, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [dimensions, cursorPosition, isMobile]);

  // Track cursor/touch position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setCursorPosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Text animation values
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        {/* Image sequence canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ background: "#0B0F14" }}
        />

        {/* Interactive grid overlay */}
        <canvas
          ref={gridCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Text overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* 0% - Hero text */}
          <motion.div
            style={{ opacity: opacity1 }}
            className="absolute text-center px-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
              Revaldo Putra Anggara
            </h1>
            <p className="text-lg md:text-2xl text-steel tracking-wide">
              System Architect. Precision Developer.
            </p>
          </motion.div>

          {/* 30% - Left text */}
          <motion.div
            style={{ opacity: opacity2 }}
            className="absolute left-8 md:left-16 max-w-md"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight neon-glow-green">
              Logic over noise.
            </h2>
          </motion.div>

          {/* 60% - Right text */}
          <motion.div
            style={{ opacity: opacity3 }}
            className="absolute right-8 md:right-16 max-w-md text-right"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight neon-glow-cyan">
              Structure builds clarity.
            </h2>
          </motion.div>

          {/* 85% - CTA */}
          <motion.div
            style={{ opacity: opacity4 }}
            className="absolute text-center px-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              Engineer with intention.
              <br />
              <span className="text-steel text-2xl md:text-3xl">
                Let&apos;s build scalable systems.
              </span>
            </h2>
            <motion.button
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent neon-border-green rounded-full text-neon-green font-semibold tracking-wide hover:bg-neon-green/10 transition-colors pointer-events-auto"
            >
              Collaborate
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
