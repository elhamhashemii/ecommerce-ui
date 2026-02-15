import { Card } from "@heroui/card";
import AddressCard from "../cards/AddressCard";
import { content } from "@/config/content";
import { RadioGroup } from "@heroui/radio";
import { useState } from "react";
import { Button } from "@heroui/button";

export type AddressType = {
    id?: number;
    title?: string;
    province: string;
    postalCode: string;
    phone: string;
    address: string;
    addressLine2?: string;
};

interface IProps {
    data: AddressType[];
    onFinalize?: (address: AddressType) => void;

}

export default function MyAddresses({ data, onFinalize }: IProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedAddr, setSelectedAddr] = useState<any>(null);

    const handleChange = (value: string) => {
        setSelectedId(value);
        const selectedAddress = data.find((a) => String(a.id) === value);
        setSelectedAddr(selectedAddress);
    };

    const handleFinalSelect = () => {
        onFinalize?.(selectedAddr)
    }

    return <>
        {selectedId && <div className="border border-gray-300 mb-4 p-2 border-dashed rounded-md">
            <div className="font-semibold">ارسال سفارش به: {selectedAddr.title}</div>
            <div className="text-sm">
                <div className="text-gray-500">{content.province}: {selectedAddr.province}</div>
                <div className="text-gray-500">{content.address}: {selectedAddr.address}</div>
                <div className="text-gray-500">{content.postalCode}: {selectedAddr.postalCode}</div>
                <div className="text-gray-500">{content.phoneNumber}: {selectedAddr.phone}</div>
                <Button size="sm" className="w-full mt-1" color="success" onPress={handleFinalSelect}>تایید و انتخاب آدرس</Button>
            </div>
        </div>}
        {data.length > 0 ? (
            <div className="flex flex-col w-full gap-2 mb-4">
                <RadioGroup
                    className="!w-full"
                    value={selectedId ?? undefined}
                    onValueChange={handleChange}
                >
                    {data.map((item) => (
                        <AddressCard key={item.id} item={item} />
                    ))}
                </RadioGroup>
            </div>
        ) : (
            <Card shadow="sm" className="p-1 mb-4" radius="sm">
                {content.noAddress}
            </Card>
        )}
    </>
}
