import ProductsGroup from "@/components/lists/ProductsGroup";
import ProductsFilterCard from "@/components/cards/ProductsFilterCard";
import SortBy from "@/components/buttons/SortBy";
import FilterChips from "@/components/cards/FilterChips";
import { fetchCategories, fetchProducts } from "@/actions/server/serverActions";
import ShopPagination from "@/components/pagination/ShopPagination";
import { CategoryItem } from "@/components/forms/inputs/CategoriesCheckbox";
import ShopSlider from "@/components/sliders/ShopSlider";

type Props = {
    searchParams?: Promise<{
        page?: string
        sort?: string
        categoryIds?: string
        isAvailableOnly?: string
        search?: string
    }>
}


export default async function ShopPage({ searchParams }: Props) {
    const params = await searchParams
    const page = params?.page || 1
    const sort = params?.sort || "newest"
    const search = params?.search
    const categoryIds = params?.categoryIds
        ? params.categoryIds.split(",").map(Number)
        : undefined;

    const isAvailableOnly = Boolean(params?.isAvailableOnly)

    const limit = 12;

    const products: any = await fetchProducts({
        page: +page,
        limit: limit,
        sort,
        categoryIds,
        isAvailableOnly,
        search
    });

    const cats = await fetchCategories() as CategoryItem[]

    const pagination = products.meta;

    return (
        <div>
            <ShopSlider />
            <div className="flex flex-col md:flex-row items-start justify-start w-full mt-4 md:mt-12 gap-4">
                <ProductsFilterCard cats={cats} className="w-full basis-1/4" />

                <div className="w-full basis-3/4">
                    <div className="w-full flex flex-col md:flex-row items-start pb-4">
                        <FilterChips cats={cats} className="!self-start w-full md:basis-11/12 text-start" />
                        <SortBy className="!self-end text-end w-full md:basis-1/12" />
                    </div>

                    <ProductsGroup
                        className="grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        products={products.items}
                    />

                    <ShopPagination page={+page} totalPages={pagination.totalPages} />
                </div>
            </div>
        </div>
    );
}

