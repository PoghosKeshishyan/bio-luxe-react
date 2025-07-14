import { NewArrival } from "./NewArrival";
import { useState } from "react";
import { useContext } from 'react';
import { CartContext } from "../contexts/CartContext";
import { HeartContext } from "../contexts/HeartContext";

export function NewArrivals({ newArriavals, newArrivalsHeading }) {
    
    const [currentLanguage] = useState(localStorage.getItem("lang") || "en");
    const { addToBasket } = useContext(CartContext);
    const {handleHeartIcon} = useContext(HeartContext);

     

    return (
        <div id="new_arrivals">
            <div className="container">
                <h2 className="heading">
                    <span>{newArrivalsHeading}</span>
                    <div className="line"></div>
                </h2>
                <div className="box_container">
                    {newArriavals.map((item) => (
                        <NewArrival key={item.id} item={item} handleHeartIcon={handleHeartIcon} addToBasket={addToBasket} lang={currentLanguage} />
                    ))}
                </div>
            </div>
        </div>
    );
}
