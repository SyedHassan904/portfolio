import { useEffect, useRef } from "react";
import { FaCode, FaBrain, FaMicrochip, FaBolt, FaDatabase, FaToolbox } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: "Programming",
    icon: <FaCode className="text-blue-400 text-2xl" />,
    skills: ["Python", "Java", "C++", "SQL", "JavaScript", "MATLAB"],
  },
  {
    title: "AI/ML",
    icon: <FaBrain className="text-purple-400 text-2xl" />,
    skills: ["TensorFlow", "Keras", "YOLOv8", "Computer Vision", "NLP", "Deep Learning"],
  },
  {
    title: "IoT/Hardware",
    icon: <FaMicrochip className="text-green-400 text-2xl" />,
    skills: ["Arduino", "ESP32", "Sensors", "Circuit Design", "Embedded Systems"],
  },
  {
    title: "Web Development",
    icon: <FaBolt className="text-yellow-400 text-2xl" />,
    skills: ["HTML/CSS", "PHP", "FastAPI", "Streamlit", "React"],
  },
  {
    title: "Databases",
    icon: <FaDatabase className="text-red-400 text-2xl" />,
    skills: ["SQL", "NoSQL", "Firebase", "Database Design"],
  },
  {
    title: "Tools",
    icon: <FaToolbox className="text-teal-400 text-2xl" />,
    skills: ["Git", "Docker", "Google Cloud", "Microsoft Office", "Data Visualization"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animate the entire section title
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animate each card
    cardsRef.current.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: idx * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="p-10 bg-gradient-to-b from-black to-gray-900 text-white"
    >
      <h2 className="text-4xl font-extrabold text-center text-purple-400 mb-10">
        Skills & Expertise
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-4">
              {cat.icon}
              <h3 className="text-xl font-bold text-white">{cat.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
