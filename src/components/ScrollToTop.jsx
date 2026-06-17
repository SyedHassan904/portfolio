import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 glass-panel border-accent-purple/30 text-accent-cyan p-3.5 rounded-full shadow-2xl hover:bg-accent-purple/10 hover:border-accent-cyan/50 hover:text-white transition duration-300 z-50 animate-pulse"
      >
        <FaArrowUp size={14} />
      </button>
    )
  );
}
