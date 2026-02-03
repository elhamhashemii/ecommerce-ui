import { debounce } from "@/utils/helpers/debounce";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { useCallback, useEffect, useState } from "react";

export type CategoryItem = {
    id: number;
    title: string;
    value: string;

}


export default function CategoriesCheckbox({
    items,
    selectedIds,
    onSelect,
}: {
    items: CategoryItem[];
    selectedIds: number[];
    onSelect: (selected: CategoryItem[]) => void;
}) {
    const [localSelected, setLocalSelected] = useState<string[]>([]);

    // 🔥 sync URL → UI
    useEffect(() => {
        setLocalSelected(selectedIds.map(String));
    }, [selectedIds]);

    function handleChange(values: string[]) {
        setLocalSelected(values);

        const selectedItems = items.filter(item =>
            values.includes(String(item.id))
        );

        onSelect(selectedItems);
    }

    return (
        <CheckboxGroup
            value={localSelected}
            onValueChange={handleChange}
        >
            {items.map(item => (
                <Checkbox
                    key={item.id}
                    value={String(item.id)}
                >
                    {item.title}
                </Checkbox>
            ))}
        </CheckboxGroup>
    );
}
