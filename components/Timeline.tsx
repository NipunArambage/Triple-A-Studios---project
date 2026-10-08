"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    id: "step-inquiry",
    number: "01",
    title: "Inquiry",
    description:
      "Tell us about your vision. Fill out our brief form or schedule a discovery call. We listen first — every detail matters.",
    icon: "✉️",
    detail: "Response within 24 hours",
  },
  {
    id: "step-booking",
    number: "02",
    title: "Booking",
    description:
      "We present a bespoke proposal tailored to your event. Once aligned, a simple agreement and deposit secures your date.",
    icon: "📋",
    detail: "Transparent pricing, no hidden fees",
  },
  {
    id: "step-planning",
    number: "03",
    title: "Planning",
    description:
      "Our creative team develops a full event blueprint — mood boards, vendor coordination, timeline architecture, and spatial layouts.",
    icon: "🎨",
    detail: "Dedicated event director assigned",
  },
  {
    id: "step-finalizing",
    number: "04",
    title: "Finalizing",
    description:
      "Every element is confirmed, rehearsed, and stress-tested. Logistics are locked, team is briefed, and contingencies are prepared.",
    icon: "✅",
    detail: "Final walkthrough 48 hours prior",
  },
  {
    id: "step-event-day",
    number: "05",
    title: "Event Day",
    description:
      "We execute with precision and grace. Your only job is to be present and savour every extraordinary moment.",
    icon: "🎉",
    detail: "On-site team from setup to teardown",
  },
];

function TimelineNode({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative flex gap-8 md:gap-12">
      {/* Left: number + connector */}
      <div className="flex flex-col items-center flex-shrink-0 w-14 md:w-16">
        {/* Node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-bold text-base
                      border-2 transition-all duration-700
                      ${
                        inView
                          ? "border-[#8E4585] bg-[#8E4585]/20 text-white shadow-[0_0_24px_rgba(142,69,133,0.55)]"
                          : "border-white/20 bg-white/5 text-white/30"
                      }`}
        >
          <span className="font-serif">{step.number}</span>
          {/* Pulse ring */}
          {inView && (
            <>
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.9, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-[#8E4585]"
              />
              <motion.div
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                className="absolute inset-0 rounded-full border border-[#8E4585]"
              />
            </>
          )}
        </motion.div>

        {/* Vertical connector line */}
        {index < steps.length - 1 && (
          <div className="relative flex-1 w-px mt-2 bg-white/8 overflow-hidden min-h-[60px]">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
              style={{ originY: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-[#8E4585] to-[#8E4585]/15"
            />
          </div>
        )}
      </div>

      {/* Right: content card */}
      <motion.div
        initial={{ opacity: 0, x: 45 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`mb-12 flex-1 rounded-2xl p-6 group
                    bg-white/4 backdrop-blur-lg border border-white/8
                    hover:border-[#8E4585]/50 hover:bg-[#8E4585]/6
                    transition-all duration-400 cursor-default`}
      >
        <div className="flex items-start gap-4">
          <motion.span
            animate={inView ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-2xl flex-shrink-0 mt-0.5"
          >
            {step.icon}
          </motion.span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <h3 className="text-lg font-semibold text-white tracking-wide">
                {step.title}
              </h3>
              <span className="text-[10px] font-medium tracking-wider uppercase text-[#8E4585] bg-[#8E4585]/10 border border-[#8E4585]/20 px-2.5 py-1 rounded-full">
                {step.detail}
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
          </div>
        </div>

        {/* Bottom progress bar (inView trigger) */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{ originX: 0 }}
          className="mt-4 h-px bg-gradient-to-r from-[#8E4585]/50 to-transparent"
        />
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for decorative image
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-28 px-6 lg:px-12">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-0 w-[450px] h-[650px] rounded-full bg-[#8E4585]/5 blur-[130px]" />
        <div className="absolute bottom-0 left-20 w-[300px] h-[400px] rounded-full bg-[#8E4585]/4 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: sticky heading block */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#8E4585] mb-4">
                How it Works
              </p>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-8">
                Five steps to<br />
                <span className="italic text-white/50">your perfect day.</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm">
                Our proven process ensures every event — from the first conversation to the final applause — is executed with seamless precision and heartfelt care.
              </p>

              <a
                href="#"
                id="timeline-book-cta"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-sm tracking-widest uppercase text-white bg-[#8E4585] hover:bg-[#8E4585]/90 hover:shadow-[0_0_35px_rgba(142,69,133,0.5)] transition-all duration-400"
              >
                Start Your Journey
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

              {/* Decorative image with parallax */}
              <motion.div
                style={{ y: imgY }}
                className="mt-14 relative rounded-2xl overflow-hidden h-52 border border-white/8 hidden lg:block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80"
                  alt="Event planning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs text-white/60 font-medium">
                    ✦ &nbsp; Trusted by 300+ couples and corporations worldwide
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: timeline nodes */}
          <div className="flex flex-col pt-2">
            {steps.map((step, i) => (
              <TimelineNode key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
