import { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { CartContext } from "../contexts/CartContext";
import { HeartContext } from "../contexts/HeartContext";
import { NewArrival } from "./NewArrival";

export function NewArrivals({ newArriavals, newArrivalsHeading }) {
    const { addToBasket } = useContext(CartContext);
    const { handleHeartIcon } = useContext(HeartContext);
    const [currentLanguage] = useState(localStorage.getItem("lang") || "en");

    return (
        <div id="new_arrivals" className="new-arrivals-slider">
            <div className="container">
                <div className="slider-header">
                    <div className="slider_title_div">
                        <h2 className="section-title">{newArrivalsHeading}</h2>
                    </div>
                    <div className="line"></div>
                    <div id="new_arrival" className="slider-nav">
                        <div className="swiper-button-prev custom-nav swiper-button-prev">
                            <img src="/images/arowleft.svg" alt="prev" />
                        </div>
                        <div className="swiper-button-next custom-nav swiper-button-next">
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
                        nextEl: "#new_arrival .swiper-button-next",  
                        prevEl: "#new_arrival .swiper-button-prev",
                    }}
                    breakpoints={{
                        1024: { slidesPerView: 4 },
                        768: { slidesPerView: 2 },
                        300: { slidesPerView: 1 },
                    }}
                    className="new-arrivals-swiper"
                >
                    {newArriavals?.map((item) => (
                        <SwiperSlide key={item.id}>
                            <NewArrival
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
