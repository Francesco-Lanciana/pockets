import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "@components/Layout/Layout";
import SEO from "../components/seo";
import ItemCard from "@components/ItemCard/ItemCard";

import { getCurrencySymbol } from "@utils/currencyHelpers";

import logo from "@images/logo.png";

import "./index.scss";

function getQualifiedPrice(currency, price) {
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = `${currency} ${currencySymbol}${price}`;

    return qualifiedPrice;
}

const IndexPage = ({ data }) => {
    return (
        <Layout>
            <div className="list-page">
                <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

                <main className="clothing-cards">
                    {data.allStripeSku.edges.map(({ node: sku }) => (
                        <div className="clothing-card" key={sku.product.id}>
                            <Link to={`/clothing/${sku.product.id}`} className="item-link">
                                <div
                                    className="clothing-image-container"
                                    data-cropped-bottom={sku.product.metadata.cropped === "bottom"}
                                    data-cropped-top={sku.product.metadata.cropped === "top"}
                                >
                                    <Img
                                        sizes={{ ...sku.product.localFiles[0].childImageSharp.fluid, aspectRatio: 4 / 5 }}
                                        fluid={sku.product.localFiles[0].childImageSharp.fluid}
                                        imgStyle={{ objectFit: "contain" }}
                                        className="clothing-image"
                                    />
                                </div>
                                <div className="clothing-details">
                                    <div className="clothing-name">{sku.product.name}</div>
                                    <div className="clothing-price">
                                        {getQualifiedPrice(sku.currency, sku.price)}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </main>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query {
        allStripeSku {
            edges {
                node {
                    price
                    currency
                    inventory {
                        type
                    }
                    product {
                        name
                        type
                        id
                        description
                        metadata {
                            croppedBottom
                        }
                        localFiles {
                            childImageSharp {
                                fluid(maxWidth: 320, maxHeight: 480) {
                                    ...GatsbyImageSharpFluid_tracedSVG
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default IndexPage;
