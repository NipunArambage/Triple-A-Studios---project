"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const galleryImages = [
  {
    id: "gallery-1",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    alt: "Elegant wedding ceremony",
    span: "col-span-1 row-span-2",
    label: "Wedding · Colombo",
    category: "Weddings",
  },
  {
    id: "gallery-2",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
    alt: "Grand event venue",
    span: "col-span-1 row-span-1",
    label: "Corporate · Singapore",
    category: "Corporate",
  },
  {
    id: "gallery-3",
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
    alt: "Intimate private party",
    span: "col-span-1 row-span-1",
    label: "Private · Galle",
    category: "Private",
  },
  {
    id: "gallery-4",
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    alt: "Corporate gala event",
    span: "col-span-2 row-span-1",
    label: "Gala · Marina Bay",
    category: "Corporate",
  },
  {
    id: "gallery-5",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    alt: "Luxury floral arrangement",
    span: "col-span-1 row-span-1",
    label: "Botanicals · Kandy",
    category: "Weddings",
  },
];

// Horizontal scroll marquee strip images
const marqueeImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&h=250&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=400&h=250&q=80",
];

function MarqueeStrip({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...marqueeImages, ...marqueeImages];

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: reverse ? ["0%", "50%"] : ["-50%", "0%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ width: "max-content" }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-72 h-44 rounded-xl overflow-hidden border border-white/8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Gallery ${i}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Slow parallax shift on heading as user scrolls
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="gallery" ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* Right ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[#8E4585]/6 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading with subtle parallax */}
        <motion.div
          style={{ y: headingY }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#8E4585] mb-4">
              Gallery
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              Moments we&apos;ve<br />
              <span className="italic text-white/50">made eternal.</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            A curated glimpse into the worlds we have crafted — across continents, cultures, and celebrations.
          </p>
        </motion.div>

        {/* Main masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 auto-rows-[240px] gap-4 mb-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              id={img.id}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.75, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer ${img.span}
                          border border-white/8 hover:border-[#8E4585]/50
                          transition-colors duration-500`}
              onMouseEnter={() => setHoveredId(img.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  hoveredId === img.id ? "scale-110" : "scale-100"
                }`}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-400 ${
                  hoveredId === img.id ? "opacity-100" : "opacity-60"
                } bg-gradient-to-t from-[#050505]/85 via-transparent to-transparent`}
              />

              {/* Category pill (always visible, top left) */}
              <div className="absolute top-3 left-3">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider
                                 bg-[#050505]/60 backdrop-blur-md border border-white/15 text-white/60">
                  {img.category}
                </span>
              </div>

              {/* Label on hover */}
              <motion.div
                animate={{
                  y: hoveredId === img.id ? 0 : 10,
                  opacity: hoveredId === img.id ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute bottom-4 left-4 right-4"
              >
                <span className="inline-block px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide
                                 bg-[#8E4585]/25 backdrop-blur-md border border-[#8E4585]/40 text-white">
                  {img.label}
                </span>
              </motion.div>

              {/* Plum overlay on hover */}
              <motion.div
                animate={{ opacity: hoveredId === img.id ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-[#8E4585]/8 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Animated marquee scroll strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 space-y-4"
      >
        <MarqueeStrip reverse={false} />
        <MarqueeStrip reverse={true} />
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center mt-12 px-6"
      >
        <a
          href="#how-it-works"
          id="gallery-view-all"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase
                     text-white border border-[#8E4585]/50 bg-[#8E4585]/10 hover:bg-[#8E4585]/25 hover:border-[#8E4585]
                     hover:shadow-[0_0_30px_rgba(142,69,133,0.4)] transition-all duration-400"
        >
          View Full Gallery
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
