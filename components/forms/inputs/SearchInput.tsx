"use client"

import { content } from "@/config/content";
import { debounce } from "@/utils/helpers/debounce";
import { Input } from "@heroui/input";
import { useCallback, useState } from "react";
import { TbSearch } from "react-icons/tb";

interface IProps {
    className?: string;
    onChange: (input: string) => void
}

export default function SearchInput(props: IProps) {
    const { className = undefined, onChange } = props;
    const [value, setValue] = useState("")

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            onChange(value)
        }, 1000),
        []
      );

    function handleChange(val: string) {
        setValue(prev => prev = val)
        debouncedSearch(val)
    }

    return <Input
    aria-label="Search"
    classNames={{
      inputWrapper: "bg-default-100",
      input: "text-sm",
    }}
    className={className}
    labelPlacement="outside"
    placeholder={content.search + "..."}
    startContent={
      <TbSearch />
    }
    type="search"
    value={value}
    onValueChange={handleChange}
  />
}