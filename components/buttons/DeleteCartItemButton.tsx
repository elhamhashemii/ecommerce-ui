import { Button } from "@heroui/button"
import { TbTrash } from "react-icons/tb"
import {
    useDisclosure,
  } from "@heroui/modal";
import DeleteCartItemModal from "../modals/DeleteCartItemModal";
import { CartItemType } from "@/types/product";


export default function DeleteCartItemButton(props: {product: CartItemType}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
console.log(props.product)
    return <>
        <Button className="self-end order-last md:order-first" color="danger" size="sm" variant="light" isIconOnly onPress={onOpen}><TbTrash size={18} /></Button>
        <DeleteCartItemModal isOpen={isOpen} onOpenChange={onOpenChange} product={props.product} />
    </>
}