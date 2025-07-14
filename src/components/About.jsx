import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="p-10 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white"
    >
      <h2 className="text-4xl font-extrabold text-center text-purple-400 mb-10">
        About Me
      </h2>

      <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-300 text-center">
        I'm a passionate{" "}
        <span className="text-blue-400 font-semibold">Computer Science student</span> with a strong foundation in software engineering.
        I specialize in{" "}
        <span className="text-purple-400">full-stack web development (MERN)</span> and have a keen interest in emerging technologies like{" "}
        <span className="text-green-400">IoT</span>,{" "}
        <span className="text-yellow-300">Operating Systems</span>,{" "}
        <span className="text-pink-400">Networking</span>, and{" "}
        <span className="text-red-400">Machine Learning / AI</span>.
        <br /><br />
        My goal is to craft scalable, efficient, and user-focused digital solutions while constantly learning and evolving with the tech world.
      </p>

      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education Card */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 h-full flex flex-col justify-center"
        >
          <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">
            Education
          </h3>
          <div className="space-y-2 text-gray-300 text-lg text-center">
            <p>🎓 <strong>Bachelor’s in Computer Science</strong></p>
            <p>🏫 University of Agriculture, Faisalabad</p>
            <p>📅 2023 - 2027</p>
          </div>
        </div>

        {/* CV Card */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 h-full flex flex-col items-center justify-center text-center"
        >
          <h3 className="text-2xl font-bold text-purple-400 mb-4">
            Download My CV
          </h3>
          <p className="text-gray-400 mb-6 max-w-xs">
            Interested in working with me or learning more about my background? Click below to get my full CV.
          </p>
          <motion.a
            href="/cv.pdf"
            download="Syed-Hassan-CV.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-2xl transition"
          >
            <FaDownload />
            Download CV
          </motion.a>
        </div>
      </div>
    </section>
  );
}
