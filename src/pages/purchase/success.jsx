import React, { useEffect, useContext } from "react";
import Layout from "@components/Layout/Layout";
import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";

import "./success.scss";

const PurchaseSuccessPage = () => {
    const { modifyCart } = useContext(ShoppingCartContext);

    // They have purchased what is in their cart so there isn't any point remembering it
    useEffect(() => {
        modifyCart({ type: "empty"});
    }, []);

    return (
        <Layout>
            <div className="purchase-success-page">
                <h1>Thanks so much for your purchase!</h1>
                <p>
                    We are still a very young company so your purchase really means a lot to us.
                    As soon as your payment is recieved we will send everything through. In the meantime
                    if you have any questions or concerns at all please email us at <a href="mailto: pocketsfash@gmail.com">pocketsfash@gmail.com</a>.
                </p>
            </div>
        </Layout>
    );
};

export default PurchaseSuccessPage;
