import { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import gsap from "gsap";
import { motion } from "framer-motion";
import { FaArrowDown, FaCode, FaMicrochip, FaBrain } from "react-icons/fa";
import Magnetic from "./Magnetic";

// Custom scramble hook
function useScrambleText(targetText, trigger = true, duration = 1.0) {
  const [displayText, setDisplayText] = useState("");
  const chars = "!@#$%^&*()_+{}:\"<>?,./;'-=";

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = duration * 60; // 60fps
    let animationFrameId;

    const tick = () => {
      frame++;
      const progress = frame / totalFrames;
      let scrambled = "";

      for (let i = 0; i < targetText.length; i++) {
        if (targetText[i] === " ") {
          scrambled += " ";
          continue;
        }
        if (i / targetText.length < progress) {
          scrambled += targetText[i];
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(scrambled);

      if (frame < totalFrames) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetText, trigger, duration]);

  return displayText;
}

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "FULL-STACK WEB DEVELOPER",
    "IOT ENGINEER & HARDWARE ENTHUSIAST",
    "AI & MACHINE LEARNING DEVELOPER"
  ];
  
  const scrambledRole = useScrambleText(roles[roleIndex], true, 1.2);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const letters = titleRef.current.querySelectorAll(".letter-reveal");
    gsap.fromTo(
      letters,
      { y: "100%" },
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.5,
      }
    );

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: 1.2 + index * 0.2,
          ease: "back.out(1.5)",
        }
      );
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const intensities = [15, -20, 25];

      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        const xOffset = ((clientX - centerX) / centerX) * intensities[idx];
        const yOffset = ((clientY - centerY) / centerY) * intensities[idx];
        const rotX = ((clientY - centerY) / centerY) * -10;
        const rotY = ((clientX - centerX) / centerX) * 10;

        gsap.to(card, {
          x: xOffset,
          y: yOffset,
          rotationX: rotX,
          rotationY: rotY,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const name = "SYED HASSAN";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-obsidian text-white overflow-hidden py-24 interactive-grid"
      style={{ perspective: "1000px" }}
    >
      {/* Background Mesh Spotlight */}
      <div className="absolute inset-0 bg-radial-at-c from-accent-purple/5 via-transparent to-transparent pointer-events-none" />

      {/* Hero Typography Container */}
      <div className="relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        
        <span className="text-accent-cyan tracking-[0.3em] text-[10px] sm:text-xs font-display font-extrabold uppercase mb-4 opacity-80">
          CRAFTING FUTURE-PROOF INTERFACES
        </span>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl font-display font-extrabold tracking-tighter leading-none mb-6 flex flex-wrap justify-center gap-x-3 select-none"
        >
          {name.split(" ").map((word, wIdx) => (
            <span key={wIdx} className="inline-flex overflow-hidden py-2">
              {word.split("").map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="letter-reveal inline-block transform translate-y-full"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="h-8 mb-12">
          <p className="text-sm sm:text-base font-mono text-gray-400 tracking-widest uppercase">
            {scrambledRole || "\u00A0"}
          </p>
        </div>

        {/* Action CTAs (Link wrapped OUTSIDE Magnetic for stable click area) */}
        <div className="flex flex-col sm:flex-row gap-6 items-center z-20">
          <Link
            to="projects"
            spy={true}
            smooth={true}
            duration={600}
            offset={-80}
            className="cursor-pointer"
          >
            <Magnetic range={50} speed={0.3}>
              <div className="glass-panel hover:bg-accent-cyan hover:text-black hover:border-accent-cyan transition-colors duration-300 font-semibold px-8 py-4 rounded-full flex items-center gap-2 shadow-lg shadow-accent-cyan/10 border-accent-cyan/40">
                Explore Showcase
              </div>
            </Magnetic>
          </Link>

          <Link
            to="contact"
            spy={true}
            smooth={true}
            duration={600}
            offset={-80}
            className="cursor-pointer"
          >
            <Magnetic range={50} speed={0.3}>
              <div className="bg-gradient-to-r from-accent-purple to-accent-cyan text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-accent-purple/20 hover:brightness-110 transition">
                Let's Connect
              </div>
            </Magnetic>
          </Link>
        </div>
      </div>

      {/* Floating 3D Parallax Technology Cards */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block select-none z-0">
        
        {/* Card 1: Web Tech */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="absolute top-[25%] left-[12%] glass-panel border-accent-cyan/25 p-5 rounded-2xl w-52 flex flex-col gap-3 shadow-xl backdrop-blur-md transform-gpu"
        >
          <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan border border-accent-cyan/20">
            <FaCode size={18} />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-white">Fullstack Web</h4>
            <p className="text-[10px] text-gray-400 mt-1">MERN Stack, Next.js, API design, scalable server systems.</p>
          </div>
        </div>

        {/* Card 2: AI / ML */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="absolute bottom-[20%] left-[20%] glass-panel border-accent-purple/25 p-5 rounded-2xl w-52 flex flex-col gap-3 shadow-xl backdrop-blur-md transform-gpu"
        >
          <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center text-accent-purple border border-accent-purple/20">
            <FaBrain size={18} />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-white">AI / Deep Learning</h4>
            <p className="text-[10px] text-gray-400 mt-1">Computer vision, NLP, model training, and integration.</p>
          </div>
        </div>

        {/* Card 3: IoT */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="absolute top-[30%] right-[12%] glass-panel border-accent-cyan/25 p-5 rounded-2xl w-52 flex flex-col gap-3 shadow-xl backdrop-blur-md transform-gpu"
        >
          <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center text-accent-cyan border border-accent-cyan/20">
            <FaMicrochip size={18} />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm text-white">IoT & Hardware</h4>
            <p className="text-[10px] text-gray-400 mt-1">Esp32, Arduino networks, smart monitoring, live dashboarding.</p>
          </div>
        </div>

      </div>

      {/* Floating Scroll Indicator (Link wrapped OUTSIDE Magnetic) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 select-none">
        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.25em]">Scroll Down</span>
        <Link
          to="about"
          spy={true}
          smooth={true}
          duration={500}
          offset={-80}
          className="cursor-pointer"
        >
          <Magnetic range={30} speed={0.4}>
            <div className="w-6 h-10 rounded-full border-2 border-white/20 hover:border-accent-cyan flex justify-center p-1.5 transition-colors duration-300">
              <div className="w-1.5 h-2.5 bg-accent-cyan rounded-full animate-wheel" />
            </div>
          </Magnetic>
        </Link>
      </div>
    </section>
  );
}
