import React, { useReducer, useEffect } from "react";
import { addToLocalStorage, retrieveFromLocalStorage } from "@utils/localStorageHelpers";

const initialContext = {
    itemsInCart: [],
    modifyCart: (_) => _,
    changeItemQuantity: (_) => _,
    removeItem: (_) => _,
};

const ShoppingCartContext = React.createContext(initialContext);

function cartReducer(state, action) {
    const { type, payload } = action;
    const cart = createDeepCopy(state.cart);

    switch (type) {
        case "add":
            return { cart: addItemToCart(cart, payload) };
        case "remove":
            return { cart: removeItemFromCart(cart, payload) };
        case "quantity": {
            const item = getItem(cart, payload.id);
            const updatedItem = modifyItemQuantity(item, payload.mutator);

            return { cart: updateItemInCart(cart, updatedItem) };
        }
        case "hydrate": {
            return { cart: payload };
        }
        default:
            throw new Error("Invalid action attempted on items in shopping cart");
    }
}

function addItemToCart(cart, item) {
    const itemInCart = getItem(cart, item.id);
    let modifiedCart;

    if (!itemInCart) {
        const newItem = { ...item, quantity: 1 };
        modifiedCart = [...cart, newItem];
    } else {
        const updatedItem = modifyItemQuantity(item, (quantity) => quantity + 1);
        modifiedCart = updateItemInCart(cart, updatedItem);
    }

    return modifiedCart;
}

function removeItemFromCart(cart, id) {
    const filteredCart = cart.filter((item) => item.id !== id);

    return filteredCart;
}

function updateItemInCart(cart, item) {
    const modifiedCart = cart.map((itemInCart) => {
        if (itemInCart.id === item.id) return item;
        else return itemInCart;
    });

    return modifiedCart;
}

function getItem(cart, id) {
    const [item] = cart.filter((item) => item.id === id);

    return item;
}

function modifyItemQuantity(item, mutator) {
    const newQuantity = mutator(item.quantity);
    const safeNewQuantity = newQuantity > 0 ? newQuantity : 0;
    const modifiedItem = { ...item, quantity: safeNewQuantity };

    return modifiedItem;
}

function createDeepCopy(cart) {
    return cart.map((item) => ({ ...item }));
}

const ShoppingCartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cart: [] });
    const changeItemQuantity = (id, mutator) => dispatch({ type: "quantity", payload: { id, mutator } });
    const removeItem = (id) => dispatch({ type: "remove", payload: id });

    function hydrateStateWithLocalStorage() {
        const cart = retrieveFromLocalStorage("cart");

        if (cart) dispatch({ type: "hydrate", payload: cart });
    }

    useEffect(() => {
        hydrateStateWithLocalStorage();
    }, []);

    useEffect(() => {
        function saveStateToLocalStorage() {
            addToLocalStorage("cart", state.cart);
        }

        window.addEventListener("beforeunload", saveStateToLocalStorage);

        return () => {
            window.removeEventListener("beforeunload", saveStateToLocalStorage);
        }
    }, [state.cart]);

    return (
        <ShoppingCartContext.Provider
            value={{ itemsInCart: state.cart, modifyCart: dispatch, changeItemQuantity, removeItem }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartContext;

export { ShoppingCartProvider };
