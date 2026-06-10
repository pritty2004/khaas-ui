import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "@/lib/api";

export interface Product {
  id: number;
  name: string;
  price: number | string;
  original_price?: number | string | null;
  image_url?: string | null;
  tag?: string | null;
  description?: string | null;
}

export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(apiUrl("/api/products"));
      if (!res.ok) {
        throw new Error("Failed to fetch products from backend");
      }
      const json = await res.json();
      const items = json?.data?.items || json?.data || [];
      return items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        original_price: item.originalPrice ?? item.original_price,
        image_url: item.imageUrl ?? item.image_url,
        tag: item.tag,
        description: item.description,
      })) as Product[];
    },
    staleTime: 1000 * 60,
    retry: false,
  });
}
