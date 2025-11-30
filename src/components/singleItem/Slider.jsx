import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export function Slider({ item, productChange }) {
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
                loop={false}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {(productChange?.images?.sort((a, b) => b.is_general - a.is_general) || [])
                    .map((item, index) => (
                        <SwiperSlide className="SwiperSlide" key={index}>
                            <div className="big_images_div">
                                <img src={item?.image} alt={item.title?.am || "product"} />
                            </div>
                        </SwiperSlide>
                    ))}

            </Swiper>

            <Swiper
                slidesPerView={item?.images?.length + 1 - 1}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                freeMode={true}
                loop={false}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {(productChange?.images?.sort((a, b) => b.is_general - a.is_general) || [])
                    .map((img, i) => (
                        <SwiperSlide key={i} className="SwiperSlide">
                            <div className="images_div">
                                <img src={img.image} alt={item.title?.am || "product"} />
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
}
