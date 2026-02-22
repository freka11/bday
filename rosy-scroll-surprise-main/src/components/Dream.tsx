const Dream = () => {
  return (
    <section id="dream-section" className="relative py-20 bg-romantic overflow-hidden">
      <h3 className="relative z-10 text-3xl sm:text-4xl font-cursive text-primary text-glow text-center mb-6">
        You are soo pretty so u got me like
      </h3>

      <div className="relative z-10 flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-6 scrollbar-hide w-full">
        {[
          { src: "/images/echo-2.jpeg", text: "You are soo pretty so u got me like 💖" },
          { src: "/images/pretty_specsimp.jpeg", text: "You look just like a Dream 💭" },
          { src: "/images/pretty-2.jpeg", text: "The pretties girl I've ever seen😍🥰" },
          { src: "/images/nye-2.jpeg", text: "From the cover of a Magazineee📚" },
        ].map((item, i) => (
          <div key={i} className="snap-center shrink-0 first:ml-auto last:mr-auto">
            <div className="relative w-[80vw] max-w-[400px] aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border-4 border-secondary group">
              <img
                src={item.src}
                alt={item.text}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <p className="absolute bottom-0 left-0 right-0 p-6 text-xl sm:text-2xl font-cursive text-primary-foreground leading-snug">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="relative z-10 text-center text-muted-foreground text-sm font-body mt-4">
        ← swipe to explore →
      </p>
    </section>
  );
};

export default Dream;
