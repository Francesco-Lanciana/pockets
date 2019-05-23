import React, { useContext, useState, useRef, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { Menu, MenuList, MenuButton, MenuItem } from "@reach/menu-button";
import { Dialog } from "@reach/dialog";
import VisuallyHidden from "@reach/visually-hidden";

import FadeCarousel from "@components/FadeCarousel/FadeCarousel";
import ItemDetailsSection from "@components/ItemDetailsSection/ItemDetailsSection";
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
    const [selectedSku, setSelectedSku] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [addToCardPending, setAddToCardPending] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const menuButtonEl = useRef(null);
    const addToCartBtnEl = useRef(null);

    const { name, description, localFiles, metadata, id } = data.stripeProduct;
    const { currency } = skus[0];

    const price = Math.min(...skus.map(({ price }) => price));
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = `${currencySymbol}${(price / 100).toFixed(2)}`;

    const pocketDetails = extractPocketDetails(metadata);

    useEffect(() => {
        // selectedSku is needed to avoid clicking on mount of component
        if (!addToCardPending && selectedSku) addToCartBtnEl.current.click();
    }, [addToCardPending]);

    function handleBtnClick() {
        if (!selectedSku) {
            setAddToCardPending(true);
            menuButtonEl.current.click();
        } else {
            onItemSelection("add", {
                name,
                size: selectedSku.attributes.size,
                price,
                currency,
                image: localFiles[0],
                id: selectedSku.id,
                metadata: metadata,
            });
        }
    }

    function handleSizeSelection(sku) {
        setSelectedSku(sku);

        if (addToCardPending) {
            setAddToCardPending(false);
        }
    }

    /* This is a little strange I know, but it's the only way to prevent the dropdown from
    closing if you click on an out of stock item. If out of stock handleSizeSelection will not
    be called */
    function handleSizeClick(e, outOfStock) {
        if (outOfStock) e.preventDefault();
    }

    function handleSizeKeyDown(e, outOfStock) {
        if (e.keyCode === 13 && outOfStock) e.preventDefault();
    }

    // We need
    function handleSizeGuideBtnClick(e) {
        setScrollY(document.scrollingElement.scrollTop);
        setShowDialog(true);
    }

    function handleCloseBtnClick() {
        setShowDialog(false);
    }

    useEffect(() => {
        if (showDialog === true) {
            document.body.style.setProperty("overflow", "scroll", "important");
            document.body.scrollTo(0, scrollY);
        }
        if (showDialog === false) {
            document.body.style.removeProperty("overflow");
            document.scrollingElement.scrollTo(0, scrollY);
        }
    }, [showDialog]);

    const sizeSelectText = selectedSku ? `AU ${selectedSku.attributes.size}` : "Pick a size...";

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
                                    <MenuButton ref={menuButtonEl}>
                                        <span className="menu-dropdown-text">{sizeSelectText}</span>
                                        <span className="menu-dropdown-icon" aria-hidden>
                                            ▾
                                        </span>
                                    </MenuButton>
                                    <MenuList>
                                        {skus.map((sku) => {
                                            const formattedStockValue = formatStockValue(
                                                sku.inventory.value
                                            );
                                            const outOfStock = formattedStockValue === "OUT OF STOCK";

                                            return (
                                                <MenuItem
                                                    onClick={(e) => handleSizeClick(e, outOfStock)}
                                                    onSelect={() => handleSizeSelection(sku)}
                                                    onKeyDown={(e) => handleSizeKeyDown(e, outOfStock)}
                                                    className="size-menu-item"
                                                    data-out-of-stock={outOfStock}
                                                    key={sku.id}
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
                                <button className="size-guide-btn" onClick={handleSizeGuideBtnClick}>
                                    Size Guide
                                </button>
                            </div>
                            <div className="add-cart-btn-container">
                                <button className="add-cart-btn" onClick={handleBtnClick} ref={addToCartBtnEl}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="clothing-classifications">
                        <ItemDetailsSection pockets={pocketDetails} materials={metadata.material} />
                    </div>
                </div>
            </div>

            <Dialog isOpen={showDialog}>
                <button className="close-button" onClick={handleCloseBtnClick}>
                    <VisuallyHidden>Close</VisuallyHidden>
                    <span aria-hidden>×</span>
                </button>
                <div className="dialog-content">
                    <p>Hello there! Our size guide is coming soon!</p>
                </div>
            </Dialog>
        </Layout>
    );
};

function extractPocketDetails(metadata) {
    return Object.keys(metadata).reduce((pockets, field) => {
        if (field.toLowerCase().includes("pockets")) {
            const pocketDetails = { type: field, classification: metadata[field] };
            return [ ...pockets, pocketDetails ];
        }
        return pockets;
    }, []);
}

function formatStockValue(stockValue) {
    if (!stockValue) return;

    return stockValue
        .split("_")
        .join(" ")
        .toUpperCase();
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
                croppedTop
                material
                supplier
                discount
                frontPockets
                sidePockets
                backPockets
                extraPockets
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
