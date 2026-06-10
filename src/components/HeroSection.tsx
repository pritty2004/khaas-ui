import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Elegant Indian woman adorned with ornate gold bangles"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl">
            <p
              className="text-sm lg:text-base font-sans tracking-[0.4em] uppercase text-primary mb-4 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              New Arrival 2026
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.1] mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <span className="gold-text">KHAAS:</span>
              <br />
              <span className="text-foreground">The New</span>
              <br />
              <span className="text-foreground italic">Bangle Code</span>
            </h2>
            <p
              className="text-lg lg:text-xl text-muted-foreground font-sans font-light mb-10 max-w-md opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              Handcrafted elegance rooted in tradition
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.9s" }}
            >
              <a
                href="#products"
                className="gold-gradient px-8 py-4 text-sm font-sans tracking-widest uppercase text-primary-foreground hover:opacity-90 transition-all duration-300 text-center gold-shimmer"
              >
                Shop Collection
              </a>
              <a
                href="#craft"
                className="border border-primary/40 px-8 py-4 text-sm font-sans tracking-widest uppercase text-primary hover:bg-primary/10 transition-all duration-300 text-center"
              >
                Explore Craft
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/60 to-transparent mx-auto mb-2" />
        <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground">
          Scroll
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
