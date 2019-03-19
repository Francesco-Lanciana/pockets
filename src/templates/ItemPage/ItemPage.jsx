import React from "react";
import { graphql, navigate } from "gatsby";

import FadeCarousel from "@components/FadeCarousel/FadeCarousel";
import Layout from "@components/Layout/Layout";

import { getCurrencySymbol } from "@utils/currencyHelpers";
import BackIcon from "@images/long-arrow-left-solid.svg";

import "./ItemPage.scss";

const ItemPage = ({ data }) => {
    const { name, type, imagesMetaData, price, currency, images, description } = data.contentfulClothing;
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = `${currencySymbol}${price}`;

    return (
        <Layout>
            <div className="item-page">
                <FadeCarousel images={images} imagesMetaData={imagesMetaData} />
                <div className="back-icon-container" onClick={() => navigate("/")}>
                    <BackIcon />
                </div>
                <div className="clothing-details">
                    <div className="clothing-name">{name}</div>
                    <div className="clothing-price">{qualifiedPrice}</div>
                    <div className="clothing-description">{description.description}</div>
                    <div className="clothing-link-container">
                        <button className="clothing-link">Buy now</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ItemPage;

export const query = graphql`
    query PageQuery($slug: String!) {
        contentfulClothing(slug: { eq: $slug }) {
            name
            type
            price
            shippingPrice
            currency
            images {
                fluid(maxWidth: 320, maxHeight: 480) {
                    ...GatsbyContentfulFluid
                }
            }
            imagesMetaData {
                cropped {
                    bottom
                }
            }
            description {
                description
            }
        }
    }
`;

/**
 *             <svg class="defs-only" xmlns="http://www.w3.org/2000/svg" width="500" height="400">
                <path d="M0 300 Q 35 360 100 320 Q 270 200 360 0 L 0 0" stroke="#f1f3f5" fill="#f1f3f5"/>
            </svg>
 */
