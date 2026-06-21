import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaGraduationCap, FaCode, FaMicrochip, FaLaptop } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2023 - 2027",
    title: "Bachelor's in Computer Science",
    institution: "University of Agriculture, Faisalabad",
    tabName: "education.sh",
    description: "Acquiring core knowledge of computer science foundations: operating systems, networking systems, algorithms, machine learning, and database engine structures.",
    icon: <FaGraduationCap className="text-[#00f0ff] text-sm" />,
    color: "#00f0ff",
    shadowClass: "hover:shadow-[0_15px_40px_rgba(0,240,255,0.05)]",
    bulletPoints: [
      "Operating Systems & Routing Protocols",
      "Core Data Structures & Algorithms",
      "Database Query Engine Optimizations"
    ]
  },
  {
    year: "2025",
    title: "MERN Stack Milestone - ImageStock Pro",
    institution: "Personal Engineering Project",
    tabName: "imagestock.log",
    description: "Engineered a full-featured stock photography platform using MongoDB, Express, React, and Node.js. Incorporated custom search queries, image upload tracks, and checkout pipelines.",
    icon: <FaCode className="text-[#8b5cf6] text-sm" />,
    color: "#8b5cf6",
    shadowClass: "hover:shadow-[0_15px_40px_rgba(139,92,246,0.05)]",
    bulletPoints: [
      "MongoDB aggregation pipeline queries",
      "Secure Google OAuth & JWT flow integrations",
      "Redux global client store architecture"
    ]
  },
  {
    year: "2024",
    title: "IoT Node Deployment - Air Quality Monitoring",
    institution: "Embedded Hardware Project",
    tabName: "air_quality.py",
    description: "Configured an ESP8266 NodeMCU node with an MQ135 air quality gas sensor. Built hardware circuitry, optimized C++ sketches, and piped data to Firebase real-time databases.",
    icon: <FaMicrochip className="text-[#22c55e] text-sm" />,
    color: "#22c55e",
    shadowClass: "hover:shadow-[0_15px_40px_rgba(34,197,94,0.05)]",
    bulletPoints: [
      "NodeMCU hardware wiring schematics",
      "Optimized sensor reading calibration SKUs",
      "Live Firebase stream data syncing"
    ]
  },
  {
    year: "2023 - Present",
    title: "Freelancing & Creative Coding Lab",
    institution: "Self-Initiated Development",
    tabName: "freelance_lab.js",
    description: "Developing responsive websites, automating custom scraping scripts in Python, and exploring modern front-end technologies (GSAP, Vite, Framer Motion) to construct immersive digital experiences.",
    icon: <FaLaptop className="text-[#ec4899] text-sm" />,
    color: "#ec4899",
    shadowClass: "hover:shadow-[0_15px_40px_rgba(236,72,153,0.05)]",
    bulletPoints: [
      "Custom Python scraping automate modules",
      "High-performance GSAP page scroll animations",
      "Client full-stack product deployments"
    ]
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    // 1. Animate the progress bar dynamically based on viewport scroll scaleY
    gsap.fromTo(
      progressBarRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%",
          end: "bottom 70%",
          scrub: 0.5,
        },
      }
    );

    // 2. Animate cards (smooth fade and slide)
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 35, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 3. Animate milestones nodes (pop entry scale)
    dotRefs.current.forEach((dot, index) => {
      if (!dot) return;

      gsap.fromTo(
        dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="py-24 px-6 md:px-16 bg-[#0a0a0e]/40 relative overflow-hidden border-b border-white/5 z-10"
    >
      {/* Background soft glow radial highlight */}
      <div className="absolute inset-0 bg-radial-at-b from-accent-purple/5 via-transparent to-transparent pointer-events-none" />

      {/* Header Block */}
      <div className="text-center mb-16">
        <span className="text-accent-cyan tracking-widest text-xs font-mono uppercase block mb-2">
          My Journey
        </span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight mt-2 text-white">
          EDUCATION & MILESTONES
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto mt-16">

        {/* Static Background Path Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/[0.03] pointer-events-none z-0" />

        {/* Animated Progress Path Line (Fully responsive container scaleY) */}
        <div
          ref={progressBarRef}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-cyan via-accent-purple to-[#ec4899] -translate-x-1/2 pointer-events-none z-10 origin-top"
        />

        {/* Milestones List */}
        <div className="space-y-12">
          {milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Milestone Node Badge (Glassmorphic design) */}
              <div
                ref={(el) => (dotRefs.current[idx] = el)}
                style={{ borderColor: milestone.color }}
                className="absolute left-4 md:left-1/2 w-9 h-9 rounded-full border bg-[#0d0d12]/90 backdrop-blur-md -translate-x-1/2 flex items-center justify-center z-20 shadow-md transition-transform duration-300 hover:scale-110"
              >
                {milestone.icon}
              </div>

              {/* Milestone Card Container */}
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`w-full md:w-[calc(50%-2.5rem)] ml-12 md:ml-0`}
              >
                {/* macOS Windows card style */}
                <div
                  className={`relative w-full flex flex-col bg-[#07070b]/60 backdrop-blur-xl border border-white/5 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-white/10 ${milestone.shadowClass} group`}
                >
                  {/* OS Title Bar */}
                  <div className="h-8 shrink-0 border-b border-white/5 flex items-center px-3 justify-between bg-white/[0.01]">
                    {/* macOS traffic light window actions */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f56] opacity-80" />
                      <span className="w-2 h-2 rounded-full bg-[#ffbd2e] opacity-80" />
                      <span className="w-2 h-2 rounded-full bg-[#27c93f] opacity-80" />
                    </div>

                    {/* vscode style file tab center */}
                    <div className="text-[10px] font-mono text-gray-400 flex items-center gap-1.5 bg-white/[0.03] px-2.5 h-full border-t border-t-white/10 select-none">
                      <span style={{ color: milestone.color }}>📄</span>
                      <span>{milestone.tabName}</span>
                    </div>

                    {/* Window sys status */}
                    <div className="text-[7px] font-mono text-gray-600 tracking-wider">
                      SYS.LOG
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col relative">
                    {/* Vertical left border accent */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-0.5 opacity-40 transition-opacity group-hover:opacity-100"
                      style={{ backgroundColor: milestone.color }}
                    />

                    {/* Year badge label */}
                    <div className="flex justify-between items-center mb-3">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/5 shadow-sm uppercase tracking-wider"
                        style={{ color: milestone.color }}
                      >
                        {milestone.year}
                      </span>
                    </div>

                    {/* Header Details */}
                    <h3 className="text-base sm:text-lg font-display font-extrabold text-white tracking-tight mb-1">
                      {milestone.title}
                    </h3>

                    <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                      {milestone.institution}
                    </h4>

                    {/* description */}
                    <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed font-light mb-4">
                      {milestone.description}
                    </p>

                    {/* Staggered achievements details */}
                    <div className="flex flex-col gap-1.5 border-t border-white/5 pt-3 mt-1">
                      {milestone.bulletPoints.map((bp, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] md:text-xs font-sans font-medium text-gray-300 select-none">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: milestone.color }} />
                          <span className="truncate">{bp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
