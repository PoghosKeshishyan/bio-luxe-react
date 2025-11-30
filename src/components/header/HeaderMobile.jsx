import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export function HeaderMobile({ navbar = [], setIsMenuOpen, menuButtonRef }) {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
      setOpenSubmenu(null);
    };

    const handleClickOutside = (event) => {
      const clickedOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(event.target);
      const clickedOutsideMenuButton =
        menuButtonRef?.current && !menuButtonRef.current.contains(event.target);

      if (clickedOutsideDropdown && clickedOutsideMenuButton) {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpen, menuButtonRef]);

  const handleTopLinkClick = (itemId) => {
    setOpenSubmenu((prev) => (prev === itemId ? null : itemId));
  };

  
  return (
    <div className="mobile_nav_dropdown" ref={dropdownRef}>
      <ul>
        {navbar?.map((item, i) => (
          <li key={item.id}>
            <Link
              to={item.route || "#"}
              onClick={() => {
                if (item.submenus?.length > 0) {
                  handleTopLinkClick(item.id);

                  if (i !== 0) {
                    setIsMenuOpen(false);
                    setOpenSubmenu(false);
                  }
                } else {
                  setIsMenuOpen(false);
                }
              }}
              aria-expanded={openSubmenu === item.id}
              className="top_menu_link"
            >
              {item.title || "Untitled"}
              {item.submenus?.length > 0 && (
                <span className={`arrow ${openSubmenu === item.id ? "rotate" : ""}`}>
                  ▼
                </span>
              )}
            </Link>

            {item.submenus?.length > 0 && (
              <ul className={`mobile_submenu ${openSubmenu === item.id ? "open" : ""}`}>
                {item.submenus.map((elem, index) => (
                  <li key={index}>
                    <Link
                      to={elem.route || "#"}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenSubmenu(null);
                      }}
                    >
                      {elem.title || "Untitled"}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
