"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { id: "01", title: "Production", subtitle: "SCENOGRAPHY & CONCIERGE" },
  { id: "02", title: "Botanicals", subtitle: "MONUMENTAL SCULPTURES" },
  { id: "03", title: "Stationery", subtitle: "DECKLED TACTILE SUITES" },
  { id: "04", title: "Olfaction", subtitle: "VESSELS & SCENT ATMOSPHERE" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesList() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-6 lg:px-12 pb-24 mt-4">
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {services.map((service) => (
          <motion.div
            key={service.id}
            variants={itemVariants}
            whileHover={{ x: 6 }}
            className="relative pt-6 group cursor-default"
          >
            {/* Top border with plum hover animation */}
            <div className="absolute top-0 left-0 w-full h-px bg-white/10">
              <motion.div
                className="absolute inset-0 bg-[#8E4585]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="text-[10px] tracking-[0.2em] text-white/30 font-medium mb-5">
              [ {service.id} ]
            </div>

            <h3 className="font-serif text-3xl md:text-[32px] text-white mb-2 group-hover:text-white transition-colors duration-300">
              {service.title}
            </h3>

            <p className="text-[9px] uppercase tracking-[0.2em] text-[#8E4585]/60 font-bold mt-3 group-hover:text-[#8E4585] transition-colors duration-300">
              {service.subtitle}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
