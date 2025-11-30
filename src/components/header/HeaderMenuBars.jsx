export function HeaderMenuBars({ toggleMenu, isMenuOpen, menuButtonRef }) {
  
  return (
    <div className="bars_menu" ref={menuButtonRef} onClick={toggleMenu}>
      <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
    </div>
  );
}