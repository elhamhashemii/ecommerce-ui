"use client"

import { content } from "@/config/const";
import { useCartStore } from "@/store/cartStore";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useEffect, useState } from "react";

interface IProps {
    deliveryFee: number;
    className?: string;
}

export default function OrderSummaryCard(props: IProps) {
    const { deliveryFee, className } = props;
    const totalSum = useCartStore((state) => state.getTotalPrice())
    const [mounted, setMounted] = useState(false)

    const totalPayable = totalSum + deliveryFee


    useEffect(() => {
        setMounted(true)
    }, [])

    if(!mounted) return null;

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

        <Button className="mt-4 bg-black text-white">{content.submitOrder} {content.and} {content.pay}</Button>
    </CardBody>
</Card>
}