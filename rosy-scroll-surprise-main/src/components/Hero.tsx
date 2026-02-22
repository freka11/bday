import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4 }
    ).
    fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.6"
    ).
    fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      "-=0.3"
    );
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-bg.mp4" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-secondary/60 to-background/80" />

      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) =>
        <span
          key={i}
          className="absolute text-primary/20 select-none"
          style={{
            left: `${10 + i * 12}%`,
            fontSize: `${20 + Math.random() * 30}px`,
            animation: `rise ${6 + Math.random() * 6}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}>

            💕
          </span>
        )}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          ref={headingRef}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-cursive text-primary-foreground text-glow floating mb-6 opacity-0">HEYYY 
BIRTHDAY GIRLLLLLLL

        </h1>
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl font-body font-light text-primary-foreground/90 opacity-0 max-w-2xl mx-auto">

          Today is all about you, the most amazing person in my life
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 flex flex-col items-center gap-2">

        <span className="text-sm font-body text-primary-foreground/70">kINDAKI SCROLLL CHY MUNDAAAAAA

        </span>
        <div className="scroll-indicator text-2xl">↓</div>
      </div>
    </section>);

};

export default Hero;