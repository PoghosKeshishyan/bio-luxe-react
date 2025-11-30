import { createContext, useEffect, useRef, useState } from "react";
export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);

    const searchSidebarRef = useRef(null);
    const searchIconRef = useRef(null);

    useEffect(() => {
        const handleClickOutsideHeart = (event) => {
            if (
                searchSidebarRef.current && !searchSidebarRef.current.contains(event.target) &&
                searchIconRef.current && !searchIconRef.current.contains(event.target) 
            ) {
                setIsOpenSearchBar(false);
            }
        };

        if (isOpenSearchBar) {
            document.addEventListener("mousedown", handleClickOutsideHeart);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideHeart);
        };
    }, [isOpenSearchBar]);

    const handleSearchBar = () => {
        setIsOpenSearchBar(!isOpenSearchBar);
    }

    return (
        <SearchContext.Provider value={{ isOpenSearchBar, handleSearchBar, searchSidebarRef, searchIconRef }}>
            {children}
        </SearchContext.Provider>
    )
}