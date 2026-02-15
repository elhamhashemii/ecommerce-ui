"use client"

import { checkout } from "@/actions/client/clientActions";
import { content } from "@/config/content";
import { routes } from "@/lib/routeNames";
import { useCartStore } from "@/store/cartStore";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
    deliveryFee: number;
    className?: string;
}

export default function OrderSummaryCard(props: IProps) {
    const router = useRouter();
    const { deliveryFee, className } = props;
    const [mounted, setMounted] = useState(false)
    const [loading, setLoading] = useState(false)
    const totalSum = useCartStore((state) => state.getTotalPrice())
    const totalQty = useCartStore((state) => state.getTotalQty())
    const clearCart = useCartStore((state) => state.clearCart)

    const totalPayable = totalSum + deliveryFee

    async function handleCheckout() {
        setLoading(true)
        try {
            const res: any = await checkout(router)
            if (res) {
                router.push(`${routes.CHECKOUT}?orderId=${res?.id}`)
                clearCart()
            }
        } catch (err: any) {
            if (err && err?.statusCode == 401) {
                console.log(err.statusCode)
                toast.warning(<div className="text-sm">{content.loginToSubmitOrder}</div>)
                // setTimeout(() => {
                //     router.push(`${routes.LOGIN}?redirect=/cart`);
                // }, 500);
            }
            if (err && err?.statusCode == 400) {
                toast.error(<div className="text-sm">{err?.message}</div>)
            }
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return <Card className={`p-4 ${className}`} shadow="sm">
        <CardHeader className="font-semibold">{content.orderSummary}</CardHeader>
        <CardBody>
            <div className="text-sm flex items-center justify-between w-full">
                <div className="text-gray-600">{content.totalPrice}</div>
                <div>{PriceFormatter(totalSum)}</div>
            </div>
            <div className="text-sm flex items-center justify-between w-full mt-4">
                <div className="text-gray-600">{content.deliveryFee}</div>
                <div className="text-blue-700">{PriceFormatter(deliveryFee)}</div>
            </div>

            <div className="text-sm flex items-center justify-between w-full mt-4 border-t border-t-gray-200 py-4">
                <div className="text-gray-600">{content.totalPayable}</div>
                <div className="font-semibold">{PriceFormatter(totalPayable)}</div>
            </div>

            <Button isDisabled={totalQty == 0} isLoading={loading} className="mt-4 bg-black text-white" onPress={handleCheckout}>{content.submitOrder}</Button>
        </CardBody>
    </Card>
}