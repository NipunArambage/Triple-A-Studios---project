"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { login } from "./actions";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const inputClass =
    "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#8E4585]/60 focus:shadow-[0_0_20px_rgba(142,69,133,0.15)] transition-all duration-300";

  return (
    <motion.form
      action={login}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)] p-8 md:p-12 space-y-8"
    >
      <div className="w-16 h-px bg-[#8E4585] mx-auto" />

      <div className="text-center">
        <h2 className="font-sans text-3xl font-light text-white mb-2">Admin Portal</h2>
        <p className="text-[#9CA3AF] text-sm">Sign in to manage your bookings.</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          <AlertCircle size={16} />
          {error}
        </motion.div>
      )}

      <div className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3"
          >
            <Mail size={12} className="text-[#8E4585]" />
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="admin@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3"
          >
            <Lock size={12} className="text-[#8E4585]" />
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className={inputClass}
            placeholder="••••••••"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-full text-sm font-bold tracking-widest uppercase text-white bg-[#8E4585] hover:bg-[#8E4585]/90 hover:shadow-[0_0_40px_rgba(142,69,133,0.55)] transition-all duration-400"
        >
          Sign In <ArrowRight size={18} />
        </button>
      </div>
    </motion.form>
  );
}

export default function LoginPage() {
  return (
    <main className="bg-[#050505] min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden font-sans selection:bg-[#7A3661] selection:text-white">
      {/* Ambient orb */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full rounded-full bg-[#8E4585] blur-[140px]"
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="flex items-center justify-center mb-12 group">
          <img
            src="/logo.jpg"
            alt="Triple A"
            className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-[#8E4585] transition-all duration-300"
          />
        </Link>

        <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
          <LoginForm />
        </Suspense>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-[11px] font-semibold tracking-widest uppercase text-white/40 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
