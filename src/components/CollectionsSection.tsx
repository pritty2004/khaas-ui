import collectionKundan from "@/assets/collection-kundan.jpg";
import collectionMinimal from "@/assets/collection-minimal.jpg";
import collectionAntique from "@/assets/collection-antique.jpg";
import collectionMeenakari from "@/assets/collection-meenakari.jpg";

const collections = [
  { name: "Kundan Collection", image: collectionKundan, price: "From ₹18,500" },
  { name: "Minimal Gold", image: collectionMinimal, price: "From ₹8,200" },
  { name: "Antique Stack", image: collectionAntique, price: "From ₹12,000" },
  { name: "Meenakari Story", image: collectionMeenakari, price: "From ₹22,000" },
];

const CollectionsSection = () => {
  return (
    <section id="collections" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-sans tracking-[0.4em] uppercase text-primary mb-3">
            Curated For You
          </p>
          <h2 className="text-3xl lg:text-5xl font-serif gold-text">
            Featured Collections
          </h2>
          <div className="w-16 h-[1px] gold-gradient mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, i) => (
            <div
              key={col.name}
              className="group relative overflow-hidden bg-card cursor-pointer"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 gold-glow" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-serif text-foreground group-hover:text-primary transition-colors">
                  {col.name}
                </h3>
                <p className="text-sm text-muted-foreground font-sans mt-1">{col.price}</p>
                <button className="mt-4 text-xs font-sans tracking-widest uppercase text-primary border-b border-primary/40 pb-1 hover:border-primary transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
