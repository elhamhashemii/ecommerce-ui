import { content } from "@/config/content";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { useState } from "react";

type AddressFormData = {
    title: string;
    phone: string;
    postalCode: string;
    province: string;
    address: string;
};

export default function AddressForm({
    onSubmit,
    init,
    isLoading
}: {
    onSubmit: (data: AddressFormData) => void;
    init?: AddressFormData;
    isLoading?: boolean;
}) {
    const [form, setForm] = useState<AddressFormData>({
        title: init?.title || "",
        phone: init?.phone || "",
        postalCode: init?.postalCode || "",
        province: init?.province || "",
        address: init?.address || "",
    });

    const handleChange =
        (field: keyof AddressFormData) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((prev) => ({ ...prev, [field]: e.target.value }));
            };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-1 mb-2 -mt-2"
        >
            <Input
                size="sm"
                label={content.addressTitle}
                value={form.title}
                onChange={handleChange("title")}
            />

            <Input
                size="sm"
                label={content.phoneNumber}
                value={form.phone}
                onChange={handleChange("phone")}
            />

            <Input
                size="sm"
                label={content.postalCode}
                value={form.postalCode}
                minLength={8}
                maxLength={12}
                onChange={handleChange("postalCode")}
            />

            <Input
                size="sm"
                label={content.province}
                value={form.province}
                onChange={handleChange("province")}
            />

            <Textarea
                size="sm"
                label={content.address}
                value={form.address}
                onChange={handleChange("address")}
            />

            <Button
                type="submit"
                radius="sm"
                color="primary"
                className="mt-2"
                isLoading={isLoading}
            >
                {content.submit}
            </Button>
        </form>
    );
}
