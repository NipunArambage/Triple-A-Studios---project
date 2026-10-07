"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Home, LayoutGrid, CalendarDays, Mail } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Services", href: "#packages", icon: LayoutGrid },
  { label: "Events", href: "#gallery", icon: CalendarDays },
  { label: "Contact", href: "#how-it-works", icon: Mail },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 md:top-8 left-1/2 z-50 flex items-center p-2 md:px-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_35px_rgba(142,69,133,0.35)] gap-2 md:gap-4"
    >
      {/* Logo inside Navbar */}
      <Link href="#home" onClick={() => setActiveLink("Home")} className="mr-2 md:mr-6 flex-shrink-0">
        <img 
          src="/logo.jpg" 
          alt="a³ Studios" 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white/20 hover:border-[#8E4585] transition-colors"
        />
      </Link>

      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = activeLink === link.label;

        return (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setActiveLink(link.label)}
            className={`flex flex-col items-center justify-center w-[85px] md:w-28 py-2.5 transition-all duration-300 rounded-full border ${
              isActive 
                ? "bg-white/15 border-white/20 text-white shadow-inner" 
                : "border-transparent text-white/50 hover:text-white/90 hover:bg-white/5"
            }`}
          >
            <Icon size={20} className="mb-1.5" strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] md:text-[11px] font-semibold tracking-wider uppercase">
              {link.label}
            </span>
          </Link>
        );
      })}
    </motion.nav>
  );
}

