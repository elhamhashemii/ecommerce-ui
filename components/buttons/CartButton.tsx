"use client"

import { useCartStore } from "@/store/cartStore";
import { Badge } from "@heroui/badge";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { useEffect, useState } from "react";
import { TbShoppingCart, TbShoppingCartOff } from "react-icons/tb";
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
    <DropdownMenu aria-label="Cart Items" variant="light" disabledKeys={["empty"]}>
      <DropdownSection>
        {items.length > 0 ? items.slice(0, 4).map((item) => {
          return <DropdownItem key={item.id}>
            <DropdownCartItem item={item} />
          </DropdownItem>
        }) : <DropdownItem className="text-center" key="empty">
          <div className="flex flex-col items-center justify-center gap-4">
            <TbShoppingCartOff size={44} />
            {content.emptyCart}
          </div>
        </DropdownItem>}
      </DropdownSection>
      <DropdownSection>
        <DropdownItem
          key="link"
          className="p-0 px-2"
          href={items.length > 0 ? "/cart" : "/shop"}
        >
          {items.length > 0 ?
            <div className="!font-semibold !text-sm text-center underline text-danger">{content.viewCart}</div>
            : <Button className="text-center w-full text-white" href="/cart" color="success" size="sm">{content.shopNow}</Button>
          }
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>

  </Dropdown>
}