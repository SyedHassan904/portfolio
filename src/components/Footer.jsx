import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="p-6 bg-gray-900 text-white text-center">
      <div className="flex justify-center gap-6 mb-4">
        <a href="https://github.com/SyedHassan904" className="hover:text-blue-400"><FaGithub size={24} /></a>
        <a href="https://www.linkedin.com/in/syed-hassan-7853b4371/" className="hover:text-blue-400"><FaLinkedin size={24} /></a>
        <a href="#" className="hover:text-blue-400"><FaTwitter size={24} /></a>
      </div>
      <p className="text-sm">© 2025 Syed Hassan. All rights reserved.</p>
    </footer>
  );
}