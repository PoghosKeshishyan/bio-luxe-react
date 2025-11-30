import { useContext } from "react";
import { SelectLanguage } from "../SelectLanguage";
import { CartContext } from "../../contexts/CartContext";
import { HeartContext } from "../../contexts/HeartContext";
import { SearchContext } from "../../contexts/SearchContext";

export function HeaderActions({ header_icons, languages }) {
  const { basketMenu, basketMenuOpen, basketIconRef, amountOrders } = useContext(CartContext);
  const { heartMenu, heartMenuOpen, heartIconRef, favoritesList } = useContext(HeartContext);
  const { searchIconRef, handleSearchBar } = useContext(SearchContext);

  return (
    <div className="actions">
      <div className="icons">
        <img
          src={header_icons.search_icon}
          alt="search"
          onClick={handleSearchBar}
          ref={searchIconRef}
        />

        <div className="basket-div">
          {<img
            ref={heartIconRef}
            src={header_icons.heart_icon}
            alt="heart"
            onClick={heartMenu}
          />}
       { !!favoritesList.length && <p className="basketAmount">{favoritesList.length}</p>}
        </div>

        <div className="basket-div">
          <img
            ref={basketIconRef}
            src={header_icons.cart_icon}
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
