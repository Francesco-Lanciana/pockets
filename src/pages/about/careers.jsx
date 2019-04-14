import React from "react";
import Layout from "@components/Layout/Layout";

import "./careers.scss";

const CareersPage = () => (
    <Layout>
        <div className="careers-page">
            <h1 className="hook">Help us bring womens fashion into the <div className="focus">21st century</div></h1>
            <p>
                We want to finally make a marketplace for womens clothing that caters to the woman that
                craves functional, affordable clothing that is exactly what it says it's going to be. No
                more fake pockets, no more size 6's disguised as size 10's, and no more clothes that start
                falling apart after 3 washes. If this resonates with you please email us at{" "}
                <a href="mailto: pocketsfash@gmail.com">pocketsfash@gmail.com</a>. We are always looking
                for partners with talent and drive.
            </p>
        </div>
    </Layout>
);

export default CareersPage;
