import React from "react";
import Layout from "@components/Layout/Layout";

import "./contact-us.scss";

const ContactUsPage = () => (
    <Layout>
        <div className="contact-us-page">
            <h1>Contact us</h1>
            <hr />
            <p>Contacting us is simple, just send us an email at <a href="mailto: pocketsfash@gmail.com">pocketsfash@gmail.com</a> and we will make sure to respond ASAP.</p>
        </div>
    </Layout>
);

export default ContactUsPage;
