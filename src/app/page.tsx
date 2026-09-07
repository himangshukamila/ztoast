import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Quickstart } from "@/components/Quickstart";
import { Examples } from "@/components/Examples";
import { PositionDemo } from "@/components/PositionDemo";
import { DocsSection } from "@/components/DocsSection";
import { Footer } from "@/components/Footer";

// main documentation and showcase page inspired by react-hot-toast
export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Quickstart />
      <Examples />
      <PositionDemo />
      <DocsSection />
      <Footer />
    </main>
  );
}
