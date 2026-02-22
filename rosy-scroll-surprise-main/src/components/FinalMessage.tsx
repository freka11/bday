import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const glowingHearts = ["💖", "💗", "💓", "💕", "🩷", "❤️‍🔥", "💝"];

const FinalMessage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const confettiFired = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            if (!confettiFired.current) {
              confettiFired.current = true;
              // Burst confetti from both sides
              const colors = ["#ff69b4", "#ffc0cb", "#ff1493", "#ffffff", "#ffb6c1", "#ff85a2", "#ffd700"];
              confetti({ particleCount: 100, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors });
              confetti({ particleCount: 100, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors });
              setTimeout(() => {
                confetti({ particleCount: 80, angle: 90, spread: 120, origin: { x: 0.5, y: 0.8 }, colors });
              }, 400);
            }
          },
        },
      },
    );

    gsap.fromTo(
      heartRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <section
      id="final-section"
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      {/* Video background - rotated to landscape */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-contain"
          src="/videos/water_fountain.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ transform: "rotate(270deg)" }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-foreground/10" />
      </div>

      <button
        onClick={() => {
          const colors = ["#ff69b4", "#ffc0cb", "#ff1493", "#ffffff", "#ffb6c1", "#ff85a2", "#ffd700"];
          confetti({ particleCount: 100, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors });
          confetti({ particleCount: 100, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors });
          setTimeout(() => {
            confetti({ particleCount: 80, angle: 90, spread: 120, origin: { x: 0.5, y: 0.8 }, colors });
          }, 400);
        }}
        className="relative z-20 mb-8 px-5 py-3 rounded-full bg-transparent text-primary-foreground font-body text-2xl hover-scale cursor-pointer border-none outline-none flex flex-col items-center gap-1"
      >
        🎉
        <span className="text-xs font-body font-bold opacity-90" style={{ textShadow: "0 0 10px hsl(330 100% 56% / 0.8), 0 0 20px hsl(330 100% 56% / 0.4)" }}>click me</span>
      </button>

      {/* Glowing hearts floating */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(16)].map((_, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-40px",
              fontSize: `${20 + Math.random() * 28}px`,
              animation: `rise ${8 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 12}s`,
              filter: "drop-shadow(0 0 8px hsl(330 100% 56% / 0.7))",
            }}
          >
            {glowingHearts[i % glowingHearts.length]}
          </span>
        ))}
      </div>

      {/* Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(10)].map((_, i) => (
          <span
            key={`sparkle-${i}`}
            className="absolute select-none"
            style={{
              left: `${10 + i * 9}%`,
              fontSize: `${14 + Math.random() * 16}px`,
              animation: `rise ${12 + Math.random() * 8}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              filter: "drop-shadow(0 0 6px gold)",
            }}
          >
            💕
          </span>
        ))}
      </div>

      {/* Birthday GIF emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {["🎂", "🎉", "🎊", "🥳", "🎈", "🎁", "🍰", "🎀"].map((emoji, i) => (
          <span
            key={`bday-${i}`}
            className="absolute select-none"
            style={{
              left: `${5 + i * 12}%`,
              bottom: "-50px",
              fontSize: `${24 + Math.random() * 20}px`,
              animation: `rise ${9 + Math.random() * 7}s linear infinite`,
              animationDelay: `${2 + Math.random() * 10}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <h2
        ref={textRef}
        className="relative z-20 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-cursive text-primary-foreground text-center leading-relaxed floating-slow w-full px-4 opacity-0"
        style={{
          textShadow: "0 0 20px hsl(330 100% 56% / 0.8), 0 0 40px hsl(330 100% 56% / 0.4), 0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        Happy Birthday To The Love Of My Life 🎂💖
      </h2>

      <div ref={heartRef} className="relative z-20 mt-16 opacity-0">
        <div
          className="text-8xl sm:text-9xl heartbeat select-none"
          style={{ filter: "drop-shadow(0 0 20px hsl(330 100% 56% / 0.8))" }}
        >
          ️
        </div>
      </div>

      <p
        className="relative z-20 mt-12 font-body text-primary-foreground text-center text-xl sm:text-2xl w-full px-4"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
      >
        With all my love, forever and always 💌
      </p>

    </section>
  );
};

export default FinalMessage;
