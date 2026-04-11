'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img3 from "@/public/images/Gemini_Generated_Image_sav004sav004sav0.png"

import { Navigation, Pagination } from 'swiper/modules';
import { Button } from '@heroui/button';
import { routes } from '@/lib/routeNames';
import Link from 'next/link';

export default function ShopSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      // navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      style={{ width: '100%', height: '300px' }}
    >
      <SwiperSlide>
        <div
          style={{
            backgroundImage: `url(https://reverent-villani-cefcuyj0.storage.c2.liara.space/Untitled_design_a58ad034-b509-4b90-a9d7-5a91cefe17df.webp)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="bg-center bg-gray-100 rounded-xl w-full h-full flex items-start justify-center text-black p-4 md:p-8">
          <div className='text-white text-center font-bold text-xl md:text-2xl pt-2'>همه چیز برای نوشتن، ساختن و بازی کردن.</div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
