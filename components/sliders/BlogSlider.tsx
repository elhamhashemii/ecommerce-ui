'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import BlogCard from '../cards/BlogCard';
import { useState } from 'react';
import { content } from '@/config/content';
import { Button } from '@heroui/button';
import { BlogItem } from '@/types/blog';

interface IProps {
  data?: BlogItem[]
}

export default function BlogSlider({ data }: IProps) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);


  // Function to handle previous slide
  const handlePrevSlide = () => {
    if (swiperInstance && !swiperInstance.isBeginning) {
      swiperInstance.slidePrev();
    }
  };

  // Function to handle next slide
  const handleNextSlide = () => {
    if (swiperInstance && !swiperInstance.isEnd) {
      swiperInstance.slideNext();
    }
  };

  return (
    data && data?.length > 0 ? <div className="relative w-full">
      <Swiper
        onSwiper={setSwiperInstance}
        spaceBetween={10}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          640: { slidesPerView: 2.7 },
          768: { slidesPerView: 3.2 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 },
        }}
        style={{ width: '100%' }}
      >
        <div slot="container-end" className="absolute top-0 left-0 flex items-end justify-end gap-2 p-2">
          <Button
            size="sm" variant="bordered"
            className="custom-prev"
            onPress={handlePrevSlide}
          >
            {content.prev}
          </Button>
          <Button
            size="sm" variant="bordered"
            className="custom-next"
            onPress={handleNextSlide}
          >
            {content.next}
          </Button>
        </div>
        {data ? data.map((item) => (
          <SwiperSlide key={item.id} className="p-1 mt-12">
            <BlogCard blog={item} />
          </SwiperSlide>
        )) : <>مقاله‌ای یافت نشد.</>}
      </Swiper>
    </div> : <div className='text-sm'>مقاله‌ای یافت نشد.</div>
  );
}

