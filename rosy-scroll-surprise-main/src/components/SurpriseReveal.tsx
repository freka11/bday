import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/images/no_slap.png",
  "/images/1slap.png",
  "/images/2slap.png",
  "/images/fslaps.png",
];

const SurpriseReveal = () => {
  const [clickCount, setClickCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (locked) return;
    const img = imageRef.current;
    if (!img) return;

    const next = clickCount + 1;
    setClickCount(next);

    if (next <= 3) {
      // Clicks 1-3: shake effect + swap image
      const intensity = next * 2 + 2;
      const repeats = next * 4 + 4;
      gsap.timeline()
        .to(img, { x: -intensity, duration: 0.04, repeat: repeats, yoyo: true, ease: "power1.inOut" })
        .to(img, { scale: 1 + next * 0.03, duration: 0.25, ease: "back.out(2)" })
        .to(img, { scale: 1, duration: 0.3, ease: "power2.out" });

      gsap.to(glowRef.current, { opacity: 0.2 + next * 0.2, scale: 1 + next * 0.1, duration: 0.4, ease: "power2.out" });
    } else if (next === 4) {
      // Fourth click — vibrate, scale down, then confetti + card reveal
      setLocked(true);

      const tl = gsap.timeline();
      const colors = ["#ff69b4", "#ffc0cb", "#ff1493", "#ffffff", "#ffb6c1"];

      tl
        // Small vibration + scale down
        .to(img, { x: -3, duration: 0.03, repeat: 14, yoyo: true, ease: "power1.inOut" })
        .to(img, { scale: 0.9, duration: 0.2, ease: "power2.in" })
        // Confetti burst
        .call(() => {
          const rect = img.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { x, y },
            colors,
            gravity: 0.8,
          });
        })
        // Fade image out
        .to(img, { opacity: 0, scale: 0.6, duration: 0.4, ease: "power2.in" })
        .to(glowRef.current, { opacity: 0, duration: 0.3 }, "<")
        // Card reveal
        .fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.5, y: 60 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "back.out(1.8)",
          },
          "-=0.1"
        )
        .to(cardRef.current, {
          boxShadow: "0 8px 40px hsl(330 100% 56% / 0.3), 0 0 60px hsl(330 100% 56% / 0.12)",
          duration: 0.5,
          ease: "power2.out",
        });
    }
  }, [clickCount, locked]);

  return (
    <section id="surprise-section" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-romantic">
      <h2 className="text-5xl sm:text-6xl md:text-7xl font-cursive text-primary text-glow text-center mb-16">
        Hit Me To Get The Message 👋
      </h2>

      <div ref={containerRef} className="relative flex flex-col items-center">
        {/* Glow circle behind image */}
        <div
          ref={glowRef}
          className="absolute w-72 h-72 rounded-full opacity-0 -z-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, hsl(330 100% 56% / 0.5), transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Clickable image */}
        {!locked && (
          <img
            ref={imageRef}
            src={images[Math.min(clickCount, 3)]}
            alt="Tap to reveal your surprise"
            onClick={handleClick}
            className="w-56 h-56 sm:w-72 sm:h-72 object-contain cursor-pointer floating select-none transition-transform duration-200 hover:scale-105"
            draggable={false}
          />
        )}

        {/* Romantic card — hidden until 3rd click */}
        <div
          ref={cardRef}
          className="w-full max-w-[400px] mx-auto opacity-0 pointer-events-none"
          style={{ display: locked ? "block" : "none" }}
        >
          <div
            className="relative rounded-3xl p-8 sm:p-10 text-center floating-slow"
            style={{
              background: "#ffe4ec",
              boxShadow: "0 8px 32px hsl(330 100% 56% / 0.2), 0 0 48px hsl(330 100% 56% / 0.08)",
            }}
          >
            {/* Floating hearts inside card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-primary/25 select-none"
                  style={{
                    left: `${15 + i * 14}%`,
                    fontSize: `${12 + Math.random() * 14}px`,
                    animation: `rise ${5 + Math.random() * 4}s linear infinite`,
                    animationDelay: `${Math.random() * 3}s`,
                  }}
                >
                  💕
                </span>
              ))}
            </div>

            <h3
              className="text-3xl sm:text-4xl text-primary text-glow mb-4"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              My Beautiful Love 💖
            </h3>
            <p className="text-base sm:text-lg font-body text-foreground/80 leading-relaxed">
              You unlocked my heart.
              <br />
              And now you get the full message.
              <br />
              <span className="font-semibold text-primary">
                Happy Birthday to the most special person in my universe. 💕
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Tap hint */}
      {!locked && (
        <p className="mt-8 text-center font-body text-muted-foreground text-sm animate-pulse">
          Slap to reveal your surprise 👋✨
        </p>
      )}
    </section>
  );
};

export default SurpriseReveal;
