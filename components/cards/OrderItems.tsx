import { content } from "@/config/content";
import { CartItemType } from "@/types/product"
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import { Card } from "@heroui/card"

interface IProps {
    data: any;
}

export default function OrderItems(props: IProps) {
    const { data } = props;
    return <Card shadow="none" className="mb-2 -mt-2">
        <div className="text-sm text-right dir-rtl flex flex-col gap-2 w-full">
            {data?.items && data?.items?.length > 0 && data?.items?.map((item: CartItemType, index: number) => {
                return <div
                    className={`text-gray-600 flex items-start justify-start gap-1 flex-col w-full 
            ${index + 1 !== data.items.length && "border-b pb-2 border-dashed border-gray-200"}`}
                >
                    <div><span className="font-bold text-black">{content.productTitle}</span>: {item.product.title}</div>
                    <div>{PriceFormatter(+item.product.price)}</div>
                    <div><span className="font-bold text-black">{content.qty}</span>: {item.qty} {content.count}</div>
                    <div><span className="font-bold text-black">{content.totalSum}</span>:
                        <span className="px-1">{PriceFormatter(item.qty * +item.product.price)}</span>
                    </div>
                </div>
            })}
        </div>
    </Card>
}