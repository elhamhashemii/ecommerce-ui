'use client'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

export default function SampleSlider() {
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
        <div className="bg-red-400 rounded-xl w-full h-full flex items-center justify-center text-white text-xl">
          Slide 1
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-blue-400 rounded-xl w-full h-full flex items-center justify-center text-white text-xl">
          Slide 2
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="bg-green-400 rounded-xl w-full h-full flex items-center justify-center text-white text-xl">
          Slide 3
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
