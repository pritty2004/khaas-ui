import { Star } from "lucide-react";

const testimonials = [
  {
    text: "The craftsmanship is extraordinary. Every bangle tells a story — I feel connected to centuries of tradition.",
    author: "Priya Sharma",
    location: "Mumbai",
  },
  {
    text: "Dharohar is the only brand where luxury meets soul. My wedding bangles were nothing short of heirloom pieces.",
    author: "Ananya Reddy",
    location: "Hyderabad",
  },
  {
    text: "Exquisite detail and impeccable quality. These are not just accessories — they are art.",
    author: "Meera Kapoor",
    location: "Delhi",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-sans tracking-[0.4em] uppercase text-primary mb-3">
            Voices of Elegance
          </p>
          <h2 className="text-3xl lg:text-5xl font-serif gold-text">
            What They Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="border border-border p-8 hover:border-primary/30 transition-colors duration-500 group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>
              <p className="text-foreground/80 font-sans font-light leading-relaxed italic mb-8">
                "{t.text}"
              </p>
              <div>
                <p className="text-sm font-serif text-primary">{t.author}</p>
                <p className="text-xs text-muted-foreground font-sans">
                  {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
