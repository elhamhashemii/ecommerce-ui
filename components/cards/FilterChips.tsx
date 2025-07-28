"use client";

import { Chip } from "@heroui/chip";
import { useState } from "react";

interface IProps {
    className?: string;
}

export default function FilterChips(props: IProps) {
  const { className } = props;
  const initialFilters = ["Category", "Price", "Search Input"];
  const [chips, setChips] = useState<string[]>(initialFilters);

  function handleRemoveFilter(item: string) {
    const newFilters = chips.filter((chip) => chip !== item);
    setChips(newFilters);
  }

  return (
    <div className={`flex-col md:flex-row items-start md:items-center justify-start md:justify-start gap-3 ${className} ${chips.length === 0 ? "hidden" : "flex"}`}>
      <div className="hidden md:block">Applied Filters:</div>
      <div className="flex flex-wrap gap-2 pb-4 md:pb-0">
        {chips.map((item) => (
            <Chip
            key={item}
            variant="bordered"
            onClose={() => handleRemoveFilter(item)}
            >
            {item}
            </Chip>
        ))}
      </div>
    </div>
  );
}
