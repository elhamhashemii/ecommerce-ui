"use client"

import { useCartStore } from "@/store/cartStore"
import { useEffect, useState } from "react"
import CartItem from "../cards/CartItem"
import { Card } from "@heroui/card"

export default function CartItems() {
    const [mounted, setMounted] = useState(false)
    const items = useCartStore(state => state.getItems())

    
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return items.length > 0 ? <Card shadow="sm" className="p-2 w-full md:basis-2/3">
        {items.map((item, index: number) => {
            return <CartItem key={item.id} item={item} className={`${index + 1 < items.length ? "border-b border-b-gray-200 pb-4" : "border-none"} m-2`} />
        })}
    </Card> : <div>Empty Cart</div>
}