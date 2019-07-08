import React from "react";
import Layout from "@components/Layout/Layout";

import "./index.scss";

const AboutPage = () => (
    <Layout>
        <div className="about-page">
            <h1>Pockets: The Story</h1>
            <hr />
            <p>
                For years and years my wife, Beck, has suffered trying to find clothes with pockets. We
                waited, expecting someone to see this giant gap in the market and fix this problem for
                us... but help never came. So we decided to take it into our own hands and make the
                solution, which we aptly named Pockets. We know if you have landed here that this isn't a
                problem you need explained, so we will tell you our plan to fix it instead.
            </p>
            <div className="versions">
                <p>
                    <strong>V1</strong> - We will source clothes from every provider we can find, ordering
                    every item ourselves before putting it online so you can have confidence in the items
                    you are getting.
                </p>
                <p>
                    <strong>V2</strong> - If things pick up we will take all of your feedback and start
                    making our own clothes with pockets front and center in our minds when designing.
                </p>
                <p>
                    <strong>V3</strong> - Expand into more areas and bring prices steadily down
                </p>
            </div>

            <p>
                If you have a fashion label or even just an idea for a new clothing item please contact us,
                we want your products shared with the world.
            </p>
        </div>
    </Layout>
);

export default AboutPage;
