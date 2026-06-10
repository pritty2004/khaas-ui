import { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";

// Mock products - in real app, fetch from backend
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Gold Necklace",
    price: "₹5,000",
    original_price: "₹7,000",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Diamond Earrings",
    price: "₹3,500",
    original_price: "₹5,000",
    image: "https://images.unsplash.com/photo-1578562271905-03cf41f4aaae?w=500&h=500&fit=crop",
    tag: "New",
  },
  {
    id: 3,
    name: "Silver Ring",
    price: "₹2,000",
    original_price: "₹3,000",
    image: "https://images.unsplash.com/photo-1599643478549-b8083dc4f3f0?w=500&h=500&fit=crop",
    tag: "Sale",
  },
  {
    id: 4,
    name: "Pearl Bracelet",
    price: "₹4,500",
    original_price: "₹6,500",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    tag: "Bestseller",
  },
];

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");
      const ids = saved ? JSON.parse(saved) : [];
      setFavorites(ids);

      const products = MOCK_PRODUCTS.filter((p) => ids.includes(p.id));
      setFavoriteProducts(products);
    } catch {
      setFavorites([]);
      setFavoriteProducts([]);
    }
  }, []);

  const toggleFavorite = (productId: number) => {
    const updated = favorites.includes(productId)
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));

    const products = MOCK_PRODUCTS.filter((p) => updated.includes(p.id));
    setFavoriteProducts(products);

    if (!favorites.includes(productId)) {
      toast({ title: "Added to Favorites ❤️" });
    } else {
      toast({ title: "Removed from Favorites" });
    }
  };

  const handleAddToCart = async (product: any) => {
    try {
      await addItem({
        id: product.id,
        name: product.name,
        price: parseInt(product.price.replace(/[^0-9]/g, "")),
        original_price: product.original_price
          ? parseInt(product.original_price.replace(/[^0-9]/g, ""))
          : undefined,
        image_url: product.image,
        tag: product.tag,
      });
      toast({ title: "Added to Cart ✓" });
      // Redirect to cart after 1 second
      setTimeout(() => navigate("/cart"), 800);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add to cart",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-serif tracking-widest gold-text mb-2">My Favorites</h1>
          <p className="text-gray-400 mb-8">
            {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
          </p>

          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16 bg-gray-800 rounded-lg">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-xl text-gray-300 mb-6">Your favorites are empty</p>
              <Link to="/">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
                  {/* Product Image */}
                  <div className="relative h-64 bg-gray-700 overflow-hidden group">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.tag && (
                      <span className="absolute top-4 left-4 bg-yellow-600 text-white px-3 py-1 text-sm rounded-full font-medium">
                        {product.tag}
                      </span>
                    )}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-4 right-4 p-2 bg-gray-900 rounded-full shadow-md hover:bg-gray-700 transition-colors"
                    >
                      <Heart
                        size={20}
                        className={favorites.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                      />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-serif mb-2 text-white">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-semibold text-yellow-500">{product.price}</span>
                      {product.original_price && (
                        <span className="text-sm text-gray-500 line-through">{product.original_price}</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => toggleFavorite(product.id)}
                        variant="outline"
                        className="px-4 border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
