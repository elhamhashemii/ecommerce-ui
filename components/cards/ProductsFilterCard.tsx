"use client"

import { Accordion, AccordionItem } from "@heroui/accordion";
import SearchInput from "../forms/inputs/SearchInput";
import PriceRangeFilter from "../forms/inputs/PriceRange";
import { content } from "@/config/content";
import CategoriesCheckbox from "../forms/inputs/CategoriesCheckbox";

interface IProps {
    className?: string;
}

export default function ProductsFilterCard(props: IProps) {
    const { className } = props;

    function onPriceFilter(value: number[]) {
        console.log({value})
    }

    function onCategoriesFilter(value: string[]) {
        console.log({value})
    }

    function onInputChange(value: string) {
        console.log({value})
    }


    return <Accordion selectionMode="multiple" className={className} variant="bordered">
    <AccordionItem key="0" aria-label="Search Input" title={<div className="text-sm font-semibold">{content.search}</div>}>
        <SearchInput className="mb-4" onChange={onInputChange} />
    </AccordionItem>
    <AccordionItem key="1" aria-label="Categories" title={<div className="text-sm font-semibold">{content.categories}</div>}>
      <CategoriesCheckbox onSelect={onCategoriesFilter} />
    </AccordionItem>
    <AccordionItem key="2" aria-label="Price" title={<div className="text-sm font-semibold">{content.priceRange}</div>}>
      <PriceRangeFilter onFilter={onPriceFilter} isLoading={false} />
    </AccordionItem>
  </Accordion>
}