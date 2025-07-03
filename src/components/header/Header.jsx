import { HeaderLogo } from "./HeaderLogo";
import { HeaderNavBar } from "./HeaderNavBar";
import { HeaderActions } from "./HeaderActions";
import { HeaderMenuBars } from "./HeaderMenuBars";
import { HeaderMobile } from "./HeaderMobile";
import { useRef, useState } from "react";

export function Header({ logo, navbar, header_icons, languages }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null); 

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header>
      <div className="container">
        <div className="row">
          <HeaderLogo logo={logo} />
          <HeaderNavBar navbar={navbar} />
          <HeaderActions header_icons={header_icons} languages={languages} />
          <HeaderMenuBars
            toggleMenu={toggleMenu}
            isMenuOpen={isMenuOpen}
            menuButtonRef={menuButtonRef}
          />
        </div>

       {isMenuOpen && (
          <HeaderMobile
            navbar={navbar}
            setIsMenuOpen={setIsMenuOpen}
            menuButtonRef={menuButtonRef} 
          />
        )}
      </div>
    </header>
  );
}  