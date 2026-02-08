import { content } from "@/config/content";
import { CartItemType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    item: CartItemType;
}

export default function DropdownCartItem(props: IProps) {
    const { item } = props;
    const { product } = item;
    const img = (product.imageUrls && product.imageUrls?.length > 0) ? product.imageUrls[0] : ""

    return <>
        <div className="flex gap-4">
            <Image width={85} height={85} alt={product.title} src={img} className="rounded-[8px] mb-2" />
            <div>
                <Link href={`/product/${item.id}`} target="_blank" rel="noopener noreferrer" className="text-xs py-1 font-semibold">{product.title}</Link>
                <div className="text-xs mt-1">{item.qty} {content.count}</div>
            </div>
        </div>
    </>
}