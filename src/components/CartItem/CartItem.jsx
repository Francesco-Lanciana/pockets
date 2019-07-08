import React from "react";
import Img from "gatsby-image";

import PriceDisplay from "@components/PriceDisplay/PriceDisplay";
import { useMedia } from "@hooks/window-hooks";
import supplierData from "@utils/supplierData";

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
    const [showRemoveBtn] = useMedia(["(min-width: 900px)"], [true], false);
    const imageData = image.childImageSharp.fluid;
    const isImageCropped = metadata.croppedBottom === "true" || metadata.croppedTop === "true";
    const discountedPrice = price - metadata.discount;
    const isOnSale = metadata.discount !== 0;

    function handleQuantityInputChange(id, value) {
        onQuantityChange(id, () => value);
    }

    function handleQuantityInputFinalise(id, value) {
        const boundValue = Math.min(Math.max(parseInt(value), 0), 9);

        onQuantityChange(id, () => boundValue);
    }

    return (
        <div className="cart-item">
            <div className="clothing-image-container" data-cropped={isImageCropped}>
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
            </div>
            <div className="detail-grouping">
                <div className="quantity-changer" data-quantity={quantity}>
                    <button
                        className="quantity-change-btn minus"
                        onClick={() => onQuantityChange(id, (q) => Math.max(q - 1, 0))}
                    />
                    <input
                        type="number"
                        max="9"
                        className="quantity"
                        value={quantity}
                        onChange={(e) => handleQuantityInputChange(id, e.target.value)}
                        onBlur={(e) => handleQuantityInputFinalise(id, e.target.value)}
                    />
                    <button
                        className="quantity-change-btn plus"
                        onClick={() => onQuantityChange(id, (q) => Math.min(q + 1, 9))}
                    />
                </div>
                <div className="item-price-container">
                    <PriceDisplay
                        rrpPrice={price}
                        discountedPrice={discountedPrice}
                        currency="aud"
                        showCurrencyCode={false}
                        compactMode={true}
                    />
                </div>
            </div>

            {showRemoveBtn && <button onClick={() => onRemoveItem(id)} className="close-btn" />}
        </div>
    );
};

export default CartItem;
