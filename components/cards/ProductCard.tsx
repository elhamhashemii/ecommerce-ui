import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import AddToCartButton from "../buttons/AddToCart";
import Link from "next/link";
import { ProductType } from "@/types/product";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import { content } from "@/config/content";
import { Button } from "@heroui/button";
import { TbMoodSad, TbPhotoOff } from "react-icons/tb";

interface ProductCardProps {
    product: ProductType;
}

export default function ProductCard(props: ProductCardProps) {
    const { product } = props;
    const { id, imageUrls, title, category, price, stock } = product;

    const hasImage = imageUrls && imageUrls.length > 0;
    const img = hasImage ? `https://${imageUrls[0]}` : null;

    return (
        <Card
            isDisabled={stock === 0}
            shadow="sm"
            radius="sm"
            className="flex flex-col items-center justify-center mb-4 break-inside-avoid overflow-hidden md:min-w-48"
        >
            <CardBody className="flex items-center justify-center md:min-w-52">

                {img ? (
                    <Image
                        src={img}
                        alt="product"
                        width={200}
                        height={200}
                        className="rounded-[8px] h-44 w-44 object-cover"
                    />
                ) : (
                    <div className="rounded-[8px] min-h-36 h-full w-[95%] flex items-center justify-center bg-gray-100 text-gray-400">
                        <TbPhotoOff size={40} />
                    </div>
                )}

            </CardBody>

            <CardFooter className="flex flex-col items-start pt-0 -mt-1 pb-1">
                <div className="text-gray-400 text-xs">{category}</div>

                <Link
                    href={`/product/${id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm py-1 font-semibold hover:underline hover:text-blue-800"
                >
                    {title}
                </Link>

                <div className="text-gray-800">{PriceFormatter(+price)}</div>

                <div className="flex items-center justify-center w-full gap-2 my-2">
                    {stock > 0 ? (
                        <AddToCartButton product={product} />
                    ) : (
                        <Button
                            className="w-full"
                            size="sm"
                            color="danger"
                            variant="bordered"
                            startContent={<TbMoodSad size={18} />}
                        >
                            {content.outOfStock}
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
