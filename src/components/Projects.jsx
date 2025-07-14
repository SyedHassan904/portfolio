import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dummyProjects = [
  { title: "Project One", category: "React", description: "A cool React project.", github: "#", image: "https://via.placeholder.com/300" },
  { title: "Project Two", category: "MERN", description: "A full-stack MERN app.", github: "#", image: "https://via.placeholder.com/300" },
  { title: "IoT Tracker", category: "IoT", description: "An IoT device for asset tracking.", github: "#", image: "https://via.placeholder.com/300" },
  { title: "AI Model Trainer", category: "AI/ML", description: "A tool to train ML models.", github: "#", image: "https://via.placeholder.com/300" },
];

const categories = ["All", "React", "MERN", "AI/ML", "IoT"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const filteredProjects =
    selectedCategory === "All"
      ? dummyProjects
      : dummyProjects.filter((project) => project.category === selectedCategory);

  useEffect(() => {
    // Animate section title and category buttons
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

    // Animate each project card
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, [filteredProjects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="p-10 bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <h2 className="text-4xl font-extrabold text-center text-purple-400 mb-10">
        Latest Projects
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition duration-300 ${
              selectedCategory === category
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-700"
          >
            <img src={project.image} alt={project.title} className="w-full h-60 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-bold text-purple-300">{project.title}</h3>
              <p className="text-gray-300 mt-2">{project.description}</p>
              <a
                href={project.github}
                className="text-blue-400 mt-3 inline-block hover:underline"
              >
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
