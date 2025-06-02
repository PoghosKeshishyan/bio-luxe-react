import { useContext, useRef } from "react";
import { SelectLanguage } from "../SelectLanguage";
import { CartContext } from "../../contexts/CartContext";
import { HeartContext } from "../../contexts/HeartContext";
import { SearchContext } from "../../contexts/SearchContext";
import { BACKEND_API_URL } from "../../config";

export function HeaderActions({ header_icons, languages }) {
  const { basketMenu, basketMenuOpen, basketIconRef } = useContext(CartContext);
  const { heartMenu, heartMenuOpen, heartIconRef } = useContext(HeartContext); 
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

        <img
          ref={heartIconRef} 
          src={heartMenuOpen ? "./Black_heart.svg" : "./heart.svg"}
          alt="heart"
          onClick={heartMenu}
        />

        <img
          ref={basketIconRef}
          src={basketMenuOpen ? "./Black_bag.svg" : "./bag.svg"}
          alt="cart"
          onClick={basketMenu}
        />
      </div>

      <SelectLanguage languages={languages} />
    </div>
  );
}
