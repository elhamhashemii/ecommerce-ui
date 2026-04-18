"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { BlogItem } from "@/types/blog";
import BlogCard from "../cards/BlogCard";

interface Props {
    blogs: BlogItem[];
}

export default function LatestBlogsSlider({ blogs }: Props) {
    return (
        <section className="relative py-10 bg-gradient-to-b from-[#ffffff] to-[#f7f7f9] overflow-hidden rounded-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                <h2 className="font-bold text-lg sm:text-xl mb-2">
                    جدیدترین مقالات 📚
                </h2>

                <p className="text-sm text-gray-500 mb-6">
                    لورم ایپسوم متن ساختگی است.
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
                    {blogs.map((blog) => (
                        <SwiperSlide key={blog.id} className="h-auto p-1">
                            <BlogCard blog={blog} />
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
}