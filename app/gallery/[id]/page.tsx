import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch album details
  const { data: album, error: albumError } = await supabase
    .from("albums")
    .select("*")
    .eq("id", id)
    .single();

  if (albumError || !album) {
    notFound();
  }

  // Fetch all images for this album
  const { data: images } = await supabase
    .from("album_images")
    .select("*")
    .eq("album_id", id)
    .order("created_at", { ascending: true });

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#7A3661] selection:text-white pb-32">
      {/* ── Navbar ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_35px_rgba(142,69,133,0.35)] gap-2">
        <Link href="/gallery" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-transparent text-white/50 hover:text-white/90 hover:bg-white/5 transition-all">
          <ArrowLeft size={16} />
          <span className="text-[10px] font-semibold tracking-wider uppercase">Back to Gallery</span>
        </Link>
      </nav>

      {/* ── Album Header ── */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <img
          src={album.main_image_url}
          alt={album.name}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
        
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-2xl">{album.name}</h1>
          {album.description && (
            <p className="text-lg text-white/80 leading-relaxed font-light drop-shadow-md">
              {album.description}
            </p>
          )}
        </div>
      </section>

      {/* ── Images Masonry/Grid ── */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto -mt-12 relative z-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {/* Main image repeated or skipped depending on design, we just show 'other images' */}
          {images?.map((img) => (
            <div key={img.id} className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5 hover:border-[#8E4585]/40 transition-colors duration-300">
              <img
                src={img.image_url}
                alt="Album feature"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        
        {images?.length === 0 && (
          <div className="text-center text-white/40 py-20">No images added to this album yet.</div>
        )}
      </section>
    </main>
  );
}
