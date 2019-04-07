import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";
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
                    {data.allContentfulClothing.edges.map(({ node: item }) => (
                        <div className="clothing-card" key={item.slug}>
                            <Link to={`/clothing/${item.slug}`} className="item-link">
                                <div
                                    className="clothing-image-container"
                                    data-cropped-bottom={item.imagesMetaData.cropped.bottom}
                                    data-cropped-top={item.imagesMetaData.cropped.top}
                                >
                                    <Img
                                        sizes={{ ...item.images[0].fluid, aspectRatio: 4 / 5 }}
                                        fluid={item.images[0].fluid}
                                        imgStyle={{ objectFit: "contain" }}
                                        className="clothing-image"
                                    />
                                </div>
                                <div className="clothing-details">
                                    <div className="clothing-name">{item.name}</div>
                                    <div className="clothing-price">
                                        {getQualifiedPrice(item.currency, item.price)}
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
        allContentfulClothing {
            edges {
                node {
                    slug
                    name
                    type
                    price
                    currency
                    images {
                        fluid(maxHeight: 480) {
                            ...GatsbyContentfulFluid
                        }
                    }
                    imagesMetaData {
                        cropped {
                            bottom
                            top
                        }
                    }
                }
            }
        }
    }
`;

export default IndexPage;
