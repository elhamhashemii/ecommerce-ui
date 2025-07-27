import OrderSummaryCard from "@/components/cards/OrderSummary";
import CartItems from "@/components/lists/CartItems";


export default function CartPage() {
    return <div className="flex flex-col md:flex-row items-start justify-between">
        <CartItems />
        <div className="w-full md:basis-1/3">
            <OrderSummaryCard className="mt-4 md:mt-0 md:mr-2" deliveryFee={75000} />
        </div>
    </div>
}