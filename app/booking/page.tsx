"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

// ── Navbar for Booking Page ─────────────────────────────────────────
function BookingNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0, x: "-50%" }}
      animate={{ y: 0, opacity: 1, x: "-50%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 md:top-8 left-1/2 z-50 flex items-center p-2 md:px-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_35px_rgba(142,69,133,0.35)] gap-2 md:gap-4"
    >
      {/* Logo */}
      <Link href="/" className="mr-2 md:mr-4 flex-shrink-0">
        <img
          src="/logo.jpg"
          alt="a³ Studios"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-white/20 hover:border-[#8E4585] transition-colors"
        />
      </Link>

      {/* Back to Home link */}
      <Link
        href="/"
        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-transparent text-white/50 hover:text-white/90 hover:bg-white/5 transition-all duration-300"
      >
        <ArrowLeft size={16} />
        <span className="text-[10px] md:text-[11px] font-semibold tracking-wider uppercase">
          Home
        </span>
      </Link>

      {/* Active Booking tab */}
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/20 text-white shadow-inner">
        <Mail size={16} />
        <span className="text-[10px] md:text-[11px] font-semibold tracking-wider uppercase">
          Book Now
        </span>
      </div>
    </motion.nav>
  );
}

// ── Form Field Component ────────────────────────────────────────────
interface FormFieldProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
  delay?: number;
}

function FormField({ id, label, icon, error, children, delay = 0 }: FormFieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3"
      >
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
        >
          <AlertCircle size={12} />
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

// ── Main Booking Page ───────────────────────────────────────────────
export default function BookingPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const inView = useInView(formRef, { once: true, margin: "-60px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // ── Client-side validation ──
  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!/^[+]?[\d\s\-()]{7,20}$/.test(formData.phone)) {
      errs.phone = "Please enter a valid phone number.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── Submit ──
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrors(data.errors || { form: "Something went wrong." });
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setErrors({ form: "Network error. Please try again." });
      setStatus("error");
    }
  }

  // Shared input class
  const inputClass =
    "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#8E4585]/60 focus:shadow-[0_0_20px_rgba(142,69,133,0.15)] transition-all duration-300";

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#7A3661] selection:text-white">
      <BookingNavbar />

      {/* ── Hero Header ── */}
      <section className="relative pt-40 pb-16 px-6 lg:px-12 overflow-hidden">
        {/* Ambient plum orb */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full rounded-full bg-[#8E4585] blur-[140px]"
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] md:text-xs uppercase tracking-widest text-white/80 shadow-lg mb-8">
              <Sparkles size={14} className="text-[#C46497]" />
              Book Your Event
            </div>

            <h1 className="font-sans text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-light tracking-tight text-white mb-4">
              Let&apos;s Create
            </h1>
            <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-light italic text-[#C46497] mb-8">
              Something Extraordinary.
            </h2>
            <p className="text-[#9CA3AF] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
              Share your vision with us. Whether it&apos;s an intimate dinner or a grand celebration,
              we&apos;ll craft an experience that transcends the ordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section className="relative px-6 lg:px-12 pb-32">
        <div className="relative max-w-2xl mx-auto" ref={formRef}>
          {status === "success" ? (
            /* ── Success State ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] p-10 md:p-16 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={40} className="text-emerald-400" />
              </div>
              <h3 className="font-sans text-3xl md:text-4xl font-light text-white mb-4">
                Thank You!
              </h3>
              <p className="text-[#9CA3AF] text-sm md:text-base leading-relaxed max-w-md mx-auto mb-10">
                Your booking inquiry has been received. Our team will get back to you within
                24 hours to discuss your vision.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-[#8E4585] hover:bg-[#8E4585]/90 hover:shadow-[0_0_30px_rgba(142,69,133,0.4)] transition-all"
                >
                  Back to Home
                </Link>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white/50 border border-white/15 hover:text-white hover:border-white/35 transition-all"
                >
                  Send Another
                </button>
              </div>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] p-8 md:p-12 lg:p-16 space-y-8"
            >
              {/* Plum top accent */}
              <div className="w-16 h-px bg-[#8E4585] mx-auto" />

              <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-[#8E4585] text-center">
                Booking Inquiry
              </p>

              {/* Global error */}
              {errors.form && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  <AlertCircle size={16} />
                  {errors.form}
                </motion.div>
              )}

              {/* Name */}
              <FormField
                id="booking-name"
                label="Full Name"
                icon={<User size={12} className="text-[#8E4585]" />}
                error={errors.name}
                delay={0.05}
              >
                <input
                  id="booking-name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  className={inputClass}
                  maxLength={100}
                />
              </FormField>

              {/* Email */}
              <FormField
                id="booking-email"
                label="Email Address"
                icon={<Mail size={12} className="text-[#8E4585]" />}
                error={errors.email}
                delay={0.1}
              >
                <input
                  id="booking-email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  className={inputClass}
                  maxLength={200}
                />
              </FormField>

              {/* Phone */}
              <FormField
                id="booking-phone"
                label="Phone Number"
                icon={<Phone size={12} className="text-[#8E4585]" />}
                error={errors.phone}
                delay={0.15}
              >
                <input
                  id="booking-phone"
                  type="tel"
                  placeholder="+94 77 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                  className={inputClass}
                  maxLength={20}
                />
              </FormField>

              {/* Message */}
              <FormField
                id="booking-message"
                label="Your Message"
                icon={<MessageSquare size={12} className="text-[#8E4585]" />}
                error={errors.message}
                delay={0.2}
              >
                <textarea
                  id="booking-message"
                  rows={5}
                  placeholder="Tell us about your event — date, guest count, vision..."
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                  className={`${inputClass} resize-none`}
                  maxLength={2000}
                />
              </FormField>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={status === "loading"}
                  id="booking-submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-full text-sm font-bold tracking-widest uppercase text-white bg-[#8E4585] hover:bg-[#8E4585]/90 hover:shadow-[0_0_40px_rgba(142,69,133,0.55)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-400"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Inquiry
                    </>
                  )}
                </button>
              </motion.div>
            </motion.form>
          )}
        </div>
      </section>

      {/* ── Minimal Footer ── */}
      <footer className="border-t border-white/6 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/20 tracking-wider">
            © {new Date().getFullYear()} Triple A Design Studios. All rights reserved.
          </p>
          <p className="text-[11px] text-white/20 tracking-wider">
            Crafted with care · Delivered with precision
          </p>
        </div>
      </footer>
    </main>
  );
}
