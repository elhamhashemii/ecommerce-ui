import { fetchProductById } from "@/actions/server/serverActions";
import AddToCartButton from "@/components/buttons/AddToCart";
import ProductSingleClient from "@/components/product/productSingleClient";
import { content } from "@/config/content";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import { Button } from "@heroui/button";
import { notFound } from "next/navigation";

export default async function ProductSinglePage({
    params,
}: {
    params: { id: string };
}) {

    const product = await fetchProductById(params.id) as any;

    if (!product) return notFound();

    return (
        <div className="py-10 flex flex-col md:flex-row gap-10">

            {/* left — gallery + cart */}
            <ProductSingleClient product={product} />

            {/* right — info */}
            <div className="flex flex-col gap-4 items-start justify-start">
                <h1 className="text-2xl font-bold">{product.title}</h1>

                <div className="text-gray-600">
                    {product.description}
                </div>

                <div className="text-xl font-semibold">
                    {PriceFormatter(+product.price)}
                </div>

                <div>
                    {product?.stock > 0 ? (
                        <AddToCartButton product={product} />
                    ) : (
                        <Button
                            className="w-full"
                            size="sm"
                            color="danger"
                            variant="bordered"
                            isDisabled
                            // startContent={<TbMoodSad size={18} />}
                        >
                            {content.outOfStock}
                        </Button>
                    )}                </div>
            </div>

        </div>
    );
}
