import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const Cart = () => {
  const { items, totalCount, totalPrice, loading, removeItem, updateQuantity } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const shipping = totalPrice > 0 ? (totalPrice >= 50000 ? 0 : 299) : 0;
  const tax = Math.round(totalPrice * 0.03);
  const total = totalPrice + shipping + tax;

  const handleQuantityChange = async (cartId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsProcessing(true);
    try {
      await updateQuantity(cartId, newQuantity);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemove = async (cartId: number) => {
    setIsProcessing(true);
    try {
      await removeItem(cartId);
      toast({ title: "Removed from Cart" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="mt-16">
          <h1 className="text-4xl lg:text-5xl font-serif tracking-wide mb-2">
            Shopping Cart
          </h1>
          {totalCount > 0 && (
            <p className="text-sm text-muted-foreground font-sans mb-8">
              {totalCount} {totalCount === 1 ? "item" : "items"}
            </p>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <ShoppingBag size={56} className="text-muted-foreground/40 mb-6" />
              <h2 className="text-2xl font-serif mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground font-sans text-sm mb-8">
                Discover our handcrafted collections and add something beautiful.
              </p>
              <Link
                to="/#products"
                className="gold-gradient px-8 py-3 text-xs font-sans tracking-widest uppercase text-primary-foreground hover:opacity-90 transition-all gold-shimmer"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cart_id}
                    className="border border-border rounded-lg p-4 flex gap-4 bg-card"
                  >
                    {item.image_url && (
                      <div className="w-24 h-28 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif text-foreground text-base truncate">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.cart_id)}
                          className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0 ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      {item.tag && (
                        <span className="text-[10px] font-sans tracking-widest uppercase text-primary mt-1 inline-block">
                          {item.tag}
                        </span>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-border rounded">
                          <button
                            onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                            className="px-2 py-1 hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-sans w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                            className="px-2 py-1 hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-sans text-primary font-medium">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              ₹{item.price.toLocaleString("en-IN")} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border border-border rounded-lg p-6 h-fit bg-card">
                <h2 className="text-xl font-serif mb-4">Order Summary</h2>

                <div className="space-y-3 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0
                        ? <span className="text-primary text-xs">FREE</span>
                        : `₹${shipping.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">GST (3%)</span>
                    <span>₹{tax.toLocaleString("en-IN")}</span>
                  </div>
                  {shipping === 0 && totalPrice > 0 && (
                    <p className="text-xs text-primary font-sans">
                      🎉 Free shipping on orders above ₹50,000
                    </p>
                  )}
                </div>

                <div className="flex justify-between mt-4 mb-6 text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <Link
                  to="/payment"
                  className="w-full gold-gradient text-primary-foreground py-3 px-4 font-sans text-xs tracking-widest uppercase hover:opacity-90 transition-all gold-shimmer inline-flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/"
                  className="mt-3 w-full border border-border text-muted-foreground py-2 px-4 font-sans text-xs tracking-widest uppercase hover:text-primary hover:border-primary transition-all inline-flex items-center justify-center"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default Cart;
