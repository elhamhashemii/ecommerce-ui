import { content } from "@/config/content";
import { CartItemType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import ProductImage from "../product/ProductImage";

interface IProps {
    item: CartItemType;
}

export default function DropdownCartItem(props: IProps) {
    const { item } = props;
    const { product } = item;
    const img = (product.imageUrls && product.imageUrls?.length > 0) ? `https://${product.imageUrls[0]}` : ""

    return <>
        <div className="flex gap-4">
            <ProductImage src={img} className="h-24 w-24" />
            {/* <Image width={85} height={85} alt={product.title} src={img} className="rounded-[8px] mb-2 w-24 h-24 object-cover" /> */}
            <div>
                <Link href={`/product/${item.id}`} target="_blank" rel="noopener noreferrer" className="text-xs py-1 font-semibold">{product.title}</Link>
                <div className="text-xs mt-1">{item.qty} {content.count}</div>
            </div>
        </div>
    </>
}