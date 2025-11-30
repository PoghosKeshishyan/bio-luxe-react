import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { HeartContext } from '../../contexts/HeartContext';
import { PopularSlider } from '../singleItem/PopularSlider';
import emailjs from '@emailjs/browser';

export function ShoppingBag({ allAvailableSizes, orders, shoppingBadData, popularPlider, linkProductHeading, infoAboutDelivery }) {
    const currentLanguage = localStorage.getItem('lang') || 'en';
    const navigate = useNavigate();
    const { removeFromCart, plus, minus, changeSizeProductFromBasket, clearCart } = useContext(CartContext);
    const { handleHeartIcon, favoritesList } = useContext(HeartContext);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRefs = useRef({});
    const formRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const colorTranslation = {
        am: "գույն",
        ru: "цвет",
        en: "color",
    };

    const Sending = {
        am: "Ուղարկվում է...",
        ru: "Отправляется...",
        en: "Sending...",
    };

    const Sent = {
        am: "✅ Հաջողությամբ ուղարկվեց։",
        ru: "✅ Успешно отправлено.",
        en: "✅ Successfully sent.",
    };

    const ErrorSending = {
        am: "❌ Սխալ email ուղարկելու ժամանակ։",
        ru: "❌ Ошибка при отправке email.",
        en: "❌ Error while sending email.",
    };

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? 'hidden' : '';
    }, [isModalOpen]);

    const totalPrice = orders.reduce((total, item) => {
        const cleanPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, ''));
        return total + (cleanPrice * item?.quantity || 1);
    }, 0);

    const toggleDropdown = (itemId) => {
        setOpenDropdown(prev => (prev === itemId ? null : itemId));
    };

    const handleSizeSelect = (product_id, size) => {
        if (size.status === 'not available') return;
        changeSizeProductFromBasket(product_id, size);
        setOpenDropdown(null);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown !== null && dropdownRefs.current[openDropdown] &&
                !dropdownRefs.current[openDropdown].contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdown]);

    // // ✅ EmailJS Submit
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const name = formRef.current.name.value;
    //     const tel = formRef.current.tel.value;
    //     const address = formRef.current.address.value;

    //     const productInfo = orders.map(item => ({
    //         title: item.title[currentLanguage],
    //         id: item.id,
    //         product_number: item.product_number,
    //         price: item.price,
    //         color: item.color,
    //         quantity: item.quantity,
    //         size: item.selectedSize,
    //         material: item.product_material?.[currentLanguage] || '',
    //         total: item.price * item.quantity,
    //     }));

    //     const templateParams = {
    //         name,
    //         tel,
    //         address,
    //         order_details: `
    //             <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
    //                 <thead style="background-color: #c9c9c9;">
    //                     <tr>
    //                     <th>#</th>
    //                     <th>Product Name</th>
    //                     <th>Product Number</th>
    //                     <th>Color</th>
    //                     <th>Size</th>
    //                     <th>Material</th>
    //                     <th>Quantity</th>
    //                     <th>Price</th>
    //                     <th>Total</th>
    //                     </tr>
    //                 </thead>
    //                  <tbody>
    //                    ${productInfo.map((p, index) => `
    //     <tr>
    //       <td>${index + 1}</td>
    //       <td>${p.title}</td>
    //       <td>#${p.product_number}</td>
    //       <td className="klor" style="padding: 3px 3px;"><div style="width: 25px; height: 25px; background-color: ${p.color}; border: 1px solid #000; border-radius: 50px; margin:0 auto;"></div></td>          <td>${p.size}</td>
    //       <td>${p.material}</td>
    //       <td>${p.quantity}</td>
    //       <td>${p.price} ֏</td>
    //       <td>${p.total} ֏</td>
    //     </tr>
    //                    `).join('')}
    //                  </tbody>
    //             </table>`,

    //         total_price: totalPrice
    //     };




    //     emailjs.send(
    //         "service_4v2y1hj",      // ✅ փոխիր քո service ID-ով
    //         "template_g67tfmj",     // ✅ փոխիր քո template ID-ով
    //         templateParams,
    //         "gO0LYLAsKjEHnAsQl"     // ✅ փոխիր քո public key-ով
    //     ).then(() => {
    //         alert('✅ Հաջողությամբ ուղարկվեց։');
    //         formRef.current.reset();
    //         // orders.forEach(item => removeFromCart(item.id));
    //         clearCart(); // ✅ հիմա սա միանգամից մաքրում ա ամբողջ զամբյուղը
    //     }).catch((error) => {
    //         alert('❌ Սխալ email ուղարկելու ժամանակ։ ' + error.text);
    //     });

    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSubmitting) return; // ⚠️ եթե արդեն ուղարկում ա, ուրիշ ուղարկում թույլ չենք տալիս
        setIsSubmitting(true);     // ✅ փակում ենք հաջորդ սեղմումները

        const name = formRef.current.name.value;
        const tel = formRef.current.tel.value;
        const address = formRef.current.address.value;

        const productInfo = orders.map(item => ({
            title: item.title[currentLanguage],
            id: item.id,
            product_number: item.product_number,
            price: item.price,
            color: item.color,
            quantity: item.quantity,
            size: item.selectedSize,
            material: item.product_material?.[currentLanguage] || '',
            total: item.price * item.quantity,
        }));

        const templateParams = {
            name,
            tel,
            address,
            order_details: `
            <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
                <thead style="background-color: #c9c9c9;">
                    <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Number</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Material</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    </tr>
                </thead>
                 <tbody>
                   ${productInfo.map((p, index) => `
<tr>
  <td>${index + 1}</td>
  <td>${p.title}</td>
  <td>#${p.product_number}</td>
  <td style="padding: 3px 3px;"><div style="width: 25px; height: 25px; background-color: ${p.color}; border: 1px solid #000; border-radius: 50px; margin:0 auto;"></div></td>
  <td>${p.size}</td>
  <td>${p.material}</td>
  <td>${p.quantity}</td>
  <td>${p.price} ֏</td>
  <td>${p.total} ֏</td>
</tr>
                   `).join('')}
                 </tbody>
            </table>`,
            total_price: totalPrice
        };

        emailjs.send(
            "service_4v2y1hj",
            "template_g67tfmj",
            templateParams,
            "gO0LYLAsKjEHnAsQl"
        ).then(() => {
            alert(Sent[currentLanguage]);
            formRef.current.reset();
            clearCart();
        }).catch(() => {
            alert(ErrorSending[currentLanguage]);
        }).finally(() => {
            setIsSubmitting(false); // ✅ թողնում ենք օգտատիրոջը նորից փորձելու հնարավորություն
        });
    };




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
                            <Link to='/' onClick={() => navigate(-1)}>
                                <i className="fa-solid fa-chevron-left"></i>{shoppingBadData.btn_text}
                            </Link>
                        </span>
                    </div>

                    <div className="shop_heading">
                        <h3>{shoppingBadData.title}</h3>
                        <div className="line"></div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="empty-message">
                            <p>{shoppingBadData.empty_error_text}</p>
                        </div>
                    ) : (
                        orders.map(item => (
                            <div key={item.id} className='shopping_product'>
                                <div className='product_kontainer '>
                                    <div
                                        className="image_div"
                                        onClick={() => window.open(`/item/${item.id}`, '_blank')}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            src={
                                                item?.images?.find(img => img.is_general)?.image || item?.images?.[0]?.image
                                            }
                                            alt="product"
                                        />
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
                                                <span>
                                                    {(item?.price * item.quantity)
                                                        .toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ֏
                                                </span>
                                            </div>

                                            <div className='size' ref={el => dropdownRefs.current[item.id] = el}>
                                                <div className='size_div'>
                                                    <p>{shoppingBadData.size_title}</p>
                                                    <span>{item.selectedSize}</span>
                                                </div>
                                                <div className='color_div'>
                                                    <p>{colorTranslation[currentLanguage]}</p>
                                                    <div className='color' style={{ background: item?.color }}></div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='bottom_parametr' onClick={() => handleHeartIcon(item)}>
                                            <p>
                                                <i className={favoritesList.some(fav => fav.id === item.id) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
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
                                        <p>{shoppingBadData.empty_error_text}</p>
                                    </div>
                                ) : (
                                    orders.map(item => (
                                        <div key={item.id} className='chain_line'>
                                            <p>{item.title[currentLanguage]}</p>
                                            <span>
                                                {(item?.price * item.quantity)
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ֏
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {orders.length !== 0 && (
                            <>
                                <div className='line'></div>
                                <div className='bottom_side'>
                                    <div className='price'>
                                        <h2>{shoppingBadData.total_text_field}</h2>
                                        <span>
                                            {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ֏
                                        </span>
                                    </div>

                                    <form className="form1" ref={formRef} onSubmit={handleSubmit}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder=" "
                                                required
                                                pattern="^[a-zA-Z\u0561-\u0587\u0531-\u0556\s]{2,}$"
                                                title="🙋 Խնդրում ենք գրել ձեր անունը (առնվազն 2 տառ)"
                                                className="input"
                                            />
                                            <label htmlFor="name">{shoppingBadData.form_input_name_placeholder}</label>
                                        </div>

                                        <div className="input-group">
                                            <input
                                                type="tel"
                                                id="tel"
                                                name="tel"
                                                placeholder=" "
                                                required
                                                pattern="^\d{8,}$"
                                                title="📞 Խնդրում ենք գրել ճիշտ հեռախոսահամար (առնվազն 8 թիվ)"
                                                className="input"
                                            />
                                            <label htmlFor="tel">{shoppingBadData.form_input_tel_placeholder}</label>
                                        </div>

                                        <div className="input-group">
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                placeholder=" "
                                                required
                                                minLength={5}
                                                pattern="^[a-zA-Z\u0561-\u0587\u0531-\u0556\d\s.,\-\/]{5,}$"
                                                title="📍 Խնդրում ենք գրել հասցե (առնվազն 5 նշան)"
                                                className="input"
                                            />
                                            <label htmlFor="address">{shoppingBadData.form_input_address_placeholder}</label>
                                        </div>

                                        <div className="del_div">
                                            <input type="checkbox" id="del" required />
                                            <label htmlFor="del">{shoppingBadData.form_input_checkbox_text}</label>
                                        </div>

                                        <button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? Sending[currentLanguage] : shoppingBadData.form_btn_text}
                                        </button>

                                    </form>
                                </div>
                            </>
                        )}

                        <div className='shipping_returns'>
                            <p>{shoppingBadData.form_input_checkbox_text}</p>
                            <Link to='/' onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
                                {infoAboutDelivery[0]?.title}
                                <i className="fa-solid fa-angle-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            {infoAboutDelivery.map(item => (
                                <div key={item.id}>
                                    <div className="modal-header">
                                        <h2>{item.title}</h2>
                                        <button className="close-button" onClick={() => setIsModalOpen(false)}>
                                            <img src="/images/icon.png" alt="close" />
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {item.texts.map((text, index) => (
                                            <div key={index} className="text_div">
                                                <p>{text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className='slider_container'>
                <PopularSlider popularPlider={popularPlider} linkProductHeading={linkProductHeading} />
            </div>
        </>
    );
}
