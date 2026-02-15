"use client"

import { deleteCartItemRecord } from "@/actions/client/clientActions";
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
    const { isOpen, onOpenChange, product: cartItem } = props;
    const deleteItemById = useCartStore((s) => s.deleteItem);

    async function handleDelete() {
        try {
            const res = await deleteCartItemRecord(cartItem?.product?.id);
            console.log({ res })
            if (res) {
                deleteItemById(cartItem.product?.id)
            }
        } catch (err) {
            console.log({ err })
        } finally { }


    }

    return <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            {(onClose) => (<>
                <ModalHeader>{content.deleteItem}</ModalHeader>
                <ModalBody className="text-sm">"{cartItem?.product?.title}" {content.deleteCartItemParagraph}</ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" variant="light" onPress={onClose}>{content.cancel}</Button>
                    <Button size="sm" color="danger" variant="bordered" onPress={handleDelete}>{content.confirm} {content.and} {content.delete}</Button>
                </ModalFooter>
            </>)}
        </ModalContent>
    </Modal>
}