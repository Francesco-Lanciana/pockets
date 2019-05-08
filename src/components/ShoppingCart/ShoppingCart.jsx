/**
 * TODO: Enable the checkout button once Stripe has been set up
 */

import React, { useEffect } from "react";
import Img from "gatsby-image";

import { getCurrencySymbol } from "@utils/currencyHelpers";
import ShoppingCartImage from "@images/shopping-cart-solid.svg";
import StripeApi from "@api/stripeApi";

import "./ShoppingCart.scss";

/* We want this to persist across the shopping carts lifecycle (i.e. unmounts) as every time we
instantiate window.Stripe it creates another thread, and without this we would instantiate a thread
each time this component mounts */
let stripe;

const ShoppingCart = ({ items }) => {
    const numItems = items.reduce((total, { quantity }) => total + quantity, 0);
    const totalPrice = items.reduce((total, { price, quantity }) => total + price * quantity, 0);
    const currencySymbol = getCurrencySymbol("aud");
    const qualifiedTotalPrice = `${currencySymbol}${(totalPrice / 100).toFixed(2)}`;
    const cartIsEmpty = items.length === 0;

    useEffect(() => {
        stripe =
            stripe ||
            window.Stripe("pk_test_GMu2GHlqqnAFu9bWQwEYCkQG00Z3HIFFSj", {
                betas: ["checkout_beta_4"],
            });
    }, []);

    async function redirectToCheckout(event) {
        event.preventDefault();
        const itemsToCharge = items.map(({ id: sku, quantity }) => ({ sku, quantity }));
        const skuIds = itemsToCharge.map(({ sku }) => sku);
        const quantities = itemsToCharge.reduce((quantities, item) => {
            return { ...quantities, [item.sku]: item.quantity }
        }, {});
        const [err, { session }] = await StripeApi.createSession(skuIds, quantities);

        if (err) {
            console.log("Error: ", err);
        }

        const { error } = await stripe.redirectToCheckout({
            //items: itemsToCharge,
            sessionId: session.id,
            // successUrl: `http://localhost:8000/page-2/`,
            // cancelUrl: `http://localhost:8000/`,
        });

        if (error) {
            console.warn("Error:", error);
        }
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
                                    <span className="item-price">{`${currencySymbol}${(
                                        item.price / 100
                                    ).toFixed(2)}`}</span>
                                    <span className="item-quantity">Quantity: {item.quantity}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cartIsEmpty && <div className="empty-cart-message">You cart is currently empty</div>}

            <button className="checkout-btn" onClick={redirectToCheckout} disabled={cartIsEmpty}>
                Checkout
            </button>
        </div>
    );
};

export default ShoppingCart;
