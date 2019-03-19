import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import ItemCard from "@components/ItemCard/ItemCard";

import { getCurrencySymbol } from "@utils/currencyHelpers";

import logo from "@images/logo.png";

import "./index.scss";

function getQualifiedPrice(currency, price) {
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = `${currencySymbol}${price}`;

    return qualifiedPrice;
}

const IndexPage = ({ data }) => {
    return (
        <Layout>
            <div className="list-page">
                <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
                <div className="navbar">
                    <img src={logo} className="logo"></img>
                </div>

                <main className="clothing-cards">
                    {data.allContentfulClothing.edges.map(({ node: item }) => (
                        <div className="clothing-card" key={item.slug}>
                            <Link to={`/clothing/${item.slug}`} className="item-link">
                                <div className="clothing-image-container">
                                    <Img
                                        sizes={{ ...item.images[0].fluid, aspectRatio: 4 / 5 }}
                                        fluid={item.images[0].fluid}
                                        imgStyle={{ objectFit: "contain"}}
                                        className="clothing-image"
                                    />
                                </div>
                                <div className="clothing-details">
                                    <div className="clothing-name">{item.name}</div>
                                    <div className="clothing-price">{getQualifiedPrice(item.currency, item.price)}</div>
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
                        fluid(maxWidth: 320, maxHeight: 480) {
                            ...GatsbyContentfulFluid_tracedSVG
                        }
                    }
                }
            }
        }
    }
`;

export default IndexPage;
