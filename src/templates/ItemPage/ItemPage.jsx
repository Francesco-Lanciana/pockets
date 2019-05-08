import React, { useContext, useState } from "react";
import { graphql, Link } from "gatsby";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";

import FadeCarousel from "@components/FadeCarousel/FadeCarousel";
import Layout from "@components/Layout/Layout";
import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";
import SEO from "@components/seo";

import { getCurrencySymbol } from "@utils/currencyHelpers";
import BackIcon from "@images/long-arrow-left-solid.svg";

import "./ItemPage.scss";
import "@reach/menu-button/styles.css";
import "@reach/dialog/styles.css";

const ItemPage = ({ data }) => {
    const skus = data.allStripeSku.edges.map(({ node }) => node);

    const { onItemSelection } = useContext(ShoppingCartContext);
    const [selectedSku, setSelectedSku] = useState(skus[0].id);
    const [showDialog, setShowDialog] = useState(false);

    const { name, description, localFiles, metadata, id } = data.stripeProduct;
    const { currency } = skus[0];

    const price = Math.min(...skus.map(({ price }) => price));
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = `${currencySymbol}${(price / 100).toFixed(2)}`;

    function handleBtnClick() {
        onItemSelection("add", {
            name,
            price,
            currency,
            image: localFiles[0],
            id: selectedSku,
        });
    }

    function handleSizeSelection() {}

    return (
        <Layout>
            <div className="item-page">
                <SEO
                    type="item"
                    metadata={{
                        name: name,
                        description: description,
                        price,
                        currency,
                        imageUrl: localFiles[0].childImageSharp.fluid.src,
                        sku: id, // Fix this
                    }}
                />

                <FadeCarousel images={localFiles} imagesMetaData={metadata} />
                <Link className="back-icon-container" to="/">
                    <BackIcon />
                </Link>
                <div className="clothing-details">
                    <div className="clothing-quick-details">
                        <div className="sticky-container">
                            <div className="clothing-name">{name}</div>
                            <div className="clothing-price">{qualifiedPrice}</div>
                            <div className="clothing-description">{description}</div>
                            <div className="clothing-sizing-container">
                                <Menu>
                                    <MenuButton>
                                        Pick a size...{" "}
                                        <span className="menu-dropdown-icon" aria-hidden>
                                            ▾
                                        </span>
                                    </MenuButton>
                                    <MenuList>
                                        {skus.map((sku) => {
                                            const formattedStockValue = formatStockValue(sku.inventory.value);
                                            const outOfStock = formattedStockValue === "OUT OF STOCK";

                                            return (
                                                <MenuItem
                                                    onClick={handleSizeSelection}
                                                    className="size-menu-item"
                                                    data-out-of-stock={outOfStock}
                                                >
                                                    <span>AU {sku.attributes.size}</span>
                                                    {outOfStock && (
                                                        <span className="stock-status-badge">
                                                            {formattedStockValue}
                                                        </span>
                                                    )}
                                                </MenuItem>
                                            );
                                        })}
                                    </MenuList>
                                </Menu>
                                <button className="size-guide-btn" onClick={() => setShowDialog(true)}>
                                    Size Guide
                                </button>
                            </div>
                            <div className="clothing-link-container">
                                <button className="clothing-link" onClick={handleBtnClick}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="clothing-classifications">
                        <h4>Materials</h4>
                        <div />
                        <div className="clothing-pockets-classification" />
                    </div>
                </div>
            </div>

            <Dialog isOpen={showDialog}>
                <button className="close-button" onClick={() => setShowDialog(false)}>
                    <VisuallyHidden>Close</VisuallyHidden>
                    <span aria-hidden>×</span>
                </button>
                <div className="dialog-content">
                    <p>Hello there. I am a dialog</p>
                </div>
            </Dialog>
        </Layout>
    );
};

function formatStockValue(stockValue) {
    if (!stockValue) return;

    return stockValue.split("_").join(" ").toUpperCase();
}

export default ItemPage;

export const query = graphql`
    query ItemPageQuery($id: String!) {
        allStripeSku(filter: { product: { id: { eq: $id } } }) {
            edges {
                node {
                    id
                    price
                    currency
                    inventory {
                        value
                    }
                    attributes {
                        size
                    }
                }
            }
        }
        stripeProduct(id: { eq: $id }) {
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
`;

/**
 *             <svg class="defs-only" xmlns="http://www.w3.org/2000/svg" width="500" height="400">
                <path d="M0 300 Q 35 360 100 320 Q 270 200 360 0 L 0 0" stroke="#f1f3f5" fill="#f1f3f5"/>
            </svg>
 */
