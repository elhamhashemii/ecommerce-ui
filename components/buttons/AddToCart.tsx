"use client";

import { content } from "@/config/const";
import { Button, ButtonGroup } from "@heroui/button";
import { useState } from "react";
import { TbMinus, TbPlus, TbShoppingCart } from "react-icons/tb";

export default function AddToCartButton() {
  const [qty, setQty] = useState(0);

  const handleAddToCart = () => setQty(1);
  const handleAdd = () => setQty(prev => prev + 1);
  const handleMinus = () => setQty(prev => Math.max(prev - 1, 0));

  const isAdded = qty > 0;

  return (
    <div className="w-full flex justify-center">
      {!isAdded ? (
        <Button
          onPress={handleAddToCart}
          className="w-full font-bold"
          startContent={<TbShoppingCart size={16} />}
          color="primary"
          variant="bordered"
          size="sm"
        >
          {content.addToCart}
        </Button>
      ) : (
        <ButtonGroup
          className="w-[70%] max-w-xs font-bold"
          color="primary"
          variant="bordered"
          size="sm"
        >
          <Button className="px-0 min-w-12" startContent={<TbPlus size={16} />} onPress={handleAdd} />
          <Button className="hover:cursor-auto text-lg font-semibold">{qty}</Button>
          <Button className="px-0 min-w-12" startContent={<TbMinus size={16} />} onPress={handleMinus} isDisabled={qty === 0} />
        </ButtonGroup>
      )}
    </div>
  );
}
