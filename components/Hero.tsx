"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Animate the scale of the mask container.
  const maskScale = useTransform(scrollYProgress, [0, 0.8], [1, 200]);
  
  // Inverse scale for the inner image so it remains perfectly static
  const imageScale = useTransform(maskScale, (s) => 1 / s);

  // Fallback fade-in for the background image. 
  // This guarantees the full image is revealed at the end of the scroll,
  // even if the mask zooms into a transparent gap in the logo.
  const bgFadeIn = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);

  // Text animations
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.95], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.7, 0.95], [40, 0]);

  const heroImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80";

  // By keeping the origin exactly at 50% 50%, the logo stays dead center while zooming.
  const zoomOrigin = "50% 50%";

  return (
    <section id="home" ref={containerRef} className="relative w-full h-[300vh]">
      {/* Initial State: Solid Plum (#8E4585) background */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#8E4585] flex items-center justify-center">
        
        {/* 
          Layer 1: Fallback Background Image.
          Fades in at the end of the scroll to ensure the image is 100% visible full-screen,
          overriding any mask transparent gaps.
        */}
        <motion.div 
          style={{ opacity: bgFadeIn }} 
          className="absolute inset-0 w-screen h-screen z-0"
        >
          <img src={heroImage} className="w-full h-full object-cover" alt="Hero background" />
          <div className="absolute inset-0 bg-[#050505]/40" />
        </motion.div>

        {/* 
          Layer 2: The Mask Reveal.
          Scales massively while inverse-scaling the inner image.
        */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
          style={{
            scale: maskScale,
            transformOrigin: zoomOrigin,
            maskImage: "url('/a3-logo.png')",
            WebkitMaskImage: "url('/a3-logo.png')",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "min(30vh, 70vw)", // Responsive base size of the logo in the center
            WebkitMaskSize: "min(30vh, 70vw)",
          }}
        >
          {/* Background image inverse-scaled to stay static */}
          <motion.div 
            style={{ scale: imageScale, transformOrigin: zoomOrigin }}
            className="w-screen h-screen flex-shrink-0"
          >
            <img src={heroImage} className="w-full h-full object-cover" alt="Hero background" />
            <div className="absolute inset-0 bg-[#050505]/40" />
          </motion.div>
        </motion.div>

        {/* Layer 3: Hero Content Revealed */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[7.5rem] leading-[1.05] text-white mb-6">
            Crafting<br />Unforgettable Events
          </h1>
          <p className="text-white/80 max-w-2xl text-base md:text-lg mb-10 font-light">
            We transform extraordinary spaces into singular ceremonies — weaving production, floral scapes, and bespoke olfactory compositions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <a
              href="#how-it-works"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase text-white bg-[#8E4585] hover:bg-[#8E4585]/90 hover:shadow-[0_0_30px_rgba(142,69,133,0.5)] transition-all duration-300"
            >
              Plan Your Event
            </a>
            <a
              href="#packages"
              className="w-full sm:w-auto text-center px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase text-white border border-white/20 hover:text-black hover:bg-white transition-all duration-300"
            >
              View Packages
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
