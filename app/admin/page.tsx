import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { logout, deleteBooking } from "./actions";
import { Calendar, LogOut, Mail, Phone, Trash2, User, Clock, ArrowRight, ImageIcon } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // 1. Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // 2. Fetch bookings
  const { data: bookings, error: dbError } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white font-sans selection:bg-[#7A3661] selection:text-white pb-32">
      {/* ── Admin Navbar ── */}
      <nav className="border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full border border-white/20" />
            <div>
              <h1 className="text-sm font-bold tracking-widest uppercase">Admin Dashboard</h1>
              <p className="text-[10px] text-white/40 tracking-wider">{user.email}</p>
            </div>
          </div>
          <form action={logout}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all text-xs font-semibold uppercase tracking-widest text-white/60">
              <LogOut size={14} /> Logout
            </button>
          </form>
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="font-serif text-3xl font-light">
            Inquiries <span className="text-[#8E4585]">({bookings?.length || 0})</span>
          </h2>
          <div className="flex items-center gap-6">
            <a
              href="/admin/gallery"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8E4585] hover:text-white transition-colors"
            >
              <ImageIcon size={14} /> Manage Gallery
            </a>
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              View Live Site <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {dbError ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
            Failed to load bookings: {dbError.message}
          </div>
        ) : bookings?.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center rounded-3xl bg-white/5 border border-white/10 border-dashed">
            <Calendar size={48} className="text-white/20 mb-4" />
            <h3 className="text-xl font-light mb-2">No Inquiries Yet</h3>
            <p className="text-white/40 text-sm">When clients submit the booking form, they will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings?.map((booking) => (
              <div
                key={booking.id}
                className="group relative flex flex-col p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#8E4585]/40 transition-all duration-300"
              >
                {/* Delete Button */}
                <form action={deleteBooking.bind(null, booking.id)} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="submit"
                    className="p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                    title="Delete Inquiry"
                  >
                    <Trash2 size={14} />
                  </button>
                </form>

                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#8E4585] font-semibold mb-4">
                  <Clock size={12} /> {formatDate(booking.created_at)}
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 mb-1">
                      <User size={12} /> Name
                    </div>
                    <div className="font-semibold">{booking.name}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 mb-1">
                      <Mail size={12} /> Email
                    </div>
                    <a href={`mailto:${booking.email}`} className="text-[#8E4585] hover:underline">
                      {booking.email}
                    </a>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30 mb-1">
                      <Phone size={12} /> Phone
                    </div>
                    <div>{booking.phone}</div>
                  </div>

                  <div className="pt-2">
                    <div className="text-[10px] uppercase tracking-widest text-white/30 mb-2">
                      Message
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 text-sm text-white/80 leading-relaxed border border-white/5">
                      {booking.message}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
