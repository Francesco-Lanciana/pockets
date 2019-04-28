import React, { useContext } from "react";
import { graphql, Link } from "gatsby";

import FadeCarousel from "@components/FadeCarousel/FadeCarousel";
import Layout from "@components/Layout/Layout";
import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";
import SEO from "@components/seo";

import { getCurrencySymbol } from "@utils/currencyHelpers";
import BackIcon from "@images/long-arrow-left-solid.svg";

import "./ItemPage.scss";

const ItemPage = ({ data }) => {
    const { onItemSelection } = useContext(ShoppingCartContext);
    const { price, currency, product, id } = data.stripeSku;
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = `${currencySymbol}${(price / 100).toFixed(2)}`;

    return (
        <Layout>
            <div className="item-page">
                <SEO
                    type="item"
                    metadata={{
                        name: product.name,
                        description: product.description,
                        price,
                        currency,
                        imageUrl: product.localFiles[0].childImageSharp.fluid.src,
                        sku: id,
                    }}
                />

                <FadeCarousel images={product.localFiles} imagesMetaData={product.metadata} />
                <Link className="back-icon-container" to="/">
                    <BackIcon />
                </Link>
                <div className="clothing-details">
                    <div className="clothing-quick-details">
                        <div className="sticky-container">
                            <div className="clothing-name">{product.name}</div>
                            <div className="clothing-price">{qualifiedPrice}</div>
                            <div className="clothing-description">{product.description}</div>
                            <div className="clothing-link-container">
                                <button
                                    className="clothing-link"
                                    onClick={() => {
                                        onItemSelection("add", {
                                            id,
                                            name: product.name,
                                            image: product.localFiles[0],
                                            price,
                                            currency,
                                        });
                                    }}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="clothing-classifications">
                        <h4>Materials</h4>
                        <div></div>
                        <div className="clothing-pockets-classification" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ItemPage;

export const query = graphql`
    query ItemPageQuery($id: String!) {
        stripeSku(product: { id: { eq: $id } }) {
            id
            price
            currency
            inventory {
                type
            }
            product {
                id
                name
                type
                description
                metadata {
                    croppedBottom
                }
                localFiles {
                    childImageSharp {
                        fluid(maxWidth: 400) {
                            ...GatsbyImageSharpFluid_tracedSVG
                        }
                    }
                }
            }
        }
    }
`;

/**
 *             <svg class="defs-only" xmlns="http://www.w3.org/2000/svg" width="500" height="400">
                <path d="M0 300 Q 35 360 100 320 Q 270 200 360 0 L 0 0" stroke="#f1f3f5" fill="#f1f3f5"/>
            </svg>
 */
