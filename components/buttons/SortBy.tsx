"use client"

import { content } from "@/config/content";
import { Button, ButtonGroup } from "@heroui/button";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/dropdown";
import { useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import { useRouter, useSearchParams } from "next/navigation";

interface IProps {
    className?: string;
}

export default function SortBy({ className }: IProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initial sort from URL or default
    const initialSort = searchParams.get("sort") || "newest";
    const [selectedOption, setSelectedOption] = useState(new Set([initialSort]));

    const labelsMap: Record<string, string> = {
        newest: content.newest,
        oldest: content.oldest,
        cheapest: content.cheapest,
        most_expensive: content.mostExpensive,
        best_seller: content.bestSeller,
    };

    const selectedOptionValue = Array.from(selectedOption)[0];

    const handleSortChange = (newSelection: Set<string>) => {
        setSelectedOption(newSelection);

        const newSort = Array.from(newSelection)[0];
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", newSort);
        params.set("page", "1"); // reset to page 1 when sorting changes

        router.push(`?${params.toString()}`);
    };

    return (
        <div className={className}>
            <ButtonGroup variant="bordered" size="sm">
                <Button>{labelsMap[selectedOptionValue]}</Button>

                <Dropdown placement="bottom-start" size="sm">
                    <DropdownTrigger>
                        <Button isIconOnly>
                            <TbChevronDown />
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Sort options"
                        className="max-w-[300px]"
                        selectedKeys={selectedOption}
                        selectionMode="single"
                        // @ts-ignore
                        onSelectionChange={handleSortChange}
                    >
                        <DropdownItem key="newest">{labelsMap["newest"]}</DropdownItem>
                        <DropdownItem key="oldest">{labelsMap["oldest"]}</DropdownItem>
                        <DropdownItem key="cheapest">{labelsMap["cheapest"]}</DropdownItem>
                        <DropdownItem key="most_expensive">
                            {labelsMap["most_expensive"]}
                        </DropdownItem>
                        <DropdownItem key="best_seller">{labelsMap["best_seller"]}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </ButtonGroup>
        </div>
    );
}
