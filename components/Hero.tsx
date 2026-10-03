export default function Hero() {
  return (
    <section className="px-8 lg:px-16 pt-24 pb-16 max-w-4xl">
      {/* Breadcrumb / Label */}
      <div className="flex items-center gap-3 mb-10 text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold">
        <div className="w-1.5 h-1.5 bg-gray-300"></div>
        <span>Triple A Design Studios · Capabilities</span>
      </div>

      {/* Headings */}
      <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.1] mb-12 text-white">
        <span className="font-serif">Four disciplines.</span>
        <br />
        <span className="font-serif italic text-gray-300">One seamless vision.</span>
      </h1>

      {/* Description */}
      <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-[42rem] font-light">
        We conceive celebrations as monumental spatial narratives. Bridging the
        grand estates of Sri Lanka, high-altitude private residences, and historic
        architectural halls across Singapore and the Indian Ocean, our studio weaves
        production, monumental floral scapes, tactile papercraft, and bespoke
        olfactory compositions into one singular ceremony.
      </p>
    </section>
  );
}
