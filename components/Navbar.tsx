import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-6 px-8 lg:px-16 border-b border-[#222]">
      {/* Logo Area */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#e0dfd5] rounded-full flex items-center justify-center text-xs font-bold text-black">
          a³
        </div>
        <div className="flex flex-col uppercase tracking-[0.2em] text-[10px] font-semibold leading-tight">
          <span className="text-gray-200">Triple A</span>
          <span className="text-gray-500">Design Studios</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] uppercase">
        <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
        <Link href="/services" className="text-white relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[1px] after:bg-white">Services</Link>
        <Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link>
        <Link href="/atelier" className="text-gray-400 hover:text-white transition-colors">Atelier</Link>
        <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
        <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Link href="/contact" className="hidden sm:block border border-gray-700 px-6 py-2.5 text-[10px] uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors">
          Book a consultation
        </Link>
        <button className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </div>
    </header>
  );
}
