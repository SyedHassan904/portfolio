import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children, speed = 0.5, range = 60 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const child = container.firstElementChild;
    if (!child) return;

    // Apply inline flex or display block block positioning to make sure translation matches
    child.style.display = child.style.display || 'inline-block';

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const rect = container.getBoundingClientRect();
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);

      // Check distance from center
      const distance = Math.hypot(x, y);

      if (distance < range) {
        // Magnetic pull
        gsap.to(child, {
          x: x * speed,
          y: y * speed,
          duration: 0.35,
          ease: 'power2.out',
        });
      } else {
        // Snap back
        gsap.to(child, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) {
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [speed, range]);

  return (
    <div ref={containerRef} className="inline-block">
      {children}
    </div>
  );
}
