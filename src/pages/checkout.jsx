import React, { useEffect, useContext } from "react";

import CheckoutNavBar from "@components/CheckoutNavBar/CheckoutNavBar";
import CartItem from "@components/CartItem/CartItem";
import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";
import StripeApi from "@api/stripeApi";
import { getCurrencySymbol } from "@utils/currencyHelpers";

import "./checkout.scss";
import "@styles/main.scss";

/* We want this to persist across the shopping carts lifecycle (i.e. unmounts) as every time we
instantiate window.Stripe it creates another thread, and without this we would instantiate a thread
each time this component mounts */
let stripe;

const CheckoutPage = () => {
    const { itemsInCart, changeItemQuantity, removeItem } = useContext(ShoppingCartContext);
    const numItems = itemsInCart.reduce((total, { quantity }) => total + quantity, 0);
    const cartIsEmpty = numItems === 0;
    const totalPrice = itemsInCart.reduce((total, { price, quantity }) => total + price * quantity, 0);
    const currencySymbol = getCurrencySymbol("aud");
    const qualifiedTotalPrice = `${currencySymbol}${(totalPrice / 100).toFixed(2)}`;

    useEffect(() => {
        stripe =
            stripe ||
            window.Stripe(process.env.GATSBY_STRIPE_PUBLIC_KEY, {
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
                    <div className="items-content-container">
                        <div className="delivery-banner">Free delivery on all items</div>
                        <div className="header">
                            <h1>Shopping Cart</h1>
                        </div>
                        {!!itemsInCart.length && (
                            <ul className="shopping-cart-items">
                                {itemsInCart.map((item) => (
                                    <li className="shopping-cart-item" key={item.id}>
                                        <CartItem
                                            {...item}
                                            onQuantityChange={changeItemQuantity}
                                            onRemoveItem={removeItem}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="checkout-container">
                    <div className="checkout-content-container">

                        <div className="total-price">
                            <span>Total: </span>
                            <span>{qualifiedTotalPrice}</span>
                        </div>
                        <div className="number-items">
                            {numItems} {numItems === 1 ? "item" : "items"}
                        </div>
                        <button className="checkout-btn" onClick={redirectToCheckout} disabled={cartIsEmpty}>
                            Go To Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
