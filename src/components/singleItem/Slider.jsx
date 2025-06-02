import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { BACKEND_API_URL } from '../../config';

export function Slider({ item }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return item && (
        <div className='slider_page'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={1}
                navigation={true}
                loop={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {item.images?.map((item, index) => (
                    <SwiperSlide className='SwiperSlide' key={index}><img src={BACKEND_API_URL + item.image} alt="" /></SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                slidesPerView={item?.images?.length + 1 - 1}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                freeMode={true}
                // loop={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {item.images?.map((item, index) => (
                    <SwiperSlide className='SwiperSlide' key={index}><img src={BACKEND_API_URL + item.image} alt="product" /></SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
