import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Check if device supports hover (not mobile/tablet touch)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Enable custom cursor style on body initially
    document.body.classList.add('custom-cursor-active');

    // Set initial position out of view and hidden
    gsap.set([dot, ring], { 
      xPercent: -55, 
      yPercent: -55, 
      x: -100, 
      y: -100,
      opacity: 0 
    });

    // GSAP quickTo is optimized for high-frequency updates (like mousemove)
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    let hasMoved = false;

    const handleMouseMove = (e) => {
      // Check if custom cursor is active before updating positions
      const isActive = document.body.classList.contains('custom-cursor-active');
      if (!isActive) return;

      // Reveal on first move
      if (!hasMoved) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
        hasMoved = true;
      }

      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Watch for class modifications on document.body to hide/show custom cursor
    const observer = new MutationObserver(() => {
      const isActive = document.body.classList.contains('custom-cursor-active');
      if (isActive) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      } else {
        gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Event listeners to handle custom states
    const handleMouseOver = (e) => {
      const isActive = document.body.classList.contains('custom-cursor-active');
      if (!isActive) return;

      if (!e.target || typeof e.target.closest !== 'function') return;

      const target = e.target.closest('[data-cursor]');
      const isInteractive = e.target.closest('a, button, [role="button"], input, textarea, select');
      
      if (target) {
        const type = target.getAttribute('data-cursor');
        
        if (type === 'view') {
          setCursorText('VIEW');
          gsap.to(ring, {
            width: 70,
            height: 70,
            backgroundColor: 'rgba(0, 240, 255, 0.2)',
            borderColor: '#00f0ff',
            borderWidth: 1.5,
            duration: 0.3,
          });
          gsap.to(dot, { scale: 0, duration: 0.3 });
        } else if (type === 'github') {
          setCursorText('CODE');
          gsap.to(ring, {
            width: 70,
            height: 70,
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            borderColor: '#8b5cf6',
            borderWidth: 1.5,
            duration: 0.3,
          });
          gsap.to(dot, { scale: 0, duration: 0.3 });
        } else if (type === 'link') {
          gsap.to(ring, {
            width: 45,
            height: 45,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: '#ffffff',
            duration: 0.3,
          });
          gsap.to(dot, { scale: 1.5, backgroundColor: '#00f0ff', duration: 0.3 });
        }
      } else if (isInteractive) {
        gsap.to(ring, {
          width: 45,
          height: 45,
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          borderColor: '#8b5cf6',
          borderWidth: 1,
          duration: 0.3,
        });
        gsap.to(dot, { scale: 0.5, backgroundColor: '#00f0ff', duration: 0.3 });
      }
    };

    const handleMouseOut = (e) => {
      const isActive = document.body.classList.contains('custom-cursor-active');
      if (!isActive) return;

      if (!e.target || typeof e.target.closest !== 'function') return;

      const target = e.target.closest('[data-cursor]');
      const isInteractive = e.target.closest('a, button, [role="button"], input, textarea, select');
      
      if (target || isInteractive) {
        setCursorText('');
        gsap.to(ring, {
          width: 24,
          height: 24,
          backgroundColor: 'transparent',
          borderColor: '#00f0ff',
          borderWidth: 1,
          duration: 0.3,
        });
        gsap.to(dot, { scale: 1, backgroundColor: '#8b5cf6', duration: 0.3 });
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 border border-accent-cyan rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-screen transition-colors opacity-0"
      >
        <span
          ref={textRef}
          className="text-[10px] font-display font-extrabold text-white tracking-widest pointer-events-none select-none"
        >
          {cursorText}
        </span>
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-purple rounded-full pointer-events-none z-50 mix-blend-screen opacity-0"
      />
    </>
  );
}
