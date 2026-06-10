import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { CreditCard, Lock, Loader2, CheckCircle } from "lucide-react";

export default function Payment() {
  const navigate = useNavigate();
  const { items, totalPrice } = useCart();
  const { isLoggedIn, user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [loading, setLoading] = useState(false);

  // Shipping details
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Payment details
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  const shipping = totalPrice > 0 ? (totalPrice >= 50000 ? 0 : 299) : 0;
  const tax = Math.round(totalPrice * 0.03);
  const total = totalPrice + shipping + tax;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-serif mb-6">Please Login to Continue</h1>
          <Button onClick={() => navigate("/")} className="bg-primary">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-serif mb-6">Cart is Empty</h1>
          <Button onClick={() => navigate("/cart")} className="bg-primary">
            Go to Cart
          </Button>
        </div>
      </div>
    );
  }

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address || !city || !zipCode) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      toast({
        title: "Error",
        description: "Please fill all payment details",
        variant: "destructive",
      });
      return;
    }

    // Validate card
    if (cardNumber.length < 15 || cardNumber.length > 16) {
      toast({
        title: "Error",
        description: "Invalid card number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock payment success
      const orderData = {
        orderId: "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        customer: fullName,
        email,
        phone,
        address,
        city,
        zipCode,
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal: totalPrice,
        shipping,
        tax,
        total,
        paymentMethod: cardName,
        orderDate: new Date().toISOString(),
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      orders.push(orderData);
      localStorage.setItem("orders", JSON.stringify(orders));

      toast({
        title: "Payment Successful! ✓",
        description: `Order ID: ${orderData.orderId}`,
      });

      setStep("success");

      // Redirect to home after 3 seconds
      setTimeout(() => {
        localStorage.removeItem("cart"); // Clear cart
        navigate("/");
      }, 3000);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="mt-16">
          <h1 className="text-4xl lg:text-5xl font-serif tracking-wide mb-12">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === "success" ? (
                <div className="border border-border rounded-lg p-12 bg-card text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-serif mb-3">Order Confirmed!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your purchase. Your order has been placed successfully.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to home page...
                  </p>
                </div>
              ) : step === "details" ? (
                <form onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div className="border border-border rounded-lg p-6 bg-card">
                    <h2 className="text-2xl font-serif mb-6">Shipping Details</h2>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="bg-background border-border"
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>

                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-background border-border"
                      />

                      <Input
                        placeholder="Street Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-background border-border"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="bg-background border-border"
                        />
                        <Input
                          placeholder="ZIP Code"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          className="bg-background border-border"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full gold-gradient text-primary-foreground py-6 text-base gold-shimmer"
                  >
                    Continue to Payment
                  </Button>
                </form>
              ) : (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="border border-border rounded-lg p-6 bg-card">
                    <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
                      <CreditCard size={24} />
                      Payment Method
                    </h2>

                    <div className="space-y-4">
                      <Input
                        placeholder="Cardholder Name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="bg-background border-border"
                      />

                      <Input
                        placeholder="Card Number (16 digits)"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(
                            e.target.value.replace(/\D/g, "").slice(0, 16)
                          )
                        }
                        maxLength={16}
                        className="bg-background border-border font-mono"
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <Input
                          placeholder="MM"
                          value={expiryMonth}
                          onChange={(e) =>
                            setExpiryMonth(e.target.value.slice(0, 2))
                          }
                          maxLength={2}
                          className="bg-background border-border"
                        />
                        <Input
                          placeholder="YY"
                          value={expiryYear}
                          onChange={(e) =>
                            setExpiryYear(e.target.value.slice(0, 2))
                          }
                          maxLength={2}
                          className="bg-background border-border"
                        />
                        <Input
                          placeholder="CVV"
                          type="password"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                          }
                          maxLength={3}
                          className="bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6 p-4 bg-background rounded">
                      <Lock size={16} />
                      Your payment information is secure and encrypted
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep("details")}
                      className="flex-1"
                      disabled={loading}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 gold-gradient text-primary-foreground py-6 text-base gold-shimmer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Pay ₹{total.toLocaleString("en-IN")}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Order Summary */}
            <div className="border border-border rounded-lg p-6 h-fit bg-card sticky top-24">
              <h2 className="text-xl font-serif mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.cart_id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pb-6 border-b border-border">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-primary text-xs">FREE</span>
                    ) : (
                      `₹${shipping.toLocaleString("en-IN")}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tax (3%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex justify-between mt-4 text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


