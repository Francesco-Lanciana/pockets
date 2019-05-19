import React from "react";
import Img from "gatsby-image";

import { useMedia } from "@hooks/window-hooks";
import { getCurrencySymbol } from "@utils/currencyHelpers";

import "./CartItem.scss";

const CartItem = ({
    id,
    name,
    size,
    image,
    price,
    metadata,
    quantity,
    onQuantityChange,
    onRemoveItem,
}) => {
    const [showRemoveBtn] = useMedia("(min-width: 850px)", true, false);
    const currencySymbol = getCurrencySymbol("aud");
    const imageData = image.childImageSharp.fluid;

    function handleQuantityInputChange(id, value) {
        const boundValue = Math.min(Math.max(parseInt(value), 0), 10);

        onQuantityChange(id, (q) => q + boundValue);
    }

    return (
        <div className="cart-item">
            <div className="clothing-image-container" data-cropped={metadata.croppedBottom}>
                <Img
                    sizes={{ ...imageData }}
                    fluid={imageData}
                    imgStyle={{ objectFit: "contain" }}
                    className="clothing-image"
                />
            </div>
            <div className="shopping-cart-item-details">
                <div className="item-name">{name}</div>
                <div className="item-size">{`Size ${size}`}</div>
                <div className="item-supplier">{`Supplier: ${metadata.supplier}`}</div>
            </div>
            <div className="detail-grouping">
                <div className="quantity-changer" data-quantity={quantity}>
                    <button
                        className="quantity-change-btn minus"
                        onClick={() => onQuantityChange(id, (q) => q - 1)}
                    />
                    <input
                        type="number"
                        max="10"
                        className="quantity"
                        value={quantity}
                        onChange={(e) => handleQuantityInputChange(id, e.target.value)}
                    />
                    <button
                        className="quantity-change-btn plus"
                        onClick={() => onQuantityChange(id, (q) => q + 1)}
                    />
                </div>
                <div className="item-price">{`${currencySymbol}${(price / 100).toFixed(2)}`}</div>
            </div>

            {showRemoveBtn && (
                <button onClick={() => onRemoveItem(id)} className="close-btn"></button>
            )}
        </div>
    );
};

export default CartItem;
