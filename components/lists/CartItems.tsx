"use client"

import { useCartStore } from "@/store/cartStore"
import { useEffect, useState } from "react"
import CartItem from "../cards/CartItem"
import { Card } from "@heroui/card"
import { getUserCart } from "@/actions/client/clientActions"
import { CartItemType } from "@/types/product"
import { mergeCarts } from "@/utils/helpers/main"
import { content } from "@/config/content"
import { TbShoppingCartOff } from "react-icons/tb"
import { Button } from "@heroui/button"
import Link from "next/link"

export default function CartItems() {
    const [mounted, setMounted] = useState(false)
    const [cartItems, setCartItems] = useState<any[]>([])
    const LocalStorageItems = useCartStore(state => state.getItems());
    // const userCartItems = getUserCart()

    async function getCartItems() {
        try {
            const backendItems = (await getUserCart()) as CartItemType[];

            const hasBackend = backendItems?.length > 0;
            const hasLocal = LocalStorageItems?.length > 0;

            let finalCart: CartItemType[] = [];

            // ATTENTION: THIS MERGE HAPPENS AFTER LOGIN. so no need to recalculate it here
            // if (hasBackend && hasLocal) {
            //     finalCart = mergeCarts(backendItems, LocalStorageItems);

            //     console.log({ finalCart })

            //     // optional but recommended:
            //     // await updateUserCart(finalCart);  // sync merged cart to backend
            //     // clearLocalCart();                 // clear local storage
            // }
            if (hasBackend) {
                finalCart = backendItems;
            }
            else if (hasLocal) {
                finalCart = LocalStorageItems;

                // optional:
                // await updateUserCart(LocalStorageItems);
            }

            setCartItems(finalCart);

        } catch (err) {
            // user probably not authenticated
            setCartItems(LocalStorageItems ?? []);
        }
    }




    useEffect(() => {
        getCartItems()
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return cartItems.length > 0 ? <Card shadow="sm" className="p-2 w-full md:basis-2/3">
        {cartItems.map((item, index: number) => {
            return <CartItem
                key={item.id}
                item={item}
                className={`${index + 1 < cartItems.length ? "border-b border-b-gray-200 pb-4" : "border-none"} m-2`}
            />
        })}
    </Card> : <Card shadow="sm" className="flex p-4 flex-col items-center justify-center gap-4 w-full">
        <TbShoppingCartOff size={40} color="gray" />
        <div className="text-sm text-gray-500">{content.emptyCart}</div>
        <Button className="w-full text-white" size="sm" color="success" as={Link} href="/shop">{content.shopNow}</Button>
    </Card>
}