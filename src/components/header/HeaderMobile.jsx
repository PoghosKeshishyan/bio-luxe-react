import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export function HeaderMobile({ navbar, setIsMenuOpen, menuButtonRef }) {
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
        menuButtonRef.current && !menuButtonRef.current.contains(event.target);

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
        {navbar.map((item) => (
          <li key={item.id}>
            <Link
              to={item.route}
              onClick={(e) => {
                if (item.submenu) {
                  e.preventDefault();
                  handleTopLinkClick(item.id);
                } else {
                  setIsMenuOpen(false);
                }
              }}
              aria-expanded={openSubmenu === item.id}
              className="top_menu_link"
            >
              {item.title}
              {item.submenu.length > 0 && (
                <span
                  className={`arrow ${
                    openSubmenu === item.id ? "rotate" : ""
                  }`}
                >
                  ▼
                </span>
              )}
            </Link>

            {item.submenu && (
              <ul
                className={`mobile_submenu ${
                  openSubmenu === item.id ? "open" : ""
                }`}
              >
                {item.submenu.map((elem, index) => (
                  <li key={index}>
                    <Link
                      to={`${elem.route}`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setOpenSubmenu(null);
                      }}
                    >
                      {elem.title}
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