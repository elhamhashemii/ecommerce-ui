"use client"

import { useCartStore } from "@/store/cartStore";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbShoppingCart } from "react-icons/tb";


export default function CartButton() {
    const [mounted, setMounted] = useState(false)
    const items = useCartStore((state) => state.getItems());

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return <Link href="/cart">
        <Badge color="danger" content={items.length} shape="circle" placement="bottom-left" size="lg">
            <Button isIconOnly variant="light">
                <TbShoppingCart size={28} />
            </Button>
        </Badge>
    </Link>
}