import { Slider } from './Slider';
import { Info } from './Info';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PopularSlider } from './PopularSlider';
import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { HeartContext } from '../../contexts/HeartContext';

export function Item({ setAllAvailableSizes, allItems, productChange, setProductChange, currentLanguage, itemLink, item, itemPageFields, popularPlider, linkProductHeading, infoAboutDelivery, itemFaqHeading, itemFaq }) {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  const { addToBasket } = useContext(CartContext);
  const { handleHeartIcon } = useContext(HeartContext);
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='item_page'>
      <div className='link_div'>
        <Link to="/" className='main'> {itemLink.item} </Link> /
        <Link to="/" onClick={handleClick} className='main'>{itemLink.catalog}</Link> /
        <Link to="" className='cribs'>{itemLink.cribs}</Link>

      </div>
      <div className='item_container'>
        <div className='item'>
          <Slider item={item} productChange={productChange} />
          <Info setAllAvailableSizes={setAllAvailableSizes} allItems={allItems} productChange={productChange} setProductChange={setProductChange} item={item} currentLanguage={currentLanguage} itemPageFields={itemPageFields} infoAboutDelivery={infoAboutDelivery} />
        </div>
        <div className='popular_sliter_container     section'>
          <PopularSlider popularPlider={popularPlider} linkProductHeading={linkProductHeading}
            item={item}
            addToBasket={addToBasket}
            handleHeartIcon={handleHeartIcon}
          />
        </div>
      </div>

      <div className='faq_container container'>
        <div className="faq-section">
          <div className='heading'>
            <h2 className="faq-title">{itemFaqHeading?.heading}</h2>
            <div className='line'></div>
          </div>

          <div className="faq-list">
            {itemFaq?.map((faq, index) => (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`faq-item ${openIndex === index ? "open" : ""}`}
              >
                <div className="faq-header">
                  <span className="faq-question">{faq?.question}</span>
                  <span className="faq-icon">
                    {openIndex === index ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="faq-answer">
                    <p>{faq?.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}
