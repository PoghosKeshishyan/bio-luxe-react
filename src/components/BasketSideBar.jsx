import { useContext, useEffect } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export function BasketSideBar({ basket_items, basket_heart_view_link }) {
  const {
    basketMenuOpen,
    setBasketMenuOpen,
    basketSidebarRef,
    orders,
    removeFromCart
  } = useContext(CartContext);

  const currentLanguage = localStorage.getItem('lang');

  const handleClose = () => {
    setBasketMenuOpen(false);
  };

  useEffect(() => {
    if (basketMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [basketMenuOpen]);



  return (
    <>
      {basketMenuOpen && (
        <div className="basket-backdrop" onClick={handleClose}>
          <div
            className="basket-sidebar"
            ref={basketSidebarRef}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className='basket_heading'>{basket_items.heading}</h3>

            <div className="cart-orders-container">
              {orders?.map(elem => (
                <div className="sidebar-item" key={elem.id}>
                  <img
                    src={
                      elem?.images?.find(img => img.is_general)?.image || elem?.images?.[0]?.image
                    }
                    alt="item"
                    className="sidebar-item-image"
                  />
                  <div className="sidebar-item-info">
                    <div className='item_info'>
                      <p className='item_name'>{elem.title?.[currentLanguage]}</p>
                      <p className='item_price'>
                        {elem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ֏
                      </p>

                    </div>
                    <div className="sidebar-item-actions">
                      <p className='item_Quantity'>{basket_items.quantity} {elem.quantity}</p>
                      <button
                        className="action-button remove"
                        onClick={() => removeFromCart(elem.id)}
                      >
                        <span className="icon">{basket_items.remove_button_icon}</span>
                        <p className='remove_button'>{basket_items.remove_button_text}</p>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="shopping_bag" className="view-all-link">
              <p>{basket_heart_view_link.text}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
