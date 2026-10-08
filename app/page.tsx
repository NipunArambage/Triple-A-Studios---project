"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, LayoutGrid, CalendarDays, Mail, Star, Users, MapPin, CheckCircle, ArrowRight, Menu, X } from "lucide-react";

// --- NAVBAR COMPONENT ---
function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/booking" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 md:py-6 bg-gradient-to-b from-[#050505]/90 to-transparent backdrop-blur-sm"
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain" />
        </div>

        {/* Center: Navigation Items (Desktop) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = activeLink === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                className={`text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right: CTA Button (Desktop) & Hamburger (Mobile) */}
        <div className="flex items-center gap-4">
          <a
            href="/booking"
            className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white bg-[#7A3661]/90 backdrop-blur-md border border-[#7A3661]/50 hover:bg-[#7A3661] transition-all shadow-[0_0_20px_rgba(122,54,97,0.4)]"
          >
            Book Consultation
          </a>
          <button 
            className="md:hidden text-white hover:text-white/80 transition-colors p-2 -mr-2"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Right Sidebar Menu */}
      {/* Overlay */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm"
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 h-full w-[280px] bg-[#050505] border-l border-white/10 z-[70] md:hidden flex flex-col p-6 shadow-2xl"
      >
        <div className="flex justify-end mb-8">
          <button onClick={() => setIsMenuOpen(false)} className="text-white/70 hover:text-white p-2 -mr-2 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => {
            const isActive = activeLink === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.label);
                  setIsMenuOpen(false);
                }}
                className={`text-sm font-semibold tracking-widest uppercase transition-all duration-300 border-b border-white/5 pb-4 ${
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          
          <a
            href="/booking"
            className="mt-4 flex items-center justify-center px-6 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-[#7A3661]/90 transition-all text-center"
          >
            Book Consultation
          </a>
        </div>
      </motion.div>
    </>
  );
}

// --- TUNNEL IMAGE COMPONENT ---
function TunnelImage({ img, baseZTranslate }: { img: any, baseZTranslate: any }) {
  const zPosition = useTransform(baseZTranslate, (z) => z + img.initialZ);
  // Fade out well before reaching the camera (start at -600, fully gone at -200)
  const opacity = useTransform(zPosition, [-600, -200], [1, 0]);

  return (
    <motion.div
      suppressHydrationWarning
      className="absolute w-64 h-80 md:w-80 md:h-96 lg:w-[24rem] lg:h-[32rem] xl:w-[28rem] xl:h-[36rem] rounded-2xl lg:rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(122,54,97,0.15)]"
      style={{
        x: img.x,
        y: img.y,
        z: zPosition,
        opacity
      }}
    >
      <img src={img.src} alt="Event Memory" className="w-full h-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/80" />
    </motion.div>
  );
}

// --- HERO COMPONENT: 3D MEMORY TUNNEL ---
function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 18 images across exactly 3 depth layers (6 images each).
  // 17 unique images + image[0] repeated once in Layer 3.
  // Each layer has 6 positions evenly spread around the screen edges — center always clear.
  //
  // 6 positions per layer:
  //   [0] Top-Left  [1] Top-Right
  //   [2] Mid-Left  [3] Mid-Right
  //   [4] Bot-Left  [5] Bot-Right

  const images = [
    // ── LAYER 1 — Deepest (zooms in first) ───────────────────────────────────
    { src: "/hero/621848447_17993939222877131_8333462674463645102_n.jpg", x: "-58vw", y: "-28vh", initialZ: -5500 }, // TL
    { src: "/hero/631689845_17937778866150418_6385713466754071028_n.jpg", x:  "58vw", y: "-28vh", initialZ: -5500 }, // TR
    { src: "/hero/643556925_18074742518610403_6490087042240107978_n.jpg", x: "-65vw", y:   "5vh", initialZ: -5500 }, // ML
    { src: "/hero/657723799_17944075440150418_1007812871726275105_n.jpg", x:  "65vw", y:   "5vh", initialZ: -5500 }, // MR
    { src: "/hero/659790739_17944075458150418_1346727943459988503_n.jpg", x: "-38vw", y:  "42vh", initialZ: -5500 }, // BL
    { src: "/hero/670758186_17947210164150418_3383262450044641990_n.jpg", x:  "38vw", y:  "42vh", initialZ: -5500 }, // BR

    // ── LAYER 2 — Middle ─────────────────────────────────────────────────────
    { src: "/hero/718980915_17954330217150418_8002955018236714850_n.jpg", x: "-58vw", y: "-28vh", initialZ: -3300 }, // TL
    { src: "/hero/729517899_17956942341150418_2428405952751175522_n.jpg", x:  "58vw", y: "-28vh", initialZ: -3300 }, // TR
    { src: "/hero/730275133_17956942302150418_1881068074142399441_n.jpg", x: "-65vw", y:   "5vh", initialZ: -3300 }, // ML
    { src: "/hero/730313461_17957250834150418_7158865483969560520_n.jpg", x:  "65vw", y:   "5vh", initialZ: -3300 }, // MR
    { src: "/hero/730481081_17957250825150418_632041158573215947_n.jpg",  x: "-38vw", y:  "42vh", initialZ: -3300 }, // BL
    { src: "/hero/731163805_17956942314150418_8102722829699058608_n.jpg", x:  "38vw", y:  "42vh", initialZ: -3300 }, // BR

    // ── LAYER 3 — Closest (zooms in last) ────────────────────────────────────
    { src: "/hero/732584263_17957250783150418_2446060800365633050_n.jpg", x: "-58vw", y: "-28vh", initialZ: -1100 }, // TL
    { src: "/hero/733139694_17957250822150418_521846599997047810_n.jpg",  x:  "58vw", y: "-28vh", initialZ: -1100 }, // TR
    { src: "/hero/746484878_17959817235150418_3624927233354226246_n.jpg", x: "-65vw", y:   "5vh", initialZ: -1100 }, // ML
    { src: "/hero/748907732_17959817217150418_8031955162559802504_n.jpg", x:  "65vw", y:   "5vh", initialZ: -1100 }, // MR
    { src: "/hero/837268663_17971600980150418_4613754311559507995_n.jpg", x: "-38vw", y:  "42vh", initialZ: -1100 }, // BL
    { src: "/hero/621848447_17993939222877131_8333462674463645102_n.jpg", x:  "38vw", y:  "42vh", initialZ: -1100 }, // BR (image[0] repeated)
  ];

  // Translate all images forward. 7500px zooms through all 3 layers cleanly.
  const baseZTranslate = useTransform(scrollYProgress, [0, 0.82], [0, 7500]);

  // Hero background fades in smoothly as the last tunnel layer zooms through
  const bgOpacity = useTransform(scrollYProgress, [0.70, 0.88], [0, 1]);

  // Text fades in right after
  const textOpacity = useTransform(scrollYProgress, [0.84, 0.97], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.84, 0.97], [0.9, 1]);

  return (
    <section id="home" ref={containerRef} className="relative w-full h-[300vh]">
      <div 
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#050505] flex items-center justify-center" 
        style={{ perspective: "1200px" }}
      >
        
        {/* The 3D Environment */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          {images.map((img, i) => (
            <TunnelImage key={i} img={img} baseZTranslate={baseZTranslate} />
          ))}
        </div>

        {/* Final Reveal Background Image — fades in directly over the tunnel */}
        <motion.div 
          suppressHydrationWarning
          style={{ opacity: bgOpacity }} 
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <img src="/hero-bg.jpg" alt="Hero Background" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60" />
        </motion.div>

        {/* Final Reveal Typography & Button */}
        <motion.div
          suppressHydrationWarning
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute z-40 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl"
        >
          {/* Top Pill */}
          <div className="mb-6 flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] md:text-xs uppercase tracking-widest text-white/80 shadow-lg">
            <Star size={14} className="text-[#C46497]" /> 
            Triple A Design Studios
          </div>

          {/* Headlines */}
          <h1 className="font-sans text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-light tracking-tight text-white drop-shadow-2xl mb-2">
            CURATED ELEGANCE.
          </h1>
          <h2 className="font-sans text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-light italic text-[#C46497] drop-shadow-2xl mb-10">
            TIMELESS CELEBRATIONS.
          </h2>

          {/* Tagline & Location */}
          <p className="text-[#9CA3AF] max-w-2xl text-sm md:text-base leading-relaxed mb-4">
            Curating stories through design.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-[11px] text-white/50 tracking-widest">
            <span>Event Planning</span><span className="text-[#C46497]">&bull;</span>
            <span>Floral Styling</span><span className="text-[#C46497]">&bull;</span>
            <span>Wedding Stationery</span><span className="text-[#C46497]">&bull;</span>
            <span>Atelier Candles</span>
          </div>
          <div className="flex items-center gap-2 mb-8 text-[11px] text-white/40 uppercase tracking-widest">
            <MapPin size={12} className="text-[#C46497]" />
            Sri Lanka &nbsp;|&nbsp; Singapore
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto justify-center flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-[#7A3661]/90 hover:bg-[#7A3661] transition-all shadow-[0_0_30px_rgba(122,54,97,0.4)]">
              Explore Works <ArrowRight size={16} />
            </button>
            <a href="/booking" className="w-full sm:w-auto text-center px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all">
              Book Consultation
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// --- STATS COMPONENT ---
function Stats() {
  const stats = [
    { label: "Events Designed", value: "300+", icon: Star },
    { label: "Success Rate", value: "100%", icon: CheckCircle },
    { label: "Team Members", value: "25", icon: Users },
    { label: "Global Locations", value: "12", icon: MapPin },
  ];

  return (
    <section id="stats" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative z-40 bg-[#050505]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:border-[#7A3661]/50 transition-colors"
            >
              <Icon className="text-[#7A3661] mb-4" size={32} />
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-[#9CA3AF] text-sm uppercase tracking-widest text-center">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// --- SERVICES COMPONENT ---
function Services() {
  const services = [
    {
      title: "Event Planning",
      desc: "Full-service event design and curation — from intimate celebrations to grand milestone events.",
      img: "/hero/631689845_17937778866150418_6385713466754071028_n.jpg"
    },
    {
      title: "Floral Styling",
      desc: "Monumental botanical installations and delicate floral scapes that transform any space.",
      img: "/hero/621848447_17993939222877131_8333462674463645102_n.jpg"
    },
    {
      title: "Wedding Stationery",
      desc: "Bespoke paper suites, invitations, and tactile print collateral crafted for your story.",
      img: "/hero/643556925_18074742518610403_6490087042240107978_n.jpg"
    },
    {
      title: "Atelier Candles",
      desc: "Artisan hand-poured candles and curated scent atmospheres for your event and home.",
      img: "/hero/730481081_17957250825150418_632041158573215947_n.jpg"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto relative z-40 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto">Crafting experiences that transcend the ordinary.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:border-[#7A3661]/50 transition-all duration-500 hover:scale-105 flex flex-col"
          >
            {/* Image */}
            <div className="h-56 w-full overflow-hidden relative flex-shrink-0">
              <img src={svc.img} alt={svc.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#050505]/30 to-transparent" />
            </div>
            {/* Content */}
            <div className="p-7 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
              <p className="text-[#9CA3AF] mb-6 text-sm leading-relaxed flex-1 line-clamp-3">{svc.desc}</p>
              <button className="self-start flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C46497] group-hover:text-white transition-colors bg-white/5 hover:bg-[#7A3661]/30 px-4 py-2.5 rounded-full backdrop-blur-md border border-white/10 hover:border-[#7A3661]/50">
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- TIMELINE COMPONENT ---
function Timeline() {
  const steps = [
    { num: "01", title: "Inquiry & Vision", desc: "We begin with a consultation to understand your exact aesthetic and goals." },
    { num: "02", title: "Design & Planning", desc: "Our team drafts meticulous blueprints, floral plans, and production schedules." },
    { num: "03", title: "The Event Day", desc: "Flawless on-site execution, ensuring every detail is perfectly realized." },
  ];

  return (
    <section id="timeline" className="py-32 px-6 lg:px-12 max-w-3xl mx-auto relative z-40 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
        <p className="text-[#9CA3AF]">A seamless journey from concept to celebration.</p>
      </motion.div>

      <div className="space-y-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex flex-col md:flex-row gap-6 items-start p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:border-[#7A3661]/30 transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#7A3661] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-4xl md:text-5xl font-bold text-[#7A3661]/40 group-hover:text-[#7A3661] transition-colors">{step.num}</div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-[#9CA3AF] leading-relaxed">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- MAIN APP EXPORT ---
export default function Page() {
  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#7A3661] selection:text-white pb-32">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <Timeline />
    </main>
  );
}
