import { CartContext } from "../contexts/CartContext";
import { HeartContext } from "../contexts/HeartContext";
import { Popular_item } from "./PopularItem";
import { useContext, useState } from "react";



export function Popular_items({ popular_items, popular_items_heading }) {
    const { addToBasket } = useContext(CartContext);
    const [currentLanguage] = useState(localStorage.getItem("lang") || "en");
    const {handleHeartIcon} = useContext(HeartContext);

    return (
        <div id="popular_items">
            <div className="container">
                <h2 className="heading">
                    <span>{popular_items_heading}</span>
                    <div className="line"></div>
                </h2>
                <div className="box_container">
                    {popular_items && popular_items.map((item) => (
                        <Popular_item key={item.id} item={item} handleHeartIcon={handleHeartIcon} addToBasket={addToBasket} lang={currentLanguage} />
                    ))}
                </div>
            </div>
        </div>
    );
}

