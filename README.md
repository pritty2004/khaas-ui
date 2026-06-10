# ShopSpark — KHAAS Jewellery Store

A luxury Indian jewellery e-commerce frontend built with **React + TypeScript + Vite + Tailwind CSS + Supabase**.

---

## 🗄️ Supabase Setup (Required)

1. Go to your **Supabase project → SQL Editor**
2. Run the file: `supabase/migrations/20260601_shopspark_schema.sql`
3. This creates three tables: `products`, `cart`, and `orders` with RLS policies

Your `.env` already has the credentials:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

---

## 🚀 Running Locally

```bash
npm install
npm run dev
# App runs at http://localhost:8080
```

---

## 🔗 Backend Integration Summary

| Feature | Implementation |
|---|---|
| **Products** | Fetched from `products` table via `useProducts` hook (React Query) |
| **Cart** | Global `CartContext` reads/writes `cart` table in real-time |
| **Cart Count** | Live badge in Navbar from `CartContext.totalCount` |
| **Add to Cart** | ProductShowcase calls `CartContext.addItem` → Supabase insert; increments qty if already in cart |
| **Cart Page** | Full item list with +/− quantity controls and delete; shipping + GST calculated |
| **Checkout** | Payment page saves order to `orders` table, then clears cart |
| **Fallback** | If Supabase `products` table is empty, local fallback products render |

---

## 📁 Key Files Changed

```
src/
  context/CartContext.tsx       ← NEW: global cart state, Supabase sync
  App.tsx                       ← Wrapped with <CartProvider>
  components/Navbar.tsx         ← Live cart badge from CartContext
  components/ProductShowcase.tsx← Uses CartContext.addItem
  pages/Cart.tsx                ← Full cart UI with qty controls
  pages/Payment.tsx             ← Saves order to Supabase, clears cart
  hooks/useProducts.ts          ← Simplified (addToCart moved to context)
  integrations/supabase/types.ts← Updated with products/cart/orders types
supabase/
  migrations/20260601_shopspark_schema.sql ← NEW: run this in SQL Editor
```
