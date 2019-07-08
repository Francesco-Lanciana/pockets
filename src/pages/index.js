import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import SEO from "../components/seo";
import Layout from "@components/Layout/Layout";
import PriceDisplay from "@components/PriceDisplay/PriceDisplay";
import MainBanner from "@components/MainBanner/MainBanner";

import "./index.scss";

const IndexPage = ({ data, location }) => {
    const products = data.allStripeProduct.edges.map(({ node }) => node);
    const skus = data.allStripeSku.edges.map(({ node }) => node);
    const parsedQueryString = parseQueryString(location.search);
    const filteredProducts = getFilteredProducts(products, parsedQueryString["filter"]);

    return (
        <Layout>
            <div className="list-page">
                <div className="main-statement-container">
                    <div className="main-statement-inner-container">
                        <MainBanner />
                    </div>
                </div>
                <main className="clothing-cards">
                    {filteredProducts.map((product) => {
                        const relatedSkus = skus.filter((sku) => sku.product.id === product.id);
                        const rrpPrice = Math.min(...relatedSkus.map(({ price }) => price));
                        const discountedPrice = rrpPrice - product.metadata.discount;
                        const { currency } = relatedSkus[0];

                        return (
                            <div className="clothing-card" key={product.id}>
                                <Link to={`/clothing/${product.id}`} className="item-link">
                                    <div
                                        className="clothing-image-container"
                                        data-cropped-bottom={product.metadata.croppedBottom}
                                    >
                                        <Img
                                            sizes={{
                                                ...product.localFiles[0].childImageSharp.fluid,
                                                aspectRatio: 4 / 5,
                                            }}
                                            fluid={product.localFiles[0].childImageSharp.fluid}
                                            imgStyle={{ objectFit: "contain" }}
                                            className="clothing-image"
                                        />
                                    </div>
                                    <div className="clothing-details">
                                        <div className="clothing-name">{product.name}</div>
                                        <div className="clothing-price-container">
                                            <PriceDisplay
                                                rrpPrice={rrpPrice}
                                                discountedPrice={discountedPrice}
                                                currency={currency}
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                    {parsedQueryString["filter"] && (
                        <div className="text-card">
                            <Link to={`/`} className="item-link">
                                <h2 className="text-card-message">FOR MORE CLICK HERE</h2>
                            </Link>
                        </div>
                    )}
                </main>
            </div>
        </Layout>
    );
};

/**
 * Parses a query string, returning an object of field value pairs
 * @param {string} queryString A URL query string that may or may not contain a question mark seperator
 */
function parseQueryString(queryString) {
    try {
        const queryStringTrimmed = queryString[0] === '?' ? queryString.slice(1) : queryString;
        const fieldValuePairs = queryStringTrimmed.split("&");
        const queryStringMap = fieldValuePairs.reduce((qsMap, fieldValuePair) => {
            const [field, value] = fieldValuePair.split("=");
            return { ...qsMap, [decodeURIComponent(field)]: decodeURIComponent(value) };
        }, {});

        return queryStringMap;
    } catch (e) {
        return {};
    }
}


function getFilteredProducts(products, filter) {
    let filteredProducts = products;

    if (filter) {
        filteredProducts = products.filter(({ metadata }) => metadata.type === filter);
    }

    return filteredProducts;
}

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
                        id
                    }
                }
            }
        }
        allStripeProduct {
            edges {
                node {
                    name
                    type
                    id
                    description
                    metadata {
                        croppedBottom
                        type
                        supplier
                        discount
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
`;

export default IndexPage;
