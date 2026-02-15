import { Radio, RadioGroup } from "@heroui/radio";

export enum ShippingMethod {
    POST = "post",
    IN_PERSON = "in-person",
}

export enum ShippingMethodFa {
    "post" = "پست",
    "in-person" = "دریافت حضوری",
}

export default function ShippingMethodRadioBtns({ selected, onSelect }: { selected: string | undefined, onSelect: (selected: string) => void }) {
    return <RadioGroup
        defaultValue={undefined}
        value={selected ?? undefined}
        onValueChange={onSelect}
        className="-mt-2 mb-4"
    >
        <Radio value={ShippingMethod.POST}>{ShippingMethodFa.post}</Radio>
        <Radio value={ShippingMethod.IN_PERSON}>{ShippingMethodFa["in-person"]}</Radio>
    </RadioGroup>
}