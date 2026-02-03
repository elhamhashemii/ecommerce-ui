import { content } from "@/config/content";
import { debounce } from "@/utils/helpers/debounce";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { useState } from "react";

interface IProps {
    onSelect: (selectedStock: string[]) => void;
}

export default function StockCheckbox({ onSelect }: IProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    function handleChange(ids: string[]) {
        setSelectedIds(ids);
        onSelect(ids);
    }

    return (
        <CheckboxGroup
            value={selectedIds}
            onValueChange={handleChange}
            size="sm" className="pb-4"
        >
            <Checkbox value="availableOnly">{content.availableProductsOnly}</Checkbox>
        </CheckboxGroup>
    );
}
