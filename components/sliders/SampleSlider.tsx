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

export default function SampleSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      // navigation
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      style={{ width: '100%', height: '400px' }}
    >
      <SwiperSlide>
        <div
          style={{
            backgroundImage: `url(${img3.src})`,
            backdropFilter: "blur(50px)",
            backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"
          }}
          className="bg-red-400 rounded-xl w-full h-full flex items-center justify-start text-black p-8">
          <div className='w-full md:basis-1/3'>
            <h1 className="text-xl md:text-2xl font-bold leading-snug">
              جایی برای شروع خلاقیت 🌈
            </h1>

            <p className="text-gray-800 text-sm my-8">
              مجموعه‌ای از لوازم‌التحریر و اسباب‌بازی‌های دوست‌داشتنی که خیال‌های کوچک
              را به ایده‌های بزرگ تبدیل می‌کنند.
            </p>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button size="sm" color="primary" as={Link} href={routes.SHOP}>
                همین حالا خرید کن
              </Button>
              <Button size="sm" variant="bordered" as={Link} color="primary" href={routes.SHOP}>
                دیدن جدیدترین‌ها
              </Button>
            </div>
          </div>

        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div
          style={{
            backgroundImage: `url(https://reverent-villani-cefcuyj0.storage.c2.liara.space/_methode_sundaytimes_prod_web_bin_462c1de2-cb2c-11e9-a5c5-eeafb66e7c98.jpg)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="bg-gray-100 rounded-xl w-full h-full flex items-center justify-start text-black p-8">
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
