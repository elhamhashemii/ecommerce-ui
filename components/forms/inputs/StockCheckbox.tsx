import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { content } from "@/config/content";

interface IProps {
    checked: boolean;
    onSelect: (checked: boolean) => void;
}

export default function StockCheckbox({ checked, onSelect }: IProps) {
    return (
        <CheckboxGroup
            value={checked ? ["availableOnly"] : []}
            onValueChange={(values: string[]) => onSelect(values.includes("availableOnly"))}
            size="sm"
            className="pb-4"
        >
            <Checkbox value="availableOnly">
                {content.availableProductsOnly}
            </Checkbox>
        </CheckboxGroup>
    );
}
