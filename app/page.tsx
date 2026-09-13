import { Navbar } from "@/components/anbera/Navbar";
import { Hero } from "@/components/anbera/Hero";
import { Footer } from "@/components/anbera/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#080808] text-[#F5F5F5]">
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
      </main>
      <Footer />
    </div>
  );
}


