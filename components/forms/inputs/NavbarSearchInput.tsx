"use client";

import { content } from "@/config/content";
import { debounce } from "@/utils/helpers/debounce";
import { Input } from "@heroui/input";
import { useCallback, useEffect, useRef, useState } from "react";
import { TbSearch } from "react-icons/tb";
import Link from "next/link";
import { fetchProducts } from "@/actions/server/serverActions";
import { ProductType } from "@/types/product";
import Image from "next/image";
import { Spinner } from "@heroui/spinner";
import { PriceFormatter } from "@/utils/formatter/PriceFormatter";
import { routes } from "@/lib/routeNames";

interface IProps {
    className?: string;
    onChange?: (input: string) => void
}

export default function NavbarSearchInput(props: IProps) {
    const { className = undefined, onChange } = props;
    const [value, setValue] = useState("");
    const [results, setResults] = useState<ProductType[]>([]);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const debouncedSearch = useCallback(
        debounce(async (val: string) => {
            if (!val.trim()) {
                setResults([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const res = await fetchProducts({
                    limit: 6,
                    sort: "createdAt:desc",
                    search: val
                }) as any;

                // TODO: replace with real search endpoint later
                const filtered = res.items;
                console.log({ filtered })

                setResults(filtered);
                setOpen(true);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }, 1000),
        []
    );

    function handleChange(val: string) {
        setValue(val);
        debouncedSearch(val);
    }

    function productImg(p: ProductType) {
        const { imageUrls } = p
        const hasImage = imageUrls && imageUrls.length > 0;
        return hasImage ? `https://${imageUrls[0]}` : null;
    }

    // close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full max-w-md">
            <Input
                aria-label="Search"
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm",
                }}
                endContent={
                    isLoading ? (
                        <Spinner size="sm" />
                    ) : null
                }
                placeholder={content.search + "..."}
                startContent={<TbSearch />}
                type="search"
                value={value}
                onValueChange={handleChange}
            />

            {open && value && (
                <div className="hidden md:block absolute top-full mt-3 w-full bg-white shadow-xl rounded-2xl border z-50 p-4">

                    {/* Loading state */}
                    {isLoading && (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 animate-pulse"
                                >
                                    <div className="w-14 h-14 bg-gray-200 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                                        <div className="h-3 bg-gray-100 rounded w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Results */}
                    {!isLoading && results.length > 0 && (
                        <div className="grid gap-3">
                            {results.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.id}`}
                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    {(product.imageUrls?.length ?? 0) > 0 ? (
                                        <Image
                                            src={`https://${product.imageUrls[0]}`}
                                            alt="product"
                                            width={200}
                                            height={200}
                                            className="rounded-[8px] h-14 w-14 object-cover"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 bg-gray-100 rounded-lg" />
                                    )}

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">
                                            {product.title}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {PriceFormatter(+product.price)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* No results */}
                    {!isLoading && results.length === 0 && value.trim() && (
                        <div className="text-center text-sm text-gray-400 py-4">
                            نتیجه‌ای پیدا نشد
                        </div>
                    )}

                    <div className="border-t mt-4 pt-3 text-center"> <Link href={`${routes.SHOP}?search=${value}`} className="text-sm text-primary hover:underline" > مشاهده همه نتایج </Link > </div>

                </div>
            )}
        </div>
    );
}