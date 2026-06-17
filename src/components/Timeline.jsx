import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FaGraduationCap, FaCode, FaMicrochip, FaLaptop } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2023 - 2027",
    title: "Bachelor's in Computer Science",
    institution: "University of Agriculture, Faisalabad",
    description: "Acquiring core knowledge of computer science foundations: operating systems, networking systems, algorithms, machine learning, and database engine structures.",
    icon: <FaGraduationCap className="text-accent-cyan text-lg" />,
    color: "#00f0ff",
  },
  {
    year: "2025",
    title: "MERN Stack Milestone - ImageStock Pro",
    institution: "Personal Engineering Project",
    description: "Engineered a full-featured stock photography platform using MongoDB, Express, React, and Node.js. Incorporated custom search queries, image upload tracks, and checkout pipelines.",
    icon: <FaCode className="text-accent-purple text-lg" />,
    color: "#8b5cf6",
  },
  {
    year: "2024",
    title: "IoT Node Deployment - Air Quality Monitoring",
    institution: "Embedded Hardware Project",
    description: "Configured an ESP8266 NodeMCU node with an MQ135 air quality gas sensor. Built hardware circuitry, optimized C++ sketches, and piped data to Firebase real-time databases.",
    icon: <FaMicrochip className="text-green-400 text-lg" />,
    color: "#22c55e",
  },
  {
    year: "2023 - Present",
    title: "Freelancing & Creative Coding Lab",
    institution: "Self-Initiated Development",
    description: "Developing responsive websites, automating custom scraping scripts in Python, and exploring modern front-end technologies (GSAP, Vite, Framer Motion) to construct immersive digital experiences.",
    icon: <FaLaptop className="text-yellow-400 text-lg" />,
    color: "#eab308",
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const cardRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get path length
    const pathLength = path.getTotalLength();
    
    // Set initial dash attributes
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Draw path on scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 45%",
        end: "bottom 75%",
        scrub: 0.5,
      },
    });

    // Animate cards and dots as the scroll advances
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    dotRefs.current.forEach((dot, index) => {
      if (!dot) return;

      gsap.fromTo(
        dot,
        { scale: 0, backgroundColor: "#1e1e24" },
        {
          scale: 1,
          backgroundColor: milestones[index].color,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="py-24 px-6 md:px-16 bg-[#0a0a0e]/40 relative overflow-hidden border-b border-white/5"
    >
      <div className="absolute inset-0 bg-radial-at-b from-accent-purple/5 via-transparent to-transparent pointer-events-none" />

      <div className="text-center mb-16">
        <span className="text-accent-cyan tracking-widest text-xs font-mono uppercase">MY JOURNEY</span>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight mt-2">
          EDUCATION & MILESTONES
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto mt-20">
        
        {/* SVG Drawing Path (Centered on desktop, left on mobile) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none z-0">
          {/* Static Background Path */}
          <svg className="w-full h-full" preserveAspectRatio="none">
            <line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="2"
              className="h-full"
            />
          </svg>
        </div>

        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 pointer-events-none z-10">
          {/* Animated Draw Path */}
          <svg className="w-full h-full" preserveAspectRatio="none">
            <path
              ref={pathRef}
              d="M 1 0 L 1 2000" // Simple vertical drawing route
              stroke="url(#timeline-gradient)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{ height: '100%' }}
            />
            <defs>
              <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Milestones Container */}
        <div className="space-y-16">
          {milestones.map((milestone, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Milestone Indicator Node */}
              <div
                ref={(el) => (dotRefs.current[idx] = el)}
                className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border-2 border-white/10 bg-[#0e0e12] -translate-x-1/2 flex items-center justify-center z-20 shadow-lg"
              >
                {milestone.icon}
              </div>

              {/* Milestone Glass Card */}
              <div
                ref={(el) => (cardRefs.current[idx] = el)}
                className={`w-full md:w-[calc(50%-2.5rem)] ml-12 md:ml-0 ${
                  idx % 2 === 0 ? "md:text-right" : "md:text-left"
                }`}
              >
                <div className="glass-panel p-6 rounded-2xl border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
                  {/* Color Glow Overlay */}
                  <div
                    className="absolute top-0 bottom-0 w-1 opacity-20"
                    style={{
                      backgroundColor: milestone.color,
                      left: idx % 2 === 0 ? "auto" : "0",
                      right: idx % 2 === 0 ? "0" : "auto",
                    }}
                  />

                  <span
                    className="inline-block text-xs font-mono font-bold px-2.5 py-1 rounded bg-white/5 mb-3"
                    style={{ color: milestone.color }}
                  >
                    {milestone.year}
                  </span>
                  
                  <h3 className="text-lg font-display font-extrabold text-white mb-1">
                    {milestone.title}
                  </h3>
                  
                  <h4 className="text-xs font-mono text-gray-400 mb-3 uppercase tracking-wide">
                    {milestone.institution}
                  </h4>
                  
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
