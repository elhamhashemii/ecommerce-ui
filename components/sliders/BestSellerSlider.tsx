"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import ProductCard from "@/components/cards/ProductCard";
import { ProductType } from "@/types/product";

interface Props {
    products: ProductType[];
}

export default function BestSellerSlider({ products }: Props) {
    return (
        <section className="relative py-10 bg-gradient-to-b from-[#ffffff] to-[#f7f7f9] overflow-hidden rounded-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <h2 className="font-bold text-lg sm:text-xl mb-2">
                    محبوب‌ترین‌ها 💛
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    محصولاتی که همیشه اولین انتخاب مشتری‌ها هستند.
                </p>

                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    grabCursor
                    breakpoints={{
                        0: { slidesPerView: 1.2 },
                        480: { slidesPerView: 1.5 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id} className="h-auto">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
}