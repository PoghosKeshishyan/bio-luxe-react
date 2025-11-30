import { useState, useEffect, useRef } from "react";

export function SelectLanguage({ languages }) {
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem("lang") || "en");
  const [isOpen, setIsOpen] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("lang", selectedLang);
    window.addEventListener('mousedown', clickApp);
  }, [selectedLang]);

  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    window.location.reload();
  };

  const clickApp = (e) => {
    if (!appRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }

  const currLang = languages.find((lang) => lang.lang === selectedLang);

  return (
    <div className="container" ref={appRef}>
      <div className="dropdown-container">
        <div className="lang_div" onClick={() => setIsOpen(!isOpen)}>
          <div className="flag_div">
            {selectedLang && <img
              src={currLang?.image}
              alt="Flag"
              className="flag-icon"
            />}
          </div>

          <button className="dropdown-button">
            {languages.find((lang) => lang.lang === selectedLang)?.label || "Select"}
          </button>
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            {languages.map(item => (
              <li key={item.id} onClick={() => changeLanguage(item.lang)}>
                <img src={item.image} alt={item.label} className="flag-icon"/>
                <p>{item.label}</p>
                </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
