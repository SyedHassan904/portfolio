import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Magnetic from "./Magnetic";

// Import local images
import airQualityImage from '../assets/aqi.png';
import imageStockImage from '../assets/pht.png';
import dashboardImage from '../assets/admin.png';

gsap.registerPlugin(ScrollTrigger);

// Custom text scramble hook for macOS/developer feel
function useTextScramble(targetText, trigger) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!trigger) {
      // Scrambled placeholder with random developer symbols
      setText(targetText.replace(/[a-zA-Z]/g, () => "$#%&"[Math.floor(Math.random() * 4)]));
      return;
    }

    let frame = 0;
    const chars = "!<>-_\\/[]{}—=+*^?#________";
    const queue = [];

    // Snappier scramble resolution for responsive loading
    for (let i = 0; i < targetText.length; i++) {
      const from = "";
      const to = targetText[i];
      const start = Math.floor(Math.random() * 5);
      const end = start + Math.floor(Math.random() * 6);
      queue.push({ from, to, start, end, char: "" });
    }

    let animationId;
    const update = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += char;
        } else {
          output += " ";
        }
      }

      setText(output);

      if (complete === queue.length) {
        cancelAnimationFrame(animationId);
      } else {
        frame++;
        animationId = requestAnimationFrame(update);
      }
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [targetText, trigger]);

  return text;
}

const projects = [
  {
    title: "ImageStock Pro",
    category: "MERN",
    description: "Full-featured stock image marketplace with user uploads, search, and purchases. Built with MongoDB, Express, React, and Node.js.",
    github: "https://github.com/SyedHassan904/StockImages_MERN",
    website: "https://stock-images-mern.vercel.app/",
    image: imageStockImage,
    tech: ["MongoDB", "Express", "React", "Node.js", "Redux", "Cloudinary"],
    color: "#00f0ff",
    shadowClass: "hover:shadow-[0_20px_50px_rgba(0,240,255,0.06)]",
    metrics: [
      "JWT & Google OAuth",
      "Cloudinary Asset API",
      "Fluid Responsive UI",
      "Redux State Manager"
    ]
  },
  {
    title: "Admin Dashboard",
    category: "React",
    description: "Comprehensive admin panel with analytics, user management, and real-time data visualization.",
    github: "https://github.com/SyedHassan904/StockImages_MERN/tree/main/admin",
    website: "https://stock-images-mern.vercel.app/",
    image: dashboardImage,
    tech: ["React", "Material UI", "Chart.js", "Node.js"],
    color: "#8b5cf6",
    shadowClass: "hover:shadow-[0_20px_50px_rgba(139,92,246,0.06)]",
    metrics: [
      "Real-time Data Sync",
      "User Access Control",
      "Dynamic Visual Charts",
      "Sleek Developer Theme"
    ]
  },
  {
    title: "Air Quality Monitoring",
    category: "IoT",
    description: "Real-time air quality tracker using MQ135 sensor with NodeMCU, sending data to Firebase with live dashboard visualization.",
    github: "https://github.com/SyedHassan904/dht-mq135-aqi-app",
    website: "",
    image: airQualityImage,
    tech: ["NodeMCU", "MQ135", "Firebase", "Chart.js"],
    color: "#22c55e",
    shadowClass: "hover:shadow-[0_20px_50px_rgba(34,197,94,0.06)]",
    metrics: [
      "MQ135 Gas Telemetry",
      "NodeMCU WiFi Unit",
      "Firebase Live RTDB",
      "Live Chart Overlays"
    ]
  }
];

const categories = ["All", "React", "MERN", "IoT"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  // Section entry clip-path trigger on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { opacity: 0 });
      gsap.set(gridRef.current, { opacity: 0 });
      gsap.set(titleRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        y: 25,
        opacity: 0
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        }
      })
        .to(sectionRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" })
        .to(gridRef.current, { opacity: 0.2, duration: 1.2, ease: "power1.inOut" }, "-=0.2")
        .to(titleRef.current, {
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out"
        }, "-=0.8");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Filter projects (IoT remains at the bottom of the list)
  const filteredProjects = (
    selectedCategory === "All"
      ? [...projects]
      : projects.filter((p) => p.category === selectedCategory)
  ).sort((a, b) => {
    if (a.category === "IoT") return 1;
    if (b.category === "IoT") return -1;
    return 0;
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-obsidian text-white overflow-hidden py-20 min-h-screen z-10"
    >
      {/* Slow moving grid background */}
      <div
        ref={gridRef}
        className="absolute inset-0 animated-grid pointer-events-none z-0"
      />

      {/* Cyberpunk accent lighting glows */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Title Block */}
        <div ref={titleRef} className="text-center mb-10">
          <span className="text-accent-cyan font-mono text-xs uppercase tracking-widest block mb-2">
            Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {/* Category Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${selectedCategory === category
                    ? "bg-accent-purple text-white border-accent-purple shadow-lg shadow-accent-purple/30"
                    : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Optimized responsive grid layout */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={idx}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   COMPACT, HIGH-END WORKSTATION CARD COMPONENT
   ========================================================================== */
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [triggerScramble, setTriggerScramble] = useState(false);
  const scrambledTitle = useTextScramble(project.title, triggerScramble);

  // Subtle 3D tilt interaction for desktop cursor tracking
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    // Skip tilt on touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 4.5; // Subtle 3D tilt max 4.5 deg
    const rotateY = ((x - centerX) / centerX) * 4.5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    card.style.setProperty('--mouse-x', "-999px");
    card.style.setProperty('--mouse-y', "-999px");
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.96 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onViewportEnter={() => setTriggerScramble(true)}
      className={`relative w-full flex flex-col bg-[#07070b]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-white/10 transition-all duration-300 preserve-3d window-border-glow group ${project.shadowClass}`}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div className="card-spotlight" />

      {/* macOS Window Header Bar */}
      <div className="h-8 shrink-0 border-b border-white/5 flex items-center px-3.5 justify-between bg-white/[0.01] z-10">
        {/* Traffic Light indicators */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56] opacity-80" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e] opacity-80" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f] opacity-80" />
        </div>

        {/* Scrambled Title */}
        <div className="text-[11px] sm:text-xs font-display font-semibold uppercase tracking-wider text-[#00f0ff] shadow-glow">
          {scrambledTitle}
        </div>

        {/* Terminal Category Tag */}
        <div className="text-[8px] font-mono text-gray-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 uppercase tracking-wider">
          SYS.{project.category}
        </div>
      </div>

      {/* Screen area screenshot (Aspect Video, Clean padding layout) */}
      <div className="w-full bg-black/10 border-b border-white/5 overflow-hidden p-2.5">
        <div
          style={{ transform: "translateZ(20px)" }}
          className="relative w-full overflow-hidden rounded-md border border-white/5 bg-black/40 aspect-video shadow-inner"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Content panel */}
      <div className="p-4 flex flex-col gap-3 z-10 flex-grow">

        {/* description */}
        <p className="text-gray-400 font-sans text-[11px] sm:text-[12px] leading-relaxed font-light flex-grow">
          {project.description}
        </p>

        {/* Tech chip lists (miniaturized tags) */}
        <div
          style={{ transform: "translateZ(30px)" }}
          className="flex flex-wrap gap-1"
        >
          {project.tech.map((techItem, i) => (
            <span
              key={i}
              className="bg-white/5 border border-white/5 text-gray-300 font-mono text-[9px] px-2 py-0.5 rounded-full hover:border-[#00f0ff]/30 hover:bg-[#00f0ff]/5 transition-colors"
            >
              {techItem}
            </span>
          ))}
        </div>

        {/* Staggered developer metrics checklists */}
        <div className="grid grid-cols-2 gap-1.5 border-t border-white/5 pt-2.5">
          {project.metrics.map((metricItem, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-sans font-medium text-gray-300 bg-white/[0.01] border border-white/[0.02] px-2 py-0.5 rounded"
            >
              <svg className="w-2.5 h-2.5 text-[#00f0ff] shrink-0 filter drop-shadow-[0_0_2px_#00f0ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="truncate">{metricItem}</span>
            </div>
          ))}
        </div>

        {/* Magnetic CTA buttons */}
        <div className="flex items-center gap-2 pt-2.5 border-t border-white/5 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 border border-white/10 hover:border-accent-purple/50 bg-white/5 text-white font-mono text-[9px] uppercase tracking-wider py-1.5 rounded transition-all shadow-sm"
          >
            <FaGithub size={10} />
            Source
          </a>

          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-accent-cyan/20 hover:border-accent-cyan/50 bg-[#00f0ff]/10 text-[#00f0ff] font-mono text-[9px] uppercase tracking-wider py-1.5 rounded transition-all shadow-md shadow-[#00f0ff]/5"
            >
              <FaExternalLinkAlt size={8} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}