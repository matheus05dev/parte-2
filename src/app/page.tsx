import { Hero } from "@/components/sections/Hero";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Header />
      <Hero />
    </main>
  );
}
