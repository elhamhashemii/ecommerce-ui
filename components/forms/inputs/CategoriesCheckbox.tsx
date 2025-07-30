import { debounce } from "@/utils/helpers/debounce";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { useCallback, useState } from "react";

interface IProps {
    onSelect: (selctedCategories: string[]) => void;
}

export default function CategoriesCheckbox(props: IProps) {
    const { onSelect } = props;
    const [selected, setSelected] = useState(["buenos-aires", "sydney"]);

    const debouncedSearch = useCallback(
        debounce((value: string[]) => {
            onSelect(value)
        }, 1000),
        []
      );


    function handleChange(val: string[]) {
        setSelected(val)
        debouncedSearch(val)
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