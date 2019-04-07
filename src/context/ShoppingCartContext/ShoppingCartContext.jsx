import React, { useState } from "react";

const initialContext = {
    itemsInCart: [],
    onItemSelection: (_) => _,
};

const ShoppingCartContext = React.createContext(initialContext);

const ShoppingCartProvider = ({ children }) => {
    const [itemsInCart, setItemsInCart] = useState([]);

    function onItemSelection(action, item) {
        function addToCart(itemsInCart, newItem) {
            let alreadyInCart = false;

            const uniqueItems = itemsInCart.map((itemInCart) => {
                if (itemInCart.id === newItem.id) {
                    alreadyInCart = true;
                    return { ...itemInCart, quantity: itemInCart.quantity + 1 };
                }
                else return { ...itemInCart };
            });

            if (!alreadyInCart) {
                return [ ...uniqueItems, { ...newItem, quantity: 1 }];
            } else {
                return uniqueItems;
            }
        }
        
        switch(action) {
            case 'add':
                setItemsInCart(addToCart(itemsInCart, item));
                break;
            case 'remove':
                setItemsInCart(itemsInCart.filter((cartItem) => cartItem.id !== item.id));
                break;
            default:
                throw new Error('Invalid action attempted on items in shopping cart');
        }
    }

    return (
        <ShoppingCartContext.Provider value={{ itemsInCart, onItemSelection }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;

export { ShoppingCartProvider };