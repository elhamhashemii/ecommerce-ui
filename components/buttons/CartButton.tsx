"use client"

import { useCartStore } from "@/store/cartStore";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { useEffect, useState } from "react";
import { TbShoppingCart } from "react-icons/tb";
import { content } from "@/config/content";
import DropdownCartItem from "../cards/DropdownCartItem";


export default function CartButton() {
    const [mounted, setMounted] = useState(false)
    const items = useCartStore((state) => state.getItems());

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null;

    return <Dropdown className="max-w-80">
        <Badge color="danger" content={items.length} shape="circle" placement="bottom-left" size="lg">
            <DropdownTrigger>
                <Button isIconOnly variant="light">
                    <TbShoppingCart size={28} />
                </Button>
            </DropdownTrigger>
        </Badge>
      <DropdownMenu aria-label="Cart Items" variant="light">
        <DropdownSection>
        {items.slice(0, 4).map((item) => {
            return <DropdownItem key={item.id}>
                <DropdownCartItem item={item} />
            </DropdownItem>
        })}
        </DropdownSection>
      <DropdownSection>
          <DropdownItem
            key="link"
            className="p-0 px-2 text-danger"
            href="/cart"
          >
            <div className="!font-semibold !text-sm text-center underline">{content.viewCart}</div>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>

    </Dropdown>
}