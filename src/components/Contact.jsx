import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate background grid cells for interactive hover glow
  const gridCells = Array.from({ length: 60 });

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-16 bg-obsidian text-white relative overflow-hidden border-b border-white/5"
    >
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#0a0a0e',
            color: '#fff',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }
        }}
      />

      {/* Interactive Grid Lights Background */}
      <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-10 gap-0 pointer-events-none opacity-40 z-0">
        {gridCells.map((_, i) => (
          <div
            key={i}
            className="w-full h-full border-[0.5px] border-white/[0.015] pointer-events-auto transition-colors duration-1000 ease-out hover:bg-accent-cyan/15 hover:duration-0"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent-cyan tracking-widest text-xs font-mono uppercase">GET IN TOUCH</span>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight mt-2">
            LET'S CONNECT
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Glassmorphic Contact Form */}
          <form 
            action={`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`}
            method="POST"
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-6 glass-panel p-8 rounded-3xl border-white/5 shadow-2xl relative"
          >
            <div className="relative group">
              <input
                type="text"
                name="name"
                required
                disabled={isSubmitting}
                placeholder=" "
                className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all text-sm placeholder-transparent"
              />
              <label className="absolute left-4 top-4 text-xs sm:text-sm text-gray-500 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent-cyan peer-focus:bg-[#050507] peer-focus:px-2 rounded
                // CSS hack to keep label up when value is typed
                peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent-cyan peer-[:not(:placeholder-shown)]:bg-[#050507] peer-[:not(:placeholder-shown)]:px-2">
                Your Name
              </label>
            </div>

            <div className="relative group">
              <input
                type="email"
                name="email"
                required
                disabled={isSubmitting}
                placeholder=" "
                className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-cyan transition-all text-sm placeholder-transparent"
              />
              <label className="absolute left-4 top-4 text-xs sm:text-sm text-gray-500 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent-cyan peer-focus:bg-[#050507] peer-focus:px-2 rounded
                peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent-cyan peer-[:not(:placeholder-shown)]:bg-[#050507] peer-[:not(:placeholder-shown)]:px-2">
                Your Email
              </label>
            </div>

            <div className="relative group">
              <textarea
                name="message"
                required
                disabled={isSubmitting}
                placeholder=" "
                className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white h-36 resize-none focus:outline-none focus:border-accent-cyan transition-all text-sm placeholder-transparent"
              ></textarea>
              <label className="absolute left-4 top-4 text-xs sm:text-sm text-gray-500 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-accent-cyan peer-focus:bg-[#050507] peer-focus:px-2 rounded
                peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent-cyan peer-[:not(:placeholder-shown)]:bg-[#050507] peer-[:not(:placeholder-shown)]:px-2">
                Your Message
              </label>
            </div>
            
            <input type="hidden" name="_subject" value="New message from portfolio!" />
            <input type="hidden" name="_template" value="table" />
            
            <Magnetic speed={0.2} range={40}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-accent-purple to-accent-cyan text-white py-4 rounded-xl font-semibold hover:brightness-110 shadow-lg shadow-accent-purple/20 transition-all duration-300 cursor-pointer ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Transmitting Message...' : 'Send Transmission'}
              </button>
            </Magnetic>
          </form>

          {/* Contact Information Panel */}
          <div className="flex-1 flex flex-col justify-center glass-panel p-8 rounded-3xl border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/5 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-accent-cyan mb-8">
              CONTACT NODE
            </h3>
            
            <ul className="space-y-6 text-gray-300 text-sm sm:text-base">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan shrink-0">
                  <HiOutlineMail size={18} />
                </div>
                <div>
                  <span className="font-mono text-xs text-gray-500 block uppercase">Email Address</span>
                  <a href="mailto:syedhassanshah154@gmail.com" className="hover:text-accent-cyan transition-colors font-medium break-all">
                    syedhassanshah154@gmail.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan shrink-0">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <span className="font-mono text-xs text-gray-500 block uppercase">Phone Line</span>
                  <a href="tel:+923360778355" className="hover:text-accent-cyan transition-colors font-medium">
                    +92 336 0778355
                  </a>
                </div>
              </li>
              
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan shrink-0">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <span className="font-mono text-xs text-gray-500 block uppercase">HQ Location</span>
                  <span className="text-gray-300 leading-relaxed font-medium">
                    Chak No.3 JB Randawali Sargodha Road,<br />Faisalabad, Pakistan
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}