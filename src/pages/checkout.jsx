import React, { useEffect, useContext } from "react";

import CheckoutNavBar from "@components/CheckoutNavBar/CheckoutNavBar";
import CartItem from "@components/CartItem/CartItem";
import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";
import StripeApi from "@api/stripeApi";

import "./checkout.scss";
import "@styles/main.scss";

/* We want this to persist across the shopping carts lifecycle (i.e. unmounts) as every time we
instantiate window.Stripe it creates another thread, and without this we would instantiate a thread
each time this component mounts */
let stripe;

const CheckoutPage = () => {
    const { itemsInCart, changeItemQuantity, removeItem } = useContext(ShoppingCartContext);
    const cartIsEmpty = itemsInCart.length === 0;

    useEffect(() => {
        stripe =
            stripe ||
            window.Stripe("pk_test_GMu2GHlqqnAFu9bWQwEYCkQG00Z3HIFFSj", {
                betas: ["checkout_beta_4"],
            });
    }, []);

    async function redirectToCheckout(event) {
        event.preventDefault();
        const itemsToCharge = itemsInCart.map(({ id: sku, quantity }) => ({ sku, quantity }));
        const skuIds = itemsToCharge.map(({ sku }) => sku);
        const quantities = itemsToCharge.reduce((quantities, item) => {
            return { ...quantities, [item.sku]: item.quantity };
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

    return (
        <div className="checkout-page">
            <CheckoutNavBar />
            <div className="content-container">
                <div className="items-container">
                    <div className="header">
                        <h1>Shopping Cart</h1>
                    </div>
                    {!!itemsInCart.length && (
                        <ul className="shopping-cart-items">
                            {itemsInCart.map((item) => (
                                <li className="shopping-cart-item" key={item.id}>
                                    <CartItem {...item} onQuantityChange={changeItemQuantity} onRemoveItem={removeItem}/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="checkout-container">
                    <button className="checkout-btn" onClick={redirectToCheckout} disabled={cartIsEmpty}>
                        Go To Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
