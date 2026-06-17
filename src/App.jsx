import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ParticleCanvas from "./components/ParticleCanvas";
import IntroLoader from "./components/IntroLoader";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  React.useEffect(() => {
    if (!isBooted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isBooted]);

  return (
    <>
      {/* Noise Texture Backdrop overlay */}
      <div className="noise-bg" />

      {/* Intro loader screen */}
      {!isBooted && (
        <IntroLoader onComplete={() => setIsBooted(true)} />
      )}

      {/* Main interactive portfolio contents */}
      {isBooted && (
        <div className="bg-obsidian text-white relative min-h-screen selection:bg-accent-cyan/30 selection:text-white">
          {/* Custom Cursor morphs */}
          <CustomCursor />

          {/* AI connection particles network background */}
          <ParticleCanvas />

          {/* Core sections */}
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Timeline />
          <Projects />
          <Contact />
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  );
}
