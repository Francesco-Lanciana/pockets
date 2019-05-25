import React from "react";

import { getCurrencySymbol } from "@utils/currencyHelpers";

import "./PriceDisplay.scss";

const PriceDisplay = ({ rrpPrice, discountedPrice, currency }) => {
    const isDiscounted = rrpPrice !== discountedPrice;

    return (
        <div className="price-display" data-discounted={isDiscounted}>
            <span className="current-price">{getQualifiedPrice(currency, discountedPrice)}</span>
            {isDiscounted && (
                <span className="previous-price">{getQualifiedPrice(currency, rrpPrice, false)}</span>
            )}
        </div>
    );
};

function getQualifiedPrice(currency, price, showCurrency = true) {
    const currencySymbol = getCurrencySymbol(currency);
    const qualifiedPrice = showCurrency
        ? `${currency.toUpperCase()} ${currencySymbol}${(price / 100).toFixed(2)}`
        : `${currencySymbol}${(price / 100).toFixed(2)}`;

    return qualifiedPrice;
}

export default PriceDisplay;
