import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Memory = {
  src: string;
  type: "image" | "video";
  text: string;
};

const memories: Memory[] = [
  {
    src: "/images/hopry.jpeg",
    type: "image",
    text: "inko 10 years aina ninnu ila ne etthukuntaaa ✨",
  },
  {
    src: "/images/black_tredi.jpeg",
    type: "image",
    text: "every momwnt with you feels like magic💖",
  },
  {
    src: "/images/kiss.jpeg",
    type: "image",
    text: "My heart beats only for you 💕",
  },
  {
    src: "/images/morning.jpeg",
    type: "image",
    text: "Forever & always 🌸",
  },
  {
    src: "/images/punish.jpeg",
    type: "image",
    text: "I love annoying you 😜",
  },
  {
    src: "/images/sattva.jpeg",
    type: "image",
    text: "lets get more rainbow cakesss🍰",
  },
  {
    src: "/images/insane.jpeg",
    type: "image",
    text: "yes iam inasneee🤪",
  },
];

const MemorySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    gsap.fromTo(
      heading,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="memory-section" ref={sectionRef} className="py-20">
      <h2
        ref={headingRef}
        className="text-5xl sm:text-6xl md:text-7xl font-cursive text-primary text-glow text-center mb-10 opacity-0"
      >
        💝
      </h2>

      {/* Horizontal scroll-snap gallery */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-6 scrollbar-hide">
        {memories.map((memory, i) => (
          <div
            key={i}
            className="snap-center shrink-0 first:ml-auto last:mr-auto"
          >
            <div className="relative w-[80vw] max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-secondary group">
              {memory.type === "video" ? (
                <video
                  src={memory.src}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={memory.src}
                  alt={memory.text}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <p className="absolute bottom-0 left-0 right-0 p-6 text-xl sm:text-2xl font-cursive text-primary-foreground leading-snug">
                {memory.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <p className="text-center text-muted-foreground text-sm font-body mt-4">
        ← swipe to explore →
      </p>
    </section>
  );
};

export default MemorySection;
