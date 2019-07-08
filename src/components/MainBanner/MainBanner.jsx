import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import "./MainBanner.scss";

const MainBanner = () => {
    const { stripeProduct } = useStaticQuery(graphql`
        query {
            stripeProduct(id: { eq: "prod_F2g6QfqXiy1Iqm" }) {
                localFiles {
                    childImageSharp {
                        fixed(height: 300) {
                            ...GatsbyImageSharpFixed_noBase64
                        }
                    }
                }
            }
        }
    `);

    return (
        <div className="main-banner">
            <section className="mission-statement">
                <div className="primary">
                    <div className="background"></div>
                    <h1 className="text">Women have put up with ridiculous pockets for too long!</h1>
                    <figure className="main-image">
                        <Img fixed={stripeProduct.localFiles[3].childImageSharp.fixed} />
                    </figure>
                </div>
                <h2 className="secondary">
                    We want to finally give you a collection of high quality clothing with pockets to match.
                </h2>
            </section>

        </div>
    );
};

export default MainBanner;
