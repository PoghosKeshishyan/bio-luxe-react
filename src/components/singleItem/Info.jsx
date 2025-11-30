import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { CartContext } from "../../contexts/CartContext";
import { HeartContext } from "../../contexts/HeartContext";
import axios from "../../axios";
import { BACKEND_API_URL } from "../../config";


export function Info({ setAllAvailableSizes, item, allItems, itemPageFields, setProductChange }) {
  const [infoAboutDelivery, setInfoAboutDeliver] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentLanguage = localStorage.getItem("lang") || "en";
  const { addToBasket } = useContext(CartContext);
  const { handleHeartIcon, favoritesList } = useContext(HeartContext);
  const defaultProduct = item || {};
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct || "");
  const [selectedSize, setSelectedSize] = useState(defaultProduct?.size || "");
  const [selectedColor, setSelectedColor] = useState(defaultProduct?.color || "");
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const groupCode = selectedProduct?.group_code || item?.group_code;
  const is_heart_icon = favoritesList.some(fav => fav.id === selectedProduct.id);

  const colorTranslation = {
    am: "գույն",
    ru: "цвет",
    en: "color",
  };

  const infoAboutDeliverTitle = {
    "en": "About delivery",
    "ru": "О доставке",
    "am": "Առաքման մասին",
  };

  useEffect(() => {
    axios.get(`${BACKEND_API_URL}/api/about-delivery/items/`)
      .then(res => setInfoAboutDeliver(res.data[0].about_delivery))
  }, [])

  useEffect(() => {
    setProductChange && setProductChange(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    if (item) {
      setSelectedProduct(item);
      setSelectedSize(item.size);
      setSelectedColor(item.color);
    }
  }, [item]);

  useEffect(() => {
    if (!selectedSize) return;

    let matched = allItems?.find(
      p =>
        p.group_code === groupCode &&
        String(p.size) === String(selectedSize) &&
        String(p.color).toLowerCase().trim() === String(selectedColor).toLowerCase().trim()
    );

    if (!matched) {
      matched = allItems?.find(
        p => p.group_code === groupCode && String(p.size) === String(selectedSize)
      );

      if (matched) {
        setSelectedProduct(matched);
        setSelectedColor(matched?.color);
      }
    } else {
      setSelectedProduct(matched);
    }
  }, [selectedSize, selectedColor, allItems, groupCode]);

  const availableSizes = useMemo(() => {
    return Array.from(new Set(
      allItems
        ?.filter(p => p.group_code === groupCode)
        .map(p => String(p.size))
    )).sort((a, b) => Number(a) - Number(b));
  }, [allItems, groupCode]);

  const availableColors = useMemo(() => {
    new Set
    return Array.from(new Set(
      allItems
        ?.filter(p => p.group_code === groupCode && String(p.size) === String(selectedSize))
        .map(p => String(p.color))
    ));

  }, [allItems, groupCode, selectedSize]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
  }, [isModalOpen]);

  const toggleDropdown = (itemId) => {
    setOpenDropdown(prev => (prev === itemId ? null : itemId));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setOpenDropdown(null);

    const matched = allItems?.find(p =>
      p.group_code === groupCode &&
      String(p.size) === String(size) &&
      (!selectedColor || String(p.color).toLowerCase().trim() === String(selectedColor).toLowerCase().trim())
    );

    if (matched) {
      setSelectedProduct(matched);
      setSelectedColor(matched.color);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);

    const matched = allItems.find(p =>
      p.group_code === groupCode &&
      String(p.color).toLowerCase().trim() === String(color).toLowerCase().trim() &&
      (!selectedSize || String(p.size) === String(selectedSize))
    );

    if (matched) {
      setSelectedProduct(matched);
      setSelectedSize(matched.size);
    }
  };

  useEffect(() => {
    setAllAvailableSizes?.(availableSizes);
    localStorage.setItem("availableSizes", JSON.stringify(availableSizes));
  }, [availableSizes]);

  return selectedProduct && (
    <div className="Info_page">
      <div className="cribe">
        <h2>{selectedProduct?.title?.[currentLanguage]}</h2>
        <span>
          {selectedProduct.price
            ?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ֏
        </span>
      </div>

      <div className="info">
        <div className="for_kids">
          <span className="size_1">{itemPageFields?.size_text_field}: {selectedSize}</span>
          <div className='size' ref={el => dropdownRefs.current[item.id] = el}>
            <Link>
              <span className="size_2" onClick={() => toggleDropdown(item?.id)} style={{ cursor: "pointer" }}>
                {itemPageFields?.size_text_field_2}
                <i className="fa-solid fa-angle-down"></i>
              </span>
            </Link>
            {openDropdown === item.id && (
              <div className="dropdown2">
                {availableSizes.map(size => (
                  <div
                    key={size}
                    className={`dropdown-item ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="color_section">
          <div className="heading_title">
            <span>{colorTranslation[currentLanguage]}</span>
          </div>
          <div className="colors">
            {availableColors.map((color, index) => (
              <div
                key={index}
                className={`color ${selectedColor === color ? "active" : ''}`}
                style={{ background: color }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
        </div>

        <div className="description_details">
          <h2>{itemPageFields?.descr_text_field}</h2>
          <p>{selectedProduct?.descr?.[currentLanguage]}</p>
          <div className="product_info">
            <p>{itemPageFields?.product_number_text_field}: <span>{selectedProduct?.product_number}</span></p>
            <p>{itemPageFields?.material_text_field} <span>{selectedProduct?.product_material?.[currentLanguage]}</span></p>
          </div>

          <div className="delivery">
            <Link to='/' onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>
              <img src="/images/info.svg" alt="info" />
              {itemPageFields?.about_delivery_text_field}
            </Link>
          </div>

          <div className="btn_div">
            <div className="add_to_bag" onClick={() => addToBasket(selectedProduct, selectedProduct?.id, selectedSize)}>
              <Link>{selectedProduct?.btn_text?.[currentLanguage]}</Link>
            </div>
            <div className="heart" onClick={() => handleHeartIcon(selectedProduct)}>
              {is_heart_icon ?
                <i className="fa-solid fa-heart"></i> :
                <i className="fa-regular fa-heart"></i>
              }
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ height: '515px' }}>
              <div className="modal-header" style={{ marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>
                  {infoAboutDeliverTitle[currentLanguage]}
                </h2>

                <button className="close-button" onClick={() => setIsModalOpen(false)}>
                  <img src="/images/icon.png" alt="xach" />
                </button>
              </div>

              <div className="modal-body">
                <div className="text_div">
                  <p>{infoAboutDelivery[currentLanguage]}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
