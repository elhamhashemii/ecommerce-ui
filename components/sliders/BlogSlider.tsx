'use client'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';
import BlogCard from '../cards/BlogCard';

export default function BlogSlider() {
  const items: any[] = []

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
        {items.map((item) => {
            return <BlogCard />
        })}
      </SwiperSlide>
    </Swiper>
  );
}
