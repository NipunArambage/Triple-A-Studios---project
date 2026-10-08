import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft, ImageIcon } from "lucide-react";

export const revalidate = 0; // Disable static caching for dynamic content

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: albums, error } = await supabase
    .from("albums")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#7A3661] selection:text-white">
      {/* ── Navbar ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_35px_rgba(142,69,133,0.35)] gap-2">
        <Link href="/" className="mr-4 flex-shrink-0">
          <img src="/logo.jpg" alt="Triple A" className="w-10 h-10 rounded-full object-cover border-2 border-white/20 hover:border-[#8E4585] transition-colors" />
        </Link>
        <Link href="/" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-transparent text-white/50 hover:text-white/90 hover:bg-white/5 transition-all">
          <ArrowLeft size={16} />
          <span className="text-[10px] font-semibold tracking-wider uppercase">Home</span>
        </Link>
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 border border-white/20 text-white shadow-inner">
          <ImageIcon size={16} />
          <span className="text-[10px] font-semibold tracking-wider uppercase">Gallery</span>
        </div>
      </nav>

      {/* ── Header ── */}
      <section className="pt-40 pb-16 px-6 lg:px-12 relative text-center">
        <h1 className="font-sans text-5xl md:text-7xl font-light text-white mb-4">Our Works</h1>
        <p className="text-[#9CA3AF] max-w-xl mx-auto">Explore the monumental narratives and exquisite scapes we have curated for our most discerning hosts.</p>
      </section>

      {/* ── Albums Grid ── */}
      <section className="px-6 lg:px-12 pb-32 max-w-7xl mx-auto">
        {error ? (
          <div className="text-center text-red-400 p-8 rounded-3xl bg-red-500/10 border border-red-500/20">
            Failed to load gallery.
          </div>
        ) : albums?.length === 0 ? (
          <div className="text-center py-20 text-[#9CA3AF]">
            No albums found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums?.map((album) => (
              <Link href={`/gallery/${album.id}`} key={album.id} className="group block">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl group-hover:border-[#8E4585]/50 transition-all duration-500">
                  <img
                    src={album.main_image_url}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8">
                    <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-[#8E4585] transition-colors duration-300">
                      {album.name}
                    </h3>
                    {album.description && (
                      <p className="text-sm text-white/60 line-clamp-2">
                        {album.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
