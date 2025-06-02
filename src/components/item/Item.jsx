import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { HeartContext } from "../../contexts/HeartContext";
import { BACKEND_API_URL } from "../../config";

export function Item({ item, addToBasket, handleHeartIcon, currentLanguage }) {
    const { favoritesList } = useContext(HeartContext);
    const is_heart_icon = favoritesList.some(fav => fav.id === item.id);;

    const navigate = useNavigate();

    const handleClick = async (e) => {
        if (e.target.classList.contains('btn_add_to_bag')) {
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
        <div className="box" onClick={handleClick}>
            <div className="clickable_area" >
                <div className="item_img">
                    <img src={BACKEND_API_URL + item.images[0]?.image} alt={item.title.currentLanguage} />
                </div>
                <div className="content">
                    <h3 className="title">{item.title[currentLanguage]}</h3>
                    <div className="price">{item.price}</div>
                </div>
            </div>
            <button className="btn_add_to_bag">
                {item.btn_text[currentLanguage]}
            </button>

            <div className="heart_icon">
                <img src={is_heart_icon ? "/images/Black_heart.svg" : "/images/Heart.svg"} alt="heart" />
            </div>
        </div>
    );
};
