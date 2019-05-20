import React from "react";
import { Link } from "gatsby";
import { useMedia } from "@hooks/window-hooks";

import logo from "@images/logo-semi.png";
import BackArrow from "@images/long-arrow-left-light.svg";

import "./CheckoutNavBar.scss";

const CheckoutNavBar = () => {
    const [smallScreen] = useMedia("(max-width: 530px)", true, false);

    return (
        <header className="checkout-nav-bar">
            <div className="navbar-content">
                <Link to="/" className="back-link">
                    <span className="back-arrow-container"><BackArrow /></span>
                    <span className="navbar-link-text">{smallScreen ? "Back" : "Continue Shopping"}</span>
                </Link>
                <Link to="/" className="logo-container">
                    <img src={logo} className="logo" />
                </Link>
                <Link to="/about/returns" className="return-policy-link">
                    <span className="navbar-link-text">{smallScreen ? "Returns" : "Returns policy"}</span>
                </Link>
            </div>
        </header>
    );
};

export default CheckoutNavBar;
