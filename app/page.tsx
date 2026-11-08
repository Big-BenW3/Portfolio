import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main id="top">
        <Hero />
        <Stack />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
