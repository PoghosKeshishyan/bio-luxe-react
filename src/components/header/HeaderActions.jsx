import { useContext } from "react";
import { SelectLanguage } from "../SelectLanguage";
import { CartContext } from "../../contexts/CartContext";
import { HeartContext } from "../../contexts/HeartContext";
import { SearchContext } from "../../contexts/SearchContext";
import { BACKEND_API_URL } from "../../config";

export function HeaderActions({ header_icons, languages }) {
  const { basketMenu, basketMenuOpen, basketIconRef, amountOrders } = useContext(CartContext);
  const { heartMenu, heartMenuOpen, heartIconRef, favoritesList } = useContext(HeartContext);
  const { searchIconRef, handleSearchBar } = useContext(SearchContext);

  return (
    <div className="actions">
      <div className="icons">
        <img
          src={BACKEND_API_URL + header_icons.search_icon}
          alt="search"
          onClick={handleSearchBar}
          ref={searchIconRef}
        />

        <div className="basket-div">
          {<img
            ref={heartIconRef}
            src={heartMenuOpen ? BACKEND_API_URL + header_icons.heart_icon?.split('-')[1] : BACKEND_API_URL + header_icons.heart_icon?.split('-')[0]}
            alt="heart"
            onClick={heartMenu}
          />}
       { !!favoritesList.length && <p className="basketAmount">{favoritesList.length}</p>}
        </div>

        <div className="basket-div">
          <img
            ref={basketIconRef}
            src={basketMenuOpen ? BACKEND_API_URL + header_icons.cart_icon?.split('-')[1] : BACKEND_API_URL + header_icons.cart_icon?.split('-')[0]}
            alt="cart"
            onClick={basketMenu}
          />
          { !!amountOrders && <p className="basketAmount">{amountOrders}</p>}
        </div>
      </div>

      <SelectLanguage languages={languages} />
    </div>
  );
}
