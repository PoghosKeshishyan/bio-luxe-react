import { useState, useEffect, useRef } from "react";
import { BACKEND_API_URL } from "../config";

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
        <div onClick={() => setIsOpen(!isOpen)}>
          {selectedLang && <img
            src={BACKEND_API_URL + currLang?.image}
            alt="Flag"
            className="flag-icon"
          />}
          <button className="dropdown-button">
            {languages.find((lang) => lang.lang === selectedLang)?.label || "Select"}
          </button>
        </div>
        {isOpen && (
          <ul className="dropdown-menu">
            {languages.map((item) => (
              <li key={item.id} onClick={() => changeLanguage(item.lang)}>
                <img src={BACKEND_API_URL + item.image} alt={item.label} className="flag-icon" />
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
