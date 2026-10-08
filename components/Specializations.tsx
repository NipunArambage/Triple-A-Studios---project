"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const specializations = [
  {
    id: "spec-weddings",
    title: "Weddings",
    emoji: "💍",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    tagline: "Where love becomes legend.",
    description:
      "From intimate garden ceremonies to grand ballroom galas — we architect every detail of your most important day. Monumental floral scapes, tactile papercraft, and bespoke olfactory compositions that linger in memory for decades.",
    tags: ["Floral Design", "Venue Styling", "Bespoke Catering"],
  },
  {
    id: "spec-corporate",
    title: "Corporate",
    emoji: "🏢",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    tagline: "Command presence. Leave an impression.",
    description:
      "Product launches, executive retreats, and summit galas elevated to experiential art. We translate brand identity into spatial narrative — transforming conference halls into immersive environments.",
    tags: ["Brand Integration", "AV Production", "Keynote Setup"],
  },
  {
    id: "spec-private",
    title: "Private Parties",
    emoji: "🥂",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    tagline: "Intimate. Exclusive. Extraordinary.",
    description:
      "From milestone birthdays to anniversary soirées, we curate private gatherings where every guest feels like royalty. High-altitude residences, heritage estates, and coastal villas — your story, told with grandeur.",
    tags: ["Exclusive Venues", "Custom Décor", "Personal Chef"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 70, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Specializations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="packages" ref={sectionRef} className="relative py-28 px-6 lg:px-12">
      {/* Ambient left glow */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 w-[400px] h-[600px] rounded-full bg-[#8E4585]/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#8E4585] mb-4">
            Our Specializations
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-lg leading-[1.1]">
              Every occasion,<br />
              <span className="italic text-white/55">crafted precisely.</span>
            </h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Three pillars of expertise — each approached with the same meticulous devotion to creating the extraordinary.
            </p>
          </div>
        </motion.div>

        {/* Staggered Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {specializations.map((spec) => (
            <motion.article
              key={spec.id}
              id={spec.id}
              variants={cardVariants}
              onMouseEnter={() => setHovered(spec.id)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ scale: 1.03, y: -8 }}
              style={{ willChange: "transform" }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer
                          bg-white/4 backdrop-blur-lg
                          transition-all duration-500
                          ${
                            hovered === spec.id
                              ? "border border-[#8E4585]/70 shadow-[0_0_50px_rgba(142,69,133,0.2),0_0_100px_rgba(142,69,133,0.06)]"
                              : "border border-white/8"
                          }`}
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={spec.image}
                  alt={spec.title}
                  className={`w-full h-full object-cover transition-transform duration-800 ${
                    hovered === spec.id ? "scale-112" : "scale-100"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                {/* Emoji badge */}
                <motion.div
                  animate={hovered === spec.id ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#8E4585]/25 backdrop-blur-md border border-[#8E4585]/40 flex items-center justify-center text-xl"
                >
                  {spec.emoji}
                </motion.div>

                {/* Plum corner light on hover */}
                <motion.div
                  animate={{ opacity: hovered === spec.id ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(142,69,133,0.25),transparent_60%)]"
                />
              </div>

              {/* Body */}
              <div className="p-6 relative overflow-hidden">
                <h3 className="text-xl font-semibold text-white mb-1 tracking-wide">
                  {spec.title}
                </h3>
                <p className="text-[#8E4585] text-[13px] font-medium italic mb-4">
                  {spec.tagline}
                </p>

                {/* Description slides up on hover */}
                <motion.div
                  initial={false}
                  animate={{
                    y: hovered === spec.id ? 0 : 14,
                    opacity: hovered === spec.id ? 1 : 0,
                    height: hovered === spec.id ? "auto" : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    {spec.description}
                  </p>
                </motion.div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {spec.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-colors duration-300
                                 bg-white/6 border text-white/50
                                 ${hovered === spec.id ? "border-[#8E4585]/40 text-white/70" : "border-white/10"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA button */}
                <motion.a
                  href="#how-it-works"
                  id={`${spec.id}-learn-more`}
                  animate={{
                    x: hovered === spec.id ? 0 : -6,
                    opacity: hovered === spec.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold tracking-wider uppercase
                             bg-[#8E4585] text-white hover:bg-[#8E4585]/90 transition-colors duration-300"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
