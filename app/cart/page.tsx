import OrderSummaryCard from "@/components/cards/OrderSummary";
import CartItems from "@/components/lists/CartItems";
import { content } from "@/config/const";
import { Card, CardBody, CardHeader } from "@heroui/card";

export default function CartPage() {
    return <div className="flex items-start justify-between">
        <CartItems />
        <div className="w-full md:basis-1/3">
            <OrderSummaryCard deliveryFee={75000} />
        </div>
    </div>
}