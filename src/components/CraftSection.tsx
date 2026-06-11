import artisan from "@/assets/artisan.jpg";

const steps = [
  { step: "01", title: "Metal Work", desc: "Raw gold shaped by master hands" },
  { step: "02", title: "Stone Setting", desc: "Each gem placed with precision" },
  { step: "03", title: "Engraving", desc: "Intricate patterns etched by tradition" },
  { step: "04", title: "Polishing", desc: "Final gleam of perfection" },
];

const CraftSection = () => {
  return (
    <section id="craft" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden">
              <img
                src={artisan}
                alt="Artisan crafting gold bangles"
                loading="lazy"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-primary/20" />
            <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm px-6 py-4">
              <p className="text-xs font-sans tracking-widest uppercase text-primary">
                Harmony of Hands
              </p>
              <p className="text-sm text-muted-foreground font-sans mt-1">
                Generations of skill passed through time
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-sans tracking-[0.4em] uppercase text-primary mb-3">
              Our Process
            </p>
            <h2 className="text-3xl lg:text-5xl font-serif gold-text mb-4">
              Mastery in Metal,
              <br />
              Fire & Stone
            </h2>
            <p className="text-muted-foreground font-sans font-light mb-12 max-w-md">
              Every Dharohar bangle passes through the hands of artisans who have
              dedicated their lives to the ancient craft of Indian jewelry making.
            </p>

            <div className="space-y-8">
              {steps.map((s) => (
                <div key={s.step} className="flex gap-6 group cursor-default">
                  <span className="text-2xl font-serif text-primary/30 group-hover:text-primary transition-colors">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="text-lg font-serif text-foreground group-hover:text-primary transition-colors">
                      {s.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-sans">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftSection;
