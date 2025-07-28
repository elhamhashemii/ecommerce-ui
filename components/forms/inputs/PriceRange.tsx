"use client";

import { content } from "@/config/content";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { useState } from "react";

interface IProps {
  onFilter: (range: number[]) => void;
  isLoading: boolean;
}

export default function PriceRangeFilter(props: IProps) {
  const { onFilter,isLoading } = props;
  const [value, setValue] = useState<number[]>([900000, 2000000])


  function handlePress() {
    onFilter(value)
  }

    return <>
      <Slider
      className="max-w-md mb-4"
      label={content.currencyUnit}
      maxValue={10000000}
      minValue={0}
      step={50}
      dir="ltr"
      style={{direction: "ltr"}}
      value={value}
      // @ts-ignore
      onChange={setValue}
    />
    <div className="mb-2 w-full text-end">
      <Button size="sm" color="primary" onPress={handlePress} isLoading={isLoading}>{content.filter}</Button>
    </div>
    </>
}