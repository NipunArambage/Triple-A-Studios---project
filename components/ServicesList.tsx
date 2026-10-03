const services = [
  {
    id: '01',
    title: 'Production',
    subtitle: 'SCENOGRAPHY & CONCIERGE'
  },
  {
    id: '02',
    title: 'Botanicals',
    subtitle: 'MONUMENTAL SCULPTURES'
  },
  {
    id: '03',
    title: 'Stationery',
    subtitle: 'DECKLED TACTILE SUITES'
  },
  {
    id: '04',
    title: 'Olfaction',
    subtitle: 'VESSELS & SCENT ATMOSPHERE'
  }
];

export default function ServicesList() {
  return (
    <section className="px-8 lg:px-16 pb-24 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {services.map((service) => (
          <div key={service.id} className="relative pt-6">
            {/* Top Border */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#222]"></div>
            
            <div className="text-[10px] tracking-[0.2em] text-gray-500 font-medium mb-5">
              [ {service.id} ]
            </div>
            
            <h3 className="font-serif text-3xl md:text-[32px] text-white mb-2">
              {service.title}
            </h3>
            
            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold mt-3">
              {service.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
