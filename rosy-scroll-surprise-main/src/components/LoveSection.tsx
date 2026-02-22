import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const glowingHearts = ["💖", "💗", "💓", "💕", "🩷", "❤️", "💘", "💝", "♥️", "❣️"];

const LoveSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector("h2"),
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      id="love-section"
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-romantic py-20"
    >
      {/* Glowing background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[80px]" />
      </div>

      {/* Glowing floating hearts all over */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <span
            key={`glow-heart-${i}`}
            className="absolute select-none"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-40px",
              fontSize: `${18 + Math.random() * 28}px`,
              animation: `rise ${8 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 14}s`,
              filter: `drop-shadow(0 0 ${6 + Math.random() * 10}px hsl(340, 100%, 60%))`,
            }}
          >
            {glowingHearts[i % glowingHearts.length]}
          </span>
        ))}
      </div>

      <h2 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-cursive text-primary text-glow text-center mb-8 px-4">
        I LOVE YOUU RISHUU
      </h2>

      {/* Video in a decorative frame */}
      <div className="relative z-10 w-full max-w-md mx-auto mb-8 px-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/40 bg-background/50 backdrop-blur-sm p-2"
          style={{ boxShadow: "0 0 40px hsl(340, 100%, 60%, 0.3)" }}
        >
          <video
            className="w-full rounded-2xl"
            src="/videos/carkissy.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </section>
  );
};

export default LoveSection;
