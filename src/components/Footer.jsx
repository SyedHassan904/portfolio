import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Magnetic from "./Magnetic";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-obsidian text-white text-center border-t border-white/5 relative z-10">
      <div className="flex justify-center items-center gap-6 mb-6">
        <Magnetic speed={0.3} range={35}>
          <a
            href="https://github.com/SyedHassan904"
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-colors"
          >
            <FaGithub size={20} />
          </a>
        </Magnetic>

        <Magnetic speed={0.3} range={35}>
          <a
            href="https://www.linkedin.com/in/syed-hassan-7853b4371/"
            target="_blank"
            rel="noreferrer"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
        </Magnetic>

        <Magnetic speed={0.3} range={35}>
          <a
            href="#"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-colors"
          >
            <FaTwitter size={18} />
          </a>
        </Magnetic>
      </div>

      <p className="text-xs text-gray-500 font-mono tracking-wider">
        © {currentYear} SYED HASSAN. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
}