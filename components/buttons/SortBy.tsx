"use client"

import { content } from "@/config/content";
import { Button, ButtonGroup } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useEffect, useState } from "react";
import { TbChevronDown } from "react-icons/tb";

interface IProps {
    className?: string;
}

export default function SortBy(props: IProps) {
    const { className = undefined } = props;
    const [selectedOption, setSelectedOption] = useState<any>(new Set(["newest"]));
  
    const labelsMap: any = {
      newest: content.newest,
      oldest: content.oldest,
      cheapest: content.cheapest,
      mostExpensive: content.mostExpensive,
      bestSeller: content.bestSeller,
    };
  
    // Convert the Set to an Array and get the first value.
    const selectedOptionValue = Array.from(selectedOption)[0];


    useEffect(() => {
        console.log("API CALL")
    }, [selectedOption])

    return <div className={className}>
        <ButtonGroup variant="bordered" size="sm">
            <Button>{labelsMap[String(selectedOptionValue)]}</Button>
            <Dropdown placement="bottom-start" size="sm">
                <DropdownTrigger>
                <Button isIconOnly>
                    <TbChevronDown />
                </Button>
                </DropdownTrigger>
                <DropdownMenu
                disallowEmptySelection
                aria-label="Merge options"
                className="max-w-[300px]"
                selectedKeys={selectedOption}
                selectionMode="single"
                onSelectionChange={setSelectedOption}
                >
                <DropdownItem key="newest">
                    {labelsMap["newest"]}
                </DropdownItem>
                <DropdownItem key="oldest">
                    {labelsMap["oldest"]}
                </DropdownItem>
                <DropdownItem key="cheapest">
                    {labelsMap["cheapest"]}
                </DropdownItem>
                <DropdownItem key="mostExpensive">
                    {labelsMap["mostExpensive"]}
                </DropdownItem>
                <DropdownItem key="bestSeller">
                    {labelsMap["bestSeller"]}
                </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </ButtonGroup>
    </div>
}