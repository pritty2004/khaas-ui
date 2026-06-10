import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiUrl, getAuthToken, getJsonHeaders } from "@/lib/api";


export interface CartItem {
  cart_id: number;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  original_price?: number | null;
  image_url?: string | null;
  tag?: string | null;
}

interface CartContextType {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  loading: boolean;
  addItem: (product: { id: number; name: string; price: number | string; original_price?: number | string | null; image_url?: string | null; tag?: string | null }) => Promise<void>;
  removeItem: (cartId: number) => Promise<void>;
  updateQuantity: (cartId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function parsePrice(price: number | string | null | undefined): number {
  if (price == null) return 0;
  if (typeof price === "number") return price;
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      try {
        const local = localStorage.getItem("local_cart");
        setItems(local ? JSON.parse(local) : []);
      } catch {
        setItems([]);
      }
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(apiUrl("/api/cart"), {
        headers: getJsonHeaders(true)
      });
      if (res.ok) {
        const json = await res.json();
        const cartData = json?.data;
        if (cartData && cartData.items) {
          const mapped: CartItem[] = cartData.items.map((i: any) => ({
            cart_id: i.id,
            product_id: i.productId,
            quantity: i.quantity,
            name: i.productName,
            price: i.productPrice,
            image_url: i.productImageUrl,
            original_price: null,
            tag: null
          }));
          setItems(mapped);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to fetch cart from backend:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = useCallback(async (product: { id: number; name: string; price: number | string; original_price?: number | string | null; image_url?: string | null; tag?: string | null }) => {
    console.log("CartContext.addItem called", product.id);
    const token = getAuthToken();
    if (!token) {
      setItems((prev) => {
        const existing = prev.find((i) => i.product_id === product.id);
        let updated;
        if (existing) {
          updated = prev.map((i) => i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
        } else {
          updated = [
            ...prev,
            {
              cart_id: Date.now(),
              product_id: product.id,
              quantity: 1,
              name: product.name,
              price: parsePrice(product.price),
              original_price: product.original_price ? parsePrice(product.original_price) : null,
              image_url: product.image_url ?? null,
              tag: product.tag ?? null,
            }
          ];
        }
        localStorage.setItem("local_cart", JSON.stringify(updated));
        return updated;
      });
      return;
    }

    try {
      const existing = items.find((i) => i.product_id === product.id);
      const res = await fetch(apiUrl(existing ? `/api/cart/items/${existing.cart_id}` : "/api/cart/items"), {
        method: existing ? "PUT" : "POST",
        headers: getJsonHeaders(true),
        body: JSON.stringify(
          existing
            ? { quantity: existing.quantity + 1 }
            : { productId: product.id, quantity: 1 }
        )
      });
      if (res.ok) {
        const json = await res.json();
        const cartData = json?.data;
        if (cartData && cartData.items) {
          const mapped: CartItem[] = cartData.items.map((i: any) => ({
            cart_id: i.id,
            product_id: i.productId,
            quantity: i.quantity,
            name: i.productName,
            price: i.productPrice,
            image_url: i.productImageUrl,
            original_price: null,
            tag: null
          }));
          setItems(mapped);
        }
      }
    } catch (e) {
      console.error("Add item error:", e);
    }
  }, [items]);

  const removeItem = useCallback(async (cartId: number) => {
    const token = getAuthToken();
    if (!token) {
      setItems((prev) => {
        const updated = prev.filter((i) => i.cart_id !== cartId);
        localStorage.setItem("local_cart", JSON.stringify(updated));
        return updated;
      });
      return;
    }

    setItems((prev) => prev.filter((i) => i.cart_id !== cartId));

    try {
      const res = await fetch(apiUrl(`/api/cart/items/${cartId}`), {
        method: "DELETE",
        headers: getJsonHeaders(true)
      });
      if (res.ok) {
        const json = await res.json();
        const cartData = json?.data;
        if (cartData && cartData.items) {
          const mapped: CartItem[] = cartData.items.map((i: any) => ({
            cart_id: i.id,
            product_id: i.productId,
            quantity: i.quantity,
            name: i.productName,
            price: i.productPrice,
            image_url: i.productImageUrl,
            original_price: null,
            tag: null
          }));
          setItems(mapped);
        }
      }
    } catch (e) {
      console.error("Remove item error:", e);
    }
  }, []);

  const updateQuantity = useCallback(async (cartId: number, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(cartId);
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setItems((prev) => {
        const updated = prev.map((i) => i.cart_id === cartId ? { ...i, quantity } : i);
        localStorage.setItem("local_cart", JSON.stringify(updated));
        return updated;
      });
      return;
    }

    setItems((prev) => prev.map((i) => i.cart_id === cartId ? { ...i, quantity } : i));

    try {
      const res = await fetch(apiUrl(`/api/cart/items/${cartId}`), {
        method: "PUT",
        headers: getJsonHeaders(true),
        body: JSON.stringify({ quantity })
      });
      if (res.ok) {
        const json = await res.json();
        const cartData = json?.data;
        if (cartData && cartData.items) {
          const mapped: CartItem[] = cartData.items.map((i: any) => ({
            cart_id: i.id,
            product_id: i.productId,
            quantity: i.quantity,
            name: i.productName,
            price: i.productPrice,
            image_url: i.productImageUrl,
            original_price: null,
            tag: null
          }));
          setItems(mapped);
        }
      }
    } catch (e) {
      console.error("Update quantity error:", e);
    }
  }, [removeItem]);

  const clearCart = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setItems([]);
      localStorage.removeItem("local_cart");
      return;
    }

    setItems([]);

    try {
      await fetch(apiUrl("/api/cart"), {
        method: "DELETE",
        headers: getJsonHeaders(true)
      });
    } catch (e) {
      console.error("Clear cart error:", e);
    }
  }, []);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, totalCount, totalPrice, loading, addItem, removeItem, updateQuantity, clearCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
