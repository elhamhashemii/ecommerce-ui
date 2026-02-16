import { CartItemType } from "@/types/product"
import { AddressType } from "../lists/MyAddresses";
import { ShippingMethod, ShippingMethodFa } from "../buttons/ShippingMethodRadioButtons";
import { content } from "@/config/content";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import { Card } from "@heroui/card";

interface IProps {
    details: {
        orderItems?: CartItemType[];
        address?: AddressType;
        shippingMethod?: ShippingMethod;
        totalPayable?: number;
    },
    className?: string;
}

export default function OrderDetails({ details: { orderItems, address, shippingMethod, totalPayable }, className }: IProps) {
    return <Card shadow="sm" className={`p-4 flex flex-col gap-2 ${className}`}>
        <div>
            <span className="font-bold">{content.shippingMethod}:</span>
            {shippingMethod ? ShippingMethodFa[shippingMethod] : "-"}
        </div>
        <div>
            <span className="font-bold">{content.address}: </span>
            {address ? address?.address : "-"}
        </div>
        <div>
            <span className="font-bold">{content.totalPayable}: </span>
            {totalPayable ? PriceFormatter(totalPayable) : "-"}
        </div>
    </Card>
}