import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/homePage/Hero";
import Experiments from "@/components/homePage/Experiments";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 transition-colors dark:bg-[#0a0a0a] dark:text-neutral-100">
      <Navbar />
      <main>
        <Hero />
        <Experiments />
      </main>
    </div>
  );
}