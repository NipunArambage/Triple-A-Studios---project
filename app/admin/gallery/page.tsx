"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Image as ImageIcon, Loader2, AlertTriangle } from "lucide-react";
import { uploadAlbum } from "./actions";

export default function AdminGalleryPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      // Call the server action directly
      await uploadAlbum(formData);
      
      // If uploadAlbum succeeds, it will redirect internally, so we don't need to do anything else.
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during upload.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#8E4585]/60 focus:shadow-[0_0_20px_rgba(142,69,133,0.15)] transition-all duration-300";

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#7A3661] selection:text-white pb-32">
      <nav className="border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 h-20 flex items-center">
          <Link href="/admin" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 mt-12">
        <h1 className="font-serif text-4xl font-light mb-8 text-white flex items-center gap-4">
          <ImageIcon className="text-[#8E4585]" size={32} /> Create Album
        </h1>

        <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm flex items-start gap-3">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p>
            <strong>Local Uploads Active:</strong> Images will be saved directly to your server's <code>/public/uploads</code> folder. 
            Note: If you deploy this app to Vercel or Netlify, local file uploads will disappear on every deployment because they are "serverless". You will need a standard VPS or server to keep local files permanently.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 p-8 rounded-3xl bg-white/5 border border-white/10">
          
          <div>
            <label htmlFor="name" className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
              Album Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className={inputClass}
              placeholder="e.g. The Grand Ball"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={inputClass}
              placeholder="Tell the story of this event..."
            />
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
            <label htmlFor="mainImage" className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
              Main Cover Image *
            </label>
            <input
              id="mainImage"
              name="mainImage"
              type="file"
              accept="image/*"
              required
              className="text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-[#8E4585] file:text-white hover:file:bg-[#8E4585]/90 transition-all cursor-pointer"
            />
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/5">
            <label htmlFor="otherImages" className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-3">
              Other Images (Optional)
            </label>
            <input
              id="otherImages"
              name="otherImages"
              type="file"
              accept="image/*"
              multiple
              className="text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-white/10 file:text-white hover:file:bg-white/20 transition-all cursor-pointer"
            />
            <p className="text-xs text-white/30 mt-3">Select multiple files at once.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-8 py-5 rounded-full text-sm font-bold tracking-widest uppercase text-white bg-[#8E4585] hover:bg-[#8E4585]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <><Loader2 className="animate-spin" size={18} /> Uploading... this may take a while</>
            ) : (
              <><Upload size={18} /> Publish Album</>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
