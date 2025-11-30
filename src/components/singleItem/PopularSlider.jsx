import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useContext } from "react";
import { HeartContext } from "../../contexts/HeartContext";
import { CartContext } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';


export function PopularSlider({ popularPlider, linkProductHeading }) {
    const currentLanguage = localStorage.getItem("lang") || "en";
    const navigate = useNavigate();

    const { handleHeartIcon, favoritesList } = useContext(HeartContext);
    const { addToBasket } = useContext(CartContext);

    const is_heart_icon = (id) => {
        return favoritesList.some(fav => fav.id === id);
    }


    const handleClick = async (e, item) => {
        if (e.target.classList.contains('add-to-bag')) {
            addToBasket(item, item.id);
        } else if (
            e.target.classList.contains('heart_icon') ||
            e.target.parentElement.classList.contains('heart_icon')
        ) {
            handleHeartIcon(item);
        }
        else {
            navigate(`/item/${item.id}`)
        }
    }


    return (
        <div className="popular_slider_section">
            <div className="slider-header">
                <div className='slider_title_div'>
                    <h2 className="section-title">{linkProductHeading?.title}</h2>
                </div>
                <div className='line'></div>
                <div className="slider-nav">
                    <div className="swiper-button-prevv  custom-nav swiper-button-prev ">
                        <img src="/images/arowleft.svg" alt="" />
                    </div>
                    <div className="swiper-button-nextt custom-nav">
                        <img src="/images/arowrigth.svg" alt="" />
                    </div>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={24}
                slidesPerView={4}
                slidesPerGroup={1}
                navigation={{
                    nextEl: '.swiper-button-nextt',
                    prevEl: '.swiper-button-prevv',
                }}
                breakpoints={{
                    1024: { slidesPerView: 4 },
                    768: { slidesPerView: 2 },
                    300: { slidesPerView: 1 },
                }}
            >
 
                {popularPlider?.map(item => (
                    <SwiperSlide key={item?.id}>
                        <div className="product-card" onClick={(e) => handleClick(e, item)}>
                            <div className='slider_image_div'>
                                <img
                                    src={
                                        item?.images?.find(img => img.is_general)?.image ||
                                        item?.images?.[0]?.image
                                    }
                                    alt="product"
                                    className="product-image"
                                />
                            </div>
                            <div className='slider_text_div'>
                                <h3 className="product-title">{item?.category_name}</h3>
                                <p className="product-price">
                                    {item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ֏
                                </p>
                            </div>

                            <button className="add-to-bag">{item?.btn_text[currentLanguage]}</button>

                            <div className="heart_icon">
                                <i className={is_heart_icon(item.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                            </div>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
