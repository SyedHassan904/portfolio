import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function IntroLoader({ onComplete }) {
  const containerRef = useRef(null);
  const nameRef = useRef(null);
  const lineRef = useRef(null);
  const lineFillRef = useRef(null);
  const subtitleRef = useRef(null);
  const glowRef = useRef(null);
  const [phase, setPhase] = useState("loading"); // "loading", "subtitle"

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // 1. Loading Phase: Animate line filling and glow expanding
    tl.to(lineFillRef.current, {
      width: "100%",
      duration: 0.7,
      ease: "power2.out"
    }, 0);

    tl.fromTo(glowRef.current,
      { scale: 0.7, opacity: 0.25 },
      { scale: 1.3, opacity: 0.8, duration: 0.7, ease: "power2.out" },
      0
    );

    // 2. Transition from Name/Line to Subtitle
    tl.to([nameRef.current, lineRef.current], {
      opacity: 0,
      y: -15,
      filter: "blur(8px)",
      duration: 0.2,
      ease: "power2.in"
    });

    // Change phase to render subtitle
    tl.add(() => {
      setPhase("subtitle");
    });

    // 3. Subtitle Phase: Focus in (blur to clear) and scale up
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 15, filter: "blur(12px)", scale: 0.95 },
      { opacity: 1, y: 0, filter: "blur(0px)", scale: 1.0, duration: 0.4, ease: "power3.out" }
    );

    // Hold subtitle
    tl.to(subtitleRef.current, {
      opacity: 1,
      duration: 0.35
    });

    // Fade out subtitle and expand glow
    tl.to(subtitleRef.current, {
      opacity: 0,
      y: -15,
      filter: "blur(12px)",
      duration: 0.2,
      ease: "power3.in"
    });

    tl.to(glowRef.current, {
      opacity: 0,
      scale: 1.8,
      duration: 0.35,
      ease: "power2.in"
    }, "-=0.2");

    // 4. Exit Wipe Phase: Reveal Hero underneath via diagonal split wipe
    tl.to(containerRef.current, {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      duration: 0.55,
      ease: "power4.inOut"
    });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      id="intro-loader-root"
      className="fixed inset-0 bg-[#050507] z-50 flex flex-col items-center justify-center select-none overflow-hidden"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Premium Ambient Background Glow */}
      <div
        ref={glowRef}
        className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] rounded-full bg-radial-at-c from-accent-purple/15 via-accent-cyan/5 to-transparent blur-3xl pointer-events-none transform -translate-y-6 opacity-0"
      />

      <div className="relative text-center px-6 max-w-xl w-full flex flex-col items-center justify-center z-10">
        {phase === "loading" && (
          <>
            {/* Elegant Main Name with metallic gradient */}
            <h1
              ref={nameRef}
              className="text-3xl sm:text-5xl font-display font-black tracking-[0.3em] bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent mb-5"
            >
              SYED HASSAN
            </h1>

            {/* Elegant thin loading line with glow */}
            <div
              ref={lineRef}
              className="w-40 sm:w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-[0_0_8px_rgba(255,255,255,0.05)]"
            >
              <div
                ref={lineFillRef}
                className="absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan shadow-[0_0_10px_#00f0ff]"
              />
            </div>
          </>
        )}

        {phase === "subtitle" && (
          <p
            ref={subtitleRef}
            className="text-base sm:text-xl font-display font-medium text-transparent bg-gradient-to-r from-gray-200 via-white to-gray-400 bg-clip-text tracking-widest leading-relaxed px-4 text-center opacity-0 filter blur-[10px]"
          >
            Crafting intelligent digital experiences
          </p>
        )}
      </div>
    </div>
  );
}
