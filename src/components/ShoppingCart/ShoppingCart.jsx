/**
 * A navigation component that dissapears while the user is read an article (i.e. is
 * scrolling down the page)
 * Related issues: https://github.com/zeit/next.js/issues/796
 */

import React from "react";
import Img from "gatsby-image";
import { Link } from "gatsby";

import { getCurrencySymbol } from "@utils/currencyHelpers";

import ShoppingCartImage from "@images/shopping-cart-solid.svg";

import "./ShoppingCart.scss";

const ShoppingCart = ({ items }) => {
    const numItems = items.reduce((total, { quantity }) => total + quantity, 0);
    const totalPrice = items.reduce((total, { price, quantity }) => total + price * quantity, 0);
    const currencySymbol = getCurrencySymbol("aud");
    const qualifiedTotalPrice = `${currencySymbol}${totalPrice / 100}`;

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

            <ul className="shopping-cart-items">
                {items.map((item) => (
                    <li className="shopping-cart-item">
                        <div className="clothing-image-container">
                            <Img
                                sizes={{ ...item.image.childImageSharp.fluid }}
                                fluid={item.image.childImageSharp.fluid}
                                imgStyle={{ objectFit: "contain" }}
                                className="clothing-image"
                            />
                        </div>
                        <div className="shopping-cart-item-details">
                            <div className="item-name">{item.name}</div>
                            <div className="shopping-cart-item-meta-details">
                                <span className="item-price">{`${currencySymbol}${item.price /
                                    100}`}</span>
                                <span className="item-quantity">Quantity: {item.quantity}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Link to="/checkout" className="checkout-btn">
                Checkout
            </Link>
        </div>
    );
};

export default ShoppingCart;
