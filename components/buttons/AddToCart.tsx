"use client";

import { content } from "@/config/const";
import { useCartStore } from "@/store/cartStore";
import { ProductType } from "@/types/product";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { TbShoppingCart } from "react-icons/tb";
import QuantityButton from "./QuantityButton";

interface IProps {
  product: ProductType;
}

export default function AddToCartButton(props: IProps) {
  const { product } = props;
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.id === product.id)
  );


  const [qty, setQty] = useState(cartItem?.qty ?? 0);
  const addItem = useCartStore((s) => s.addItem)
  const updateQty = useCartStore((s) => s.updateQty)

  const handleAddToCart = () => {
    setQty(1)
    addItem({ id: product.id, title: product.title, price: product.price, qty: 1, img: product.img })
  };
  const handleAdd = () => {
    setQty(prev => prev + 1)
    updateQty(product.id, qty + 1)
  };
  const handleRemove = () => {
    setQty(prev => Math.max(prev - 1, 0))
    updateQty(product.id, qty - 1)
  };

  const isAdded = qty > 0;

  useEffect(() => {
    setQty(cartItem?.qty ?? 0);
  }, [cartItem?.qty]);

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
        <QuantityButton qty={qty} onAdd={handleAdd} onRemove={handleRemove} />
      )}
    </div>
  );
}
