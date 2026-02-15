import { Card } from "@heroui/card";
import { AddressType } from "../lists/MyAddresses";
import { Radio } from "@heroui/radio";
import { Button } from "@heroui/button";
import { TbTrash } from "react-icons/tb";

export default function AddressCard({ item }: { item: AddressType }) {
    return (
        <Card
            shadow="sm"
            isPressable
            radius="sm"
            className="!w-full p-2 flex flex-row items-center justify-between"
        >
            <Radio value={String(item.id)} className="!w-full text-start">
                <div className="font-semibold">{item?.title}</div>
                <div className="text-sm text-gray-600">{item?.address}</div>
            </Radio>

            <Button
                isIconOnly
                color="danger"
                variant="light"
                size="sm"
                startContent={<TbTrash size={18} />}
            />
        </Card>
    );
}
