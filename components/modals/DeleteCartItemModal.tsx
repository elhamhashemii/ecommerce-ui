"use client"

import { content } from "@/config/content";
import { useCartStore } from "@/store/cartStore";
import { CartItemType } from "@/types/product";
import { Button } from "@heroui/button";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@heroui/modal";
import { toast } from "react-toastify";

interface IProps {
    isOpen: boolean;
    product: CartItemType;
    onOpenChange: (val: boolean) => void
}


export default function DeleteCartItemModal(props: IProps) {
    const {isOpen, onOpenChange, product} = props;
    const deleteItemById = useCartStore((s) => s.deleteItem);

    function handleDelete() {
        deleteItemById(product.id)
        toast.success("item deleted successfully.")
    }

    return <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
        {(onClose) => (<>
            <ModalHeader>{content.deleteItem}</ModalHeader>
            <ModalBody className="text-sm">"{product.title}" {content.deleteCartItemParagraph}</ModalBody>
            <ModalFooter>
                <Button size="sm" color="primary" variant="light" onPress={onClose}>{content.cancel}</Button>
                <Button size="sm" color="danger" variant="bordered" onPress={handleDelete}>{content.confirm} {content.and} {content.delete}</Button>
            </ModalFooter>
        </>)}
    </ModalContent>
</Modal>
}