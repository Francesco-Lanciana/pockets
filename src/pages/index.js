import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import SEO from "../components/seo";
import Layout from "@components/Layout/Layout";

import { getCurrencySymbol } from "@utils/currencyHelpers";

import "./index.scss";

function getQualifiedPrice(currency, price) {
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = `${currency.toUpperCase()} ${currencySymbol}${(price / 100).toFixed(2)}`;

    return qualifiedPrice;
}

function parseQueryString(search) {
    try {
        const fieldValuePairs = search.slice(1).split("&");
        const queryStringMap = fieldValuePairs.reduce((qsMap, fieldValuePair) => {
            const [field, value] = fieldValuePair.split("=");
            return { ...qsMap, [decodeURIComponent(field)]: decodeURIComponent(value) };
        }, {});

        return queryStringMap;
    } catch (e) {
        return {};
    }
}

const IndexPage = ({ data, location }) => {
    const products = data.allStripeProduct.edges.map(({ node }) => node);
    let filteredProducts = products;
    const parsedQueryString = parseQueryString(location.search);
    if (parsedQueryString["filter"]) {
        filteredProducts = products.filter(
            ({ metadata }) => metadata.type === parsedQueryString["filter"]
        );
    }

    //const selectedProducts = products.filter
    return (
        <Layout>
            <div className="list-page">
                <main className="clothing-cards">
                    {filteredProducts.map((product) => {
                        const relatedSkus = data.allStripeSku.edges.filter(
                            ({ node }) => node.product.id === product.id
                        );
                        const price = Math.min(...relatedSkus.map(({ node }) => node.price));
                        const { currency } = relatedSkus[0].node;

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
                                        <div className="clothing-price">
                                            {getQualifiedPrice(currency, price)}
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
