import ProductsGroup from "@/components/lists/ProductsGroup";
import SampleSlider from "@/components/sliders/SampleSlider";
import ProductsFilterCard from "@/components/cards/ProductsFilterCard";
import SortBy from "@/components/buttons/SortBy";
import FilterChips from "@/components/cards/FilterChips";
import { Pagination } from "@heroui/pagination";
import { productsData } from "@/config/const";

export default function ShopPage() {
    return <div>
        <SampleSlider />

        <div className="flex flex-col md:flex-row items-start justify-start w-full mt-4 md:mt-12 gap-4">
            <ProductsFilterCard className="w-full basis-1/4" />
            <div className="w-full basis-3/4">
                <div className="w-full flex flex-col md:flex-row items-start pb-4">
                    <FilterChips className="!self-start w-full md:basis-11/12 text-start" />
                    <SortBy className="!self-end text-end w-full md:basis-1/12" />
                </div>
                <ProductsGroup className="grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" products={productsData} />
                <Pagination className="flex items-center justify-center py-8" dir="rtl" variant="bordered" initialPage={1} total={100} style={{direction: "rtl"}}></Pagination>
            </div>
        </div>
    </div>
}