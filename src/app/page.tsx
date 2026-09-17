import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Quickstart } from "@/components/Quickstart";
import { Examples } from "@/components/Examples";
import { PositionDemo } from "@/components/PositionDemo";
import { Playground } from "@/components/Playground";
import { DocsSection } from "@/components/DocsSection";
import { Upgrading } from "@/components/Upgrading";
import { Footer } from "@/components/Footer";

// main documentation and showcase page
export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Quickstart />
      <Examples />
      <PositionDemo />
      <Playground />
      <DocsSection />
      <Upgrading />
      <Footer />
    </main>
  );
}
