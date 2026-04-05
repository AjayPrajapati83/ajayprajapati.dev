import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ParticleBackground from "@/components/ParticleBackground";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-darker relative">
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <div id="skills">
        <TechStack />
      </div>
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
