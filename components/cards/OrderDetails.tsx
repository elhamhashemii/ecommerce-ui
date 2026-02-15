import { CartItemType } from "@/types/product"
import { AddressType } from "../lists/MyAddresses";
import { ShippingMethod, ShippingMethodFa } from "../buttons/ShippingMethodRadioButtons";
import { content } from "@/config/content";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";

interface IProps {
    details: {
        orderItems?: CartItemType[];
        address?: AddressType;
        shippingMethod?: ShippingMethod;
        totalPayable?: number;

    }
}

export default function OrderDetails({ details: { orderItems, address, shippingMethod, totalPayable } }: IProps) {
    return <div className="border border-dashed border-gray-300 p-2 rounded-md !bg-white">
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
    </div>
}