"use client"

import { Accordion, AccordionItem } from "@heroui/accordion";
import PriceRangeFilter from "../forms/inputs/PriceRange";
import { content } from "@/config/content";
import CategoriesCheckbox, { CategoryItem } from "../forms/inputs/CategoriesCheckbox";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { useState } from "react";
import StockCheckbox from "../forms/inputs/StockCheckbox";
import FilterSearchInput from "../forms/inputs/FilterSearchInput";

interface IProps {
  className?: string;
  cats: CategoryItem[];
}

export default function ProductsFilterCard(props: IProps) {
  const { className, cats } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAvailableOnly = searchParams.get("isAvailableOnly") === "true";

  function onPriceFilter(value: number[]) {
    console.log({ value })
  }


  const selectedCategoryIds =
    searchParams.get("categoryIds")
      ?.split(",")
      .map(Number)
      .filter(Number.isInteger) ?? [];

  function onCategoriesFilter(selected: CategoryItem[]) {
    const params = new URLSearchParams(searchParams.toString());

    if (selected.length === 0) {
      params.delete("categoryIds");
    } else {
      params.set(
        "categoryIds",
        selected.map(c => c.id).join(",")
      );
    }

    // reset page when filter changes
    params.set("page", "1");

    router.push(`?${params.toString()}`);
  }


  function onChangeStock(checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set("isAvailableOnly", "true");
    } else {
      params.delete("isAvailableOnly");
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  function onInputChange(value: string) {
    console.log({ value })
  }


  console.log({ cats })


  return <Accordion selectionMode="multiple" className={className} variant="bordered">
    <AccordionItem key="0" aria-label="Search Input" title={<div className="text-sm font-semibold">{content.search}</div>}>
      {/* <SearchInput className="mb-4" onChange={onInputChange} /> */}
      <FilterSearchInput className="mb-4" />
    </AccordionItem>
    <AccordionItem key="1" aria-label="Categories" title={<div className="text-sm font-semibold">{content.categories}</div>}>
      <CategoriesCheckbox selectedIds={selectedCategoryIds} items={cats} onSelect={onCategoriesFilter} />
    </AccordionItem>
    {/* <AccordionItem key="2" aria-label="Price" title={<div className="text-sm font-semibold">{content.priceRange}</div>}>
      <PriceRangeFilter onFilter={onPriceFilter} isLoading={false} />
    </AccordionItem> */}
    <AccordionItem key="3" aria-label="Stock" title={<div className="text-sm font-semibold">{content.stock}</div>}>
      {/* <StockCheckbox checked onSelect={onChangeStock} /> */}
      <StockCheckbox
        checked={isAvailableOnly}
        onSelect={onChangeStock}
      />
    </AccordionItem>
  </Accordion>
}