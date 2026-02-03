import ProductsGroup from "@/components/lists/ProductsGroup";
import SampleSlider from "@/components/sliders/SampleSlider";
import ProductsFilterCard from "@/components/cards/ProductsFilterCard";
import SortBy from "@/components/buttons/SortBy";
import FilterChips from "@/components/cards/FilterChips";
import { Pagination } from "@heroui/pagination";
import { productsData } from "@/config/const";
import { fetchCategories, fetchProducts } from "@/actions/server/serverActions";
import ShopPagination from "@/components/pagination/ShopPagination";
import { CategoryItem } from "@/components/forms/inputs/CategoriesCheckbox";

export default async function ShopPage({
    searchParams,
}: {
    searchParams?: { page?: string; sort?: string; categoryIds?: string, isAvailableOnly?: string; };
}) {
    const page = Number(searchParams?.page ?? 1);
    const sort = searchParams?.sort || "newest";
    const categoryIds = searchParams?.categoryIds
        ? searchParams.categoryIds.split(",").map(Number)
        : undefined;

    const isAvailableOnly = Boolean(searchParams?.isAvailableOnly)

    const products: any = await fetchProducts({
        page,
        limit: 5,
        sort,
        categoryIds,
    });

    const cats = await fetchCategories() as CategoryItem[]

    const pagination = products.meta;

    return (
        <div>
            <SampleSlider />
            <div className="flex flex-col md:flex-row items-start justify-start w-full mt-4 md:mt-12 gap-4">
                <ProductsFilterCard cats={cats} className="w-full basis-1/4" />

                <div className="w-full basis-3/4">
                    <div className="w-full flex flex-col md:flex-row items-start pb-4">
                        <FilterChips className="!self-start w-full md:basis-11/12 text-start" />
                        <SortBy className="!self-end text-end w-full md:basis-1/12" />
                    </div>

                    <ProductsGroup
                        className="grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        products={products.items}
                    />

                    <ShopPagination page={page} totalPages={pagination.totalPages} />
                </div>
            </div>
        </div>
    );
}

