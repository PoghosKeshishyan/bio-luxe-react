import { Link } from "react-router-dom"
import { useState, useEffect, useRef, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { HeartContext } from "../../contexts/HeartContext";


export function Info({ item, itemPageFields, infoAboutDelivery }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentLanguage = localStorage.getItem("lang") || "en";
  const { addToBasket } = useContext(CartContext);

  const { handleHeartIcon, favoritesList } = useContext(HeartContext);
  const is_heart_icon = favoritesList.some(fav => fav.id === item.id);

  const [selectedSize, setSelectedSize] = useState(0);

  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    setSelectedSize(item.sizes && item.sizes[0].size);
  }, [item])

  // ⬇ dropdown-ների refs-երը պահելու object
  const dropdownRefs = useRef({});

  const toggleDropdown = (itemId) => {
    setOpenDropdown(prev => (prev === itemId ? null : itemId));
  };

  const handleSizeSelect = (size) => {
    if (size.status === 'not available') {
      return;
    }

    setSelectedSize(size.size);
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isModalOpen]);

  return (
    <div className="Info_page">
      <div className="cribe">
        <h2>{item.title?.[currentLanguage]}</h2>
        <span>{item.price}</span>
      </div>
      <div className="info">
        <div className="for_kids">
          <span className="size_1">{itemPageFields?.size_text_field}: {selectedSize}</span>

          <div className='size' ref={(el) => dropdownRefs.current[item.id] = el}>
            <Link>
              <span className="size_2" onClick={() => toggleDropdown(item?.id)} style={{ cursor: 'pointer' }}>
                {itemPageFields?.size_text_field_2}
                <i className="fa-solid fa-angle-down"></i>
              </span> </Link>

            {openDropdown === item.id && (
              <div className="dropdown">
                {item.sizes.map(size => (
                  <div
                    key={size.id}
                    className={`dropdown-item ${size.status === 'not available' ? 'disabled' : ''}`}
                    onClick={() => size.status && handleSizeSelect(size)}
                  >
                    {size.size} {size.status === 'not available' && itemPageFields?.not_available_text_field}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="description_details">
          <h2>{itemPageFields?.descr_text_field}</h2>
          <p>{item.descr?.[currentLanguage]} </p>
          <div className="product_info">
            <p>{itemPageFields?.product_number_text_field}: <span> {item.product_number} </span></p>
            <p>{itemPageFields?.material_text_field} <span>{item.product_material?.[currentLanguage]}</span></p>
          </div>
          <div className="delivery">
            <Link to='/' onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
              <img src="/images/info.svg" alt="info" />{itemPageFields?.about_delivery_text_field}
            </Link>

          </div>
          <div className="btn_div">
            <div className="add_to_bag" onClick={() => { addToBasket(item, item.id, selectedSize) }}>
              <Link >{item.btn_text?.[currentLanguage]}</Link>
            </div>

            <div className="heart" onClick={() => handleHeartIcon(item)}>
              {is_heart_icon ?
                <i className="fa-solid fa-heart"></i>
                :
                <i className="fa-regular fa-heart"></i>
              }
            </div>

          </div>
        </div>
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {infoAboutDelivery.map(item =>
                <>
                  <div className="modal-header">
                    <h2>{item.title}</h2>
                    <button className="close-button" onClick={() => setIsModalOpen(false)}>
                      <img src="/images/icon.png" alt="xach" />
                    </button>
                  </div>
                  <div key={item.id} className="modal-body">
                    <div className="text_div">
                      <p>{item.texts[0]}</p>
                    </div>
                    <div className="text_div">
                      <p>{item.texts[1]}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
