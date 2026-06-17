import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Magnetic from "./Magnetic";

// Import local images
import airQualityImage from '../assets/aqi.png';
import imageStockImage from '../assets/pht.png';
import dashboardImage from '../assets/admin.png';

const projects = [
  { 
    title: "ImageStock Pro", 
    category: "MERN", 
    description: "Full-featured stock image marketplace with user uploads, search, and purchases. Built with MongoDB, Express, React, and Node.js.", 
    github: "https://github.com/SyedHassan904/StockImages_MERN", 
    website: "https://stock-images-mern.vercel.app/",
    image: imageStockImage,
    tech: ["MongoDB", "Express", "React", "Node.js", "Redux", "Cloudinary"],
    color: "#00f0ff"
  },
  { 
    title: "Admin Dashboard", 
    category: "React", 
    description: "Comprehensive admin panel with analytics, user management, and real-time data visualization.", 
    github: "https://github.com/SyedHassan904/StockImages_MERN/tree/main/admin", 
    image: dashboardImage,
    tech: ["React", "Material UI", "Chart.js", "NodeJS"],
    color: "#8b5cf6"
  },
  { 
    title: "Air Quality Monitoring", 
    category: "IoT", 
    description: "Real-time air quality tracker using MQ135 sensor with NodeMCU, sending data to Firebase with live dashboard visualization.", 
    github: "https://github.com/SyedHassan904/dht-mq135-aqi-app", 
    image: airQualityImage,
    tech: ["NodeMCU", "MQ135", "Firebase", "Chart.js"],
    color: "#22c55e"
  }
];

const categories = ["All", "React", "MERN", "IoT"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter projects (IoT at the end)
  const filteredProjects = (selectedCategory === "All" 
    ? [...projects] 
    : projects.filter(project => project.category === selectedCategory)
  ).sort((a, b) => {
    if (a.category === "IoT") return 1;
    if (b.category === "IoT") return -1;
    return 0;
  });

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-16 bg-obsidian text-white relative overflow-hidden"
    >
      {/* Background radial spotlight grid */}
      <div className="absolute inset-0 bg-radial-gradient from-accent-purple/5 to-transparent pointer-events-none opacity-40" />

      <div className="max-w-6xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-accent-cyan tracking-widest text-xs font-mono uppercase">My Work</span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-center text-white mt-2 mb-10">
            Featured Projects
          </h2>
        </motion.div>

        {/* Categories filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full border text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-accent-purple text-white border-accent-purple shadow-lg shadow-accent-purple/30"
                  : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects vertical grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col group h-full hover:border-accent-cyan/40 transition-colors duration-500"
                data-cursor="view"
              >
                {/* Image panel with zoom */}
                <div className="h-60 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/90 via-transparent to-transparent" />
                </div>
                
                {/* Content details */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-accent-cyan font-mono text-xs uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-extrabold text-white mb-3 group-hover:text-accent-cyan transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-white/5 border border-white/5 text-gray-400 text-xs px-2.5 py-1 rounded-full font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Link buttons */}
                  <div className="flex gap-4 border-t border-white/5 pt-6 mt-auto">
                    <Magnetic speed={0.2}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-gray-300 hover:text-accent-cyan transition-colors"
                      >
                        <FaGithub className="mr-2" size={14} />
                        Source Code
                      </a>
                    </Magnetic>
                    
                    {project.title === "ImageStock Pro" && (
                      <Magnetic speed={0.2}>
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-gray-300 hover:text-accent-cyan transition-colors"
                        >
                          <FaExternalLinkAlt className="mr-2" size={12} />
                          Live Demo
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}