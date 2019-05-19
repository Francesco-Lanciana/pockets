import React, { useState } from "react";

const initialContext = {
    itemsInCart: [],
    onItemSelection: (_) => _,
};

const ShoppingCartContext = React.createContext(initialContext);

const ShoppingCartProvider = ({ children }) => {
    const [itemsInCart, setItemsInCart] = useState([]);

    /**
     * @callback quantityCallback
     * @param  {string} quantity - Current quantity of item in cart
     */

    /**
     * 
     * @param {string} id Id of SKU in cart
     * @param {quantityCallback} mutator A callback thatwhere the return
     */
    function modifyItemQuantInCart(id, mutator) {
        const modifiedCart = itemsInCart.map((itemInCart) => {
            if (itemInCart.id === id) {
                const newQuantity = mutator(itemInCart.quantity);
                const safeNewQuantity = newQuantity > 0 ? newQuantity : 0;
                return { ...itemInCart, quantity: safeNewQuantity };
            }
            else return { ...itemInCart };
        });

        return modifiedCart;
    }

    function createDeepCopy() {
        return itemsInCart.map((item) => ({ ...item }));
    }

    function isItemInCart(id) {
        return itemsInCart.some((item) => item.id === id);
    }

    function getItem(id) {
        const [item] = itemsInCart.filter((item) => item.id === id);
        
        return item;
    }

    function onItemSelection(action, item) {
        function addToCart(newItem) {
            let alreadyInCart = isItemInCart(newItem.id);
            const newCart = modifyItemQuantInCart(newItem.id, (quantity) => quantity + 1);

            if (!alreadyInCart) {
                return [ ...newCart, { ...newItem, quantity: 1 }];
            } else {
                return newCart;
            }
        }
        
        switch(action) {
            case 'add':
                setItemsInCart(addToCart(item));
                break;
            case 'remove':
                setItemsInCart(itemsInCart.filter((cartItem) => cartItem.id !== item.id));
                break;
            default:
                throw new Error('Invalid action attempted on items in shopping cart');
        }
    }

    function changeItemQuantity(id, mutator) {
        const item = getItem(id);
        if (!item) throw new Error("The item you are trying to change doesn't exist");

        const modifiedCart = modifyItemQuantInCart(id, mutator);
        setItemsInCart(modifiedCart);
    }

    function removeItem(id) {
        const filteredItems = itemsInCart.filter((item) => item.id !== id);

        setItemsInCart(filteredItems);
    }

    return (
        <ShoppingCartContext.Provider value={{ itemsInCart, onItemSelection, changeItemQuantity, removeItem }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;

export { ShoppingCartProvider };