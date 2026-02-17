"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Thumbs } from 'swiper/modules';
import "swiper/css";
import "swiper/css/thumbs";
import { TbPhotoOff } from "react-icons/tb";
import { useState } from "react";

interface Props {
    images: string[];
    title: string;
}

export default function ProductGallery({ images, title }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg">
                <TbPhotoOff size={60} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 w-full">

            {/* MAIN IMAGE */}
            <div className="flex justify-center">
                <Swiper
                    modules={[Thumbs]}
                    spaceBetween={10}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    className="w-full max-w-[500px]"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <Image
                                src={`https://${img}`}
                                alt={title}
                                width={500}
                                height={500}
                                className="rounded-lg object-cover w-full h-[400px]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* THUMBNAILS BELOW */}
            <div className="flex justify-center w-full overflow-hidden">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={Math.min(images.length, 5)}
                    watchSlidesProgress
                    className="w-full max-w-[500px]"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i} className="cursor-pointer">
                            <Image
                                src={`https://${img}`}
                                alt={title}
                                width={100}
                                height={100}
                                className="rounded-lg object-cover w-full h-24"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
}
