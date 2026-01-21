// 'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import { Navigation, Pagination } from 'swiper/modules';
// import BlogCard from '../cards/BlogCard';
// import { blogsData } from '@/config/const';

// export default function BlogSlider() {

//   return (
//     <Swiper
//       modules={[Navigation, Pagination]}
//       // navigation
//       pagination={{ clickable: true }}
//       spaceBetween={10}
//       slidesPerView={2}
//       style={{ width: '100%', height: '200px' }}
//     >
//       {blogsData.map((item) => {
//         return <SwiperSlide className="p-1">
//           <BlogCard key={item.id} blog={item} />
//         </SwiperSlide>
//       })}
//     </Swiper>
//   );
// }

'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import BlogCard from '../cards/BlogCard';
import { blogsData } from '@/config/const';
import { useState } from 'react';

export default function BlogSlider() {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  return (
    <div className="relative w-full">
      {/* Swiper wrapper */}
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        spaceBetween={10}
        slidesPerView={2}
        style={{ width: '100%', height: '300px' }}
      >
        {/* Custom navigation buttons */}
        <div slot="container-end" className="absolute top-0 left-0 flex items-end justify-end gap-2 p-2">
          <button className="custom-prev bg-gray-200 px-3 py-1 rounded text-black" onClick={() => {
            console.log({ swiperInstance })
            swiperInstance?.slidePrev()
          }}>Prev</button>
          <button className="custom-next bg-gray-200 px-3 py-1 rounded" onClick={() => {
            console.log(swiperInstance)
            swiperInstance?.slideNext()
          }}>Next</button>
        </div>
        {blogsData.map((item) => (
          <SwiperSlide key={item.id} className="p-1 mt-12">
            <BlogCard blog={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

