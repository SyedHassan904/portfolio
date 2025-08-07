import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Import your local images
import airQualityImage from '../assets/aqi.png';
import imageStockImage from '../assets/pht.png';
import dashboardImage from '../assets/admin.png';

gsap.registerPlugin(ScrollTrigger);

// Define projects with IoT project last
const projects = [
  { 
    title: "ImageStock Pro", 
    category: "MERN", 
    description: "Full-featured stock image marketplace with user uploads, search, and purchases. Built with MongoDB, Express, React, and Node.js.", 
    github: "https://github.com/SyedHassan904/StockImages_MERN", 
    website: "https://stock-images-mern-s4h1.vercel.app/", // Added website URL
    image: imageStockImage,
    tech: ["MongoDB", "Express", "React", "Node.js", "Redux"]
  },
  { 
    title: "Admin Dashboard", 
    category: "React", 
    description: "Comprehensive admin panel with analytics, user management, and real-time data visualization.", 
    github: "https://github.com/SyedHassan904/StockImages_MERN/tree/main/admin", 
    image: dashboardImage,
    tech: ["React", "Material UI", "Chart.js", "NodeJS"]
  },
  { 
    title: "Air Quality Monitoring", 
    category: "IoT", 
    description: "Real-time air quality tracker using MQ135 sensor with NodeMCU, sending data to Firebase with live dashboard visualization.", 
    github: "https://github.com/SyedHassan904/dht-mq135-aqi-app", 
    image: airQualityImage,
    tech: ["NodeMCU", "MQ135", "Firebase", "Chart.js"]
  }
];

const categories = ["All", "React", "MERN", "IoT"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Sort filtered projects to ensure IoT appears last
  const filteredProjects = (selectedCategory === "All" 
    ? [...projects] 
    : projects.filter(project => project.category === selectedCategory)
  ).sort((a, b) => {
    // Move IoT projects to the end
    if (a.category === "IoT") return 1;
    if (b.category === "IoT") return -1;
    return 0;
  });

  useEffect(() => {
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

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
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
      className="py-16 px-5 sm:px-10 bg-gradient-to-b from-gray-900 to-black text-white"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center text-purple-400 mb-10"
      >
        My Projects
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30"
                : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            whileHover={{ y: -5 }}
            className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-purple-300">{project.title}</h3>
                <span className="bg-gray-700 text-purple-300 text-xs px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>
              
              <p className="text-gray-300 mt-3 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <a
                  href={project.github}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
                
                {/* Only show View Website button for ImageStock Pro */}
                {project.title === "ImageStock Pro" && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    View Website
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
