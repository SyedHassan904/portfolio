// components/Navbar.jsx
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import profilePic from "../assets/pfkotlin.png";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2,
      }}
      className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md sticky top-0 z-50"
    >
      {/* Profile Image */}
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
          <img
            src={profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-sm md:text-base">
        {["about", "skills", "projects", "contact"].map((section) => (
          <li key={section}>
            <Link
              to={section}
              spy={true}
              smooth={true}
              duration={300}
              activeClass="text-purple-400"
              className="cursor-pointer transition hover:text-purple-300 capitalize"
            >
              {section}
            </Link>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
