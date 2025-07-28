import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { useState } from "react";

interface IProps {
    onSelect: (selctedCategories: string[]) => void;
}

export default function CategoriesCheckbox(props: IProps) {
    const { onSelect } = props;
    const [selected, setSelected] = useState(["buenos-aires", "sydney"]);

    function handleChange(val: string[]) {
        setSelected(val)
        onSelect(val)
    }

    return <CheckboxGroup
        defaultValue={["buenos-aires", "london"]}
        className="mb-4"
        value={selected}
        onValueChange={handleChange}
    >
        <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
        <Checkbox value="sydney">Sydney</Checkbox>
        <Checkbox value="san-francisco">San Francisco</Checkbox>
        <Checkbox value="london">London</Checkbox>
        <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
}