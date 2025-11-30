import { useContext, useState } from "react";
import { SearchContext } from "../contexts/SearchContext";
import axios from "../axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

export function SearchSidebar() {
    const [orders, setOrders] = useState(null);
    const [input, setInput] = useState('');
    const { isOpenSearchBar, searchSidebarRef, handleSearchBar } = useContext(SearchContext);
    const currentLang = localStorage.getItem('lang');
    const navigate = useNavigate();
    const { addToBasket } = useContext(CartContext);

    const noProductsMessage = {
        am: "Այդ կատեգորիայի ապրանքներ չկան։",
        ru: "В этой категории нет товаров.",
        en: "No products in this category."
    };

    const search = {
        en: "Search",
        ru: "Поиск",
        am: "Որոնել"
    };

    const searchProduct = {
        en: "Search product",
        ru: "Поиск товара",
        am: "Ապրանքի որոնում"
    };

    const savedHeartItems = {
        en: "add to bag",
        ru: "добавить в корзину",
        am: "ավելացնել զամբյուղ"
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        const items = await axios.get('items');
        const res = items.data.filter(item => item.title[currentLang].toLowerCase().includes(input.toLowerCase()));
        setOrders(res);
    }

    useEffect(() => {
        if (isOpenSearchBar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpenSearchBar]);

    const handleClick = (e, item) => {
        if (
            e.target.classList.contains('order_search_button_icon') ||
            e.target.classList.contains('order_search_button_add_button') ||
            e.target.parentElement.classList.contains('order_search_button')
        ) {
            addToBasket(item, item.id);
        } else {
            navigate(`/item/${item.id}`)
        }
    }

    return isOpenSearchBar && (
        <div className="search-backdrop">

            <div
                className="search-sidebar"
                ref={searchSidebarRef}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="search-title">{search[currentLang]}</h2>

                <form className="search-input-wrapper" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={searchProduct[currentLang]}
                        className="search-input"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button className="search-button" type="submit"><img src="../images/Search.svg" alt="SearchIcon" /></button>
                </form>

                <div className="orders-container">
                    {
                        orders && orders.map(elem => (
                            <div key={elem.id} className="order" onClick={(e) => handleClick(e, elem)}>
                                <img
                                    src={elem.images.find(img => img.is_general)?.image}
                                    alt="order"
                                />
                                <div className="order_text">
                                    <h2>{elem.title[currentLang]}</h2>
                                    <div className="order_content">
                                        <h3>
                                            {elem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ֏
                                        </h3>
                                        <button className="order_search_button">
                                            <span className="order_search_button_icon">🛍️</span>
                                            <p className='order_search_button_add_button'> {savedHeartItems[currentLang]} </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    {
                        orders && !orders.length && <div className="no-product-message">{noProductsMessage[currentLang]}</div>
                    }
                </div>
            </div>
        </div>
    );
}
