import { useContext, useEffect, useState } from "react";
import axios from "../axios";
import { ShoppingBag } from "../components/shopping/ShoppingBag";
import { CartContext } from "../contexts/CartContext";

export function ShoppingPage() {
    const currentLanguage = localStorage.getItem('lang') || 'en';
    const [shoppingBadData, setShoppingBagData] = useState(null);
    const { orders, setBasketMenuOpen } = useContext(CartContext);
    const [popularPlider, setPopularPlider] = useState([]);
    const [linkProductHeading, setLinkProductHeading] = useState([]);

    useEffect(() => {
        setBasketMenuOpen(false);
    }, [])

    useEffect(() => {
        const loadingData = async () => {
            try {
                const res = await axios.get('shopping_bag_page?lang=' + currentLanguage);
                setShoppingBagData(res.data[0])
                const resPopularPlider = await axios.get('items');
                setPopularPlider(resPopularPlider.data);
                const resLinkProductHeading = await axios.get('liked_product_heading?lang=' + currentLanguage);
                setLinkProductHeading(resLinkProductHeading.data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        loadingData();
    }, [currentLanguage]);

    return (
        <div className="ShoppingBag_section">
            {shoppingBadData && <ShoppingBag orders={orders} shoppingBadData={shoppingBadData} popularPlider={popularPlider} linkProductHeading={linkProductHeading} />}
        </div>
    )
}