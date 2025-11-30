import { createContext, useEffect, useRef, useState } from "react";
export const HeartContext = createContext();

export function HeartProvider({ children }) {
    const [heartMenuOpen, setHeartMenuOpen] = useState(false);

    const [favoritesList, setFavoritesList] = useState(() => {
        const storedFavoritesList = localStorage.getItem('favoritesList');
        return storedFavoritesList ? JSON.parse(storedFavoritesList) : [];
    });

    const heartSidebarRef = useRef(null);
    const heartIconRef = useRef(null); 

    useEffect(() => {
        localStorage.setItem('favoritesList', JSON.stringify(favoritesList));
    }, [favoritesList])

    useEffect(() => {
        const handleClickOutsideHeart = (event) => {
            if (
                heartSidebarRef.current && !heartSidebarRef.current.contains(event.target) &&
                heartIconRef.current && !heartIconRef.current.contains(event.target)
            ) {
                setHeartMenuOpen(false);
            }
        };

        if (heartMenuOpen) {
            document.addEventListener("mousedown", handleClickOutsideHeart);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideHeart);
        };
    }, [heartMenuOpen]);

    const heartMenu = () => {
        setHeartMenuOpen(!heartMenuOpen);
    };

    const handleHeartIcon = async (item) => {
        const existingItem = favoritesList.find(elem => elem.id === item.id);

        if (existingItem) {
            const newFavoritesList = favoritesList.filter(elem => elem.id !== item.id);
            setFavoritesList(newFavoritesList);
        } else {
            setFavoritesList([...favoritesList, item]);
        }
    };

    const removeIsFavoritesList = (item) => {
        const newFavoritesList = favoritesList.filter(elem => elem.id !== item.id);
        setFavoritesList(newFavoritesList);
    }

    return (
        <HeartContext.Provider value={{
            heartMenuOpen,
            heartMenu,
            handleHeartIcon,
            heartSidebarRef,
            heartIconRef, 
            favoritesList,
            removeIsFavoritesList
        }}>
            {children}
        </HeartContext.Provider>
    )
}
