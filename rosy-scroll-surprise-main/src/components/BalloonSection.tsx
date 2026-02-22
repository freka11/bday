import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const balloonColors = [
"hsl(330, 100%, 56%)",
"hsl(340, 100%, 76%)",
"hsl(350, 100%, 86%)",
"hsl(320, 80%, 60%)",
"hsl(340, 80%, 70%)"];


const hearts = ["💕", "💖", "💗", "💓", "🩷", "❤️"];

const BalloonSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section.querySelector("h2"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section
      id="balloon-section"
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-romantic py-20">

      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      {/* Floating balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) =>
        <div
          key={i}
          className="absolute"
          style={{
            left: `${5 + Math.random() * 90}%`,
            bottom: "-60px",
            animation: `rise ${8 + Math.random() * 8}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}>

            <div
            className="w-8 h-10 sm:w-10 sm:h-12 rounded-full"
            style={{
              backgroundColor: balloonColors[i % balloonColors.length],
              boxShadow: `0 0 20px ${balloonColors[i % balloonColors.length]}40`
            }} />

            <div className="w-px h-8 bg-primary/30 mx-auto" />
          </div>
        )}

        {/* Floating hearts */}
        {[...Array(10)].map((_, i) =>
        <span
          key={`heart-${i}`}
          className="absolute select-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-30px",
            fontSize: `${16 + Math.random() * 20}px`,
            animation: `rise ${10 + Math.random() * 8}s linear infinite`,
            animationDelay: `${Math.random() * 12}s`
          }}>

            {hearts[i % hearts.length]}
          </span>
        )}
      </div>

      <h2 className="relative z-10 text-4xl font-cursive text-primary text-glow text-center mb-6">
        You mean the world to me
      </h2>

      {/* Video in a decorative frame */}
      <div className="relative z-10 w-full max-w-md mx-auto mb-8 px-4">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-secondary bg-background/50 backdrop-blur-sm p-2">
          <video
            className="w-full rounded-2xl"
            src="/videos/balloon-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>

      <p className="relative z-10 font-body text-lg sm:text-xl text-foreground/70 text-center max-w-lg px-4 mb-10">
        you deserve all the love and happiness in the world
      </p>

    </section>);

};

export default BalloonSection;