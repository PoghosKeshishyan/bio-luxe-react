import { Slider } from './Slider';
import { Info } from './Info';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { PopularSlider } from './PopularSlider';


import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { HeartContext } from '../../contexts/HeartContext';



export function Item({ itemLink, item, itemPageFields, popularPlider, linkProductHeading, infoAboutDelivery }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  const { addToBasket } = useContext(CartContext);
  const { handleHeartIcon } = useContext(HeartContext);



  return (
    <div className='item_page'>
      <div className='link_div'>
        <Link to="/" className='main'> {itemLink.item} </Link> /
        <Link to="/" onClick={handleClick} className='cribs'>{itemLink.catalog}</Link>
      </div>
      <div className='item_container'>
        <div className='item'>
          <Slider item={item} />
          <Info item={item} itemPageFields={itemPageFields} infoAboutDelivery={infoAboutDelivery} />
        </div>
        <div className='popular_sliter_container     section'>
          <PopularSlider popularPlider={popularPlider} linkProductHeading={linkProductHeading} 
          item={item}
          addToBasket={addToBasket}
          handleHeartIcon={handleHeartIcon}
           />
        </div>
      </div>


    </div>
  )
}
