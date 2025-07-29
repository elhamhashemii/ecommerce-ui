import { fetchProductById } from "@/lib/api/products";
import { notFound } from "next/navigation";

export default async function ProductSinglePage({ params }: { params: { id: string } }) {
    const product = await fetchProductById(params.id);
    if (!product) return notFound(); // Next.js built-in 404

    return <div className="flex flex-col items-center justify-center md:flex-row md:justify-between md:items-start">
        <div>Product Image</div>
        <div>Product Description</div>
    </div>
}