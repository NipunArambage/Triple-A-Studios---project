"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    id: "stat-events",
    value: 300,
    suffix: "+",
    label: "Events Crafted",
    sub: "Across Sri Lanka, Singapore & the Indian Ocean",
    icon: "🎊",
  },
  {
    id: "stat-success",
    value: 100,
    suffix: "%",
    label: "Client Success Rate",
    sub: "Every celebration delivered to perfection",
    icon: "⭐",
  },
  {
    id: "stat-venues",
    value: 50,
    suffix: "+",
    label: "Exclusive Venues",
    sub: "From grand estates to historic halls",
    icon: "🏛️",
  },
  {
    id: "stat-years",
    value: 12,
    suffix: "+",
    label: "Years of Excellence",
    sub: "Trusted by discerning clients worldwide",
    icon: "✨",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="stats" ref={sectionRef} className="relative py-28 px-6 lg:px-12">
      {/* Ambient plum orb */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[700px] h-[400px] rounded-full bg-[#8E4585] blur-[120px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#8E4585] mb-4">
            By the numbers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            A Legacy of Excellence
          </h2>
          <p className="text-white/35 text-sm max-w-md mx-auto leading-relaxed">
            Numbers that speak to our unwavering commitment to creating extraordinary experiences.
          </p>
        </motion.div>

        {/* Stats grid with stagger */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              id={stat.id}
              variants={cardVariants}
              whileHover={{ scale: 1.04, y: -6 }}
              className="group relative rounded-2xl p-8 text-center overflow-hidden cursor-default
                         bg-white/4 backdrop-blur-lg border border-white/8
                         hover:border-[#8E4585]/60 hover:bg-[#8E4585]/8
                         transition-colors duration-500"
            >
              {/* Hover glow */}
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                              bg-[radial-gradient(ellipse_at_50%_0%,rgba(142,69,133,0.15),transparent_70%)]" />
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8E4585]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="text-3xl mb-4 opacity-70">{stat.icon}</div>
                <div className="text-5xl md:text-6xl font-bold text-white mb-3 font-serif">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-semibold text-white mb-2 tracking-wide">
                  {stat.label}
                </div>
                <div className="text-[12px] text-white/35 leading-relaxed">
                  {stat.sub}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[#8E4585]/30 to-transparent"
          style={{ originX: 0.5 }}
        />
      </div>
    </section>
  );
}
