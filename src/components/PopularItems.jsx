import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { CartContext } from "../contexts/CartContext";
import { HeartContext } from "../contexts/HeartContext";
import { Popular_item } from "./PopularItem";

export function Popular_items({ popular_items, popular_items_heading }) {
    const { addToBasket } = useContext(CartContext);
    const { handleHeartIcon } = useContext(HeartContext);
    const [currentLanguage] = useState(localStorage.getItem("lang") || "en");

    return (
        <div id="popular_items" className="popular_slider_section">
            <div className="container">
                <div className="slider-header">
                    <div className="slider_title_div">
                        <h2 className="section-title">{popular_items_heading}</h2>
                    </div>
                    <div className="line"></div>

                    <div id="popular_item" className="slider-nav">
                        <div className="swiper-button-prevv custom-nav swiper-button-prev">
                            <img src="/images/arowleft.svg" alt="prev" />
                        </div>
                        <div className="swiper-button-nextt custom-nav swiper-button-next">
                            <img src="/images/arowrigth.svg" alt="next" />
                        </div>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={4}
                    slidesPerGroup={1}
                    navigation={{
                        nextEl: " #popular_item .swiper-button-nextt",
                        prevEl: " #popular_item .swiper-button-prevv",
                    }}
                    breakpoints={{
                        1024: { slidesPerView: 4 },
                        768: { slidesPerView: 2 },
                        300: { slidesPerView: 1 },
                    }}
                    className="popular-swiper"
                >
                    {popular_items && popular_items?.map((item) => (
                        <SwiperSlide key={item?.id}>
                            <Popular_item
                                item={item}
                                handleHeartIcon={handleHeartIcon}
                                addToBasket={addToBasket}
                                lang={currentLanguage}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
