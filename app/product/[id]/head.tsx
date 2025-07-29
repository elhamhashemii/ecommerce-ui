import { fetchProductById } from "@/lib/api/products";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await fetchProductById(params.id);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}
