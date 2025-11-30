import { createContext, useEffect, useRef, useState } from "react";
export const CartContext = createContext();

export function CartProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const storedOrders = localStorage.getItem('orders');
        return storedOrders ? JSON.parse(storedOrders) : [];
    });

    const [amountOrders, setAmount] = useState(0);

    const [basketMenuOpen, setBasketMenuOpen] = useState(false);
    const basketSidebarRef = useRef(null);
    const basketIconRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));

        const amount = orders.reduce((acc, elem) => acc += elem.quantity, 0);
        setAmount(amount);
    }, [orders]);

    useEffect(() => {
        const handleClickOutsideBasket = (event) => {
            if (
                basketSidebarRef.current &&
                !basketSidebarRef.current.contains(event.target) &&
                basketIconRef.current &&
                !basketIconRef.current.contains(event.target)
            ) {
                setBasketMenuOpen(false);
            }
        };

        if (basketMenuOpen) {
            document.addEventListener("mousedown", handleClickOutsideBasket);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideBasket);
        };
    }, [basketMenuOpen]);

    const basketMenu = () => {
        setBasketMenuOpen(!basketMenuOpen);
    };

    const changeSizeProductFromBasket = (id, selectedSize) => {
        const newCart = orders.map(item => {
            if (item.id === id) {
                item.selectedSize = selectedSize;
            }

            return item;
        });

        setOrders(newCart)
    };

    const addToBasket = (product, id, selectedSize) => {
        const existingItem = orders.find(item => item.id === id);

        if (existingItem) {
            const newCart = orders.map(item => {
                if (item.id === id) {
                    item.quantity = item.quantity + 1;
                }

                if (selectedSize) {
                    item.selectedSize = selectedSize;
                }

                return item;
            });

            setOrders(newCart);
        } else {

            const newCart = {
                ...product,
                quantity: 1,
                selectedSize: selectedSize ? selectedSize : product.size,
            };

            setOrders([...orders, newCart]);

        }
    };

    const removeFromCart = (id) => {
        const newCart = orders.filter(item => item.id !== id);
        setOrders(newCart);
    };

    const plus = (id) => {
        const item = orders.find(item => item.id === id);
        addToBasket(item, id);
    };

    const minus = (id) => {
        const item = orders.find(item => item.id === id);

        if (item.quantity - 1 === 0) {
            return removeFromCart(id);
        }

        const newCart = orders.map(item => {
            if (item.id === id) {
                item.quantity = item.quantity - 1;
            }

            return item;
        });

        setOrders(newCart);
    };

    const clearCart = () => {
         setOrders([])
    };

    return (
        <CartContext.Provider value={{
            orders,
            basketMenuOpen,
            setBasketMenuOpen,
            plus,
            minus,
            changeSizeProductFromBasket,
            basketMenu,
            basketSidebarRef,
            basketIconRef,
            addToBasket,
            removeFromCart,
            amountOrders,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
}
