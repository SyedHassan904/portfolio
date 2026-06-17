import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function TerminalIntro({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const consoleLogs = [
    { text: 'system_init --verbose', type: 'command' },
    { text: 'Initializing Syed Hassan\'s interactive engine...', type: 'info' },
    { text: 'Loading core modules: [React, TailwindCSS, GSAP]... SUCCESS', type: 'success' },
    { text: 'Syncing educational milestones... CS Bachelor\'s (2023 - 2027)', type: 'info' },
    { text: 'Fetching project index: [ImageStock, Admin Dashboard, Air Quality System]...', type: 'info' },
    { text: 'Establishing neural interface... ACTIVE', type: 'success' },
    { text: 'Initialization complete. Welcome to the workspace.', type: 'welcome' }
  ];

  useEffect(() => {
    if (currentLineIndex < consoleLogs.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, consoleLogs[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, currentLineIndex === 0 ? 300 : Math.random() * 400 + 200); // Random typing delay

      return () => clearTimeout(timer);
    } else {
      // Completed, trigger exit transition
      const exitTimer = setTimeout(() => {
        const preloader = document.getElementById('preloader-root');
        
        // Wipe preloader out with beautiful clip-path opening
        gsap.to(preloader, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', // horizontal slide fold
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            onComplete();
          }
        });
      }, 1000);

      return () => clearTimeout(exitTimer);
    }
  }, [currentLineIndex]);

  return (
    <div
      id="preloader-root"
      className="fixed inset-0 bg-[#050507] z-50 flex items-center justify-center p-4"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="w-full max-w-2xl bg-black/60 border border-white/10 rounded-lg overflow-hidden shadow-2xl backdrop-blur-md font-mono text-xs sm:text-sm">
        {/* Terminal Header */}
        <div className="bg-[#0e0e12] border-b border-white/5 px-4 py-2 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>
          <span className="text-gray-500 select-none">shassan@terminal ~ port-3000</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 h-80 overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-white/10 text-left">
          {lines.map((line, idx) => (
            <div key={idx} className="leading-relaxed">
              {line.type === 'command' ? (
                <span className="text-accent-cyan">
                  <span className="text-gray-500 select-none mr-2">$</span>
                  {line.text}
                </span>
              ) : line.type === 'success' ? (
                <span className="text-green-400">
                  <span className="text-gray-500 select-none mr-2">✓</span>
                  {line.text}
                </span>
              ) : line.type === 'welcome' ? (
                <span className="text-accent-purple font-extrabold text-sm sm:text-base block mt-2 animate-pulse">
                  {line.text}
                </span>
              ) : (
                <span className="text-gray-300">
                  <span className="text-gray-500 select-none mr-2">::</span>
                  {line.text}
                </span>
              )}
            </div>
          ))}

          {/* Prompt blinking block */}
          <div className="flex items-center">
            <span className="text-gray-500 select-none mr-2">
              {currentLineIndex === 0 ? '$' : '::'}
            </span>
            <span className="w-2 h-4 bg-accent-cyan animate-pulse inline-block" />
          </div>
        </div>
      </div>
    </div>
  );
}
