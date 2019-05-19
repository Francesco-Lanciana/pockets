/**
 * TODO: Enable the checkout button once Stripe has been set up
 */

import React, { useContext } from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";

import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";
import { getCurrencySymbol } from "@utils/currencyHelpers";
import ShoppingCartImage from "@images/shopping-cart-solid.svg";

import "./ShoppingCart.scss";

const ShoppingCart = ({ items }) => {
    const { changeItemQuantity } = useContext(ShoppingCartContext);
    const numItems = items.reduce((total, { quantity }) => total + quantity, 0);
    const totalPrice = items.reduce((total, { price, quantity }) => total + price * quantity, 0);
    const currencySymbol = getCurrencySymbol("aud");
    const qualifiedTotalPrice = `${currencySymbol}${(totalPrice / 100).toFixed(2)}`;
    const cartIsEmpty = items.length === 0;

    function handleQuantityChange(id, add) {
        if (add) changeItemQuantity(id, (quantity) => quantity + 1);
        if (!add) changeItemQuantity(id, (quantity) => quantity - 1);
    }

    /* I am not proud of the num-items thing... The min of 1 is to cope with the empty message that
    is shown and the max of 4.5 is to cope with the list only growing to accomodate 4.5 items before
    requiring that you scroll */
    return (
        <div className="shopping-cart">
            <div className="shopping-cart-header">
                <div className="shopping-cart-icon-container">
                    <ShoppingCartImage />
                </div>
                <span className="shopping-cart-badge">{numItems}</span>
                <div className="shopping-cart-total">
                    <span className="lighter-text">Total: </span>
                    <span className="main-color-text">{qualifiedTotalPrice}</span>
                </div>
            </div>

            {!!items.length && (
                <ul className="shopping-cart-items">
                    {items.map((item) => (
                        <li className="shopping-cart-item" key={item.id}>
                            <div className="clothing-image-container">
                                <Img
                                    sizes={{ ...item.image.childImageSharp.fluid }}
                                    fluid={item.image.childImageSharp.fluid}
                                    imgStyle={{ objectFit: "contain" }}
                                    className="clothing-image"
                                />
                            </div>
                            <div className="shopping-cart-item-details">
                                <div className="item-name">{`${item.name} - ${item.size}`}</div>
                                <div className="shopping-cart-item-meta-details">
                                    <span className="item-price">{`${currencySymbol}${(
                                        item.price / 100
                                    ).toFixed(2)}`}</span>
                                    <div className="quantity-changer" data-quantity={item.quantity}>
                                        <button className="quantity-change-btn minus" onClick={() => handleQuantityChange(item.id, false)}></button>
                                        <span className="quantity">{item.quantity}</span>
                                        <button className="quantity-change-btn plus" onClick={() => handleQuantityChange(item.id, true)}></button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cartIsEmpty && <div className="empty-cart-message">You cart is currently empty</div>}

            <Link to={`/checkout`} className="checkout-link" onClick={() => { document.body.style.overflow = "visible" }}>
                Go To Checkout
            </Link>
        </div>
    );
};

export default ShoppingCart;
