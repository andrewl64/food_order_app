import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (e) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === e.id);

            if(existingItem) {
                return prevItems.map(cartItem => cartItem.id === e.id ? { ...cartItem, count: cartItem.count+1 }: cartItem);
            } else {
                return [...prevItems, { ...e,count:1 }];
            }
        });
    }
    const updateCartItem = (item, action) => {
        setCartItems(prevItems => {
            return prevItems.map(cartItem => {
                if (cartItem.id === item.id) {
                    const newCount = action === '+' ? cartItem.count + 1 : cartItem.count - 1;
                    if (newCount > 0) {
                        return { ...cartItem, count: newCount };
                    } else {
                        return null;
                    }
                }
                return cartItem;
            }).filter(cartItem => cartItem !== null);
        });
    };

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.count * item.price, 0);
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ addToCart, updateCartItem, setCartItems, cartItems, cartTotal }}>
          {children}
        </CartContext.Provider>
      );

}