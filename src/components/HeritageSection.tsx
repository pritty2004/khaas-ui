import heritage1 from "@/assets/heritage-1.jpg";
import heritage2 from "@/assets/heritage-2.jpg";
import heritage3 from "@/assets/heritage-3.jpg";

const images = [
  { src: heritage1, alt: "Hawa Mahal, Jaipur" },
  { src: heritage2, alt: "Indian temple carvings" },
  { src: heritage3, alt: "Traditional Indian textile patterns" },
];

const HeritageSection = () => {
  return (
    <section id="heritage" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-sans tracking-[0.4em] uppercase text-primary mb-3">
            Rooted in Culture
          </p>
          <h2 className="text-3xl lg:text-5xl font-serif gold-text">
            Echoes of Heritage
          </h2>
          <p className="text-muted-foreground font-sans font-light mt-4 max-w-lg mx-auto">
            Our designs draw from centuries of Indian artistry — the palaces of
            Rajasthan, the temples of the south, and the timeless patterns of
            our textiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative group overflow-hidden aspect-[4/3]">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;
