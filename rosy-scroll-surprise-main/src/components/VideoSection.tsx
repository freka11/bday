import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const glowingHearts = ["💖", "💗", "💓", "💕", "🩷", "❤️‍🔥", "💝"];

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const confettiFired = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    gsap.fromTo(
      video,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      },
    );

    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {
        video.play().catch(() => {});
        if (!confettiFired.current) {
          confettiFired.current = true;
          const colors = ["#ff69b4", "#ffc0cb", "#ff1493", "#ffffff", "#ffb6c1", "#ff85a2", "#ffd700"];
          confetti({ particleCount: 100, angle: 60, spread: 80, origin: { x: 0, y: 0.6 }, colors });
          confetti({ particleCount: 100, angle: 120, spread: 80, origin: { x: 1, y: 0.6 }, colors });
          setTimeout(() => {
            confetti({ particleCount: 80, angle: 90, spread: 120, origin: { x: 0.5, y: 0.8 }, colors });
          }, 400);
        }
      },
      onLeave: () => video.pause(),
      onEnterBack: () => video.play().catch(() => {}),
      onLeaveBack: () => video.pause(),
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="video-section" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-romantic relative overflow-hidden">
      {/* Glowing hearts floating */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: `${7 + i * 7}%`,
              bottom: "-40px",
              fontSize: `${18 + Math.random() * 24}px`,
              animation: `rise ${8 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 12}s`,
              filter: "drop-shadow(0 0 8px hsl(330 100% 56% / 0.7))",
            }}
          >
            {glowingHearts[i % glowingHearts.length]}
          </span>
        ))}
      </div>

      <h2 className="text-5xl sm:text-6xl md:text-7xl font-cursive text-primary text-glow floating mb-12 text-center relative z-20">
        Happy birthday rishuuuu
      </h2>
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary relative z-20">
        <video
          ref={videoRef}
          className="w-full aspect-video object-contain -rotate-90"
          src="/videos/birthday.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          poster="/images/hero.jpg"
        />
      </div>
      <p className="mt-8 text-center font-body text-muted-foreground text-lg max-w-xl relative z-20"></p>
    </section>
  );
};

export default VideoSection;
