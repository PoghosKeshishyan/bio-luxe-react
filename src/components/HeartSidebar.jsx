import { useContext, useEffect } from 'react';
import { HeartContext } from '../contexts/HeartContext';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { BACKEND_API_URL } from '../config';

export function HeartSidebar({ heart_items, basket_heart_view_link }) {
  const {
    heartMenuOpen,
    setHeartMenuOpen,
    heartSidebarRef,
    favoritesList,
    removeIsFavoritesList
  } = useContext(HeartContext);

  const { addToBasket } = useContext(CartContext);
  const currentLanguage = localStorage.getItem('lang');

  const handleClose = () => {
    setHeartMenuOpen(false);
  };

  useEffect(() => {
    if (heartMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [heartMenuOpen]);

  return (
    <>
      {heartMenuOpen && (
        <div className="heart-backdrop" onClick={handleClose}>
          <div
            className="heart-sidebar"
            ref={heartSidebarRef}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className='heart_heading'>{heart_items.heading}</h3>

            <div className="favorites-container">
              {favoritesList.map(elem => (
                <div className="sidebar-item" key={elem.id}>
                  <img
                    src={BACKEND_API_URL + elem.images[0].image}
                    alt="item"
                    className="sidebar-item-image"
                  />
                  <div className="sidebar-item-info">
                    <div className='heart_info'>
                      <p className='item_name'>{elem.title[currentLanguage]}</p>
                      <p className='item_price'>{elem.price}</p>
                    </div>

                    <div className="sidebar-item-actions">
                      <button className="action-button" onClick={() => addToBasket(elem, elem.id)}>
                        <span className="icon">{heart_items.add_button_icon}</span>
                        <p className='add_button'>{heart_items.add_button_text}</p>
                      </button>

                      <button className="action-button remove" onClick={() => removeIsFavoritesList(elem)}>
                        <span className="icon">{heart_items.remove_button_icon}</span>
                        <p className='remove_button'>{heart_items.remove_button_text}</p>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
