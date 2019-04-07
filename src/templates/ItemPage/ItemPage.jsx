import React, { useContext } from "react";
import { graphql, Link } from "gatsby";

import FadeCarousel from "@components/FadeCarousel/FadeCarousel";
import Layout from "@components/Layout/Layout";
import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";

import { getCurrencySymbol } from "@utils/currencyHelpers";
import BackIcon from "@images/long-arrow-left-solid.svg";

import "./ItemPage.scss";

const ItemPage = ({ data }) => {
    const { onItemSelection } = useContext(ShoppingCartContext);
    const { price, currency, product } = data.stripeSku;
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = `${currencySymbol}${price}`;

    return (
        <Layout>
            <div className="item-page">
                <FadeCarousel images={product.localFiles} imagesMetaData={product.metadata} />
                <Link className="back-icon-container" to="/">
                    <BackIcon />
                </Link>
                <div className="clothing-details">
                    <div className="clothing-classifications">
                        <div className="clothing-pockets-classification" />
                    </div>

                    <div className="clothing-quick-details">
                        <div className="clothing-name">{product.name}</div>
                        <div className="clothing-price">{qualifiedPrice}</div>
                        <div className="clothing-description">{product.description}</div>
                        <div className="clothing-link-container">
                            <button
                                className="clothing-link"
                                onClick={() => {
                                    onItemSelection("add", {
                                        id: product.id,
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
            </div>
        </Layout>
    );
};

export default ItemPage;

export const query = graphql`
    query PageQuery($id: String!) {
        stripeSku(product: { id: { eq: $id } }) {
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
                        fluid(maxHeight: 480) {
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
