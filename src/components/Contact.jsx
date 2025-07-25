// components/Contact.jsx
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { useState } from "react";

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

  return (
    <section
      id="contact"
      className="p-10 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white"
    >
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #7C3AED',
          }
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold text-center text-purple-400 mb-12">
          Contact Me
        </h2>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          {/* Contact Form */}
          <form 
            action={`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`}
            method="POST"
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col gap-4 bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="p-3 bg-gray-800 text-white border border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
              required
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="p-3 bg-gray-800 text-white border border-purple-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
              required
              disabled={isSubmitting}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="p-3 bg-gray-800 text-white border border-purple-600 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 transition"
              required
              disabled={isSubmitting}
            ></textarea>
            
            <input type="hidden" name="_subject" value="New message from portfolio!" />
            <input type="hidden" name="_template" value="table" />
            
            <motion.button
              whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
              type="submit"
              className={`bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>

          {/* Contact Info Panel */}
          <div className="flex-1 flex flex-col justify-center bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">
              Contact Information
            </h3>
            <ul className="space-y-4 text-gray-300 text-lg">
              <li className="flex items-start gap-3">
                <HiOutlineMail className="text-purple-400 text-xl mt-1 flex-shrink-0" />
                <span className="break-all">
                  <span className="font-medium text-white">Email:</span>{" "}
                  syedhassanshah154@gmail.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-purple-400 text-xl" />
                <span>
                  <span className="font-medium text-white">Phone:</span>{" "}
                  +92 336 0778355
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-purple-400 text-xl" />
                <span>
                  <span className="font-medium text-white">Address:</span>{" "}
                  Chak No.3 JB Randawali Sargodha Road, Faisalabad, Pakistan
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
