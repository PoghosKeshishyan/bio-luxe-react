import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
////////////////////////////////////////////
import { CartContext } from '../../contexts/CartContext';
import { HeartContext } from '../../contexts/HeartContext';
import { useNavigate } from 'react-router-dom';
import { PopularSlider } from '../singleItem/PopularSlider';
import { BACKEND_API_URL } from '../../config';

export function ShoppingBag({ orders, shoppingBadData, popularPlider, linkProductHeading }) {

    const currentLanguage = localStorage.getItem('lang') || 'en';
    const navigate = useNavigate()
    const handleClick = () => { navigate(-1); };
    const { removeFromCart, plus, minus, changeSizeProductFromBasket } = useContext(CartContext);
    const { handleHeartIcon, favoritesList } = useContext(HeartContext);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isModalOpen] = useState(false);

    const notAvailableText = {
        en: 'not available',
        ru: 'нет в наличии',
        am: 'առկա չէ',
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isModalOpen]);

    const totalPrice = orders.reduce((total, item) => {
        const cleanPrice = parseFloat(
            String(item.price).replace(/[^0-9.]/g, '')
        );

        return total + (cleanPrice * item?.quantity || 1);
    }, 0);

    const dropdownRefs = useRef({});

    const toggleDropdown = (itemId) => {
        setOpenDropdown(prev => (prev === itemId ? null : itemId));
    };

    const handleSizeSelect = (product_id, size) => {
        if (size.status === 'not available') {
            return;
        }

        changeSizeProductFromBasket(product_id, size.size);
        setOpenDropdown(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                openDropdown !== null &&
                dropdownRefs.current[openDropdown] &&
                !dropdownRefs.current[openDropdown].contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    return (
        <>
            <div className='container'>

                <div className='shopping_container'>
                    <div className='main_shopping_link'>
                        <span className='link_div'>
                            <Link to="/" className='main'>{shoppingBadData.main} </Link> /
                            <Link className='shopping_bag'>{shoppingBadData.title}</Link>
                        </span>
                        <span className='Continue_div'>
                            <Link to='/' onClick={handleClick}><i className="fa-solid fa-chevron-left"></i>{shoppingBadData.btn_text}</Link>
                        </span>
                    </div>

                    <div className="shop_heading">
                        <h3>{shoppingBadData.title}</h3>
                        <div className="line"></div>
                    </div>
                    {orders.length === 0 ? (
                        <div className="empty-message">
                            <img src="/images/404eror.jpg" alt="Empty bag" />
                            <p>{shoppingBadData.empty_error_text}</p>
                        </div>
                    ) : (
                        orders.map(item => (
                            <div key={item.id} className='shopping_product'>
                                <div className='product_kontainer'>
                                    <div className='image_div' onClick={() => navigate(`/item/${item.id}`)} style={{ cursor: 'pointer' }}>
                                        <img src={BACKEND_API_URL + item.images[0].image} alt="product" />
                                    </div>
                                    <div className='title_parametr'>
                                        <div className='top_parametr'>
                                            <div className='cribe_and_x'>
                                                <h3>{item.title[currentLanguage]}</h3>
                                                <i className="fa-solid fa-xmark" onClick={() => removeFromCart(item.id)}></i>
                                            </div>

                                            <div className='quantity_and_prais'>
                                                <p>
                                                    {shoppingBadData.quantity_and_prais_text}
                                                    <button><img src="images/Frame 30.svg" alt="" onClick={() => minus(item.id)} /></button>
                                                    {item.quantity}
                                                    <button><img src="images/Frame 31.svg" alt="" onClick={() => plus(item.id)} /></button>
                                                </p>
                                                <span>{item?.price}</span>
                                            </div>

                                            <div className='size' ref={(el) => dropdownRefs.current[item.id] = el}>
                                                <p> {shoppingBadData.size_title} </p>
                                                <span onClick={() => toggleDropdown(item.id)} style={{ cursor: 'pointer' }}>
                                                    {item.selectedSize}
                                                    <i className="fa-solid fa-angle-down"></i>
                                                </span>

                                                {openDropdown === item.id && (
                                                    <div className="dropdown">
                                                        {item.sizes.map(size => (
                                                            <div
                                                                key={size.id}
                                                                className={`dropdown-item ${size.status === 'not available' ? 'disabled' : ''}`}
                                                                onClick={() => size.status && handleSizeSelect(item.id, size)}
                                                            >
                                                                {size.size} {size.status === 'not available' && notAvailableText[currentLanguage]}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                            </div>
                                        </div>


                                        <div className='bottom_parametr' onClick={() => handleHeartIcon(item)}>
                                            <p>
                                                <i
                                                    className={favoritesList.some(fav => fav.id === item.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}

                                                ></i>
                                                {shoppingBadData.heart_text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                </div>
                <div className='order_summary'>
                    <div className='order_div'>
                        <div className='top_side'>
                            <h2>{shoppingBadData.order_summary_field}</h2>
                            <div className='line_div'>

                                {orders.length === 0 ? (
                                    <div className="empty-message">
                                        <img src="/images/404eror.jpg" alt="Empty bag" />

                                        <p>{shoppingBadData.empty_error_text}</p>
                                    </div>
                                ) : (
                                    orders.map(item => (
                                        <div key={item.id} className='chain_line'>
                                            <p>{item.title[currentLanguage]}</p>
                                            <span>{item.price}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>


                        {orders.length === 0 ? (
                            <div className="empty-message">

                            </div>
                        ) : (
                            <>
                                <div className='line'></div>

                                <div className='bottom_side'>
                                    <div className='price'>
                                        <h2>{shoppingBadData.total_text_field}</h2>
                                        <span>{totalPrice} ֏</span>
                                    </div>

                                    <form className='form1'>
                                        <input type="text" placeholder={shoppingBadData.form_input_name_placeholder} required />
                                        <input type="tel" placeholder={shoppingBadData.form_input_tel_placeholder} required />
                                        <input type="text" placeholder={shoppingBadData.form_input_address_placeholder} required />
                                        <div className='del_div'>
                                            <input type="checkbox" id="del" required />
                                            <label htmlFor="del">{shoppingBadData.form_input_checkbox_text}</label>
                                        </div>
                                        <input type="submit" value={shoppingBadData.form_btn_text} />
                                    </form>
                                </div>
                            </>

                        )}
                    </div>

                </div>
            </div>
            <div className='slider_container'>
                <PopularSlider popularPlider={popularPlider} linkProductHeading={linkProductHeading} />
            </div>
        </>

    );

}