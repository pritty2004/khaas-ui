import React, { useState, useEffect } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import { useToast } from "@/hooks/use-toast";
import { useProducts, Product } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Rania Kundan Kara",
    price: 24500,
    original_price: 28000,
    image_url: product1,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Aara Slim Stack (Set of 3)",
    price: 9800,
    image_url: product2,
    tag: "New",
  },
  {
    id: 3,
    name: "Zara Filigree Cuff",
    price: 18200,
    image_url: product3,
    tag: null,
  },
  {
    id: 4,
    name: "Noor Polki Pair",
    price: 32000,
    original_price: 36500,
    image_url: product4,
    tag: "Limited",
  },
];

const formatPrice = (price: number | string) =>
  typeof price === "number" ? `₹${price.toLocaleString("en-IN")}` : price;

const ProductShowcase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: products, isLoading, isError } = useProducts();
  const { addItem, loading: cartLoading } = useCart();
  const [addingId, setAddingId] = useState<number | null>(null);

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  const displayedProducts =
    !isError && products && products.length > 0 ? products : fallbackProducts;

  const handleAddToCart = async (product: Product) => {
    setAddingId(product.id);
    try {
      await addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        original_price: product.original_price,
        image_url: product.image_url,
        tag: product.tag,
      });
      toast({
        title: "Added to cart ✓",
        description: `${product.name} has been added to your cart.`,
      });
      // Redirect to cart after 1 second
      setTimeout(() => navigate("/cart"), 800);
    } catch (error: unknown) {
      toast({
        title: "Cart update failed",
        description:
          error instanceof Error
            ? error.message
            : "Unable to add the item to your cart.",
        variant: "destructive",
      });
    } finally {
      setAddingId(null);
    }
  };

  return (
    <section id="products" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-sans tracking-[0.4em] uppercase text-primary mb-3">
            Handpicked
          </p>
          <h2 className="text-3xl lg:text-5xl font-serif gold-text">
            Signature Pieces
          </h2>
          <div className="w-16 h-[1px] gold-gradient mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(isLoading ? fallbackProducts : displayedProducts).map((product) => (
            <div key={product.id} className="group bg-card overflow-hidden relative">
              {product.tag && (
                <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-[10px] font-sans tracking-widest uppercase px-3 py-1">
                  {product.tag}
                </span>
              )}

              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Toggling favorite for", product.id);
                    toggleFavorite(product.id);
                  }}
                  aria-pressed={favorites.includes(product.id)}
                  className={`w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center transition-colors ${
                    favorites.includes(product.id) ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  <Heart size={16} />
                </button>
                <button className="w-9 h-9 bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary transition-colors">
                  <Eye size={16} />
                </button>
              </div>

              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={product.image_url as string}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="text-base font-serif text-foreground">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-sans text-primary font-medium">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price && (
                    <span className="text-xs font-sans text-muted-foreground line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  disabled={addingId === product.id || cartLoading}
                  className="mt-4 w-full flex items-center justify-center gap-2 gold-gradient px-4 py-3 text-xs font-sans tracking-widest uppercase text-primary-foreground hover:opacity-90 transition-all gold-shimmer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ShoppingBag size={14} />
                  {addingId === product.id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
