import { useEffect, useRef, useState } from "react";
import { FaDownload, FaReact, FaNodeJs, FaDatabase, FaPython, FaMicrochip, FaBrain } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import profilePic from "../assets/pfkotlin.png";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

const orbitTechs = [
  { name: "React", icon: <FaReact className="text-[#61dafb]" />, color: "#61dafb", desc: "Building interactive user interfaces and web architectures." },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" />, color: "#ffffff", desc: "Production-ready server components and optimized static builds." },
  { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" />, color: "#339933", desc: "Designing responsive REST APIs and backend microservices." },
  { name: "MongoDB", icon: <FaDatabase className="text-[#47a248]" />, color: "#47a248", desc: "Constructing scalable document schemas and database logic." },
  { name: "IoT & Hardware", icon: <FaMicrochip className="text-[#ff9900]" />, color: "#ff9900", desc: "Developing low-latency firmwares on NodeMCU & ESP32." },
  { name: "AI & ML", icon: <FaBrain className="text-[#ec4899]" />, color: "#ec4899", desc: "Training vision classifiers and integrating intelligence models." },
  { name: "Python", icon: <FaPython className="text-[#3776ab]" />, color: "#3776ab", desc: "Performing deep analysis and custom data scraping scripts." },
];

export default function About() {
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const textRef = useRef(null);
  const cvCardRef = useRef(null);
  const [activeTech, setActiveTech] = useState(null);
  
  // Use refs to track animation angle and pause state
  // This keeps the loop continuous and prevents useEffect from re-running on state change
  const angleRef = useRef(0);
  const isPausedRef = useRef(false);

  useEffect(() => {
    // ScrollTrigger to reveal the introduction paragraph word-by-word
    const paragraphs = textRef.current.querySelectorAll(".scroll-reveal-text");
    paragraphs.forEach((p) => {
      gsap.fromTo(
        p,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Reveal CV download card
    gsap.fromTo(
      cvCardRef.current,
      { opacity: 0, scale: 0.9, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: cvCardRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Orbit Animation Loop
    const orbitContainer = orbitRef.current;
    if (!orbitContainer) return;

    const items = orbitContainer.querySelectorAll(".orbit-item");
    const radius = window.innerWidth < 640 ? 110 : 160; // Adjust radius based on screen size
    const total = items.length;
    let animId;

    const updateOrbit = () => {
      if (!isPausedRef.current) {
        angleRef.current += 0.0035; // Increment angle continuously
      }

      items.forEach((item, index) => {
        const itemAngle = angleRef.current + (index / total) * 2 * Math.PI;
        const x = Math.cos(itemAngle) * radius;
        const y = Math.sin(itemAngle) * radius;

        // Smooth placement via GSAP
        gsap.set(item, {
          x,
          y,
          xPercent: -50,
          yPercent: -50,
        });
      });

      animId = requestAnimationFrame(updateOrbit);
    };

    updateOrbit();

    return () => cancelAnimationFrame(animId);
  }, []); // Run exactly once on mount!

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 px-6 md:px-16 bg-[#0a0a0e]/40 relative overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-radial-at-t from-accent-cyan/5 via-transparent to-transparent pointer-events-none" />

      <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-center mb-16 tracking-tight">
        ABOUT <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">MYSELF</span>
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Orbiting Tech Circle surrounding central Profile */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center min-h-[350px] sm:min-h-[420px] relative select-none">
          <div
            ref={orbitRef}
            className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] flex items-center justify-center"
            onMouseEnter={() => {
              isPausedRef.current = true;
            }}
            onMouseLeave={() => {
              isPausedRef.current = false;
              setActiveTech(null);
            }}
          >
            {/* Center Profile Avatar */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-accent-purple/30 bg-[#0e0e12] p-1.5 shadow-2xl z-10 flex items-center justify-center">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src={profilePic}
                  alt="Syed Hassan"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
                />
              </div>
              
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border border-accent-cyan animate-ping opacity-25" />
            </div>

            {/* Orbiting Icons */}
            {orbitTechs.map((tech, idx) => (
              <div
                key={idx}
                className="orbit-item absolute top-1/2 left-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 bg-[#0e0e12] flex items-center justify-center text-lg sm:text-xl cursor-pointer hover:border-accent-cyan transition-colors z-20 shadow-xl"
                style={{ transform: 'translate(-50%, -50%)' }}
                onMouseEnter={() => setActiveTech(tech)}
                onClick={() => setActiveTech(tech)}
              >
                {tech.icon}
              </div>
            ))}
          </div>

          {/* Interactive Tech Description Box */}
          <div className="h-16 mt-8 w-full max-w-sm text-center">
            {activeTech ? (
              <div className="animate-fadeIn">
                <h4 className="font-display font-extrabold text-sm text-accent-cyan uppercase tracking-wider">
                  {activeTech.name}
                </h4>
                <p className="text-xs text-gray-400 mt-1 max-w-[280px] mx-auto leading-relaxed">
                  {activeTech.desc}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic">
                Hover over the orbiting nodes to inspect my core development stacks.
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Introduction Details */}
        <div ref={textRef} className="lg:col-span-6 space-y-8 text-left">
          
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-accent-cyan">
              Bridging Web Engineering & Hardware Logic
            </h3>
            <p className="scroll-reveal-text text-gray-300 leading-relaxed text-sm sm:text-base">
              I'm a computer science undergraduate specialized in structuring complete web applications, machine learning architectures, and IoT smart environments. I bridge modern interface dynamics with physical hardware connectivity.
            </p>
            <p className="scroll-reveal-text text-gray-300 leading-relaxed text-sm sm:text-base">
              As a student at the <strong className="text-white">University of Agriculture, Faisalabad</strong> (2023 - 2027), I investigate system configurations, database layouts, and network sockets to design highly resilient digital ecosystems.
            </p>
          </div>

          {/* Glass CV Download Card */}
          <div
            ref={cvCardRef}
            className="glass-panel p-6 rounded-2xl border-white/10 flex flex-col md:flex-row items-center gap-6 justify-between"
          >
            <div className="text-center md:text-left">
              <h4 className="text-lg font-display font-extrabold text-white">Download Credentials</h4>
              <p className="text-xs text-gray-400 mt-1">Check my resume to inspect academic achievements and coding milestones.</p>
            </div>
            <Magnetic speed={0.3}>
              <a
                href="/cv.pdf"
                download="Syed-Hassan-CV.pdf"
                className="relative overflow-hidden border border-white/10 hover:border-accent-cyan/60 text-white font-mono uppercase text-[10px] tracking-[0.2em] px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-500 shadow-xl group cursor-pointer bg-white/5 shrink-0"
              >
                {/* Hover gradient backing overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-accent-cyan/15 to-accent-purple/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Button internals */}
                <span className="relative z-10 flex items-center gap-2 font-display text-xs font-extrabold tracking-widest text-white group-hover:text-accent-cyan transition-colors">
                  <FaDownload className="text-accent-cyan group-hover:translate-y-0.5 transition-transform duration-300" />
                  GET RESUME
                </span>
              </a>
            </Magnetic>
          </div>

        </div>

      </div>
    </section>
  );
}
