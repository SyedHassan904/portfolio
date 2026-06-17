import { useEffect, useRef } from "react";
import { FaCode, FaBrain, FaMicrochip, FaBolt, FaDatabase, FaToolbox } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Programming",
    icon: <FaCode className="text-[#00f0ff] text-xl" />,
    skills: ["Python", "Java", "C++", "SQL", "JavaScript", "MATLAB"],
    glowColor: "rgba(0, 240, 255, 0.15)"
  },
  {
    title: "AI & Machine Learning",
    icon: <FaBrain className="text-[#a855f7] text-xl" />,
    skills: ["TensorFlow", "Keras", "YOLOv8", "Computer Vision", "NLP", "Deep Learning"],
    glowColor: "rgba(168, 85, 247, 0.15)"
  },
  {
    title: "IoT & Embedded Hardware",
    icon: <FaMicrochip className="text-[#22c55e] text-xl" />,
    skills: ["Arduino", "ESP32", "Sensors", "Circuit Design", "Embedded Systems"],
    glowColor: "rgba(34, 197, 94, 0.15)"
  },
  {
    title: "Web Engineering",
    icon: <FaBolt className="text-[#eab308] text-xl" />,
    skills: ["HTML/CSS", "PHP", "FastAPI", "Streamlit", "React (MERN)"],
    glowColor: "rgba(234, 179, 8, 0.15)"
  },
  {
    title: "Database Architecture",
    icon: <FaDatabase className="text-[#ef4444] text-xl" />,
    skills: ["SQL", "NoSQL", "Firebase", "Database Design"],
    glowColor: "rgba(239, 68, 68, 0.15)"
  },
  {
    title: "Tools & Clouds",
    icon: <FaToolbox className="text-[#14b8a6] text-xl" />,
    skills: ["Git & Github", "Docker", "Google Cloud", "Microsoft Office", "Data Visualization"],
    glowColor: "rgba(20, 184, 166, 0.15)"
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Reveal section title
    gsap.fromTo(
      sectionRef.current.querySelector(".skills-header"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Stagger reveal for skill cards
    cardsRef.current.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: idx * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Mouse Spotlight coordinate tracking on each card
    const handleMouseMove = (e) => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 bg-obsidian text-white relative overflow-hidden"
    >
      <div className="skills-header text-center mb-16">
        <span className="text-accent-purple tracking-widest text-xs font-mono uppercase">MY CAPABILITIES</span>
        <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight mt-2">
          SKILLS & EXPERTISE
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="group relative rounded-2xl glass-panel p-6 border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
            style={{
              "--mouse-x": "0px",
              "--mouse-y": "0px",
            }}
          >
            {/* Spotlight overlay glow inside the card background */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
              style={{
                background: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), ${cat.glowColor}, transparent 80%)`,
              }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-display font-extrabold text-white">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-white/5 text-gray-300 px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/5 hover:border-accent-cyan/20 hover:text-white transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
