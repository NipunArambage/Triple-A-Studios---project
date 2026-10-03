import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesList from "@/components/ServicesList";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-white selection:text-black">
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Hero />
        <ServicesList />
      </div>
    </main>
  );
}
