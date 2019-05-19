import React from "react";
import Layout from "@components/Layout/Layout";

import "./returns.scss";

const ReturnsPage = () => (
    <Layout>
        <div className="returns-page">
            <h1>Returns Policies</h1>
            <h3>The policy</h3>
            <p>
                You can return any item that is not on sale (and most that are on sale) 
                within 20 days of purchase if the item:
            </p>
            <ul>
                <li>Is unused</li>
                <li>Has the original tags still attached</li>
                <li>Is in the original packaging (which must be in the original condition)</li>
            </ul>
            <p>
                Some of our suppliers do not accept returns on items which are on sale. Don't worry
                though, we will alert you before we let you hand over your hard earned cash if this is the case.
                As for the cost of returns, most items will cost you nothing to return, however some
                suppliers will not front the return fee. Again, we will warn you if any items in your
                cart don't come with the return shipping included!
            </p>
            <h3>How do I return</h3>
            <p>
                First you will need a shovel, a coconut, and a 3 by 3m chunk of an old old wooden ship...
                Ok you don't actually need those things but it would so cool if you did. All you actually
                need to do is login, go to your orders, click the refund button on the offending item and
                fill out the details. Once you have submitted we will send you an email with the return label.
                Print off the label and stick it on the items packaging or a similar satchel. Then drop it off
                at your Post Office, or a red post box and you're done! If you don't have an account just send
                us an email with your name and the item number, and we can send you the label.
            </p>
        </div>
    </Layout>
);

export default ReturnsPage;
