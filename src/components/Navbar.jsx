import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaLaptopCode, FaTimes, FaBars, FaMousePointer } from "react-icons/fa";
import profilePic from "../assets/pfkotlin.png";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursorDisabled, setCursorDisabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleCursorMode = () => {
    const nextVal = !cursorDisabled;
    setCursorDisabled(nextVal);
    if (nextVal) {
      document.body.classList.remove('custom-cursor-active');
    } else {
      // Custom cursor only active on hoverable screens
      const hasHover = window.matchMedia('(hover: hover)').matches;
      if (hasHover) {
        document.body.classList.add('custom-cursor-active');
      }
    }
  };

  const navItems = ["about", "skills", "projects", "contact"];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-4 md:px-8 py-4 transition-all duration-300">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`mx-auto max-w-5xl rounded-full transition-all duration-500 flex justify-between items-center px-6 py-3 border ${
            scrolled 
              ? "glass-panel glass-panel-glow border-accent-purple/20 bg-obsidian/75" 
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Brand/Profile */}
          <Link
            to="hero"
            spy={true}
            smooth={true}
            duration={500}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-accent-cyan/40 group-hover:border-accent-purple/60 transition-all duration-300">
              <img
                src={profilePic}
                alt="Syed Hassan"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <span className="font-display text-base font-extrabold tracking-wider bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              HASSAN.DEV
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
            {navItems.map((section) => (
              <li key={section}>
                <Magnetic speed={0.25}>
                  <Link
                    to={section}
                    spy={true}
                    smooth={true}
                    duration={500}
                    activeClass="!text-accent-cyan after:scale-x-100"
                    className="relative cursor-pointer transition hover:text-white capitalize py-1 px-2 block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-accent-cyan after:to-accent-purple after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  >
                    {section}
                  </Link>
                </Magnetic>
              </li>
            ))}

            {/* Custom Cursor Toggle */}
            <li className="ml-4 border-l border-white/10 pl-4">
              <Magnetic speed={0.4}>
                <button
                  onClick={toggleCursorMode}
                  className={`p-2 rounded-full transition-colors ${
                    cursorDisabled 
                      ? "bg-white/5 text-gray-500 hover:text-white" 
                      : "bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan/20"
                  }`}
                  title={cursorDisabled ? "Enable Custom Cursor" : "Disable Custom Cursor"}
                >
                  <FaMousePointer size={14} />
                </button>
              </Magnetic>
            </li>
          </ul>

          {/* Mobile Hamburguer & Config */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleCursorMode}
              className={`p-2 rounded-full ${
                cursorDisabled 
                  ? "bg-white/5 text-gray-500" 
                  : "bg-accent-cyan/10 text-accent-cyan"
              }`}
            >
              <FaMousePointer size={14} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-accent-cyan p-2 transition-colors"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-obsidian/95 z-30 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            <ul className="flex flex-col gap-6 text-center text-2xl font-display font-extrabold tracking-widest text-gray-300">
              {navItems.map((section, idx) => (
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={section}
                >
                  <Link
                    to={section}
                    spy={true}
                    smooth={true}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    activeClass="!text-accent-cyan"
                    className="cursor-pointer capitalize hover:text-accent-purple transition-all duration-300"
                  >
                    {section}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
