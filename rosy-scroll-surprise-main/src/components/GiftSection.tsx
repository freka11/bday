import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";

gsap.registerPlugin(ScrollTrigger);

const GiftSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lottieContainerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch("/animations/gift-box.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => {
        fetch("/animations/gift-box-alt.json")
          .then((res) => res.json())
          .then((data) => setAnimationData(data));
      });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !animationData) return;

    gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1.15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    lottieRef.current?.goToAndStop(0, true);

    ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      onEnter: () => {
        if (triggeredRef.current) return;
        triggeredRef.current = true;
        openGift();
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animationData]);

  const openGift = () => {
    const tl = gsap.timeline();
    const colors = ["#ff69b4", "#ffc0cb", "#ff1493", "#ffffff", "#ffb6c1"];

    tl
      .to(lottieContainerRef.current, {
        x: -6,
        duration: 0.06,
        repeat: 12,
        yoyo: true,
        ease: "power1.inOut",
      })
      .to(lottieContainerRef.current, {
        scale: 1.08,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(glowRef.current, { opacity: 1, scale: 1.4, duration: 0.4 }, "<")
      .to(overlayRef.current, {
        opacity: 0.4,
        duration: 0.15,
        ease: "power4.in",
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      })
      .call(() => {
        lottieRef.current?.goToAndPlay(0, true);
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.55 },
          colors,
          gravity: 0.8,
        });
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5, x: 0.4 },
            colors,
          });
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5, x: 0.6 },
            colors,
          });
        }, 250);
      })
      .to(
        lottieContainerRef.current,
        { scale: 0.9, y: 20, duration: 0.3, ease: "back.out(1.5)" },
        "+=0.4"
      )
      .fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.5, y: 60, rotation: -3 },
        {
          opacity: 1,
          scale: 1,
          y: -20,
          rotation: 2,
          duration: 1,
          ease: "back.out(1.8)",
        },
        "-=0.1"
      )
      .to(cardRef.current, {
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
      });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden"
    >
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-primary-foreground pointer-events-none z-50 opacity-0"
      />

      <h2 className="text-5xl sm:text-6xl md:text-7xl font-cursive text-primary text-glow text-center mb-16">
        A Surprise For You 🎁
      </h2>

      <div className="relative flex flex-col items-center">
        <div
          ref={glowRef}
          className="absolute w-72 h-72 rounded-full opacity-30 -z-10"
          style={{
            background:
              "radial-gradient(circle, hsl(330 100% 56% / 0.5), transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div ref={lottieContainerRef} className="w-64 h-64 sm:w-80 sm:h-80">
          {animationData && (
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              className="w-full h-full"
            />
          )}
        </div>
      </div>

      <div
        ref={cardRef}
        className="mt-10 opacity-0 w-full max-w-[400px] mx-auto"
      >
        <div
          className="relative rounded-3xl p-8 sm:p-10 text-center floating-slow"
          style={{
            background: "hsl(340, 100%, 95%)",
            boxShadow:
              "0 8px 40px hsl(330 100% 56% / 0.25), 0 0 60px hsl(330 100% 56% / 0.1)",
          }}
        >
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

          <h3 className="text-3xl sm:text-4xl font-cursive text-primary text-glow mb-4">
            My Beautiful Love 💖
          </h3>
          <p className="text-base sm:text-lg font-body text-foreground/80 leading-relaxed">
            You are the most magical part of my life.
            <br />
            Every moment with you feels like a dream I never want to wake from.
            <br />
            <span className="font-semibold text-primary">
              Happy Birthday, my heart. 💕
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;