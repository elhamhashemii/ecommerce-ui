import { content } from "@/config/const";
import { CartItemType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    item: CartItemType;
}

export default function DropdownCartItem(props: IProps) {
    const { item } = props;
    
    return <>
        <div className="flex gap-4">
            <Image width={85} height={85} alt={item.title} src={item.img} className="rounded-[8px] mb-2" />
            <div>
                <Link href={`/product/${item.id}`} target="_blank" rel="noopener noreferrer" className="text-xs py-1 font-semibold">{item.title}</Link>
                <div className="text-xs mt-1">{item.qty} {content.count}</div>
            </div>
        </div>
    </>
}