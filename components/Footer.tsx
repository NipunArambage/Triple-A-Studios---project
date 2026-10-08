"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <>
      {/* ── Pre-footer CTA band ── */}
      <section className="relative py-24 px-6 lg:px-12 overflow-hidden">
        {/* Plum orb behind CTA */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="w-[800px] h-[400px] rounded-full bg-[#8E4585] blur-[120px]"
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] p-10 md:p-16 text-center"
          >
            {/* Plum top line */}
            <div className="w-16 h-px bg-[#8E4585] mx-auto mb-8" />

            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#8E4585] mb-5">
              Ready to begin?
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6">
              Let&apos;s create something<br />
              <span className="italic text-white/50">truly extraordinary.</span>
            </h2>
            <p className="text-white/40 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-10">
              Whether it&apos;s an intimate dinner for twenty or a gala for a thousand — we bring the same obsessive dedication to every celebration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/booking"
                id="cta-band-book"
                className="px-10 py-4 rounded-full font-semibold text-sm tracking-widest uppercase text-white bg-[#8E4585] hover:bg-[#8E4585]/90 hover:shadow-[0_0_40px_rgba(142,69,133,0.55)] transition-all duration-400"
              >
                Book a Consultation
              </a>
              <a
                href="#gallery"
                id="cta-band-gallery"
                className="px-10 py-4 rounded-full font-semibold text-sm tracking-widest uppercase text-white/50 border border-white/15 hover:text-white hover:border-white/35 transition-all duration-300"
              >
                View Our Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Footer ── */}
      <footer ref={ref} className="relative border-t border-white/6 py-20 px-6 lg:px-12">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[#8E4585]/5 blur-[80px]" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-5">
                <img 
                  src="/logo.jpg" 
                  alt="a³ Studios" 
                  className="w-12 h-12 rounded-full object-cover border border-[#8E4585]/40"
                />
                <div className="flex flex-col uppercase tracking-[0.18em] text-[10px] font-semibold leading-tight">
                  <span className="text-white">Triple A</span>
                  <span className="text-white/30">Design Studios</span>
                </div>
              </div>
              <p className="text-white/35 text-sm leading-relaxed max-w-sm">
                Crafting celebrations as monumental spatial narratives across Sri Lanka, Singapore & the Indian Ocean. Every event, an experience etched in memory.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3 mt-6">
                {["IG", "FB", "LI", "PI"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/30 hover:text-[#8E4585] hover:border-[#8E4585]/40 transition-all duration-300"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/30 mb-5">
                Navigate
              </h3>
              <ul className="space-y-3">
                {["Home", "Packages", "Gallery", "How It Works"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-white/40 hover:text-[#8E4585] transition-colors duration-300 group flex items-center gap-2"
                    >
                      <span className="block w-0 h-px bg-[#8E4585] group-hover:w-4 transition-all duration-300" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/30 mb-5">
                Contact Us
              </h3>
              <ul className="space-y-3 text-sm text-white/40">
                <li className="hover:text-white/60 transition-colors cursor-pointer">hello@tripleadesignstudios.com</li>
                <li className="hover:text-white/60 transition-colors cursor-pointer">+94 77 000 0000</li>
                <li>Colombo · Singapore</li>
              </ul>
              <a
                href="/booking"
                id="footer-book-cta"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-widest uppercase text-white bg-[#8E4585] hover:bg-[#8E4585]/90 hover:shadow-[0_0_20px_rgba(142,69,133,0.4)] transition-all duration-300"
              >
                Book Now
              </a>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="pt-8 border-t border-white/6 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-[11px] text-white/20 tracking-wider">
              © {new Date().getFullYear()} Triple A Design Studios. All rights reserved.
            </p>
            <p className="text-[11px] text-white/20 tracking-wider">
              Crafted with care · Delivered with precision
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
}
