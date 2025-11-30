import { useContext, useEffect, useState } from 'react';
import { HeartContext } from '../contexts/HeartContext';
import { CartContext } from '../contexts/CartContext';

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
  const [addedItemId, setAddedItemId] = useState(null);

  const handleClose = () => {
    setHeartMenuOpen(false);
  };
  const modalText = {
    en: 'Added to cart',
    ru: 'Добавлено в корзину',
    am: 'Ավելացվեց զամբյուղ',
  }

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

  const handleAddToBasket = (elem) => {
    addToBasket(elem, elem.id);
    setAddedItemId(elem.id);

    setTimeout(() => {
      setAddedItemId(null);
    }, 2000);
  };



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
                    src={
                      elem?.images?.find(img => img.is_general)?.image || elem?.images?.[0]?.image
                    }
                    alt={elem.title[0]}
                    className="sidebar-item-image"
                  />
                  <div className="sidebar-item-info">
                    <div className='heart_info'>
                      <p className='item_name'>{elem.title[currentLanguage]}</p>
                      <p className='item_price'>
                        {elem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ֏
                      </p>

                    </div>

                    <div className="sidebar-item-actions">
                      <button
                        className="action-button"
                        onClick={() => handleAddToBasket(elem)}
                      >
                        <span className="icon">{heart_items.add_button_icon}</span>
                        <p className='add_button'>{heart_items.add_button_text}</p>
                      </button>
                    </div>

                    {addedItemId === elem.id && (
                      <div className="added-notification">
                        {modalText[currentLanguage]}
                      </div>
                    )}

                    <button className="action-button remove" onClick={() => removeIsFavoritesList(elem)}>
                      <span className="icon">{heart_items.remove_button_icon}</span>
                      <p className='remove_button'>{heart_items.remove_button_text}</p>
                    </button>
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
