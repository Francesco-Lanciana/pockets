import React from "react";
import Layout from "@components/Layout/Layout";

import "./cancel.scss";

const PurchaseCancelPage = () => (
    <Layout>
        <div className="purchase-cancel-page">
            <h1>Let us know what we can do</h1>
            <p>
                We are sorry something caused you not to go through with the purchase. If there
                is anything we can do to correct that, or if you are just after some more information
                before purchasing than please contact us at <a href="mailto: pocketsfash@gmail.com">pocketsfash@gmail.com</a>.
                Your shopping cart won't forget your items for some time so you can always pick back up
                where you left off.
            </p>
        </div>
    </Layout>
);

export default PurchaseCancelPage;
