import React from "react";
import { Link } from "gatsby";
import Layout from "@components/Layout/Layout";

import "./shipping.scss";

const ShippingPage = () => (
    <Layout>
        <div className="shipping-page">
            <h1>General Shipping Policies</h1>
            <hr />

            <h2>SHIPPING COSTS</h2>
            <p>Shipping is FREE worldwide!</p>
            <p>Estimated delivery times are based on the geographical location and vary from 5-7 business days in the USA, Canada, and 15-20 business days for the rest of the world. We know this is slow, rest assured we are constantly aiming to improve these times.</p>
            <p>Pockets is not liable for any customs duties, import duties, quotas or permits, product restrictions and other local requirements. The customer or recipient of the package is required to pay at time of delivery.</p>

            <h2>MISHANDLING</h2>
            <p>Pockets is not liable if your package is mishandled, lost or damaged by the shipping company. If your package is late, please email us at <a href="mailto: pocketsfash@gmail.com">pocketsfash@gmail.com</a>, and we will try to communicate with the shipping company. Please wait up to 14 days during the holiday season for your package to arrive. Unfortunately, we can not refund or send you another item at this time, if the shipping company has lost or damaged the item. We are truly sorry for any inconveniences. Please check our <Link to="/about/returns">Return Policy Page</Link> for questions regarding returns and exchanges.</p>
        </div>
    </Layout>
);

export default ShippingPage;
