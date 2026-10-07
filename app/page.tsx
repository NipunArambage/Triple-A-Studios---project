"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Home, LayoutGrid, CalendarDays, Mail, Star, Users, MapPin, CheckCircle, ArrowRight } from "lucide-react";

// --- NAVBAR COMPONENT ---
function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Events", href: "#stats" },
    { label: "Contact", href: "#timeline" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-gradient-to-b from-[#050505]/90 to-transparent backdrop-blur-sm"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain" />
      </div>

      {/* Center: Navigation Items */}
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

      {/* Right: CTA Button */}
      <a
        href="#timeline"
        className="hidden md:flex items-center justify-center px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white bg-[#7A3661]/90 backdrop-blur-md border border-[#7A3661]/50 hover:bg-[#7A3661] transition-all shadow-[0_0_20px_rgba(122,54,97,0.4)]"
      >
        Book Consultation
      </a>
    </motion.nav>
  );
}

// --- TUNNEL IMAGE COMPONENT ---
function TunnelImage({ img, baseZTranslate }: { img: any, baseZTranslate: any }) {
  const zPosition = useTransform(baseZTranslate, (z) => z + img.initialZ);
  const opacity = useTransform(zPosition, [0, 800, 1100], [1, 1, 0]);

  return (
    <motion.div
      className="absolute w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(122,54,97,0.15)]"
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

  // Array of 34 images (reusing the 17) arranged with a much wider spread to fill left and right spaces
  const baseImages = [
    "/hero/621848447_17993939222877131_8333462674463645102_n.jpg",
    "/hero/631689845_17937778866150418_6385713466754071028_n.jpg",
    "/hero/643556925_18074742518610403_6490087042240107978_n.jpg",
    "/hero/657723799_17944075440150418_1007812871726275105_n.jpg",
    "/hero/659790739_17944075458150418_1346727943459988503_n.jpg",
    "/hero/670758186_17947210164150418_3383262450044641990_n.jpg",
    "/hero/718980915_17954330217150418_8002955018236714850_n.jpg",
    "/hero/729517899_17956942341150418_2428405952751175522_n.jpg",
    "/hero/730275133_17956942302150418_1881068074142399441_n.jpg",
    "/hero/730313461_17957250834150418_7158865483969560520_n.jpg",
    "/hero/730481081_17957250825150418_632041158573215947_n.jpg",
    "/hero/731163805_17956942314150418_8102722829699058608_n.jpg",
    "/hero/732584263_17957250783150418_2446060800365633050_n.jpg",
    "/hero/733139694_17957250822150418_521846599997047810_n.jpg",
    "/hero/746484878_17959817235150418_3624927233354226246_n.jpg",
    "/hero/748907732_17959817217150418_8031955162559802504_n.jpg",
    "/hero/837268663_17971600980150418_4613754311559507995_n.jpg"
  ];

  // We map over baseImages twice to create 34 cards.
  // We use a highly structured "7-Lane" system to form a perfect, clear U-shape tunnel.
  const images = [...baseImages, ...baseImages].map((src, i) => {
    const lane = i % 7;
    let x = 0;
    let y = 0;
    
    // Assign base coordinates based on the lane to form a perfect U-shape
    switch(lane) {
      case 0: x = -40; y = -20; break; // Top Left Wall
      case 1: x = 40; y = -20; break;  // Top Right Wall
      case 2: x = -45; y = 10; break;  // Mid Left Wall
      case 3: x = 45; y = 10; break;   // Mid Right Wall
      case 4: x = -25; y = 35; break;  // Bottom Left
      case 5: x = 25; y = 35; break;   // Bottom Right
      case 6: x = 0; y = 40; break;    // Bottom Center
    }

    // Add a very subtle, fixed offset based on index to make it feel organic but structured
    const xOffset = (i % 3 === 0) ? 3 : (i % 3 === 1) ? -3 : 0;
    const yOffset = (i % 2 === 0) ? 3 : -3;

    return {
      src,
      x: `${x + xOffset}vw`,
      y: `${y + yOffset}vh`,
      initialZ: -1000 - (i * 450) // Evenly spaced down the Z-axis
    };
  });

  // Base translation: move images forward by 18000px as user scrolls from 0 to 0.85
  const baseZTranslate = useTransform(scrollYProgress, [0, 0.85], [0, 18000]);

  // Final text reveal animations
  const textOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.75, 0.95], [0.9, 1]);

  return (
    <section id="home" ref={containerRef} className="relative w-full h-[500vh]">
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

        {/* Final Reveal Background Image */}
        <motion.div 
          style={{ opacity: textOpacity }} 
          className="absolute inset-0 w-full h-full z-30 pointer-events-none"
        >
          <img src="/hero-bg.jpg" alt="Hero Background" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
        </motion.div>

        {/* Final Reveal Typography & Button */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="absolute z-40 flex flex-col items-center justify-center text-center px-6 w-full max-w-5xl"
        >
          {/* Top Pill */}
          <div className="mb-8 flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] md:text-xs uppercase tracking-widest text-white/80 shadow-lg">
            <Star size={14} className="text-[#C46497]" /> 
            Editorial Event Design & Styling
          </div>

          {/* Headlines */}
          <h1 className="font-sans text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-light tracking-tight text-white drop-shadow-2xl mb-2">
            CURATED ELEGANCE.
          </h1>
          <h2 className="font-sans text-4xl md:text-6xl lg:text-[4.5rem] leading-[1.1] font-light italic text-[#C46497] drop-shadow-2xl mb-10">
            TIMELESS CELEBRATIONS.
          </h2>

          {/* Paragraph */}
          <p className="text-[#9CA3AF] max-w-2xl text-sm md:text-base leading-relaxed mb-12">
            We craft breathtaking narrative environments, bespoke floristry, and immersive luxury aesthetics for the world's most discerning hosts.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-[#7A3661]/90 hover:bg-[#7A3661] transition-all shadow-[0_0_30px_rgba(122,54,97,0.4)]">
              Explore Works <ArrowRight size={16} />
            </button>
            <button className="px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all">
              Book Consultation
            </button>
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
      title: "Weddings",
      desc: "Bespoke spatial narratives and floral scapes for your special day.",
      img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Corporate",
      desc: "Immaculate production for galas, launches, and milestone celebrations.",
      img: "https://images.unsplash.com/photo-1505369650741-fce4e5d65416?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Private Parties",
      desc: "Intimate and extraordinary gatherings tailored to your exact vision.",
      img: "https://images.unsplash.com/photo-1530103862676-de3c9de59a9e?auto=format&fit=crop&w=800&q=80"
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((svc, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl hover:border-[#7A3661]/50 transition-all duration-500 hover:scale-105"
          >
            <div className="h-64 w-full overflow-hidden relative">
              <img src={svc.img} alt={svc.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
            </div>
            <div className="p-8 absolute bottom-0 left-0 w-full">
              <h3 className="text-2xl font-bold text-white mb-3">{svc.title}</h3>
              <p className="text-[#9CA3AF] mb-6 line-clamp-2">{svc.desc}</p>
              <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#7A3661] group-hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                Learn More <ArrowRight size={16} />
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
            <div className="text-5xl font-bold text-[#7A3661]/40 group-hover:text-[#7A3661] transition-colors">{step.num}</div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
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
