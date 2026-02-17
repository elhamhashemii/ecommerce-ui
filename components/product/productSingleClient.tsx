"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { TbPhotoOff } from "react-icons/tb";
import AddToCartButton from "@/components/buttons/AddToCart";
import { ProductType } from "@/types/product";
import ProductGallery from "./ProductGallery";

interface Props {
    product: ProductType;
}

export default function ProductSingleClient({ product }: Props) {

    const images = product.imageUrls || [];

    return (
        <div className="flex flex-col gap-6">

            {/* slider */}
            <div className="w-full max-w-[500px] mx-auto">

                {images.length > 0 ? (
                    <ProductGallery images={images || []} title="title" />
                ) : (
                    <div className="w-[500px] h-[500px] flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg">
                        <TbPhotoOff size={60} />
                    </div>
                )}

            </div>

            {/* add to cart */}
            {/* <AddToCartButton product={product} /> */}

        </div>
    );
}
