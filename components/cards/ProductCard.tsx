import { Card, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image";
import AddToCartButton from "../buttons/AddToCart";
import Link from "next/link";
import { ProductType } from "@/types/product";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
    product: ProductType;
}

export default function ProductCard(props: ProductCardProps) {
    const { product } = props;
    const { id, img, title, category, price } = product;



    return <Card shadow="sm" radius="sm" className="flex flex-col items-center justify-center mb-4 break-inside-avoid overflow-hidden">
            <CardBody className="flex items-stretch justify-center">
                <Image src={img} alt="product" width={200} height={200} className="rounded-[8px] w-full h-full" />
            </CardBody>
            <CardFooter className="flex flex-col items-start pt-0 -mt-1 pb-1">
                <div className="text-gray-400 text-xs">{category}</div>
                <Link href={`/product/${id}`} target="_blank" rel="noopener noreferrer" className="text-sm py-1 font-semibold hover:underline hover:text-blue-800">{title}</Link>
                <div className="text-gray-800">{PriceFormatter(price)}</div>
                <div className="flex items-center justify-center w-full gap-2 my-2">
                    <AddToCartButton product={product} />
                </div>
            </CardFooter>
        </Card>
}