"use client";

import { content } from "@/config/content";
import { useCartStore } from "@/store/cartStore";
import { ProductType } from "@/types/product";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";
import { TbShoppingCart } from "react-icons/tb";
import QuantityButton from "./QuantityButton";
import { addToUserCart, removeFromUserCart } from "@/actions/client/clientActions";

interface IProps {
  product: ProductType;
}

export default function AddToCartButton(props: IProps) {
  const { product } = props;

  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.product.id === product.id)
  );


  const [qty, setQty] = useState(cartItem?.qty ?? 0);
  const addItem = useCartStore((s) => s.addItem)
  const updateQty = useCartStore((s) => s.updateQty)

  async function handleAddToCart() {
    setQty(1)
    addItem({ id: product.id, product, qty: 1 })
    try {
      const response = await addToUserCart({ productId: product.id, qty: 1 })
      console.log({ response })
    } catch (err) {

    } finally { }
  };

  async function handleAdd() {
    setQty(prev => prev + 1)
    updateQty(product.id, qty + 1)
    try {
      const res = await addToUserCart({ productId: product.id, qty: 1 })
    } catch (err) { } finally { }
  };

  async function handleRemove() {
    setQty(prev => Math.max(prev - 1, 0))
    updateQty(product.id, qty - 1)
    try {
      const res = await removeFromUserCart({ productId: product.id })
    } catch (err) { } finally { }
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
