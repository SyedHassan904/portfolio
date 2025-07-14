// components/Hero.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay: 0.3,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      type: "spring",
      stiffness: 120,
    },
  }),
};

const words = ["Full Stack Developer", "React Enthusiast", "Creative Coder"];

export default function Hero() {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const name = " Syed Hassan";

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.div
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="text-center px-6"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-purple-400 flex justify-center flex-wrap gap-1">
          Hi, I'm{" "}
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          key={currentWord}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl mt-6 h-10 text-blue-300"
        >
          {words[currentWord]}
        </motion.p>
      </motion.div>
    </section>
  );
}
