import { content } from "@/config/content";
import { CartItemType } from "@/types/product";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import Image from "next/image";
import { TbTrash } from "react-icons/tb";
import { Button } from "@heroui/button";
import Link from "next/link";
import DeleteCartItemButton from "../buttons/DeleteCartItemButton";

interface IProps {
    item: CartItemType;
    className?: string;
}

export default function CartItem(props: IProps) {
    const { item, className = undefined } = props;

    
    return <div className={`flex flex-row items-center justify-between md:gap-4 ${className}`}>
        <div>
            <Image src={item.img} width={120} height={120} alt="product" className="rounded-[8px] w-full hidden md:block" />
        </div>
        <div className="w-full">
            <Link href={`/product/${item.id}`} target="_blank" rel="noopener noreferrer" className="text-sm py-1 font-semibold hover:underline hover:text-blue-800">{item.title}</Link>
            <div className="my-2 text-xs text-gray-400">{PriceFormatter(item.price)}</div>
            <div className="my-2 text-xs text-gray-400">{content.qty}: {item.qty} عدد</div>
            <div className="my-2 text-xs text-gray-400">{content.totalSum}: {PriceFormatter(item.price * item.qty)}</div>
        </div>
        <div className="flex md:flex-col items-center justify-between md:justify-end md:gap-8">
            <DeleteCartItemButton product={item} />
        </div>
    </div>
}